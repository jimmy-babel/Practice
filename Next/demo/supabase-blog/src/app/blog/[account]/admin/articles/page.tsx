"use client"
import React from 'react';
import { useEffect, useState } from 'react'
import List from "@/app/blog/[account]/admin/articles/components/list";
import {Post} from '@/lib/supabase';
import SetLayout from '@/components/set-layout';
interface Props {
  params: Promise<{ account: string }>; //动态路由 [account] 对应的参数
}
export default function Articles({params}:Props){
  
  const { account } = React.use(params);
  const [articles, setArticles] = useState<Post[]>([] as Post[])
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  const extraClass = `md:w-[70%] max-md:w-[82%] max-md:min-w-[500px]`;
  console.log('PAGE ADMIN Articles',account);
  
  useEffect(() => {
    account && localStorage.setItem('account', account);
    let mounted = true

    // 初始化应用，检查用户状态 -> 获取文章数据
    const initializeApp = async () => {
      console.log('initializeApp');
      try {
        // 先检查用户状态
        await checkUser()
        // 然后获取文章数据
        if (mounted) {
          await fetchArticleList()
        }
      } catch (error) {
        console.error('初始化应用时出错:', error)
        setLoading(false)
      }
    }
    
    initializeApp();
    
    return () => {
      mounted = false
    }
  }, [])

  // 检查用户登录状态
  const checkUser = async () => {
    const response = await fetch(`/api/login/check`);
    const {data,msg} = await response.json();
    console.log('api: /login/check then',response);
    if (response.ok) {
      if(data.isLogin){
        setUserProfile(data||null)
      }
    } else {
      console.error('checkUser出错:',msg);
    }
  }
  
  // 获取文章数据并关联作者信息
  const fetchArticleList = async () => {
    try {
      console.log('api: get-article-list');
      const response = await fetch(`/api/blog/get-article-list?blogger=${account}`);
      const result = await response.json();
      console.log('api: /blog/get-article-list then',result,response);
      if (response.ok) {
        setArticles(result.data);
      } else {
        console.error('获取文章时出错:', result.error);
        setArticles([]);
      }
    } catch (error) {
      console.error('获取文章时出错:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }
  return (
    <SetLayout extraClass={extraClass} pageScroll safeArea>
      <div className="list-box pt-5">
            <List listData={articles} bloggerData={userProfile}></List>
      </div>
    </SetLayout>
  )

}