import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url); //GET请求获取URL
    const blogger = url.searchParams.get("blogger"); // GET获取查询参数中的blogger
    const id = url.searchParams.get("id"); // GET获取查询参数中的id

    // 检查 blogger 是否存在（避免后续调用 toUpperCase/toLowerCase 时报错）
    if (!blogger || !id) {
      return NextResponse.json({ error: "缺少传参" }, { status: 400 });
    }

    // 获取博主信息
    const { data: bloggerData, error: bloggerError } = await supabase
      .from("profiles")
      .select("*")
      .or(
        `full_name.eq.${blogger.toUpperCase()},full_name.eq.${blogger.toLowerCase()}`
      )
      .single();

    if (bloggerError) {
      return NextResponse.json(
        { msg: "获取博主信息出错", error: bloggerError },
        { status: 500 }
      );
    }

    const { avatar_url, full_name, username } = bloggerData;

    // 获取文章数据
    // console.log('supabase select from articles');
    const { data: articlesData, error: articlesError } = await supabase
      .from("articles")
      .select("*")
      // .eq('published', true)
      .eq("id", id)
      .eq("user_id", bloggerData?.id)
      .order("created_at", { ascending: false })
      .single();
    // console.log('supabase select from articles then:',articlesData,articlesError);
    if (articlesError) {
      return NextResponse.json(
        { msg: "获取文章详情时出错", error: articlesError },
        { status: 500 }
      );
    }

    if (!articlesData) {
      return NextResponse.json(
        { data: null, bloggerData: { avatar_url, full_name, username } },
        { status: 200 }
      );
    }

    // 获取分组关系
    const {
      data: articleGroupsRelationData,
      error: articleGroupsRelationError,
    } = await supabase
      .from("article_groups_relation")
      .select("group_id")
      .eq("article_id", id);
    if (articleGroupsRelationError) {
      return NextResponse.json(
        { msg: "获取分组关系出错", error: articleGroupsRelationError },
        { status: 500 }
      );
    }
    let groupsId = articleGroupsRelationData.map((item) => item.group_id);

    return NextResponse.json(
      {
        data: {
          ...articlesData,
          created_at:
            (articlesData?.created_at &&
              dayjs(articlesData?.created_at).format("YYYY-MM-DD HH:mm:ss")) ||
            "",
          updated_at:
            (articlesData?.updated_at &&
              dayjs(articlesData?.updated_at).format("YYYY-MM-DD HH:mm:ss")) ||
            "",
          groupsId,
        },
        bloggerData: { avatar_url, full_name, username },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("获取文章详情时出错:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
