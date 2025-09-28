import { createDeepSeek } from '@ai-sdk/deepseek';
// import { createOpenAI, openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const deepseek = createDeepSeek({
      apiKey:process.env.DS_API_KEY
    })
    console.log('deepseek',deepseek);

    // const openai = createOpenAI({
    //   apiKey: process.env.ALI_API_KEY,
    //   baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1", // 基础 URL 只保留域名部分
    // });
    // console.log('openai',openai);

    const result = streamText({
      // model: openai('qwen-plus-v1'),
      model: deepseek('deepseek-chat'),
      messages: convertToModelMessages(messages),
    });
  
    return result.toUIMessageStreamResponse();

  }catch (error) {
    // 打印错误日志（关键！）
    console.error('调用失败：', error);
    // 返回错误响应给前端
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}  