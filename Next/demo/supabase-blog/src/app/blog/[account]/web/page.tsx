'use client'
import React from 'react';
import { useEffect, useState } from 'react'
import { supabase, Post } from '@/lib/supabase'
import Link from 'next/link'
import Profile from "@/components/profile";
import SetLayout from "@/components/set-layout";
import List from "@/app/blog/[account]/web/articles/components/list";

interface Props {
  params: Promise<{ account: string }>; //动态路由 [account] 对应的参数
}
// 首页
export default function Blog({ params }: Props) {
  const { account } = React.use(params);
  const [articles, setArticles] = useState<Post[]>([] as Post[])
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  // const extraClass = `md:w-[70%] max-md:w-[82%] max-md:min-w-[500px]`;
  const boxStyle = {minHeight:'70vh'}
  console.log('PAGE Blog 首页',articles,loading,userProfile);


  useEffect(() => {
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

    // 设置超时保护，10秒后强制停止加载状态
    const timeoutId = setTimeout(() => {
      if (mounted) {
        console.log('加载超时，强制停止加载状态')
        setLoading(false)
      }
    }, 10000)

    initializeApp().finally(() => {
      clearTimeout(timeoutId)
    })

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('supabase.auth.onAuthStateChange 监听认证状态变化',event,session);
        if (!mounted) return
        
        if (event === 'SIGNED_IN' && session) {
          
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(null)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // 检查用户登录状态
  const checkUser = async () => {
    const response = await fetch(`/api/login/check`);
    const {data,msg} = await response.json();
    console.log('api: /login/check then',data,msg);
    if (response.ok) {
      if(data.isLogin){
        setUserProfile(data||null)
      }
    } else {
      console.error('checkUser出错:',msg);
    }
  }

  // const handleSignOut = async () => {
  //   console.log('handleSignOut');
  //   console.log('supabase.auth.signOut');
  //   const { error } = await supabase.auth.signOut()
  //   console.log('supabase.auth.signOut then',error);
  //   if (!error) {
  //     setUserProfile(null)
  //     // 可选：显示退出成功消息
  //   }
  // }

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
      <div className=" bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  // HTML部分
  return (
      // <SetLayout extraClass={extraClass} boxStyle={boxStyle} pageScroll safeArea>
    // <SetLayout extraClass={extraClass} pageScroll safeArea>

    <div className='content-box pt-5'>
      <div className='flex justify-between flex-wrap'>
        <div className='profile-box w-[23%] min-w-[225px] pr-5 pb-5'>
          <Profile></Profile>
        </div>
        <div className='blog-list-box flex-1'>
          <List listData={articles} bloggerData={userProfile}></List>
        </div>
      </div>
    </div>
    // </SetLayout>
  )
}
