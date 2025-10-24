'use client'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import HeaderContent from '@/components/header-content';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('');
  const [account, setAccount] = useState("");
  const [inited, setInited] = useState(false);
  const router = useRouter()
  useEffect(() => {
    setAccount(localStorage.getItem('account') || "");
    setInited(true);
  },[])
  console.log('PAGE Auth',isLogin,account,email,fullName,password,message);

  // 处理登录或注册
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isLogin) {
        console.log('登录');
        console.log('supabase.auth.signInWithPassword',email,password);
        const { data,error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        console.log('supabase.auth.signInWithPassword then:',data,error?.message);
        if (error) {
          setMessage(`登录失败: ${error.message}`)
        } else {
          setMessage('登录成功！');
          console.log('登录成功',data,data?.session);
          router.push(`/blog/${account}`)
        }
      } else {
        console.log('注册');
        console.log('supabase.auth.signUp',email,password);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        console.log('supabase.auth.signUp then',data,error?.message);
        if (error) {
          setMessage(`注册失败: ${error.message}`)
        } else if (data.user) {
          console.log('注册成功 创建用户配置');
          let insertParams = {
            id: data.user.id,
            full_name: fullName, //用户填写的name
            username: email.split('@')[0], // 使用邮箱前缀作为用户名
          };
          console.log('supabase insert profiles',insertParams);
          // 创建用户配置
          const { error: profileError } = await supabase
            .from('profiles')
            .insert(insertParams)
          
          console.log('supabase insert profiles then:',profileError);
          if (profileError) {
            console.error('创建用户配置失败:', profileError)
          }
          
          setMessage('注册成功！请前往邮箱验证链接点击后再次登录')

        }
      }
    } catch (error) {
      setMessage(`操作失败: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  //处理 GitHub 登录
  // const handleGitHubLogin = async () => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: 'github',
  //     options: {
  //       redirectTo: 'http://localhost:3000/blog/auth' // 授权后最终跳转的页面
  //     }
  //   });
  //   if (error) console.error('GitHub 登录失败:', error);
  // };

  const imgBg = '/blog-bg.webp';
  
  return (
    <>
      <HeaderContent imgBg={imgBg}></HeaderContent>
      {
        inited && !account ? <div className='h-[50vh] flex justify-center items-center'>博客页面已丢失，请输入正确的博客路径</div> :
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                {isLogin ? '登录账户' : '创建账户'}
              </h2>
              <p className={`mt-2 text-sm text-gray-600`}>
                <span className={`${isLogin?'pr-[-5px]':''}`}>
                  {isLogin ? '还没有账户? 点击' : '我已有账户 '}{' '}
                </span>
                <button
                  type="button"
                  onClick={() => {setIsLogin(!isLogin);setMessage('')}}
                  className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                >
                  {isLogin ? '立即注册' : '立即登录'}
                </button>
              </p>
            </div>
          </div>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleAuth}>
                {!isLogin && (
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      姓名
                    </label>
                    <div className="mt-1">
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required={!isLogin}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="请输入您的姓名"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    邮箱地址
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="请输入邮箱地址"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    密码
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="请输入密码"
                      minLength={6}
                    />
                  </div>
                </div>

                {message && (
                  <div className={`p-3 rounded-md text-sm ${
                    message.includes('成功') 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {message}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? '处理中...' : (isLogin ? '登录' : '注册')}
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">或者</span>
                  </div>
                </div>

                {/* <div className='mt-6'>
                  <button className='cursor-pointer w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50' onClick={handleGitHubLogin}>用 GitHub 登录</button>
                </div> */}
                <div className="mt-6">
                  <Link
                    href={`/blog/${account}`}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    返回首页
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
} 