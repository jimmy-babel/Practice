// import React, { useEffect, useState } from 'react'
// import {Post} from '@/lib/supabase';
// import Link from 'next/link'
// type Props = {
//   listData: Array<Post>,
//   bloggerData:{
//     full_name:string,
//     username:string,
//   }
// }

// const List = (props: Props) => {
//   const {listData,bloggerData} = props;
//   console.log('CMPT LIST',listData,bloggerData);
//   return (
//     <div className='blog-list-box flex-1'>
//       {listData.map((item,index) => (
//         <article key={item.id} className="mb-5 bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
//           <div className="flex items-center mb-4">
//             <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
//               {bloggerData?.full_name || ''}
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium text-gray-900">
//                 {bloggerData?.username || ''}
//               </p>
//               <p className="text-sm text-gray-500">
//                 {new Date(item.created_at).toLocaleDateString('zh-CN')}
//               </p>
//             </div>
//           </div>
          
//           <h3 className="text-xl font-semibold text-gray-900 mb-3">
//             <Link href={`/post/${item.id}`} className="hover:text-blue-600">
//               {item.title}
//             </Link>
//           </h3>
          
//           {item.excerpt && (
//             <p className="text-gray-600 mb-4 line-clamp-3">
//               {item.excerpt}
//             </p>
//           )}
          
//           {/* <Link 
//             href={`/blog/${account}/web/articles/${item.id||0}`}
//             className="text-blue-600 hover:text-blue-800 font-medium"
//           >
//             查看详情 →
//           </Link> */}
//         </article>
//       ))}
//     </div>
//   );
// };

// export default List;



import React from 'react'
import {article} from '@/lib/supabase';
import {useJumpAction} from "@/lib/use-helper/base-mixin"

type Props = {
  listData: Array<article>,
}
const List = (props: Props) => {
  const {listData} = props;
  const {jumpAction} = useJumpAction();
  return (
    <div className='w-full anim-op-y'>
      {listData.map(item =>(
        <div onClick={()=>jumpAction(`web/articles/${item.id}`)} key={item.id} className='pt-7 pb-7 anim-hover-x cursor-pointer anim-hover-a border-b border-b-[rgba(127,127,127,0.1)]'>
          <div className='text-xl font-bold'>{item.title}</div>
          <div className='pt-4 pb-4 text-gray-400'>{item.excerpt||""}</div>
          <div className='flex text-gray-400'>
            <div>#技术学习</div>
            <div className='pl-4'>{item.created_at}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default List