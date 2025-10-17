'use client';
import React, { useState,useEffect } from "react";
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';

type Props = {
  isPlace?:boolean,
  isHeaderBg?:boolean,
  account?:string
};

const nav = ({isPlace,account,isHeaderBg=true}: Props) => {
  // 1.首页、2.博客记录、3.生活、4.音画手记、5.问AI、6.留言、7.登录、8.后台管理
  const [showBg,setShowBg] = useState(false);
  const params = useParams(); //监听params变化
  const pathname = usePathname(); //监听路由变化
  const curAccount = params.account || account || localStorage.getItem('account');
  console.log('curAccount',curAccount);
  //会一直触发 待优化 // console.log('nav watch',curAccount,params,pathname,); 
  const navList = [
    { name: "首页", url: `/blog/${curAccount}` },
    { name: "博客记录", url: `/blog/${curAccount}/articles` },
    { name: "生活定格", url: `/blog/${curAccount}/life` },
    { name: "音画手记", url: `/blog/${curAccount}/muvie` },
    { name: "问AI", url: `/blog/${curAccount}/askai` },
    { name: "留言", url: `/blog/${curAccount}/message` },
    { name: "登录", url: `/blog/auth` },
    { name: "后台管理", url: `/blog/${curAccount}/admin` },
  ];
  const commonBg = '/blog-bg.webp';
  const HeaderBg = React.useMemo(() => {
    return (
      <>
        {isHeaderBg && <>
          <div className='w-full h-[30vh]'></div>
          <div className='w-full absolute h-[30vh] left-0 top-0 z-[-1] header-box'>
            <div className="w-full h-full relative">
              <Image
                fill
                className="w-full h-full object-cover"
                src={commonBg}
                alt=""
              />
            </div>
          </div>
        </>}
      </>
    );
  }, [commonBg,isHeaderBg]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        !showBg && setShowBg(true); // 总滑动超60像素时，backdrop背景
      } else {
        showBg && setShowBg(false); // 总滑动小于60像素时，去掉backdrop效果
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // 清理事件监听器
    };
  }, [showBg]);
  return (
    <>
      <div className={`nav-box fixed z-[10] left-0 top-0 w-full pl-5 pr-5  ${showBg?'text-black text-shadow-[0px_0px_6px_rgba(255,255,255,1)]':'text-white text-shadow-[0px_0px_6px_rgba(0,0,0,1)]'}`}>
        <div className="flex justify-between items-center relative h-[60px] w-full z-[2]">
          <div>WELCOME BLOG</div>
          <div className="flex-1 flex items-center justify-end">
            {navList.map((item, index) => (
              <div key={index} className="px-2 flex items-center">
                <Link href={{pathname:item.url}}>{item.name}</Link>
              </div>
            ))}
          </div>
        </div>
        <div className={`absolute z-[1] left-0 top-0 w-full h-full transition-all duration-300 ${showBg?'backdrop-blur-2xl':''}`}></div>
      </div>
      {isPlace && <div className="place-box w-full h-[60px]"></div>}
      {HeaderBg}
    </>
  );
};

export default nav;
