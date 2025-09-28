import { createDeepSeek } from '@ai-sdk/deepseek';
import { createOpenAI } from '@ai-sdk/openai';
import { generateObject, streamText, tool } from 'ai';
import { generateText } from 'ai';
import { z } from 'zod';
import { mockMessages } from '../../../../lib/db';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const lastMessage = messages[messages.length - 1];
    mockMessages.push({
        id: (mockMessages.length + 1).toString(),
        role: 'user',
        content: lastMessage.content,
    })

      const deepseek = createDeepSeek({
        apiKey: process.env.DEEPSEEK_API_KEY,
      })

    // const openai = createOpenAI({
    //     apiKey: process.env.DASHCOPE_API_KEY,
    //     baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
    // })

    const result = streamText({
        model: deepseek('deepseek-chat'),
        messages,
        onFinish: (message) => {
            mockMessages.push({
                id: (mockMessages.length + 1).toString(),
                role: 'assistant',
                content: message.text,
            })
        }
    });

    return result.toDataStreamResponse();
}