"use client"
import React from 'react';
import { useEffect, useState } from 'react'
import List from "@/app/blog/[account]/admin/articles/components/list";
import {Post,article} from '@/lib/supabase';
import {useJumpAction} from "@/lib/use-helper/base-mixin"
import type { TableColumnsType, TableProps } from 'antd';
import Image from 'next/image';
import { Table } from 'antd';

interface Props {
  params: Promise<{ account: string }>; //动态路由 [account] 对应的参数
}
export default function Articles({params}:Props){
  
  const { account } = React.use(params);
  const [articles, setArticles] = useState<article[]>([] as article[])
  const [loading, setLoading] = useState(true)
  const {jumpAction} = useJumpAction();
  
  const columns: TableColumnsType<article> = [
    {
      title: '封面',
      key: 'id',
      render: (row: article) => <div><Image className='w-[110px] h-[110px]' src="/blog-bg.webp" alt="USER" objectFit="contain" width={110} height={110} /></div>,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key:'title',
      align:'center'
    },
    {
      title: '摘要',
      dataIndex: 'excerpt',
      key:'excerpt',
      align:'center'
    },
    {
      title: '发布状态',
      dataIndex: 'published',
      key:'published',
      align:'center'
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key:'created_at',
      align:'center'
    },
    {
      title: '最后修改时间',
      dataIndex: 'updated_at',
      key:'updated_at',
      align:'center'
    },
    {
      title: '操作',
      key: 'action',
      render: (row: article) => <div className='flex items-center'><button onClick={()=>jumpAction(`admin/articles/${row.id}`)}>编辑</button></div>,
    },
  ];

  // const [userProfile, setUserProfile] = useState<any>(null)
  console.log('PAGE ADMIN Articles',account);
  
  useEffect(() => {
    let mounted = true

    // 初始化应用，检查用户状态 -> 获取文章数据
    const init = async () => {
      try {
        await checkUser()
        mounted && await fetchArticleList()
      } catch (error) {
        console.error('初始化时出错:', error)
        setLoading(false)
      }
    }
    
    init();
    
    return () => {
      mounted = false
    }
  }, [])

  // 检查用户登录状态
  const checkUser = async () => {
    const response = await fetch(`/api/login/check`);
    const {data,msg} = await response.json();
    console.log('api: /login/check then',response);
    if (response.ok) {
      if(data.isLogin){
        // setUserProfile(data||null)
      }else{
        return Promise.reject(data)
      }
    } else {
      console.error('checkUser出错:',msg);
    }
  }
  
  // 获取文章数据并关联作者信息
  const fetchArticleList = async () => {
    try {
      console.log('api: get-article-list');
      const response = await fetch(`/api/admin/get-article-list?blogger=${account}`);
      const result = await response.json();
      console.log('api: /blog/get-article-list then',result,response);
      if (response.ok) {
        setArticles(result.data);
      } else {
        console.error('获取文章时出错:', result.error);
        setArticles([]);
      }
    } catch (error) {
      console.error('获取文章时出错:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className=" bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="list-box w-full h-full">
      <div className='header-box'>
        <div className='search-box'></div>
        <div className='btn-box'></div>
      </div>
      <Table<article>
        className="w-full h-full"
        rowKey="id"
        rowSelection={{ 
          type: 'checkbox', 
          getCheckboxProps: (row: article) => ({
            name: row.title,
          }),
        }}
        columns={columns}
        dataSource={articles}
      />
    </div>
  )

}