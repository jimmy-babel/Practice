"use client"
import React from 'react';
import { useEffect, useState } from 'react'
import {article} from '@/lib/supabase';
import SetLayout from '@/components/set-layout';
interface Props {
  params: Promise<{ account: string,id:Number }>; //动态路由 [account] 对应的参数
}
export default function Article({params}:Props){
  
  const { account,id } = React.use(params);
  const [article, setArticle] = useState<article>({} as article)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  const extraClass = `md:w-[70%] max-md:w-[82%] max-md:min-w-[500px]`;
  console.log('PAGE BLOG Article DETAIL',account);
  
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
          await fetchArticleDetail()
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
  const fetchArticleDetail = async () => {
    try {
      console.log('api: get-article-detail');
      const response = await fetch(`/api/blog/get-article-detail?blogger=${account}&id=${id}`);
      const result = await response.json();
      console.log('api: /blog/get-article-detail then',result,response);
      if (response.ok) {
        setArticle(result.data);
      } else {
        console.error('获取文章时出错:', result.error);
        setArticle([]);
      }
    } catch (error) {
      console.error('获取文章时出错:', error);
      setArticle([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className=" bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="list-box pt-5">
      详情:{article.title}
    </div>
  )

}