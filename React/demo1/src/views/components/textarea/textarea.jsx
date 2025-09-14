import { useState } from "react";
export default function Textarea(){
  const [value,setValue] = useState("");
  console.log('function Textarea',value);
  function onChange(e) {
    console.log(e);
    setValue(e.target.value);
  }
  function onSubmit(e) {
    console.log(e);
    e.preventDefault();
    console.log('onSubmit',value);
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <textarea placeholder="请输入内容1" value={value} onChange={e=>setValue(e.target.value)}></textarea>
        <textarea placeholder="请输入内容2" value={value} onChange={onChange}></textarea>
        <button type="submit">Send</button>
      </form>
    </>
  )
}