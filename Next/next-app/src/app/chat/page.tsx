"use client"
import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
    // 监听messages变化，只在变化时打印1次
  
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