"use client"
import React from 'react';
import { useEffect, useState } from 'react'
import {Post,article} from '@/lib/supabase';
import {useJumpAction,useCheckUser} from "@/lib/use-helper/base-mixin"
import type { TableColumnsType, TableProps } from 'antd';
import Image from 'next/image';
import { Table,Switch,Button } from 'antd';
import SearchBox from "@/components/SearchBox";
type Props = {
  params: Promise<{ account: string }>; //动态路由 [account] 对应的参数
}
export default function Articles({params}:Props){
  const {account} = React.use(params);
  const [articles, setArticles] = useState<article[]>([] as article[])
  const [loading, setLoading] = useState(true)
  const {jumpAction} = useJumpAction();
  const {checkUser} = useCheckUser({loginJump:true});
  const [searchText,setSearchText] = useState<string>("");
  console.log('PAGE ADMIN Articles',account,articles,searchText);
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  // 自定义Cloudinary Loader
  const cloudinaryLoader = ({ src="", width=110, quality=100 }:{src:string,width:number,quality?:number}) => {
    
    // 提取Cloudinary图片的public_id（即路径中最后的文件名部分）
    const publicId = src.split('/').pop();
    // 拼接Cloudinary支持的变换参数（路径格式）
    const transformations = ['f_auto', `w_${width}`, `q_${quality}`].join(',');
    // 生成最终URL
    return `https://res.cloudinary.com/dhfjn2vxf/image/upload/${transformations}/${publicId}`;
  };

  const columns: TableColumnsType<article> = [
    {
      title: '封面',
      key: 'id',
      render: (row: article) => <div><Image loader={cloudinaryLoader} src={row.cover_img||''} alt="COVER" width={110} height={110} className='object-contain'/></div>,
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
  console.log('PAGE ADMIN Articles',account);

  // 查询登录状态+拿文章列表数据
  useEffect(() => {
    let mounted = true
    const init = async () => {
      try {
        const res = await checkUser();
        if(!mounted)return;
        console.log('checkuser then',res);
        await fetchArticleList()
      } catch (error) {
        console.error('初始化时出错:', error)
      } finally {
        setLoading(false)
      }
    }
    init();
    return () => {
      mounted = false
    }
  }, [])
  
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