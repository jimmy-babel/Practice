'use client'

import { ChatModel } from '@/db/schema'
import { useUser } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { Router } from 'next/router'
import React from 'react'

type Props = {}

const Navibar = (props: Props) => {

  // const { user } = useUser()
  const userId = process.env.NEXT_PUBLIC_USER_ID
  const router = useRouter()
  const chats = useQuery({
    queryKey: ['chats'],
    queryFn: async () => {
      const response = await fetch('/api/get-chats',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      console.log('get-chats then',data);
      return data
    },
    enabled: !!userId
  })
  const pathname = usePathname()


  return (
    <div className='h-screen bg-gray-50 flex flex-col'>
      <div className='flex items-center justify-center'>
        <p className='font-bold text-2xl'>
          Deepseek
        </p>
      </div>

      <div className='h-10 flex items-center justify-center mt-4 cursor-pointer'
        onClick={() => {
          router.push('/')
        }}
      >
        <p className='h-full w-2/3 bg-blue-100 rounded-lg flex items-center justify-center font-thin'>
          创建新会话
        </p>
      </div>

      {/* 目录 */}
      <div className='flex flex-col gap-2 p-6 flex-1 overflow-y-scroll '>
          {chats?.data?.map((chat: ChatModel) => (
            <div 
              className='w-full h-10 shrink-0'
              key={chat.id}
              onClick={() => {
                router.push(`/chat/${chat.id}`)
              }}
            >
              <p className={`leading-10 cursor-pointer font-extralight text-sm line-clamp-1 ${pathname === `/chat/${chat.id}` ? 'text-blue-700': ''} `}>{chat?.title}</p>
            </div>
          ))}
      </div>

    </div>
  )
}

export default Navibar