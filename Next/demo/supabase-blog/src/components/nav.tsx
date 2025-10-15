import React, { useState,useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  isPlace?:boolean
};

const nav = (props: Props) => {
  // 1.首页、2.博主博客笔记、3.生活、4.音画手记、5.问AI、6.留言、7.登录、8.后台管理
  const {isPlace}=props;
  const [showBg,setShowBg] = useState(false);
  // 先写死jimmy
  const navList = [
    { name: "首页", url: "/blog/jimmy" },
    { name: "博客笔记", url: "/blog/jimmy/article" },
    { name: "生活定格", url: "/blog/jimmy/life" },
    { name: "音画手记", url: "/blog/jimmy/muvie" },
    { name: "问AI", url: "/blog/jimmy/askai" },
    { name: "留言", url: "/blog/jimmy/message" },
    { name: "登录", url: "/blog" },
    { name: "后台管理", url: "/blog/jimmy/admin" },
  ];
  
  // 判断标签元素的滚动位置
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (scrollRef.current) {
  //       // 检查占位元素是否在可视区域内
  //       const rect = scrollRef.current.getBoundingClientRect();
  //       // console.log(rect);
  //       if (rect.top <= 0) {
  //         setShowBg(true); // 滑动超过 60 像素，显示背景
  //       } else {
  //         setShowBg(false); // 滑动小于 60 像素，隐藏背景
  //       }
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll); // 清理事件监听器
  //   };
  // }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setShowBg(true); // 滑动超过 60 像素时，显示背景
      } else {
        setShowBg(false); // 滑动小于 60 像素时，隐藏背景
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // 清理事件监听器
    };
  }, []);
  return (
    <>
      {/* <div className={`nav-box fixed z-[10] left-0 top-0 w-full pl-5 pr-5  text-shadow-xs ${showBg?'text-black text-shadow-white':'text-white text-shadow-black'}`}> */}
      <div className={`nav-box fixed z-[10] left-0 top-0 w-full pl-5 pr-5  ${showBg?'text-black text-shadow-[0px_0px_6px_rgba(255,255,255,1)]':'text-white text-shadow-[0px_0px_6px_rgba(0,0,0,1)]'}`}>
        <div className="flex justify-between items-center relative h-[60px] w-full z-[2]">
          <div>WELCOME BLOG</div>
          <div className="flex-1 flex items-center justify-end">
            {navList.map((item, index) => (
              <div key={index} className="px-2 flex items-center">
                <Link href={item.url}>{item.name}</Link>
              </div>
            ))}
          </div>
        </div>
        {/* <div className={`absolute z-[1] left-0 top-0 w-full h-full transition-all duration-300 ${showBg?'backdrop-blur-2xl bg-[rgba(0,0,0,0.1)]':''}`}></div> */}
        <div className={`absolute z-[1] left-0 top-0 w-full h-full transition-all duration-300 ${showBg?'backdrop-blur-2xl':''}`}></div>
      </div>
      {/* <div ref={scrollRef} style={{ height: "60px", position: "absolute", top: "60px", width:"100px",background:"red" }}></div> */}
      {isPlace && <div className="place-box w-full h-[60px]"></div>}
    </>
  );
};

export default nav;
