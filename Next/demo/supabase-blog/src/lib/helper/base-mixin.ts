import { useRouter,usePathname} from "next/navigation"; // 公开路径导入
export function useJumpAction(){
  const router = useRouter();
  const fromPath = usePathname();

  const jumpAction = (url:string)=>{
    console.log('jumpAction',url,fromPath);
    router.push(`${url}?from=${encodeURIComponent(fromPath)}`);
  }
  return {jumpAction}
}