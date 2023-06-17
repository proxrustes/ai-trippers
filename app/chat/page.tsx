"use client"

import EventGrid from '@/components/EventGrid/EventGrid';
import BotMessage from '@/components/Messages/BotMessage';
import UserMessage from '@/components/Messages/UserMessage';
import { DUMMY_EVENT_DATA } from '@/data/dummydata.events';
import { IChatMessage } from '@/definitions/interfaces/IChatMessage';
import { Transition, Dialog } from '@headlessui/react';
import { useState, useEffect, useRef, Fragment } from 'react';



export default function Chatbot() {


const hasEvents = (res) => {
  return true
};

  let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

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
    
    const res  = await fetch(`/api/chat`, {
        headers: {
          "Content-type": "application/json"
        },
        method: "POST"
      })
    if(await hasEvents(res)){
      openModal()
    } 
    else{
      const botMessage: IChatMessage = {
      message: await res.json(),
      time: new Date().toISOString(),
      user: 'bot',
    };

    setHistory((prevHistory) => [...prevHistory, botMessage]);
  }
  setInput('');
 
  }
  

  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  return (
  
  <>  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={() => {}}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-75" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-[2vh] text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="dialog-panel transform">
              <Dialog.Title className="text-[4vh] font-black">
                SUGGESTED EVENTS
              </Dialog.Title>
              <div>
                <EventGrid events={DUMMY_EVENT_DATA} />
                <button className="button" onClick={closeModal}>
                  BROWSE FURTHER
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
    </Transition>
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
    </>
      );

}
