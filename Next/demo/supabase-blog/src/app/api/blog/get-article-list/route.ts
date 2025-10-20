import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const {userId} = await req.json();
    // 获取文章数据
    const { data: articlesData, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (articlesError) {
      return NextResponse.json({ error: '获取文章时出错' }, { status: 500 });
    }

    if (!articlesData || articlesData.length === 0) {
      return NextResponse.json({ list: [] }, { status: 200 });
    }

    // 获取所有作者的 user_id
    // const userIds = [...new Set(articlesData.map(article => article.user_id).filter(Boolean))];

    // // 获取用户配置信息
    // const { data: profilesData, error: profilesError } = await supabase
    //   .from('profiles')
    //   .select('*')
    //   .in('id', userIds);

    // if (profilesError) {
    //   return NextResponse.json({ error: '获取用户配置时出错' }, { status: 500 });
    // }
    // // const bloggerUser = profilesData?.find(profile => profile.full_name?.toUpperCase() === blogger.toUpperCase())?.id;
    // const bloggerUser = profilesData?.find(profile => profile.id == userId);
    // // 合并数据
    // const articlesWithProfiles = articlesData.filter(fArticle => fArticle.user_id == bloggerUser.id).map(mArticle => ({
    //   ...mArticle,
    //   profiles: bloggerUser || null,
    //   bloggerUser: bloggerUser || null,
    // }));

    // return NextResponse.json({ posts: articlesWithProfiles }, { status: 200 });

    return NextResponse.json({ list:articlesData }, { status: 200 });


  } catch (error) {
    console.error('获取文章时出错:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}