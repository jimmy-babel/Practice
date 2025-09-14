export default function ServerComponent() {
  const fetchData = async ()=>{
    const awaitFn = ():Promise<number>=>{
      return new Promise((rs)=>{
        console.log('进来2');
        setTimeout(() => {
          rs(100)
        }, 2000);
      })
    }
    const result = await awaitFn();
    return result;
  }
  const data = fetchData();
  return (
    <div>ServerComponent{data}</div>
  )
}