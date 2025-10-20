'use client';
import React, { useState,useEffect, useRef } from "react";
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { supabase } from '@/lib/supabase'
type Props = {
  isPlace?:boolean,
  isHeaderBg?:boolean,
  account?:string
};

const Nav = ({isPlace,account,isHeaderBg=true}: Props) => {
  // 1.首页、2.博客记录、3.生活、4.音画手记、5.问AI、6.留言、7.登录、8.后台管理
  const [showBg,setShowBg] = useState(false);
  const [navList,setNavList] = useState<Array<{name:string,url:string}>>([]);
  const params = useParams(); //监听params变化
  const pathname = usePathname(); //监听路由变化
  const showBgRef = useRef(showBg);
  const [curAccount,setCurAccount] = useState<string>('');
  const [userProfile, setUserProfile] = useState<any>(null);

  // 给scroll闭包函数使用showBgRef.current
  useEffect(() => {
    showBgRef.current = showBg;
  }, [showBg]);

  
  // 检查用户登录状态
  const checkUser = async () => {
    try {
      console.log('checkUser');
      console.log('supabase.auth.getUser');
      const { data } = await supabase.auth.getUser()
      let user = data?.user;
      console.log('supabase.auth.getUser then',user,data);
      if (user) {
        console.log('已登录',user);
        console.log('supabase select from profiles');
        // 获取用户配置信息
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        console.log('supabase select from profiles then',profile,error);
        setUserProfile(profile)
      } else {
        console.log('未登录',data);
        setUserProfile(null)
      }
    } catch (error) {
      console.error('检查用户状态时出错:', error)
      setUserProfile(null)
    }
  }
  useEffect(()=>{
    checkUser();
  },[])
  // params.account转换string
  useEffect(() => {
    const processedParamsAccount = Array.isArray(params.account) 
      ? params.account[0] 
      : params.account;
    // const curAccount = (params.account || account || localStorage.getItem('account') || "") as string; //params.account不转换的话就需要as断言
    const _curAccount = processedParamsAccount || account || localStorage.getItem('account') || "";
    if(_curAccount){
      setCurAccount(_curAccount);
      console.log('curAccount',_curAccount,pathname,params,);
      setNavList([
        { name: "首页", url: `/blog/${_curAccount}` },
        { name: "博客记录", url: `/blog/${_curAccount}/articles` },
        { name: "生活定格", url: `/blog/${_curAccount}/life` },
        { name: "音画手记", url: `/blog/${_curAccount}/muvie` },
        { name: "问AI", url: `/blog/${_curAccount}/askai` },
        { name: "留言", url: `/blog/${_curAccount}/message` },
        { name: "登录", url: `/blog/auth` },
        { name: "后台管理", url: `/blog/${_curAccount}/admin` },
      ]);
    }
  },[params.account,account])

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
      const currentShowBg = showBgRef.current;
      if (window.scrollY > 60) {
        !currentShowBg && setShowBg(true); //这里如果用showBg,会因为闭包的问题导致showBg一直不变  //总滑动超60像素时，backdrop背景
      } else {
        currentShowBg && setShowBg(false); //这里如果用showBg,会因为闭包的问题导致showBg一直不变  // 总滑动小于60像素时，去掉backdrop效果
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
          {curAccount.toUpperCase()?<div>
            {userProfile?.full_name?<div>Hello,{userProfile.full_name}</div>:null}
            {userProfile?.full_name.toUpperCase() != curAccount.toUpperCase() ? <div>WELCOME {curAccount.toUpperCase()} BLOG</div>:null}
          </div>:null}
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

export default Nav;
