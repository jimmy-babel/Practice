// app/components/ServerNav.tsx
import ClientNav from '@/components/nav';

// 静态导航列表（服务端预定义，无需客户端计算）
const staticNavList = [
  { name: "首页", url: `web` },
  { name: "博客记录", url: `web/articles` },
  { name: "生活定格", url: `web/life` },
  { name: "音画手记", url: `web/muvie` },
  { name: "问AI", url: `web/askai` },
  { name: "留言", url: `web/message` },
  { name: "登录", url: `/blog/auth`, type: "from" },
  { name: "后台管理", url: `admin` },
];

type Props = {
  isPlace?: boolean;
  account?: string;
};

// 服务端组件：只处理静态内容，传递给客户端组件
export default function ServerNav({ isPlace, account }: Props) {
  return (
    // 外层容器由服务端渲染，提升首屏结构完整性
    <nav>
      {/* 客户端组件接收静态navList和props，处理动态逻辑 */}
      <ClientNav 
        navList={staticNavList} 
        isPlace={isPlace} 
        account={account} 
      />
    </nav>
  );
}