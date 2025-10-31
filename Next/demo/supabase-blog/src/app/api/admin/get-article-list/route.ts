import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url); //GET请求获取URL
    const blogger = url.searchParams.get('blogger'); // GET获取查询参数中的blogger

    // 检查 blogger 是否存在（避免后续调用 toUpperCase/toLowerCase 时报错）
    if (!blogger) {
      return NextResponse.json({ error: '缺少 blogger 参数' }, { status: 400 });
    }
    
    // 获取博主信息
    const { data: bloggerData, error: bloggerError } = await supabase
      .from('profiles')
      .select('*')
      .or(`full_name.eq.${blogger.toUpperCase()},full_name.eq.${blogger.toLowerCase()}`)
      .single()

    if (bloggerError) {
      return NextResponse.json({ msg: '获取博主信息出错', error:bloggerError }, { status: 500 });
    }

    const { avatar_url,full_name,username }=bloggerData;

    // 获取文章数据
    // console.log('supabase select from articles');
    const { data: articlesData, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      // .eq('published', true)
      .eq('user_id', bloggerData?.id)
      .order('created_at', { ascending: false });

    // console.log('supabase select from articles then:',articlesData,articlesError);
    if (articlesError) {
      return NextResponse.json({ msg: '获取文章时出错', error:articlesError }, { status: 500 });
    }

    if (!articlesData || articlesData.length === 0) {
      return NextResponse.json({ data: [], bloggerData:{avatar_url,full_name,username} }, { status: 200 });
    }

    return NextResponse.json({ data:articlesData,bloggerData:{avatar_url,full_name,username} }, { status: 200 });

  } catch (error) {
    console.error('获取文章时出错:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}