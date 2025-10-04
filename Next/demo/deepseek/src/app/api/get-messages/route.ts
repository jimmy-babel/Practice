import { getMessagesByChatId } from "@/db"
// import { useAuth } from "@clerk/nextjs"
// import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
    const {chat_id, chat_user_id} = await req.json()
    const userId = process.env.USER_ID
    console.log('看看',userId , chat_user_id);
    if (!userId || chat_user_id !== userId) {
        return new Response(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const messages = await getMessagesByChatId(chat_id)
    return new Response(JSON.stringify(messages), {status: 200})
}