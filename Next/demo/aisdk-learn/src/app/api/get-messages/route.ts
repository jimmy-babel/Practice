import { mockMessages } from "../../../../lib/db";

export async function POST(req: Request) {
    
    return Response.json(mockMessages);
}