import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  try {
    const {id, title, content, delta_data, cover_img, excerpt, published, user_id, groupsId} = await req.json();
    // let groupsIdStr = groupsId?.join(',') || "";
    if(!id || id === 0){
      const { data, error } = await supabase
        .from('articles')
        .insert({title, content,delta_data,excerpt, published, user_id, cover_img})
        .select()
      if (error) {
        return NextResponse.json({ msg: '新增文章时出错',error }, { status: 500 });
      }
      // 根据groupsId数组 更新表article_groups_relation
      const newArticle = data?.[0] || null;
      const relations = groupsId?.map((groupId:number) => ({
        article_id: newArticle?.id,
        group_id: groupId
      }));
      if(relations.length>0){
         const { error: relationError } = await supabase
          .from('article_groups_relation')
          .insert(relations);

        if (relationError) {
          // 注意：此处文章已创建但关联失败，根据业务需求可选择回滚（需额外逻辑）或提示错误
          return NextResponse.json(
            { msg: '文章新增成功，但分组关联失败', error: relationError },
            { status: 500 }
          );
        }
      }
      return NextResponse.json({ data:newArticle?.id, msg:"文章新增成功"}, { status: 200 });
    }else{
      const { data, error } = await supabase
        .from('articles')
        .update({title, content,delta_data,excerpt,published,cover_img})
        .eq('id', id)
        .select()

      
      if (error) {
        return NextResponse.json({ msg: '编辑文章时出错',error }, { status: 500 });
      }
      
      // 根据groupsId数组 更新表article_groups_relation
      const relations = groupsId?.map((groupId:number) => ({
        article_id: id,
        group_id: groupId
      }));
      if(relations.length>0){
         const { error: relationError } = await supabase
          .from('article_groups_relation')
          .insert(relations);

        if (relationError) {
          // 注意：此处文章已创建但关联失败，根据业务需求可选择回滚（需额外逻辑）或提示错误
          return NextResponse.json(
            { msg: '文章新增成功，但分组关联失败', error: relationError },
            { status: 500 }
          );
        }
      }
      return NextResponse.json({ data:data?.[0]?.id, msg:"文章编辑成功" }, { status: 200 });
    }


  } catch (error) {
    console.error('获取文章时出错:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}