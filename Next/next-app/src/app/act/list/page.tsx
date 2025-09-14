import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";
import ClientCmpt from "@/app/components/client-cmpt/client-cmpt";
import ServerCmpt from "@/app/components/server-cmpt/server-cmpt";
export default function Page(){
  return (
    <>
    
      <div style={{paddingLeft:"30px"}}>
        <Header></Header>
        <div style={{paddingLeft:"30px"}}>
          <div>list.page</div>
          <ClientCmpt></ClientCmpt>
          <ServerCmpt></ServerCmpt>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}