import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url); //GET请求获取URL
    const blogger = url.searchParams.get('blogger'); // GET获取查询参数中的blogger
    const userId = url.searchParams.get('userId');
    const id = url.searchParams.get('id'); // GET获取查询参数中的id

    // 检查 blogger 是否存在（避免后续调用 toUpperCase/toLowerCase 时报错）
    // if (!blogger || !id) {
    //   return NextResponse.json({ error: '缺少传参' }, { status: 400 });
    // }
    
    // 获取博主信息
    // const { data: bloggerData, error: bloggerError } = await supabase
    //   .from('profiles')
    //   .select('*')
    //   .or(`full_name.eq.${blogger.toUpperCase()},full_name.eq.${blogger.toLowerCase()}`)
    //   .single()

    // if (bloggerError) {
    //   return NextResponse.json({ msg: '获取博主信息出错', error:bloggerError }, { status: 500 });
    // }

    // const { avatar_url,full_name,username }=bloggerData;

    // 获取生活手记数据
    const { data: lifeStylesData, error: lifeStylesError } = await supabase
      .from('life_styles')
      .select('*,photos:life_styles_photos(id,url,excerpt,sort,created_at)')
      .eq('id',id)
      .eq('user_id', userId)
      .single()

    // 等价于:
    // SELECT 
    //   life_styles.id,
    //   life_styles.title,
    //   life_styles.excerpt,
    //   -- 其他主表字段...
    //   (
    //     SELECT json_agg(json_build_object(
    //       'id', life_styles_photos.id,
    //       'photo_url', life_styles_photos.photo_url,
    //       'caption', life_styles_photos.caption,
    //       'is_cover', life_styles_photos.is_cover,
    //       'sort_order', life_styles_photos.sort_order
    //     )) 
    //     FROM life_styles_photos 
    //     WHERE life_styles_photos.life_styles_id = life_styles.id  -- 自动添加的关联条件
    //   ) AS photos
    // FROM life_styles
    // WHERE life_styles.id = id
    if (lifeStylesError) {
      return NextResponse.json({ msg: '获取生活手记详情时出错', error:lifeStylesError }, { status: 500 });
    }

    if (!lifeStylesData) {
      return NextResponse.json({ data: null }, { status: 200 });
    }

    // 获取分组关系
    // const { data: articleGroupsRelationData, error: articleGroupsRelationError } = await supabase
    //   .from('article_groups_relation')
    //   .select('group_id')
    //   .eq('article_id',id)
    // if (articleGroupsRelationError) {
    //   return NextResponse.json({ msg: '获取分组关系出错', error:articleGroupsRelationError }, { status: 500 });
    // }
    // let groupsId = articleGroupsRelationData.map(item=>item.group_id)
    // return NextResponse.json({ data:{...lifeStylesData,groupsId} }, { status: 200 });

    return NextResponse.json({ data:{...lifeStylesData} }, { status: 200 });

  } catch (error) {
    console.error('获取生活手记详情时出错:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}