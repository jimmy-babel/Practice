"use client";
import { Message, useChat } from "@ai-sdk/react";
import { useState, useEffect } from "react";

export default function ChatApp() {
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  
  useEffect(()=>{
    fetch('/api/get-messages',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
    }).then(res=>res.json())
      .then(data=>{setInitialMessages(data);});
  },[])

  const { messages,input,handleInputChange,handleSubmit } = useChat({
    api:"/api/chat",
    initialMessages
  })

  useEffect(() => {
    console.log("useEffect messages", messages);
  }, [messages]); // 依赖为messages，仅当messages变化时执行

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`whitespace-pre-wrap flex flex-row ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {/* {(() => {
            console.log('message', message);
            return null; // jsx中 需要返回一个合法的ReactNode
          })()} */}

          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return (
                  <div
                    className={`text-black p-2 rounded-lg ${
                      message.role === "user" ? "bg-blue-300" : "bg-gray-200"
                    }`}
                    key={`${message.id}-${i}`}
                  >
                    {part.text}
                  </div>
                );
            }
          })}
        </div>
      ))}

      <form
        onSubmit={handleSubmit}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
