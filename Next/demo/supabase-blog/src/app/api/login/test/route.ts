import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // 等待 cookies() 的结果
    const resolvedCookies = await cookies();

    // 创建服务端 Supabase 客户端
    const supabase = createServerComponentClient({
      cookies: () => Promise.resolve(resolvedCookies),
    });

    const { data } = await supabase.auth.getUser();
    console.log('看看getUser', data);
    let user = data?.user;

    if (user) {
      // 获取用户配置信息
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('full_name, username, avatar_url')
        .eq('id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return NextResponse.json(
            { data: { isLogin: true, full_name: null, username: null, avatar_url: null } },
            { status: 200 }
          );
        } else {
          return NextResponse.json({ error: '获取用户信息出错' }, { status: 500 });
        }
      }

      return NextResponse.json({ data: { ...profile, isLogin: true } }, { status: 200 });
    } else {
      return NextResponse.json({ data: { isLogin: false } }, { status: 200 });
    }
  } catch (error) {
    console.error('服务器内部错误:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}