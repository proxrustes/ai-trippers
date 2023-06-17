"use client"

import BotMessage from '@/components/Messages/BotMessage';
import UserMessage from '@/components/Messages/UserMessage';
import { IChatMessage } from '@/definitions/interfaces/IChatMessage';
import { getBody } from '@/lib/bodyUtils';
import { useState, useEffect } from 'react';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<IChatMessage[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
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
  };

  return (
        <div className="chat-wrapper" style={{ display: 'flex', flexDirection: 'column'}}>
          <div style={{ overflowY: 'auto' }}>
            {history.map((msg, idx) => (
               <p key={idx}>
               { msg.user == 'bot'? <BotMessage message={msg.message}/> : <UserMessage message={msg.message}/>}
            </p>
            ))}
          </div>
          <div style={{ marginTop: 'auto' }}>
            <input value={input} onChange={handleInputChange} />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      );

}
