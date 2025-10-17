import React from 'react'
import {Post} from '@/lib/supabase';
import Link from 'next/link'
type Props = {
  listData: Array<Post>
}

const List = (props: Props) => {
  const {listData} = props;
  return (
    // <div>
    //   {props.listData.map(item => (
    //     <div key={item.id}>{item.title||"测试"}</div>
    //   ))}
    // </div>
    
    <div className='blog-list-box flex-1'>
      {listData.map((post,index) => (
        <article key={post.id} className="mb-5 bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              {post.profiles?.full_name?.[0] || post.profiles?.username?.[0] || '作'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {post.profiles?.full_name || post.profiles?.username || '作者'}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString('zh-CN')}
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            <Link href={`/post/${post.slug}`} className="hover:text-blue-600">
              {post.title}
            </Link>
          </h3>
          
          {post.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}
          
          <Link 
            href={`/post/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            阅读更多 →
          </Link>
        </article>
      ))}
    </div>
  );
};

export default List;