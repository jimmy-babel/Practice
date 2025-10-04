import { getChat } from "@/db";

export async function POST(req: Request) {
  const { chat_id } = await req.json()
  const userId = process.env.USER_ID;
  if(userId){
    const chat = await getChat(chat_id,userId)
    return new Response(JSON.stringify(chat),{status:200})
  }
  return new Response(null,{status:401})
}