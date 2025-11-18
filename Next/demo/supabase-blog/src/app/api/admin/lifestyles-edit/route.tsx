import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  try {
    const {id, title, cover_img, photos, excerpt, published, user_id, labelIds} = await req.json();
    console.log('photos',photos);
    console.log('labelIds',labelIds);
    let [relationsIds, sub_relationsIds] = [[] as number[],[] as number[]];
    labelIds.forEach((item:any,index:number)=>{
      if(Array.isArray(item)){ //多选
        item.forEach((cItem,cIndex)=>{
        if(cIndex == 0){
          relationsIds.push(Number(cItem));
        }else if(cIndex == 1){
          sub_relationsIds.push(Number(cItem));
        }
        })
      }else{ //单选
        if(index == 0){
          relationsIds.push(Number(item));
        }else if(index == 1){
          sub_relationsIds.push(Number(item));
        }
      }
    })
    // 根据labelIds数组 更新表 life_styles_to_label life_styles_to_sub_label
    // let [relationsIds, sub_relationsIds] = [labelIds[0],labelIds[1]]

    const relations = relationsIds.map((groupId:number) => ({
      life_styles_id: id,
      group_id: groupId
    }));
    const sub_relations = sub_relationsIds.map((groupId:number) => ({
      life_styles_id: id,
      sub_label_id: groupId
    }));
    console.log('relations',relations);
    console.log('sub_relations',sub_relations);
    return NextResponse.json({ msg: '新增生活手记时出错' }, { status: 500 }); 
    if(!id || id === 0){
      const { data, error } = await supabase
        .from('life_styles')
        .insert({title, cover_img, excerpt, published, user_id})
        .select()
      if (error) {
        return NextResponse.json({ msg: '新增生活手记时出错',error }, { status: 500 });
      }
      // 根据labelIds数组 更新表 life_styles_to_label life_styles_to_sub_label
      const newArticle = data?.[0] || null;
      if(relations.length>0){
         const { error: relationError } = await supabase
          .from('life_styles_to_label')
          .insert(relations);

        if (relationError) {
          // 注意：此处生活手记已创建但关联失败，根据业务需求可选择回滚（需额外逻辑）或提示错误
          return NextResponse.json(
            { msg: '生活手记新增成功，但分组关联失败', error: relationError },
            { status: 500 }
          );
        }
      }
      if(sub_relations.length>0){
         const { error: relationError } = await supabase
          .from('life_styles_to_sub_label')
          .insert(sub_relations);

        if (relationError) {
          // 注意：此处生活手记已创建但关联失败，根据业务需求可选择回滚（需额外逻辑）或提示错误
          return NextResponse.json(
            { msg: '生活手记新增成功，但分组关联失败', error: relationError },
            { status: 500 }
          );
        }
      }

      return NextResponse.json({ data:newArticle?.id, msg:"生活手记新增成功"}, { status: 200 });
    }else{
      const { data, error } = await supabase
        .from('life_styles')
        .update({title, cover_img, excerpt, published})
        .eq('id', id)
        .select()

      
      if (error) {
        return NextResponse.json({ msg: '编辑生活手记时出错',error }, { status: 500 });
      }


      // 先彻底删除该生活手记的所有旧关联（关键：避免新旧关联冲突）
      const { error: deleteError } = await supabase
        .from('life_styles_to_label')
        .delete()
        .eq('life_styles_id', id);

      if (deleteError) {
        return NextResponse.json(
          { msg: '删除旧分组关联失败', error: deleteError },
          { status: 500 }
        );
      }

      if(relations.length>0){
         const { error: relationError } = await supabase
          .from('life_styles_to_label')
          .insert(relations);

        if (relationError) {
          // 注意：此处生活手记已创建但关联失败，根据业务需求可选择回滚（需额外逻辑）或提示错误
          return NextResponse.json(
            { msg: '生活手记新增成功，但分组关联失败', error: relationError },
            { status: 500 }
          );
        }
      }
      if(sub_relations.length>0){
         const { error: relationError } = await supabase
          .from('life_styles_to_sub_label')
          .insert(sub_relations);

        if (relationError) {
          // 注意：此处生活手记已创建但关联失败，根据业务需求可选择回滚（需额外逻辑）或提示错误
          return NextResponse.json(
            { msg: '生活手记新增成功，但分组关联失败', error: relationError },
            { status: 500 }
          );
        }
      }

      return NextResponse.json({ data:data?.[0]?.id, msg:"生活手记编辑成功" }, { status: 200 });
    }


  } catch (error) {
    console.error('获取生活手记时出错:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}