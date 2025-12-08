import React, { useEffect, useState } from 'react'
import Avatar from "@/components/custom-antd/Avatar";
type Props = {}
type Blogger = {
  user_name?: string;
  introduce1?: string;
  introduce2?: string;
  motto1?: string;
  motto2?: string;
}
const Banner = (props: Props) => {
  const [bloggerInfo, setBloggerInfo] = useState<Blogger>({} as Blogger);
  useEffect(() => {
    getDetail();
  }, []);
  async function getDetail(){
    try{
      const res = await fetch(
        `/api/common/get-blogger-info?blogger=${window.__NEXT_ACCOUNT__}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      console.log('获取博主信息:', data);
      setBloggerInfo((data?.data || {}) as Blogger);
    }catch(error){
      console.error('获取博主信息时出错:', error);
    }
  }
  return (
    <>
      <div className='flex min-h-[60vh] w-full pl-20 pr-20'>
        <div className='flex-1 flex-col flex justify-center h-[inherit] anim-op-y text-center'>
          <div className='text-5xl'>{bloggerInfo?.user_name+"'s Blog" || "Jimmy's Blog"}</div>
          <div className='text-2xl pl-6 pt-5 italic'>{bloggerInfo?.motto1 || "what doesn't kill you make you stronger"}</div>
          <div className='pl-6 pt-3 text-gray-400'>{bloggerInfo?.motto2 || "在坚持不下去的时候，坚持下去"}</div>
        </div>
        <div className='flex-1 anim-op-y h-[inherit] flex-col flex justify-center pl-10'>
          <div className='anim-hover-scale-sm w-full'>
            <div className={`w-full max-w-[500px]`}>
              <div className='h-[230px] rounded-xl overflow-hidden box-shadow p-8'>
                <div className='flex items-center '>
                  <Avatar size={50} shape="square"></Avatar>
                  <div className='pl-4'>
                    <div className='text-2xl bold pb-1'>{bloggerInfo?.user_name || "Jimmy_Luo_441"}</div>
                    <div className='pb-2 text-gray-400'>{bloggerInfo?.introduce1 || "激情全运会，活力大湾区"}</div>
                  </div>
                </div>
                <div className='text-[18px] text-gray-400 pt-4'>🔥{bloggerInfo?.introduce2 || "记录生活"}</div>
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