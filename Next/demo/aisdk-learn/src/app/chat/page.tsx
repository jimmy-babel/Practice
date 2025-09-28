'use client'

import { Message, useChat } from '@ai-sdk/react';
import { useEffect, useState } from 'react';

export default function Chat() {

    const [initialMessages, setInitialMessages] = useState<Message[]>([]);

    useEffect(() => {
        fetch('/api/get-messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => setInitialMessages(data));
    }, []);

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat',
        initialMessages: initialMessages,
    });
    return (
        <div className="flex flex-col w-full max-w-[800px] py-24 mx-auto stretch">
            <div>
                {messages.map(message => (
                    <div key={message.id} className={`flex flex-row ${message.role === 'user' ? 'justify-end' : 'justify-start'} mt-4`}
                    >
                        {message.parts.map((part, i) => {
                            switch (part.type) {
                                case 'text':
                                    return (
                                        <p className={`text-sm inline-block break-words whitespace-pre-wrap max-w-[80%] p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-300 ' : 'bg-gray-200 text-black'}`}
                                            key={message.id + '-' + i}
                                        >
                                            {part.text}
                                        </p>
                                    )

                            }
                        })}
                    </div>
                ))}
            </div>
            
            <form onSubmit={handleSubmit}>
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