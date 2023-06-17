"use client"

import BotMessage from '@/components/Messages/BotMessage';
import UserMessage from '@/components/Messages/UserMessage';
import { IChatMessage } from '@/definitions/interfaces/IChatMessage';
import { getBody } from '@/lib/bodyUtils';
import { useState, useEffect, useRef } from 'react';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<IChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if(input){
       const userMessage: IChatMessage = {
      message: input,
      time: new Date().toISOString(),
      user: 'user',
    };

    setHistory((prevHistory) => [...prevHistory, userMessage]);
    
    const data  = await fetch(`/api/chat`, {
        headers: {
          "Content-type": "application/json"
        },
        method: "POST"
      })

    const botMessage: IChatMessage = {
      message: await data.json(),
      time: new Date().toISOString(),
      user: 'bot',
    };

    setHistory((prevHistory) => [...prevHistory, botMessage]);
    
    setInput('');
    }
   

  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  return (
        <div className="chat-wrapper px-5 flex flex-col justify-between">
                  <div className="px-[3vh]" style={{ overflowY: 'auto' }}>
            {history.map((msg, idx) => (
               <div className="max-w-full" key={idx}>
               { msg.user == 'bot'? <BotMessage message={msg.message}/> : <UserMessage message={msg.message}/>}
            </div>
            ))}
            <div ref={messagesEndRef} /></div>
          <div style={{ marginTop: 'auto' }}>
            <div className='flex gap-x-[2vh]'>
            <input value={input} onChange={handleInputChange} />
            <button onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      );

}
