import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try { 
      const { data } = await supabase.auth.getUser()
      let user = data?.user;
      // console.log('supabase.auth.getUser then',user,data);
      if (user) {
        // console.log('已登录',user);
        // 获取用户配置信息
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('full_name, username, avatar_url')
          .eq('id', user.id)
          .single();
        if(error){
          if (error.code === 'PGRST116') {
            return NextResponse.json(
              { data: { isLogin: true, full_name: null, username: null, avatar_url: null } }, { status: 200 }
            );
          } else {
            // 其他错误 返回 500
            return NextResponse.json({ error: '获取用户信息出错' }, { status: 500 });
          }
        }
        // console.log('supabase select from profiles then',profile,error);
        return NextResponse.json({ data: { ...profile,isLogin:true } }, { status: 200 });
      } else {
        // console.log('未登录',data);
        return NextResponse.json({ data: { isLogin:false } }, { status: 200 });
      }

  } catch (error) {
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}