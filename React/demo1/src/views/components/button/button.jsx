import { useState } from "react";
export default function Button({type='primary',size='default',disabled=false,children,handleClick, ...restProps}){
  const [index,setIndex] = useState(0)
  console.log('function Button',{...restProps}['data-id']);
  function customHandleClick(e){
    setIndex(index+1);
    console.log('customHandleClick',index);
    if(handleClick && typeof handleClick === 'function'){
      handleClick(e);
    }
  }
  return (
    <>
      <h1>button.jsx</h1>
      <button {...restProps} className={`btn btn-${type} btn-${size}`} disabled={disabled} onClick={customHandleClick}>
        {children}
      </button>
    </>
  )
}