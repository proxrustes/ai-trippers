'use client'
import EventGrid from '@/components/EventGrid/EventGrid'
import EventsModal from '@/components/EventModal'
import BotMessage from '@/components/Messages/BotMessage'
import UserMessage from '@/components/Messages/UserMessage'
import { IChatMessage } from '@/definitions/interfaces/IChatMessage'
import { Event } from '@/definitions/types/event'
import { useState, useEffect, useRef, Fragment } from 'react'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setInput] = useState('')
const [events, setEvent] = useState<Event[]|null>(null)
  const [history, setHistory] = useState<IChatMessage[]>([])
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  async function hasEvents(res) {
    return res.event
  }
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }
  const handleSend = async () => {
      setInput('')
    if (query) {
      const userMessage: IChatMessage = {
        message: query,
        time: new Date().toISOString(),
        user: 'user'
      }
      setHistory((prevHistory) => [...prevHistory, userMessage])
      setTimeout(()=>{
 const botMessage: IChatMessage = {
        message: 'Hello, \n  Thank you for reaching out! We strive to offer the most memorable Icelandic experiences!\n Your answers will allow me to tailor a recommendation ensuring your Iceland trip is unforgettable. \n Let me figure out the perfect tour for you...',
        time: new Date().toISOString(),
        user:'bot'
      }
      setHistory((prevHistory) => [...prevHistory, botMessage])
      }, 2000);
      const res = await fetch('http://localhost:8000/api/chat', {
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({query}),
        method: 'POST'
      })
      const body = await res.json()
      if (await hasEvents(body)) {
        console.log(body)
        setEvent(body.tours)
        openModal()
      } else {
        const botMessage: IChatMessage = {
          message: 'await res.json()',
          time: new Date().toISOString(),
          user: 'bot'
        }
        setHistory((prevHistory) => [...prevHistory, botMessage])
      }
    }
  }
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history])
  return (
    <>
      {''}
      <EventsModal isOpen={isOpen} closeModal={closeModal} events={events} />
      <div className='chat-wrapper px-5 flex flex-col justify-between'>
        <div className='px-[3vh]' style={{ overflowY: 'auto' }}>
          {history.map((msg) => (
            <div className='max-w-full'>
              {msg.user === 'bot' ? (
                <BotMessage message={msg.message} />
              ) : (
                <UserMessage message={msg.message} />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div className='flex gap-x-[2vh]'>
            <input value={query} onChange={handleInputChange} />
            <button type='button' onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </>
  )
}
