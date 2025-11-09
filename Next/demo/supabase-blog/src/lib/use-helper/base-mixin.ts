import { useRouter,useParams,usePathname} from "next/navigation"; // 公开路径导入
import { useState,useEffect } from "react";
interface ExtraType {
  type?:string
}
export function useJumpAction(){
  const router = useRouter();
  const fromPath = usePathname();
  const params = useParams();
  const [curAccount,setCurAccount] = useState<string>('');
  useEffect(() => { 
    const storage = localStorage.getItem('account') || '';
    setCurAccount(storage);
  }, []); // 仅组件挂载时执行一次
  useEffect(() => {
      // params.account转换string
      const processedParamsAccount = Array.isArray(params.account) 
        ? params.account[0] 
        : params.account;
      const _curAccount = processedParamsAccount || localStorage.getItem('account') || "";
      setCurAccount(_curAccount);
  },[params.account])
  const jumpAction = (url:string,extra:ExtraType={type:"auto"})=>{
    console.log('jumpAction',url,fromPath);
    if(extra?.type == 'auto'){
      router.push(`/blog/${curAccount}/${url}`);
    }
    else if(extra?.type == 'auth'){
      router.push(`${url}?from=${encodeURIComponent(fromPath)}`);
    }
    else{
      router.push(`${url}`);
    }
  }
  return {jumpAction}
}

export function useCheckUser({loginJump}:{loginJump:Boolean}){
  const {jumpAction} = useJumpAction();
  const checkUser = async () => {
    try{
      const response = await fetch(`/api/login/check`);
      const {data,msg,error} = await response.json();
      if (response.ok) {
        if(data?.isLogin){
          return {data,msg,error};
        }
      }
      if(loginJump){
        jumpAction('/blog/auth',{type:"auth"})
      }
      return Promise.reject({data,msg,error})
    }catch(e){
      return Promise.reject(e)
    }
  }
  return {checkUser};
}
