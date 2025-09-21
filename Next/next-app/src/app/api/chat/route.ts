import { createDeepSeek } from '@ai-sdk/deepseek';
import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const deepseek = createDeepSeek({
    apiKey:process.env.DS_API_KEY
  })
  const result = streamText({
    model: deepseek('deepseek-chat'),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}  