'use client'
import { useState, useEffect } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
interface Props {
  params: Promise<{ account: string, id:string }>; //动态路由 [account] 对应的参数
}
export default function ArticleEdit({params}:Props){
  const { account, id } = React.use(params);
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(false)
  // const [login, setLogin] = useState<any>(null)
  // const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [message, setMessage] = useState('')
  const router = useRouter()
  console.log('PAGE ADMIN ArticleEdit',account,id,title,excerpt,published,userProfile,message,content);

  useEffect(() => {
    checkUser()
  }, [])
  
  // 检查用户登录状态
  const checkUser = async () => {
    const response = await fetch(`/api/login/check`);
    const {data,msg} = await response.json();
    console.log('api: /login/check then',data);
    if (response.ok) {
      if(!data.isLogin){
        console.log('未登录');
        router.push('/blog/auth');
      }else{
        console.log('已登录');
        setUserProfile(data);
      }
    } else {
      console.error('checkUser出错:', msg);
      router.push('/blog/auth')
    }
  }

  // 文章标题生成 slug
  // const generateSlug = (title: string) => {
  //   return title
  //     .toLowerCase()
  //     .replace(/[^\w\s-]/g, '') // 移除特殊字符
  //     .replace(/\s+/g, '-') // 空格替换为横线
  //     .trim()
  // }

  // 提交文章
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userProfile?.isLogin) return

    setLoading(true)
    setMessage('')

    try {
      // const slug = generateSlug(title)
      
      // console.log('supabase select from posts',slug);
      // // 检查 slug 是否已存在
      // const { data: existingPost } = await supabase
      //   .from('posts')
      //   .select('id')
      //   .eq('slug', slug)
      //   .single()

      // console.log('supabase select from posts then',existingPost);
      // if (existingPost) {
      //   setMessage('文章标题已存在，请使用不同的标题')
      //   setLoading(false)
      //   return
      // }
      // let insertParams = {
      //   title,
      //   content,
      //   excerpt: excerpt || content.substring(0, 200),
      //   slug,
      //   published,
      //   user_id: user.id,
      // }
      // console.log('supabase insert posts',insertParams);
      // const { data, error } = await supabase
      //   .from('posts')
      //   .insert(insertParams)
      //   .select()
      // console.log('supabase insert posts then',data,error);
      // if (error) {
      //   setMessage(`发布失败: ${error.message}`)
      // } else {
      //   setMessage('文章发布成功！')
      //   setTimeout(() => {
      //     router.push(`/blog/${account}/admin/articles`)
      //   }, 1500)
      // }
      let params = {
        id,
        title,
        content,
        excerpt: excerpt || content.substring(0, 200),
        published,
        user_id: userProfile?.id,
      }
      console.log('api: admin/article-edit',params);
      const response = await fetch(`/api/admin/article-edit`, {
        body:JSON.stringify(params),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const {data,msg,error} = await response.json();
      console.log('api: admin/article-edit then',data,msg,error);
      setMessage(msg);
      if(data>0){
        setTimeout(() => {
          router.push(`/blog/${account}/admin/articles`)
        }, 1500)
      }
    } catch (error) {
      setMessage(`发布失败: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  // 等待检查登录状态
  if (!userProfile?.isLogin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">检查登录状态...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
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