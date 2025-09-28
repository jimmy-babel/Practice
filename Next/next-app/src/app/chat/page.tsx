"use client"
import { useChat, UIMessage, Chat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';

export default function ChatApp() {
   const [initialMessages, setInitialMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState('');

  // // 1. 自定义fetch函数，手动指定API端点
  // const customFetch: typeof fetch = async (input, init) => {
  //   // 将请求目标替换为你的API路径（如：/api/chat）
  //   const apiUrl = '/api/chat';
    
  //   // 调用原生fetch，使用自定义API路径
  //   return fetch(apiUrl);
  // };

  // // 2. 创建Chat实例时传入自定义fetch
  // const chatInstance = new Chat({
  //   messages: initialMessages,
  //   fetch: customFetch, // 注入自定义fetch
  // });

  // // 3. 在useChat中使用配置好的实例
  // const { messages, sendMessage } = useChat({
  //   chat: chatInstance,
  //   resume: true,
  // });
  
  const { messages, sendMessage } = useChat();

  useEffect(() => {
    console.log('useEffect messages', messages);
    // 若想单独打印新增的最后一条消息，可加判断：
    // if (messages.length > 0) {
    //   console.log('最后一条消息：', messages[messages.length - 1]);
    // }
  }, [messages]); // 依赖为messages，仅当messages变化时执行


  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(message => (
        <div key={message.id} className={`whitespace-pre-wrap flex flex-row ${message.role === 'user' ? 'justify-end':'justify-start' }`}>

          {/* {(() => {
            console.log('message', message);
            return null; // 返回一个合法的 ReactNode
          })()} */}

          {/* {message.role === 'user' ? 'User: ' : 'AI: '} */}
          
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div className={`text-black p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-300' : 'bg-gray-200'}`} key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}

        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}