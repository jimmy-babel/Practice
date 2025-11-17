"use client";
import { useRef, useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { useJumpAction, useCheckUser } from "@/lib/use-helper/base-mixin";
import { life_styles } from "@/lib/supabase";
import ImageUploader from "@/components/ImageUploader";
import AntdSelect from "@/components/custom-antd/Select";
import type { Delta } from "quill";
interface QuillEditorRef {
  // 获取 Delta 格式内容（推荐）
  getDeltaContent: () => Delta | null;
  // 获取 HTML 格式内容
  getHtmlContent: () => string | null;
  // 获取纯文本内容
  getTextContent: () => string | null;

  tempUrlsUpload: () => any;
}
interface listItem {
  uid: string;
  name: string;
  url?: string;
}
type Props = {
  params: Promise<{ account: string; id: string }>; //动态路由 [account] 对应的参数
};
export default function LifeStylesEdit({ params }: Props) {
  const { account, id } = React.use(params);
  const { jumpAction } = useJumpAction();
  const { checkUser } = useCheckUser({ loginJump: true });
  const [lifestyles, setArticle] = useState<life_styles>({} as life_styles);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const editorRef = useRef<QuillEditorRef>(null);
  const [fileList, setFileList] = useState<listItem[]>([]);
  const [defaultFileList, setDefaultFileList] = useState<listItem[]>([]);
  const [QuillEditor, setQuillEditor] =
    useState<React.ComponentType<any> | null>(null);
  const [apiParams, setApiParams] = useState<any>(null);
  const [filterType, setFilterType] = useState<"lifestyles" | undefined>(
    undefined
  );
  const [selectData, setSelectData] = useState<number[]>([]);

  console.log("PAGE ADMIN LifeStylesEdit", lifestyles);

  const loadQuillEditor = async () => {
    const module = await import("@/components/Quill");
    setQuillEditor(module.default); // 假设组件默认导出
  };

   useEffect(() => {
      let mounted = true
      const init = async () => {
        try {
          const res = await checkUser();
          if(!mounted)return;
          setUserProfile(res.data);
          console.log('checkuser then',res);
        } catch (error) {
          console.error('初始化时出错:', error)
        }
      }
      init();
      return () => {
        console.log('销毁');
        mounted = false
      }
    }, [])
  
    useEffect(()=>{
      if(!userProfile)return
      setApiParams(`?userId=${userProfile?.id}`);
      setFilterType("lifestyles");
      const loadData = async ()=>{
        await getDetail();
      };
      loadData();
    },[userProfile])

  // 加载手记
  const getDetail = async () => {
    try {
      if (id == "0") return;
      console.log("api: get-lifestyles-detail");
      const response = await fetch(
        `/api/admin/get-lifestyles-detail?blogger=${account}&userId=${userProfile?.id}&id=${Number(id)}`
      );
      const result = await response.json();
      console.log("api: /blog/get-lifestyles-detail then", result);
      if (response.ok) {
        let data = result.data;
        if (data) {
          setDefaultFileList([
            { uid: data.id, url: data.cover_img, name: `name-${data.id}` },
          ]);
          setSelectData(data.groupsId?.length > 0 ? data.groupsId : [0]);
          setArticle(data);
        }
      } else {
        console.error("获取手记时出错:", result.error);
      }
    } catch (error) {
      console.error("获取手记时出错:", error);
    } finally {
      console.log('finally');
      setLoading(false);
    }
  };

  // 提交手记
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editorRef.current?.tempUrlsUpload();
    const deltaContent = editorRef.current?.getDeltaContent();
    const htmlContent = editorRef.current?.getHtmlContent();
    console.log("deltaContent", deltaContent);
    console.log("handleSubmit", htmlContent);
    e.preventDefault();
    if (!userProfile?.isLogin) return;
    setMessage("");
    try {
      let { title = "", excerpt = "", published = false } = lifestyles;
      let params = {
        id: Number(id),
        title,
        excerpt: excerpt || "",
        published,
        content: htmlContent || "",
        delta_data: (deltaContent && JSON.stringify(deltaContent)) || "",
        user_id: userProfile?.id,
        cover_img: fileList?.[0]?.url || lifestyles.cover_img || "",
        groupsId: selectData || [],
      };
      console.log("api: admin/lifestyles-edit", params);
      const response = await fetch(`/api/admin/lifestyles-edit`, {
        body: JSON.stringify(params),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data, msg, error } = await response.json();
      console.log("api: admin/lifestyles-edit then", data, msg, error);
      setMessage(msg);
      if (data > 0) {
        setTimeout(() => {
          jumpAction("admin/lifestyles");
        }, 500);
      }
    } catch (error) {
      setMessage(`发布失败: ${error}`);
    }
  };

  const onFinish = (arr: any) => {
    console.log("外面 onFinish", arr);
    setFileList(arr);
  };

  if (loading) {
    return (
      <div className=" bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {id === "0" ? "添加" : "编辑"}手记
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 标题 */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                手记标题
              </label>
              <input
                type="text"
                id="title"
                value={lifestyles.title || ""}
                onChange={(e) =>
                  setArticle((item) => ({
                    ...item,
                    title: e.target.value,
                  }))
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入手记标题"
              />
            </div>

            {/* 摘要 */}
            <div>
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                手记摘要 (可选)
              </label>
              <textarea
                id="excerpt"
                value={lifestyles.excerpt || ""}
                onChange={(e) =>
                  setArticle((item) => ({
                    ...item,
                    excerpt: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入手记摘要，如果留空将自动从正文生成"
              />
            </div>
            {/* 分组 */}
            <div>
              <label
                htmlFor="groups"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                手记分组
              </label>
              <AntdSelect
                extraClass="min-w-30 max-w-[50%]"
                filterType={filterType}
                isRowSetAllAuto
                isApiAuto
                mode="multiple"
                apiName="/api/admin/get-lifestyles-groups"
                apiMethods="GET"
                apiParams={apiParams}
                selectData={selectData}
                setSelectData={setSelectData}
              ></AntdSelect>
            </div>
            {/* 封面 */}
            <div>
              <label
                htmlFor="cover_img"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                手记封面
              </label>
              <ImageUploader
                limitMax={1}
                defaultFileList={defaultFileList}
                onFinish={onFinish}
              ></ImageUploader>
            </div>
            {/* 正文 */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                手记相册
              </label>
              <ImageUploader
                limitMax={9}
                defaultFileList={defaultFileList}
                onFinish={onFinish}
              ></ImageUploader>
              {/* {QuillEditor ? (
                <QuillEditor
                  ref={editorRef}
                  initialContent={lifestyles?.delta_data || ""}
                ></QuillEditor>
              ) : null} */}
            </div>

            {/* 发布选项 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={lifestyles.published}
                onChange={(e) =>
                  setArticle((item) => ({
                    ...item,
                    published: e.target.checked,
                  }))
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="published"
                className="ml-2 block text-sm text-gray-700"
              >
                立即发布（取消勾选将保存为草稿）
              </label>
            </div>

            {/* 消息提示 */}
            {message && (
              <div
                className={`p-3 rounded-md text-sm ${
                  message.includes("成功")
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}

            {/* 按钮组 */}
            <div className="flex justify-end">
              <Button
                size="middle"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                取消
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "发布中..."
                  : lifestyles.published
                  ? "发布手记"
                  : "保存草稿"}
              </Button>
            </div>
          </form>
        </div>

        {/* 提示 */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">提示</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• 手记按照标题、摘要、封面作在博客端列表中展示</p>
            {/* <p>• 如果不填写摘要，系统会自动截取正文前 200 个字符作为摘要</p> */}
            <p>• 未发布的手记将保存为草稿，则不会公布到博客端</p>
            {/* <p>• 手记标题会自动生成 URL 友好的链接地址</p> */}
          </div>
        </div>
      </main>
    </div>
  );
}
