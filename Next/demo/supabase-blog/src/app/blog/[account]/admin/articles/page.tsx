"use client"
import React from 'react';
import { useEffect, useState } from 'react'
import List from "@/app/blog/[account]/admin/articles/components/list";
import {Post,article} from '@/lib/supabase';
import {useJumpAction,useCheckUser} from "@/lib/use-helper/base-mixin"
import type { TableColumnsType, TableProps } from 'antd';
import Image from 'next/image';
import { Table,Switch,Button } from 'antd';
import SearchBox from "@/components/SearchBox";
interface Props {
  params: Promise<{ account: string }>; //动态路由 [account] 对应的参数
}
export default function Articles({params}:Props){
  
  const { account } = React.use(params);
  const [articles, setArticles] = useState<article[]>([] as article[])
  const [loading, setLoading] = useState(true)
  const {jumpAction} = useJumpAction();
  const {checkUser} = useCheckUser({loginJump:true});
  const [searchText,setSearchText] = useState<string>("");
  console.log('PAGE ADMIN Articles',account,articles,searchText);
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  const columns: TableColumnsType<article> = [
    {
      title: '封面',
      key: 'id',
      render: (row: article) => <div><Image className='w-[110px] h-[110px]' src={row.cover_img||''} alt="USER" objectFit="contain" width={110} height={110} /></div>,
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
      key:'published',
      align:'center',
      render:(row: article)=><Switch checkedChildren="开" unCheckedChildren="关" checked={!!row.published} onChange={onChange} />
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
      align:'center',
      render: (row: article) => <div className='flex justify-center items-center'><Button style={{marginLeft:0}} size="small" type="primary" onClick={()=>jumpAction(`admin/articles/${row.id}`)}>编辑</Button></div>,
    },
  ];

  // const [userProfile, setUserProfile] = useState<any>(null)
  console.log('PAGE ADMIN Articles',account);
  
  useEffect(() => {
    let mounted = true

    // 初始化应用，检查用户状态 -> 获取文章数据
    const init = async () => {
      try {
        const res = await checkUser();
        console.log('checkuser then',res);
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
  // const checkUser = async () => {
  //   const response = await fetch(`/api/login/check`);
  //   const {data,msg} = await response.json();
  //   console.log('api: /login/check then',response);
  //   if (response.ok) {
  //     if(data.isLogin){
  //       // setUserProfile(data||null)
  //     }else{
  //       return Promise.reject(data)
  //     }
  //   } else {
  //     console.error('checkUser出错:',msg);
  //   }
  // }
  
  // 获取文章数据并关联作者信息
  const fetchArticleList = async () => {
    try {
      console.log('api: get-article-list',searchText);
      const response = await fetch(`/api/admin/get-article-list?blogger=${account}&search=${searchText}`);
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
      <div className='header-box flex justify-between items-center p-3'>
        <div className='search-box'>
          <SearchBox searchText={searchText} setSearchText={setSearchText} onSearch={fetchArticleList} />
        </div>
        <div className='btn-box'>
          <Button type='primary' onClick={()=>jumpAction(`admin/articles/0`)}>添加文章</Button>
        </div>
      </div>
      <Table<article>
        className=""
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