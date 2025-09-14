import { useRef, useState } from "react";

export function CountDown() {
  const [startTime,setStartTime] = useState(null);
  const [serverTime,setServerTime] = useState(null);
  const intervalRef = useRef(null);
  function handleStart() {
    setStartTime(Date.now());
    setServerTime(Date.now());
    console.log('intervalRef.current',intervalRef.current);
    intervalRef.current && handleStop();
    intervalRef.current = setInterval(() => {
      setServerTime(Date.now());
    }, 10);
  } 
  function handleStop() {
    clearInterval(intervalRef.current);
    intervalRef.current = "";
  }
  let timePassed = 0;
  if(serverTime!=null&&startTime!=null){
    timePassed = (serverTime-startTime) / 1000;
  }


  return (
    <>
      <h1>useRef.jsx</h1>
      <h2>function CountDown</h2>
      <h3>时间过去了： {timePassed.toFixed(3)}</h3>
      <button onClick={handleStart}>
        开始
      </button>
      <button onClick={handleStop}>
        停止
      </button>
    </>
  );
}

export function Form() {
  const inputRef = useRef(null);
  function handleClick() {
    inputRef.current.focus();
  }
  return (
    <>
      <h2>function Form</h2>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>点击聚焦</button>
    </>
  )
}