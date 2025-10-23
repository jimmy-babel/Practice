import { createServerClient,CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      // { cookies: { get: (name) => cookieStore.get(name)?.value } }
      {
          cookies: {
          // 读取Cookie：严格返回string或undefined
          get: (name: string) => {
            const cookie = cookieStore.get(name);
            return cookie ? cookie.value : undefined;
          },
          // 设置Cookie：严格接收name、value、options
          set: (name: string, value: string, options: CookieOptions) => {
            cookieStore.set({ name, value, ...options });
          },
          // 删除Cookie：严格接收name和options
          remove: (name: string, options: CookieOptions) => {
            cookieStore.delete({ name, ...options });
          },
        },
        cookieEncoding: 'raw', // 显式指定编码方式（推荐raw，避免默认base64url的潜在问题）
      }
    );



    const { data, error: userError } = await supabase.auth.getUser();
    if(userError){
      return NextResponse.json({ msg: 'auth.getUser出错',error:userError }, { status: 500 });
    }
    // console.log('getUser 返回数据:', data, '错误:', userError);
    // console.log('Cookies:', cookieStore.getAll()); // 打印所有 cookies 以便调试
    let user = data?.user;
    if (user) {
      // 获取用户配置信息
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('full_name, username, avatar_url, id')
        .eq('id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return NextResponse.json(
            { data: { isLogin: true, full_name: null, username: null, avatar_url: null } },
            { status: 200 }
          );
        } else {
          return NextResponse.json({ msg: '获取用户信息出错', error }, { status: 500 });
        }
      }

      return NextResponse.json({ data: { ...profile, isLogin: true } }, { status: 200 });
    } else {
      return NextResponse.json({ data: { isLogin: false } }, { status: 200 });
    }
  } catch (error) {
    console.error('服务器内部错误:', error);
    return NextResponse.json({ msg: '服务器内部错误',error }, { status: 500 });
  }
}