export default function Login({content='',index=0}){
  console.log('function Login',index);
  if(index==0){
    return (
      <>
        <h1>login.jsx1:</h1>
        <div>登录 {content}</div>
      </>
    )
  }else{
    return (
      <>
        <h1>login.jsx2:</h1>
        <div>登录{index<=1?(Number(index)+1):(index+1)} {content}</div>
      </>
    )
  }
}