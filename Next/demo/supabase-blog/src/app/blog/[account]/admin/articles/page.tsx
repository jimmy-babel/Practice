"use client"
import React from 'react';
import List from "@/app/blog/[account]/articles/components/list";
import {Post} from '@/lib/supabase';
import SetLayout from '@/components/set-layout';
interface Props {
  params: Promise<{ account: string }>; //动态路由 [account] 对应的参数
}
export default function ArticleList({params}:Props){
  const { account } = React.use(params);
  const listData = [{},{},{}] as Post[];
  const extraClass = `md:w-[70%] max-md:w-[82%] max-md:min-w-[500px]`;
  console.log('PAGE ArticleList',account,listData);
  return (
    <SetLayout extraClass={extraClass} pageScroll safeArea>
      <div className="list-box pt-5">
        <List listData={listData}></List>
      </div>
    </SetLayout>
  )

}