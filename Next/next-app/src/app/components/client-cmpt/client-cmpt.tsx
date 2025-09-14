"use client"

import { useEffect, useState } from "react"

export default function ClientComponent() {
  const [index,setIndex] = useState(0);
  const fetchData = async ()=>{
    const awaitFn = ():Promise<number>=>{
      return new Promise((rs)=>{
        setTimeout(() => {
          rs(100)
        }, 2000);
      })
    }
    const result = await awaitFn();
    setIndex(result);
    return result;
  }
  useEffect(()=>{
    fetchData();
    // setIndex(100)
    // const result = await fetchData();
    // setIndex(result);
  },[index])
  return (
    <div>ClientComponent{index}</div>
  )
}