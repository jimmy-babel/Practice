import { getChats } from "@/db";

export async function POST(req: Request) {
  const userId = process.env.USER_ID;
  if(userId){
    const chats = await getChats(userId);
    return new Response(JSON.stringify(chats),{status:200})
  }
  return new Response(null,{status:401})
}