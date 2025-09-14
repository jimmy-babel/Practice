export default function List({data=[],children}){
  console.log('function List',data);
  return (
    <>
      <h1 style={{marginTop:"20px",marginBottom:"-15px"}}>list.jsx</h1>
      <ul>
        {
          data.map((item,index)=>(
            <li key={item.key}>{index},{item.key},{item.name}</li>
            // key必须是最外层? 被<></>包裹会警告key
            // <></>
          ))
        }
      </ul>
      <div>children:{children}</div>
    </>
  )
}