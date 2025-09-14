export default async function Page({params}: {params: {id: string}}){
  const {id} = await params;
  return (
    <>
      <div>detail2.page</div>
      <div>id: {id}</div>
    </>
  )
}