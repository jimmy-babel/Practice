import { createChat } from "@/db"

export async function POST(req: Request) {
  const { title,model } = await req.json()
  const userId = process.env.USER_ID
  if(userId){
    const newChat = await createChat(title,userId,model)
    return new Response(JSON.stringify({id:newChat?.id}),{status:200})
  }
  return new Response(null,{status:401})
}