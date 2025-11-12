"use client";
import { createContext, useContext, useEffect } from "react";

// 定义Context类型
type AccountContextType = {
  account: string | null;
};

// 创建Context（默认值为null）
const AccountContext = createContext<AccountContextType | undefined>(undefined);

// 提供Context的Provider组件
export function AccountProvider({
  children,
  account,
}: {
  children: React.ReactNode;
  account: string;
}) {
  // 初始化时直接同步（不依赖 useEffect）
  if (typeof window !== 'undefined') { // 避免服务端报错
    window.__NEXT_ACCOUNT__ = account;
    if (account !== localStorage.getItem('account')) {
      localStorage.setItem('account', account);
    }
  }

  // 客户端初始化时，将account存入全局变量
  useEffect(() => {
    try{
      console.log('AccountProvider',account);
      window.__NEXT_ACCOUNT__ = account;
      if (account !== localStorage.getItem('account')) {
        localStorage.setItem('account', account);
      }
    }catch(e){
      console.error('AccountProvider useEffect error',e);
    }
  }, [account]);

  return (
    <AccountContext.Provider value={{ account }}>
      {children}
    </AccountContext.Provider>
  );
}

// 自定义Hook，简化使用（强制要求在Provider内使用）
// 页面可以用React.use获取account动态传参，所以useAccount可以给非页面组件使用
export function useAccount() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context.account;
}