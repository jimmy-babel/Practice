'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function Write() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    // const { data: { user } } = await supabase.auth.getUser()
    // if (!user) {
    //   router.push('/auth')
    // } else {
    //   setUser(user)
      
    //   // 获取用户配置信息
    //   const { data: profile, error } = await supabase
    //     .from('profiles')
    //     .select('*')
    //     .eq('id', user.id)
    //     .single()
      
    //   if (!error && profile) {
    //     setUserProfile(profile)
    //   }
    // }
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/')
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // 移除特殊字符
      .replace(/\s+/g, '-') // 空格替换为横线
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setMessage('')

    try {
      const slug = generateSlug(title)
      
      // 检查 slug 是否已存在
      const { data: existingPost } = await supabase
        .from('posts')
        .select('id')
        .eq('slug', slug)
        .single()

      if (existingPost) {
        setMessage('文章标题已存在，请使用不同的标题')
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('posts')
        .insert({
          title,
          content,
          excerpt: excerpt || content.substring(0, 200),
          slug,
          published,
          user_id: user.id,
        })
        .select()

      if (error) {
        setMessage(`发布失败: ${error.message}`)
      } else {
        setMessage('文章发布成功！')
        setTimeout(() => {
          router.push('/')
        }, 1500)
      }
    } catch (error) {
      setMessage(`发布失败: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  // if (!user) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  //         <p className="mt-4 text-gray-600">检查登录状态...</p>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-3xl font-bold text-gray-900 hover:text-blue-600">
                我的博客
              </Link>
            </div>
            <nav className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                返回首页
              </Link>
              {user && (
                <div className="flex items-center space-x-3">
                  {/* 用户头像 */}
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    {userProfile?.full_name?.[0] || userProfile?.username?.[0] || user?.email?.[0] || 'U'}
                  </div>
                  {/* 用户名 */}
                  <span className="text-sm text-gray-700">
                    {userProfile?.full_name || userProfile?.username || user?.email}
                  </span>
                  {/* 登出按钮 */}
                  <button
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    登出
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">写文章</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 标题 */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                文章标题
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入文章标题"
              />
            </div>

            {/* 摘要 */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                文章摘要 (可选)
              </label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入文章摘要，如果留空将自动从正文生成"
              />
            </div>

            {/* 正文 */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                文章内容
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={20}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入文章内容，支持 Markdown 格式"
              />
            </div>

            {/* 发布选项 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                立即发布（取消勾选将保存为草稿）
              </label>
            </div>

            {/* 消息提示 */}
            {message && (
              <div className={`p-3 rounded-md text-sm ${
                message.includes('成功') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* 按钮组 */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                取消
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '发布中...' : (published ? '发布文章' : '保存草稿')}
              </button>
            </div>
          </form>
        </div>

        {/* 写作提示 */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">写作提示</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• 文章支持 Markdown 格式，你可以使用 **粗体**、*斜体*、`代码` 等格式</p>
            <p>• 如果不填写摘要，系统会自动截取正文前 200 个字符作为摘要</p>
            <p>• 未发布的文章将保存为草稿，只有你能看到</p>
            <p>• 文章标题会自动生成 URL 友好的链接地址</p>
          </div>
        </div>
      </main>
    </div>
  )
} 