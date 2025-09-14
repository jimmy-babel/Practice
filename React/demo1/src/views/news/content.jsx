export default function news({data="",isShow=false,clickTap}) {
  return (
    <>
      {isShow?(
        <div>{data}</div>
      ):(
        <div onClick={clickTap} style={{cursor:"pointer"}}>显示</div>
      )}
    </>
  )
}