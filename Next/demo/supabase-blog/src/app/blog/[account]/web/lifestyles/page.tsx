'use client';
// import  from 'react';
import React,{useEffect,useState} from "react";
import {life_styles} from '@/lib/supabase';
import {useCheckUser,useJumpAction} from "@/lib/use-helper/base-mixin";
import Image from 'next/image';

type Props = {
  params: Promise<{ account: string }>; //动态路由 [account] 对应的参数
}
const LifeStyles = (props: Props) => {
  const {params} = props;
  const { account } = React.use(params);
  const [lifeStyles, setLifeStyles] = useState<life_styles[]>([] as life_styles[])
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  const {jumpAction} = useJumpAction();
  const {checkUser} = useCheckUser({loginJump:true});
  useEffect(() => {
    let mounted = true;

    // 初始化应用，检查用户状态 -> 获取文章数据
    const init = async () => {
      try {
        // 先检查用户状态
        await checkUser();
        if (!mounted) return;
        // 然后获取文章数据
        await loadData();
      } catch (error) {
        console.error("初始化应用时出错:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
    return () => {
      mounted = false;
    };
  }, []);

  // 获取文章数据并关联作者信息
  const loadData = async () => {
    try {
      console.log("api: get-lifestyles-list");
      const response = await fetch(
        `/api/blog/get-lifestyles-list?blogger=${account}`
      );
      const result = await response.json();
      console.log("api: /blog/get-lifestyles-list then", result, response);
      if (response.ok) {
        setLifeStyles(result.data);
      } else {
        console.error("获取文章时出错:", result.error);
        setLifeStyles([]);
      }
    } catch (error) {
      console.error("获取文章时出错:", error);
      setLifeStyles([]);
    } finally {
      setLoading(false);
    }
  };

  const cloudinaryLoader = ({ src="", width=110, quality=100 }:{src:string,width:number,quality?:number}) => {
    // 提取Cloudinary图片的public_id（即路径中最后的文件名部分）
    const publicId = src.split('/').pop();
    // 拼接Cloudinary支持的变换参数（路径格式）
    const transformations = ['f_auto', `w_${width}`, `q_${quality}`].join(',');
    // 生成最终URL
    return `https://res.cloudinary.com/dhfjn2vxf/image/upload/${transformations}/${publicId}`;
  };
  return (
    <div className="container w-[60%] m-auto ">
      <div className="grid grid-cols-4 gap-15 w-full pt-8">
        {lifeStyles.map(item=>(
          <div className="anim-op-y" key={item.id}>
            <div className="list anim-hover-scale-sm rounded-2xl shadow-[0px_3px_15px_transparent] shadow-gray-700 text-2xs min-w-[150px] max-w-[220px] cursor-pointer" >
              <div className="album-box" onClick={()=>jumpAction(`web/lifestyles/${item.id}`)}>
                <div className="cover-box aspect-square relative">
                  <Image loader={cloudinaryLoader} src={item.cover_img||''} alt="" fill  className='w-full h-full object-fill'/>
                </div>
                <div className="p-4 border-t-gray-800 border-t">
                  <div>{item.title}</div>
                  <div className="text-xs text-gray-400 pt-1">{item.created_at}</div>
                  <div className="text-[15px] pt-2">查看相册</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifeStyles;
