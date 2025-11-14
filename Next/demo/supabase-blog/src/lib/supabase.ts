// 替换引入：使用@supabase/ssr的createBrowserClient（浏览器环境专用）
import { createBrowserClient } from '@supabase/ssr';
// 保留类型定义

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 初始化客户端：使用createBrowserClient，自动处理浏览器Cookie（包括auth-token和refresh-token）
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// 类型定义保持不变（无需修改）
// export interface Post {
//   id: string
//   title: string
//   content: string
//   excerpt?: string
//   cover_img?:string,
//   published: boolean
//   user_id: string
//   created_at: string
//   updated_at: string
// }

export interface article {
  id: number
  title: string
  content: string
  delta_data: string
  excerpt?: string
  cover_img?:string
  published: boolean
  user_id: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  username?: string
  full_name?: string
  avatar_url?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  profiles?: {
    username: string
    full_name: string
    avatar_url?: string
  }
}

export interface article_groups_relation {
  group_id: number,
  article_id:number
}