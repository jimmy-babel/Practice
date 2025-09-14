import { useState } from "react";
import Content from "./content.jsx";
export default function Counter() {
  const [isShow,setIsShow] = useState(true);
  console.log('function Counter');
  return (
    <>
      <h1>counter.jsx:</h1>
      <div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>A:<Content></Content></div>
        {isShow ? (<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>B1:<Content></Content></div>):(<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>B2:<Content></Content></div>)}
        {isShow ? (<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>C1:<Content key={1}></Content></div>):(<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>C2:<Content key={2}></Content></div>)}
        {isShow && <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>D:<Content></Content></div>}
      </div>
      <div>
        <label>
          <input type="checkbox" checked={isShow} onChange={e=>setIsShow(e.target.checked)}></input>
          【 B1→B2(cache) C1→C2(key唯一 refresh) D(hide) 】
        </label>
      </div>
    </>
  )
}