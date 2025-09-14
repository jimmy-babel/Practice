import { useState } from "react";

export default function content() {
  const [score,setScore] = useState(0);
  console.log('function Counter content',score);
  return (
    <>
      <div>{score}</div>
      <button onClick={()=>setScore(s=>s+1)}>加一</button>
    </>
  )
}