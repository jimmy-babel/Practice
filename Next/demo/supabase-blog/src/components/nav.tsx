'use client';
import React, { useState,useEffect, useRef } from "react";
import { useParams, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {useJumpAction} from "@/lib/use-helper/base-mixin";
import Avatar from "@/components/custom-antd/Avatar";
import './nav.css';
type NavItem = { name: string; url?: string; type?: string };
type Props = {
  isPlace?:boolean,
  account?:string,
  navList?:NavItem[],
};
const Nav = ({navList,isPlace,account}: Props) => {
  // 1.首页、2.博客记录、3.生活、4.音画手记、5.问AI、6.留言、7.登录、8.后台管理
  const [showBg,setShowBg] = useState(false);
  // const params = useParams(); //监听params变化
  // const pathname = usePathname(); //监听路由变化
  const showBgRef = useRef(showBg);
  // const [curAccount,setCurAccount] = useState<string>('');
  // const [userProfile, setUserProfile] = useState<any>(null);
  const [place,setPlace] = useState<boolean|undefined>(isPlace);
  const {jumpAction} = useJumpAction();
  // 给scroll闭包函数使用showBgRef.current
  useEffect(() => {
    showBgRef.current = showBg;
  }, [showBg]);

  
  // 检查用户登录状态
  // const checkUser = async () => {
  //   try {
  //     console.log('checkUser');
  //     console.log('supabase.auth.getUser');
  //     const { data } = await supabase.auth.getUser()
  //     let user = data?.user;
  //     console.log('supabase.auth.getUser then',user,data);
  //     if (user) {
  //       console.log('已登录',user);
  //       console.log('supabase select from profiles');
  //       // 获取用户配置信息
  //       const { data: profile, error } = await supabase
  //         .from('profiles')
  //         .select('*')
  //         .eq('id', user.id)
  //         .single()
  //       console.log('supabase select from profiles then',profile,error);
  //       // setUserProfile(profile)
  //     } else {
  //       console.log('未登录',data);
  //       // setUserProfile(null)
  //     }
  //   } catch (error) {
  //     console.error('检查用户状态时出错:', error)
  //     // setUserProfile(null)
  //   }
  // }
  
  // useEffect(() => {
  //   // params.account转换string
  //   const processedParamsAccount = Array.isArray(params.account) 
  //     ? params.account[0] 
  //     : params.account;
  //   const _curAccount = processedParamsAccount || account || localStorage.getItem('account') || "";
  //   if(_curAccount){
  //     setCurAccount(_curAccount);
  //     checkUser();
  //   }
  // },[params.account,account])

  useEffect(() => {
    const handleScroll = () => {
      const currentShowBg = showBgRef.current;
      if (window.scrollY > 75) {
        !currentShowBg && setShowBg(true); //这里如果用showBg,会因为闭包的问题导致showBg一直不变  //总滑动超75像素时，backdrop背景
      } else {
        currentShowBg && setShowBg(false); //这里如果用showBg,会因为闭包的问题导致showBg一直不变  // 总滑动小于75像素时，去掉backdrop效果
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // 清理事件监听器
    };
  }, [showBg]);

  // useEffect(()=>{
  //   console.log('进来 nav useEffect',place,isPlace);
  //   if(pathname?.indexOf('/admin')>-1){
  //     setPlace(true);
  //   }else{
  //     setPlace(isPlace);
  //   }
  // },[pathname])
  return (
    <>
      <div className={`nav-box sticky z-[10] left-0 top-0 w-full h-[75px] text-white text-shadow-[0px_0px_6px_rgba(0,0,0,1)]`}>
        <div className="anim-op-y flex justify-between items-center relative h-full w-full pl-5 pr-5 z-[2]">
          <Avatar></Avatar>
          {/* {curAccount.toUpperCase()?<div>
            {userProfile?.full_name.toUpperCase() != curAccount.toUpperCase() ? <div>WELCOME {curAccount.toUpperCase()} BLOG</div> : <div>Hello,{userProfile.full_name}</div>}
          </div>:null} */}
          <div className="flex-1 flex items-center justify-center">
            {navList?.map((item, index) => (
              <div key={index} className="px-2 flex items-center">
                <div className="cursor-pointer anim-hover-scale" onClick={()=>jumpAction(item.url||"",{type:item.type||"blog_auto"})}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={`absolute z-[1] filter-box left-0 top-0 w-full h-full transition-all duration-300`} style={{backdropFilter:'blur(10px) saturate(180%)',backgroundColor:'rgba(18, 18, 18,0.3)'}}></div>
      </div>
      {/* {place && <div className="place-box w-full h-[75px]"></div>} */}
    </>
  );
};

export default Nav;
