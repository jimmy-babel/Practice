import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const {id, title, content, delta_data, cover_img, excerpt, published, user_id} = await req.json();
    if(id==0){
      const { data, error } = await supabase
        .from('articles')
        .insert({title, content,delta_data,excerpt, published, user_id, cover_img})
        .select()
  
      if (error) {
        return NextResponse.json({ msg: '新增文章时出错',error }, { status: 500 });
      }
      return NextResponse.json({ data:data?.[0]?.id, msg:"文章新增成功"}, { status: 200 });
    }else{
      const { data, error } = await supabase
        .from('articles')
        .update({title, content,delta_data,excerpt,published,cover_img})
        .eq('id', id)
        .select()
        
      if (error) {
        return NextResponse.json({ msg: '编辑文章时出错',error }, { status: 500 });
      }
      return NextResponse.json({ data:data?.[0]?.id, msg:"文章编辑成功" }, { status: 200 });
    }


  } catch (error) {
    console.error('获取文章时出错:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}