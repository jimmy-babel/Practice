'use client'

import { useRef, useState } from "react";
import EastIcon from '@mui/icons-material/East'
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios"
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Home() {

  const [input, setInput] = useState("")
  const [model, setModel] = useState("deepseek-v3")
  const handleChangeModel = () => {
    setModel(model === 'deepseek-v3' ? 'deepseek-r1' : 'deepseek-v3')
  }

  const queryClient = useQueryClient()
  const router = useRouter()
  const textareaRef = useRef(null);      
  // const {user} = useUser()

  // Mutations
  const {mutate: createChat} = useMutation({
    mutationFn: async() => {
      // return axios.post('/api/create-chat', {
      //   title: input,
      //   model: model
      // })
      const response = await fetch('/api/create-chat', {
          body: JSON.stringify({  // 注意这里是 body 而不是 data
              title: input,
              model: model
          }),
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
      })
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      console.log('createChat then',data);
      router.push(`/chat/${data.id}`)
      queryClient.invalidateQueries({ queryKey: ['chats'] })
    },
  })

  const handleSubmit = () => {
    if (input.trim() === '') {
      return 
    }
    
    // if (!user) {
    //   router.push("/sign-in")
    //   return 
    // }

    createChat()

  }

  

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="h-1/5"></div>
      <div className="w-1/2">
        <p className="text-bold text-2xl text-center">
          有什么可以帮您的吗
        </p>

        <div className="flex flex-col items-center justify-center mt-4 shadow-lg border-[1px] border-gray-300 h-32 rounded-lg">
          <textarea
            ref={textareaRef}
            className="w-full rounded-lg p-3 h-30 focus:outline-none"
            value={input}
            onKeyDown={(e) => {
              // 当按下Enter且没有按下Shift键时
              if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                const textarea = e.target as HTMLTextAreaElement;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                // 在光标位置插入换行符
                textarea.value = 
                  textarea.value.substring(0, start) + 
                  '\n' + 
                  textarea.value.substring(end);
                // 调整光标位置到换行符后面
                textarea.selectionStart = textarea.selectionEnd = start + 1;
              } else if(e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            onChange={(e) => setInput(e.target.value)}
          >
          </textarea>
          <div className="flex flex-row items-center justify-between w-full h-12 mb-2">
            <div>
              <div className={`flex flex-row items-center justify-center rounded-lg border-[1px] px-2 py-1 ml-2 cursor-pointer ${model === 'deepseek-r1' ? "border-blue-300 bg-blue-200" : "border-gray-300"}`}
                onClick={handleChangeModel}
              >
                <p className="text-sm">
                  深度思考(R1)
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center border-2 mr-4 border-black p-1 rounded-full cursor-pointer"
              onClick={handleSubmit}
            >
              <EastIcon></EastIcon>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col items-center justify-center mt-4 shadow-lg border-[1px] border-gray-300 h-32 rounded-lg">
          <textarea
            className="w-full rounded-lg p-3 h-30 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          >
          </textarea>
          <div className="flex flex-row items-center justify-between w-full h-12 mb-2">
            <div>
              <div className={`flex flex-row items-center justify-center rounded-lg border-[1px] px-2 py-1 ml-2 cursor-pointer ${model === 'deepseek-r1' ? "border-blue-300 bg-blue-200" : "border-gray-300"}`}
                onClick={handleChangeModel}
              >
                <p className="text-sm">
                  深度思考(R1)
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center border-2 mr-4 border-black p-1 rounded-full"
              onClick={handleSubmit}
            >
              <EastIcon></EastIcon>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
}
