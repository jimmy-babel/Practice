import React from "react";
import Link from 'next/link';
import Image from 'next/image';

type Props = {};

const nav = (props: Props) => {
  // 1.首页、2.博主博客笔记、3.生活、4.音画手记、5.问AI、6.留言、7.登录、8.后台管理
  const navList = [
    { name: "首页", url: "/" },
    { name: "博客笔记", url: "/article" },
    { name: "生活定格", url: "/life" },
    { name: "音画手记", url: "/muvie" },
    { name: "问AI", url: "/askai" },
    { name: "留言", url: "/message" },
    { name: "登录", url: "/auth" },
    { name: "后台管理", url: "/admin" },
  ];
  return (
    <div className="flex justify-between items-center relative">
      <div>JIMMY BLOG</div>
      <div className="flex-1 flex items-center justify-end">
        {navList.map((item, index) => (
          <div key={index} className="px-2 flex items-center">
            <Link href={item.url}>{item.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default nav;
