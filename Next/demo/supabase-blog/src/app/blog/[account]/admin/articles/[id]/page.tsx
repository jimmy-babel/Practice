'use client'
import { useRef, useState, useEffect } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {useJumpAction} from "@/lib/use-helper/base-mixin"
import {article} from '@/lib/supabase';
import type { Delta } from 'quill';

interface Props {
  params: Promise<{ account: string, id:string }>; //动态路由 [account] 对应的参数
}
interface QuillEditorRef {
  // 获取 Delta 格式内容（推荐）
  getDeltaContent: () => Delta | null;
  // 获取 HTML 格式内容
  getHtmlContent: () => string | null;
  // 获取纯文本内容
  getTextContent: () => string | null;
}
export default function ArticleEdit({params}:Props){
  const {jumpAction} = useJumpAction();
  const { account, id } = React.use(params);
  const [article, setArticle] = useState<article>({} as article)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const editorRef = useRef<QuillEditorRef>(null);
  const [QuillEditor, setQuillEditor] = useState<React.ComponentType<any> | null>(null);
  console.log('PAGE ADMIN ArticleDetail',article);
  
  const loadQuillEditor = async () => {
    const module = await import('@/components/Quill');
    setQuillEditor(module.default); // 假设组件默认导出
  };

  // 初始化
  useEffect(() => {
    let mounted = true
    const init = async ()=>{
      try {
        loadQuillEditor();
        await checkUser();
        mounted && await loadData();
      } catch (error) {
        console.error('初始化时出错:', error)
      } finally {
        setLoading(false);
      }
    }
    init();
    return () => {
      mounted = false
    }
  }, [])
  
  // 检查用户登录状态
  const checkUser = async () => {
    try {
      const response = await fetch(`/api/login/check`);
      const {data,msg} = await response.json();
      console.log('api: /login/check then',data);
      if (response.ok) {
        if(data.isLogin){
          console.log('已登录');
          setUserProfile(data);
          return
        }else{
          console.log('未登录');
        }
      } else {
        console.error('checkUser出错:', msg);
      }
      jumpAction('/blog/auth',{type:"auth"})
    }catch (error) {
      console.error('检测登陆状态出错:', error);
    }
  }

  // 加载文章
  const loadData = async () => {
    try {
      if(id == '0') return;
      console.log('api: get-article-detail');
      const response = await fetch(`/api/admin/get-article-detail?blogger=${account}&id=${id}`);
      const result = await response.json();
      console.log('api: /blog/get-article-detail then',result);
      if (response.ok) {
        let data = result.data;
        if(data){
          // let {title="",delta_data="",excerpt="",published=false} = data;
          // setTitle(title);
          // setInitialContent(delta_data);
          // setExcerpt(excerpt);
          // setPublished(published);
          setArticle(data);
        }
      } else {
        console.error('获取文章时出错:', result.error);
      }
    } catch (error) {
      console.error('获取文章时出错:', error);
    }
  };

  // 提交文章
  const handleSubmit = async (e: React.FormEvent) => {
    const deltaContent = editorRef.current?.getDeltaContent();
    const htmlContent = editorRef.current?.getHtmlContent();
    console.log('deltaContent',deltaContent);
    console.log('handleSubmit',htmlContent,);
    e.preventDefault()
    if (!userProfile?.isLogin) return
    setMessage('')
    try {
      let {title="",excerpt="",published=false} = article;  
      let params = {
        id,
        title,
        excerpt: excerpt || "",
        published,
        content:htmlContent || "",
        delta_data:deltaContent && JSON.stringify(deltaContent) || "",
        user_id: userProfile?.id,
      }
      console.log('api: admin/article-edit',params);
      // return //测试
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
        }, 500)
      }
    } catch (error) {
      setMessage(`发布失败: ${error}`)
    }
  }

  if (loading) {
    return (
      <div className=" bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className=" bg-gray-50">
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
                value={article.title||''}
                onChange={(e) => setArticle(item => ({
                  ...item,
                  title: e.target.value
                }))}
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
                value={article.excerpt||''}
                onChange={(e) => setArticle(item => ({
                  ...item,
                  excerpt: e.target.value
                }))}
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
              {/* <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={20}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入文章内容，支持 Markdown 格式"
              /> */}
              {QuillEditor?<QuillEditor ref={editorRef} initialContent={article?.delta_data||''}></QuillEditor>:null}
            </div>

            {/* 发布选项 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={article.published}
                onChange={(e) => setArticle(item => ({
                  ...item,
                  published: e.target.checked
                }))}
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
                href={`/blog/${account}/admin/articles`}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                取消
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '发布中...' : (article.published ? '发布文章' : '保存草稿')}
              </button>
            </div>
          </form>
        </div>

        {/* 写作提示 */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">写作提示</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• 文章按照富文本编辑器的内容展示</p>
            {/* <p>• 如果不填写摘要，系统会自动截取正文前 200 个字符作为摘要</p> */}
            <p>• 未发布的文章将保存为草稿，则不会公布到博客端</p>
            {/* <p>• 文章标题会自动生成 URL 友好的链接地址</p> */}
          </div>
        </div>
      </main>
    </div>
  )
} 