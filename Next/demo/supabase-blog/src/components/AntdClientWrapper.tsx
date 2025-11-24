//AntdClientWrapper.tsx
"use client"; // 客户端标识，处理Antd的客户端渲染逻辑

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "@ant-design/v5-patch-for-react-19";
import React from "react";
// 主题配置（可在服务端定义后传递，这里简化直接写在客户端）
const customTheme = {
  token: {
    // borderRadiusLG: 12
  },
  components: {
    Menu: {
      fontSize: 16,
    },
    Card: {
      bodyPadding: 0,
      borderRadius: 0,
    },
  },
};

type Props = {
  children: React.ReactNode;
};

// 客户端组件：专门处理Antd的Registry和ConfigProvider（依赖客户端环境）
export default function AntdClientWrapper({ children }: Props) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={customTheme}>
          {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
