import Mock from "mockjs";
Mock.mock(/\/home\/getData/,(e)=>{
  console.log('mock拦截',e);
  return {
    code:1,
    data:{
      name:"mock",
      age:18
    }
  }
})