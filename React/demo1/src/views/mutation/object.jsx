import { useState } from "react";
import { useImmer } from "use-immer";

export default function ObjMutation(){
  const [obj,setObj] = useState({x:1,y:2});
  const [immerObj,updateObj2] = useImmer({x:3,y:4});
  console.log('fuction ObjMutation',obj);
  function setVal(val,key) { //useState
    setObj({...obj,[key]:val});
  }
  function updateVal(val,key) { //useImmer
    updateObj2(draft=>{
      draft[key] = val; //Immer可以直接改值
    })
  }
  return (
    <>
      <h1>object.jsx</h1>
      <div>
        <div>useState setObj : </div>
        <div>x:{obj.x} , y:{obj.y}</div>
        <input type="number" placeholder="x轴" value={obj.x} onChange={e=>setVal(e.target.value,'x')}></input>
        <input placeholder="y轴" value={obj.y} onChange={e=>setVal(e.target.value,'y')}></input>
      </div>
      <div style={{marginTop:'10px'}}>
        <div>useImmer setObj : </div>
        <div>x:{immerObj.x} , y:{immerObj.y}</div>
        <input type="number" placeholder="x轴" value={immerObj.x} onChange={e=>updateVal(e.target.value,'x')}></input>
        <input placeholder="y轴" value={immerObj.y} onChange={e=>updateVal(e.target.value,'y')}></input>
      </div>
    </>
  )
}