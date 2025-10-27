"use client"
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  SunOutlined,
  UserOutlined,
  
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import "./nav.css"
type Props = {}
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: 'userInfoEdit', icon: <UserOutlined style={{ fontSize: '18px'}}  />, label: '我的信息管理' },
  { key: 'blogEdit', icon: <ReadOutlined style={{ fontSize: '18px'}} />, label: '博客文章管理' },
  { key: 'muvieEdit', icon: <SunOutlined style={{ fontSize: '18px'}} />, label: '音画手记管理' },
];
export default function Nav(props: Props){
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div style={{ width: 180 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
}