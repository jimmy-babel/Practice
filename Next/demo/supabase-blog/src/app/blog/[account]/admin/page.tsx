"use client"
import React from 'react';
import { useEffect, useState } from 'react'
import {useJumpAction,useCheckUser} from "@/lib/use-helper/base-mixin"
export default function Articles(){
  const [loading, setLoading] = useState(true)
  // const {jumpAction} = useJumpAction();
  console.log('PAGE ADMIN 首页');
  const {checkUser} = useCheckUser({loginJump:true});

  // 检查用户登录状态
  // const checkUser = async () => {
  //   try{
  //     const response = await fetch(`/api/login/check`);
  //     const {data,msg,error} = await response.json();
  //     console.log('api: /login/check then',data,msg,error);
  //     if (response.ok) {
  //       if(data?.isLogin){
  //         return
  //       }
  //     }
  //     jumpAction('/blog/auth',{type:"from"})
  //   }catch(e){}finally{
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    let mounted = true
    const init = async () => {
      try {
        const res = await checkUser();
        if(!mounted)return;
        console.log('checkuser then ',res);
      } catch (error) {
        console.error('初始化时出错:', error)
      } finally {
        setLoading(false)
      }
    }
    init();
    return () => {
      mounted = false
    }
  }, [])

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