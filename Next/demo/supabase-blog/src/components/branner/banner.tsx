import React from 'react'
import { Card } from "antd";
import Avatar from "@/components/custom-antd/Avatar";
type Props = {}

const Banner = (props: Props) => {
  return (
    <>
      <div className='flex min-h-[60vh] w-full'>
        <div className='flex-1 flex-col flex justify-center h-[inherit] pl-16 anim-op-y'>
          <div className='text-5xl'>Jimmy's Blog</div>
          <div className='text-2xl pl-6 pt-5 italic'>what doesn't kill you make you stronger</div>
          <div className='pl-12 pt-3 text-gray-400'>在坚持不下去的时候，坚持下去</div>
        </div>
        <div className='flex-1 h-[inherit] flex-col flex justify-center pl-10 pr-20'>
          <Card className={`w-full anim-op-y overflow-hidden shadow-gray-400 border-gray-400`} variant="borderless" style={{borderRadius:'24px',backgroundColor:"#000",cursor:"unset"}} hoverable={true}>
            <div className='h-[230px] p-8 text-white' style={{background:"linear-gradient(45deg,#2a292c,#19191b)"}}>
              <div className='flex items-center '>
                <Avatar size={50} shape="square"></Avatar>
                <div className='pl-4'>
                  <div className='text-2xl bold pb-1'>Jimmy_Luo_441</div>
                  <div className='pb-2 text-gray-400'>激情全运会，活力大湾区</div>
                </div>
              </div>
              <div className='text-[18px] text-gray-300 pt-4'>🔥灵感 · 记录生活</div>
            </div>
          </Card>
        </div>
      </div>
      <div className='min-h-[200px]'></div>
    </>
  )
}
export default Banner;