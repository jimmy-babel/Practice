'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { supabase, Post, Comment } from '@/lib/supabase'

export default function PostDetail() {
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [newComment, setNewComment] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)
  const params = useParams()
  const slug = params.slug as string

  useEffect(() => {
    fetchPost()
    checkUser()
  }, [slug])

  useEffect(() => {
    if (post?.id) {
      fetchComments()
    }
  }, [post?.id])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    
    if (user) {
      // 获取用户配置信息
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (!error && profile) {
        setUserProfile(profile)
      }
    }
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setUser(null)
      setUserProfile(null)
    }
  }

  const fetchPost = async () => {
    try {
      // 先获取文章数据
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (postError) {
        console.error('获取文章时出错:', postError)
        setLoading(false)
        return
      }

      // 获取作者配置信息
      let profileData = null
      if (postData.user_id) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', postData.user_id)
          .single()

        if (profileError) {
          console.error('获取作者信息时出错:', profileError)
        } else {
          profileData = profile
        }
      }

      // 合并数据
      const postWithProfile = {
        ...postData,
        profiles: profileData
      }

      setPost(postWithProfile)
    } catch (error) {
      console.error('获取文章时出错:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    if (!post?.id) return
    
    try {
      // 先获取评论数据
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', post.id)
        .order('created_at', { ascending: true })

      if (commentsError) {
        console.error('获取评论时出错:', commentsError)
        return
      }

      if (!commentsData || commentsData.length === 0) {
        setComments([])
        return
      }

      // 获取所有评论者的 user_id
      const userIds = [...new Set(commentsData.map(comment => comment.user_id).filter(Boolean))]
      
      // 获取用户配置信息
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', userIds)

      if (profilesError) {
        console.error('获取评论者信息时出错:', profilesError)
      }

      // 合并数据
      const commentsWithProfiles = commentsData.map(comment => ({
        ...comment,
        profiles: profilesData?.find(profile => profile.id === comment.user_id) || null
      }))

      setComments(commentsWithProfiles)
    } catch (error) {
      console.error('获取评论时出错:', error)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !post || !newComment.trim()) return

    setCommentLoading(true)

    try {
      // 插入评论
      const { data: newCommentData, error } = await supabase
        .from('comments')
        .insert({
          post_id: post.id,
          user_id: user.id,
          content: newComment.trim(),
        })
        .select('*')
        .single()

      if (error) {
        console.error('发布评论时出错:', error)
        return
      }

      // 获取当前用户的配置信息
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) {
        console.error('获取用户配置时出错:', profileError)
      }

      // 将新评论添加到列表中
      const commentWithProfile = {
        ...newCommentData,
        profiles: userProfile || null
      }

      setComments([...comments, commentWithProfile])
      setNewComment('')
    } catch (error) {
      console.error('发布评论时出错:', error)
    } finally {
      setCommentLoading(false)
    }
  }

  const formatContent = (content: string) => {
    // 简单的 Markdown 格式处理
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\n/g, '<br>')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">文章未找到</h1>
          <p className="text-gray-600 mb-6">您访问的文章可能已被删除或不存在</p>
          <Link 
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            返回首页
          </Link>
        </div>
      </div>
    )
  }

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
               {user ? (
                 // 已登录状态
                 <>
                   <Link 
                     href="/write" 
                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                   >
                     写文章
                   </Link>
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
                 </>
               ) : (
                 // 未登录状态
                 <Link 
                   href="/auth" 
                   className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                 >
                   登录
                 </Link>
               )}
             </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article */}
        <article className="bg-white rounded-lg shadow-sm p-8 mb-8">
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
                         <div className="flex items-center mb-6">
               <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                 {post.profiles?.full_name?.[0] || post.profiles?.username?.[0] || '作'}
               </div>
               <div className="ml-4">
                 <p className="text-lg font-medium text-gray-900">
                   {post.profiles?.full_name || post.profiles?.username || '作者'}
                 </p>
                <p className="text-gray-500">
                  发布于 {new Date(post.created_at).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {post.excerpt && (
              <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="text-gray-700 italic">{post.excerpt}</p>
              </div>
            )}
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />
        </article>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            评论 ({comments.length})
          </h2>

          {/* Comment Form */}
          {user ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  发表评论
                </label>
                <textarea
                  id="comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="写下你的想法..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={commentLoading || !newComment.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {commentLoading ? '发布中...' : '发布评论'}
              </button>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-gray-50 rounded-md">
              <p className="text-gray-600">
                <Link href="/auth" className="text-blue-600 hover:text-blue-800 font-medium">
                  登录
                </Link>
                {' '}后即可发表评论
              </p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">还没有评论，来发表第一个评论吧！</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium flex-shrink-0">
                      {comment.profiles?.full_name?.[0] || comment.profiles?.username?.[0] || 'U'}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center mb-2">
                        <p className="font-medium text-gray-900">
                          {comment.profiles?.full_name || comment.profiles?.username || '匿名用户'}
                        </p>
                        <p className="text-sm text-gray-500 ml-2">
                          {new Date(comment.created_at).toLocaleDateString('zh-CN')}
                        </p>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 