import React, { useEffect, useState } from 'react'
import {Post} from '@/lib/supabase';
import Link from 'next/link'
type Props = {
  listData: Array<Post>,
  bloggerData:{
    full_name:string,
    username:string,
  }
}

const List = (props: Props) => {
  const {listData,bloggerData} = props;
  const [account,setAccount] = useState<string|null>(null);
  useEffect(()=>{
    setAccount(localStorage.getItem('account'));
    console.log('CMPT List',account,localStorage.getItem('account'));
  },[])
  return (
    <div className='blog-list-box flex-1'>
      {listData.map((item,index) => (
        <article key={item.id} className="mb-5 bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              {bloggerData?.full_name || ''}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {bloggerData?.username || ''}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(item.created_at).toLocaleDateString('zh-CN')}
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            <Link href={`/post/${item.id}`} className="hover:text-blue-600">
              {item.title}
            </Link>
          </h3>
          
          {item.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {item.excerpt}
            </p>
          )}
          
          <Link 
            href={`/blog/${account}/articles/${item.id||0}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            查看详情 →
          </Link>
        </article>
      ))}
    </div>
  );
};

export default List;