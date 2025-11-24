"use client"
import { ThemeProvider } from "next-themes";
import React from 'react'
type Props = {
  children: React.ReactNode;
};
const ThemeProviderCmpt = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      storageKey="my-app-theme"
      enableSystem={true}
      enableColorScheme={false} // 禁用自动添加 color-scheme 样式（避免服务端无此样式）
      // disableTransitionOnChange={true} // 切换时禁用过渡（减少水合闪烁）
    > 
      {children}
    </ThemeProvider>
  )
}

export default ThemeProviderCmpt;