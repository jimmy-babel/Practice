import React from 'react'
import { Card } from "antd";
import Avatar from "@/components/custom-antd/Avatar";
type Props = {}

const Banner = (props: Props) => {
  return (
    <>
      <div className='flex min-h-[60vh] w-full pl-20 pr-20'>
        <div className='flex-1 flex-col flex justify-center h-[inherit] anim-op-y text-center'>
          <div className='text-5xl'>Jimmy's Blog</div>
          <div className='text-2xl pl-6 pt-5 italic'>what doesn't kill you make you stronger</div>
          <div className='pl-12 pt-3 text-gray-400'>在坚持不下去的时候，坚持下去</div>
        </div>
        <div className='flex-1 anim-op-y h-[inherit] flex-col flex justify-center pl-10'>
          <div className='anim-hover-scale-sm w-full'>
            <div className={`w-full max-w-[500px]`}>
              {/* <div className='h-[230px] rounded-xl overflow-hidden box-shadow p-8 shadow-xl'> */}
              <div className='h-[230px] rounded-xl overflow-hidden box-shadow p-8'>
                <div className='flex items-center '>
                  <Avatar size={50} shape="square"></Avatar>
                  <div className='pl-4'>
                    <div className='text-2xl bold pb-1'>Jimmy_Luo_441</div>
                    <div className='pb-2 text-gray-400'>激情全运会，活力大湾区</div>
                  </div>
                </div>
                <div className='text-[18px] text-gray-400 pt-4'>🔥灵感 · 记录生活</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='min-h-[200px]'></div>
    </>
  )
}
export default Banner;