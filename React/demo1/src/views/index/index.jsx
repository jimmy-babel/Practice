import Login from '@/views/login/login.jsx';
import List from '@/views/list/list.jsx';
import ButtonCmpt from '@/views/components/button/button.jsx';
import Textarea from '@/views/components/textarea/textarea.jsx';
import ObjMutation from '@/views/mutation/object.jsx';
import ArrMutation from '@/views/mutation/array.jsx';
import News from '@/views/news/news.jsx';
import Counter from '@/views/counter/counter.jsx';
import { useEffect, useState } from 'react';
import UseContext from "@/views/use-context/use-context.jsx";
import ReducerContext from "@/views/reducer-context/index.jsx";
import {CountDown,Form} from "@/views/escape-hatches/useRef.jsx";
import {VideoCmpt,ChatRoomBox} from "@/views/escape-hatches/useEffect.jsx";
import {FullNameCmpt} from "@/views/escape-hatches/customHooks.jsx";
import {getData} from "@/common/http/http-manager.js";
import { Button } from 'antd';
export default function Index(){
  const dataList = [{key:"key1",name:"A"}, {key:"key2",name:"B"}, {key:"key3",name:"C"}];
  const dataList2 = [{key:"key1",name:"A2"}, {key:"key2",name:"B2"}, {key:"key3",name:"C2"}];
  const [data, setData] = useState(dataList);
  const [num, setNum] = useState(0);
  const [num2, setNum2] = useState(0);
  console.log('function Index',data);
  const handleClick = (e) => {
    console.log(e.target.innerText,e.target.dataset,e.target.dataset.id);
    if(e.target.dataset.id==1){
      setData(dataList);
    }else{
      setData(dataList2);
    }
  }
  useEffect(()=>{
    console.log('function Index useEffect');
    getData().then(res=>{
      console.log('getData then',res);
      setNum(res.data.age);
    })
  },[])
  return (
    <>
      <h1>index.jsx:</h1>

      {/* 多次调用setNum */}
      <div>
        <div>
          <span>{num}</span>
          <button onClick={()=>{
            setNum(num+1);
            setNum(num+1);
            setNum(num+1);
            setTimeout(() => {
              console.log('setTimeout num',num);
            }, 1000);
          }}>+</button>
        </div>
        <div>
          <span>{num2}</span>
          <button onClick={()=>{
            setNum2(num2 + 10);
            setNum2(n=>{console.log('看看setNum2 n',n);return (n+1)});
            setNum2(n=>n+1);
            setNum2(n=>n+1);
            setTimeout(() => {
              console.log('setTimeout num2',num2); //0、13、26
            }, 1000);
          }}>+</button>
        </div>
      </div>

      {/* Login 0 1 2 */}
      <Login content="传参"></Login>
      <Login content="传参" index="1"></Login>
      <Login content="传参" index="2"></Login>
      
      {/* 插槽 */}
      <List data={data}>
        <div>插槽内容1</div>
        <div>插槽内容2</div>
      </List>

      {/* ButtonCmpt 1 2 */}
      <ButtonCmpt type="primary" size="default" data-id="1" disabled={false} handleClick={handleClick}>按钮1</ButtonCmpt>
      <ButtonCmpt type="primary" size="large" data-id={2} disabled={false} handleClick={handleClick}>按钮2</ButtonCmpt>
      
      <Button type="primary" onClick={() => {
        console.log('antd Button');
      }}>按钮3</Button>
      <Textarea></Textarea>
      <ObjMutation></ObjMutation>
      <ArrMutation></ArrMutation>
      <News></News>
      <Counter></Counter>
      <UseContext></UseContext>
      <ReducerContext></ReducerContext>
      <CountDown></CountDown>
      <Form></Form>
      <VideoCmpt></VideoCmpt>
      <ChatRoomBox></ChatRoomBox>
      <FullNameCmpt></FullNameCmpt>
    </>
  )
}