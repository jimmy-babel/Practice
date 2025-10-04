import { getMessagesByChatId } from "@/db";

export async function POST(req: Request) {
  const userId = process.env.USER_ID;
  const {chat_id,chat_user_id} = await req.json();
  // console.log('API get messages',chat_id,chat_user_id,userId);
  if(userId && chat_user_id == userId){
    const message = await getMessagesByChatId(chat_id)
    return new Response(JSON.stringify(message),{status:200})
  }
  return new Response(null,{status:401})
}