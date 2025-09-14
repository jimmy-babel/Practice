import { useState } from "react"
import Content from "./content.jsx"
export default function News() {
  // const [infoArr,setInfo] = useState([{content:"测试1"},{content:"测试2"},]);
  const infoArr = [{content:"测试测试测试测试测试测试测试测试测试测试1"},{content:"测试测试测试测试测试测试测试测试2"}]
  const [curIndex,setCurIndex] = useState(0);
  console.log('function News',curIndex);
  function onTap(index) {
    console.log('onTap',index);
    setCurIndex(index);
  }
  return (
    <>
      <h1>News.jsx</h1>
      {infoArr.map((item,index)=>(
        <Content key={index} data={item.content} isShow={curIndex==index} clickTap={()=>onTap(index)}></Content>
      ))}
    </>
  )
}