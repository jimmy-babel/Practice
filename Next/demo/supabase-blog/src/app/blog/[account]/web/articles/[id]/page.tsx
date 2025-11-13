"use client"
import React from 'react';
import { useEffect, useState } from 'react'
import {article} from '@/lib/supabase';
import {useJumpAction,useCheckUser} from "@/lib/use-helper/base-mixin"

type Props = {
  params: Promise<{ account: string,id:Number }>; //动态路由 [account] 对应的参数
}
export default function Article({params}:Props){
  
  const { account,id } = React.use(params);
  const [article, setArticle] = useState<article>({} as article)
  const [loading, setLoading] = useState(true)
  const {checkUser} = useCheckUser({loginJump:true});

  console.log('PAGE BLOG Article DETAIL',account);
  
  useEffect(() => {
    let mounted = true

    // 初始化应用，检查用户状态 -> 获取文章数据
    const init = async () => {
      console.log('init');
      try {
        // 先检查用户状态
        await checkUser()
        if (!mounted)return
        // 然后获取文章数据
        await fetchArticleDetail()
      } catch (error) {
        console.error('初始化应用时出错:', error)
      } finally {
        setLoading(false)
      }
    }
    init();
    return () => {
      mounted = false
    }
  }, [])
  
  // 获取文章数据并关联作者信息
  const fetchArticleDetail = async () => {
    try {
      console.log('api: get-article-detail');
      const response = await fetch(`/api/blog/get-article-detail?blogger=${account}&id=${Number(id)}`);
      const result = await response.json();
      console.log('api: /blog/get-article-detail then',result,response);
      if (response.ok) {
        setArticle(result.data);
      } else {
        console.error('获取文章时出错:', result.error);
        setArticle([] as any);
      }
    } catch (error) {
      console.error('获取文章时出错:', error);
      setArticle([] as any);
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