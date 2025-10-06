-- ===============================================
-- Supabase 博客系统数据库设置脚本
-- ===============================================
-- 请在 Supabase 控制台的 SQL 编辑器中执行此脚本

-- 1. 创建文章表
-- ===============================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug TEXT UNIQUE NOT NULL,
  published BOOLEAN DEFAULT false,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建用户配置表
-- ===============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建评论表
-- ===============================================
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 创建标签表（可选扩展功能）
-- ===============================================
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 创建文章标签关联表（可选扩展功能）
-- ===============================================
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- 6. 创建索引以提高查询性能
-- ===============================================
CREATE INDEX posts_user_id_idx ON posts(user_id);
CREATE INDEX posts_published_idx ON posts(published);
CREATE INDEX posts_created_at_idx ON posts(created_at DESC);
CREATE INDEX posts_slug_idx ON posts(slug);
CREATE INDEX comments_post_id_idx ON comments(post_id);
CREATE INDEX comments_user_id_idx ON comments(user_id);
CREATE INDEX profiles_username_idx ON profiles(username);

-- 7. 启用行级安全 (RLS)
-- ===============================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

-- 8. 创建 RLS 策略 - Posts 表
-- ===============================================

-- 公开已发布的文章可以被所有人查看
CREATE POLICY "公开文章可以被所有人查看" ON posts
  FOR SELECT USING (published = true);

-- 用户可以查看自己的所有文章（包括草稿）
CREATE POLICY "用户可以查看自己的文章" ON posts
  FOR SELECT USING (auth.uid() = user_id);

-- 登录用户可以创建文章
CREATE POLICY "用户可以创建文章" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 用户可以更新自己的文章
CREATE POLICY "用户可以更新自己的文章" ON posts
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 用户可以删除自己的文章
CREATE POLICY "用户可以删除自己的文章" ON posts
  FOR DELETE USING (auth.uid() = user_id);

-- 9. 创建 RLS 策略 - Profiles 表
-- ===============================================

-- 所有用户配置可以被查看（用于显示作者信息）
CREATE POLICY "用户配置可以被所有人查看" ON profiles
  FOR SELECT USING (true);

-- 用户只能创建自己的配置
CREATE POLICY "用户可以创建自己的配置" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 用户只能更新自己的配置
CREATE POLICY "用户可以更新自己的配置" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 用户可以删除自己的配置
CREATE POLICY "用户可以删除自己的配置" ON profiles
  FOR DELETE USING (auth.uid() = id);

-- 10. 创建 RLS 策略 - Comments 表
-- ===============================================

-- 所有评论可以被查看
CREATE POLICY "评论可以被所有人查看" ON comments
  FOR SELECT USING (true);

-- 登录用户可以创建评论
CREATE POLICY "登录用户可以创建评论" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 用户可以更新自己的评论
CREATE POLICY "用户可以更新自己的评论" ON comments
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 用户可以删除自己的评论
CREATE POLICY "用户可以删除自己的评论" ON comments
  FOR DELETE USING (auth.uid() = user_id);

-- 11. 创建 RLS 策略 - Tags 表（可选）
-- ===============================================

-- 所有标签可以被查看
CREATE POLICY "标签可以被所有人查看" ON tags
  FOR SELECT USING (true);

-- 登录用户可以创建标签
CREATE POLICY "登录用户可以创建标签" ON tags
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 12. 创建 RLS 策略 - Post_tags 表（可选）
-- ===============================================

-- 文章标签关联可以被查看
CREATE POLICY "文章标签关联可以被所有人查看" ON post_tags
  FOR SELECT USING (true);

-- 文章作者可以管理文章的标签
CREATE POLICY "文章作者可以管理标签" ON post_tags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM posts 
      WHERE posts.id = post_tags.post_id 
      AND posts.user_id = auth.uid()
    )
  );

-- 13. 创建触发器函数 - 自动更新 updated_at
-- ===============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 14. 创建触发器
-- ===============================================
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 15. 创建用户注册触发器函数
-- ===============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 16. 创建用户注册触发器
-- ===============================================
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ===============================================
-- 数据库设置完成！
-- ===============================================
-- 
-- 接下来你可以：
-- 1. 访问 http://localhost:3000 查看博客
-- 2. 注册一个新账户
-- 3. 发布你的第一篇文章
-- 4. 体验评论功能
--
-- 如果遇到问题，请检查：
-- - 环境变量是否正确设置
-- - Supabase 项目是否正常运行
-- - 网络连接是否正常 