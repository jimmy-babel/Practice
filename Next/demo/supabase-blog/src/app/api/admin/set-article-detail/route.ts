import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const {id, title, content, excerpt, published, user_id} = await req.json();
    if(id==0){
      const { data, error } = await supabase
        .from('articles')
        .insert({title, content, excerpt, published, user_id})
        .select()
  
      if (error) {
        return NextResponse.json({ error: '新增文章时出错' }, { status: 500 });
      }
      return NextResponse.json({ data:data?.[0]?.id }, { status: 200 });
    }else{
      const { data, error } = await supabase
        .from('articles')
        .update({title, content, excerpt, published})
        .eq('id', id)
        .select()
        
      if (error) {
        return NextResponse.json({ error: '编辑文章时出错' }, { status: 500 });
      }
      return NextResponse.json({ data:data?.[0]?.id }, { status: 200 });
    }


  } catch (error) {
    console.error('获取文章时出错:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}