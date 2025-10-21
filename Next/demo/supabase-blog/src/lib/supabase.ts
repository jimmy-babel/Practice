import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 类型定义
export interface Post {
  id: string
  title: string
  content: string
  excerpt?: string
  // slug: string
  published: boolean
  user_id: string
  created_at: string
  updated_at: string
  // profiles?: {
  //   username: string
  //   full_name: string
  //   avatar_url?: string
  // }
}

export interface article {
  id: string
  title: string
  content: string
  excerpt?: string
  slug: string
  published: boolean
  user_id: string
  created_at: string
  updated_at: string
  profiles?: {
    username: string
    full_name: string
    avatar_url?: string
  }
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