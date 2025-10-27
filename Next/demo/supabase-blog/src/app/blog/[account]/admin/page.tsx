"use client"
import React from 'react';
import { useEffect, useState } from 'react'
import {useJumpAction} from "@/lib/helper/base-mixin"

interface Props {
  params: Promise<{ account: string }>; //动态路由 [account] 对应的参数
}
export default function Articles({params}:Props){
  
  const { account } = React.use(params);
  const [loading, setLoading] = useState(true)
  const {jumpAction} = useJumpAction();
  console.log('PAGE ADMIN 首页',account);

  // 检查用户登录状态
  const checkUser = async () => {
    try{
      const response = await fetch(`/api/login/check`);
      const {data,msg,error} = await response.json();
      console.log('api: /login/check then',data,msg,error);
      if (response.ok) {
        if(data?.isLogin){
          return
        }
      }
      jumpAction('/blog/auth')
    }catch(e){}finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    checkUser();
  },[])

  if (loading) {
    return (
      <div className="h-[100%] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="w-full h-full flex justify-center items-center tracking-wide">
      <div className='flex flex-col items-center leading-7'>
        <div>欢迎来到</div>
        <div>【BLOG后台管理】</div>
      </div>
    </div>
  )

}