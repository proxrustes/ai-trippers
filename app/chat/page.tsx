"use client"

import EventGrid from "@/components/EventGrid/EventGrid"
import EventsModal from "@/components/EventModal"
import BotMessage from "@/components/Messages/BotMessage"
import UserMessage from "@/components/Messages/UserMessage"
import { IChatMessage } from "@/definitions/interfaces/IChatMessage"
import { Event } from "@/definitions/types/event"
import { useState, useEffect, useRef, Fragment } from "react"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<IChatMessage[]>([])
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [events, setEvent] = useState<Event[] | null>(null)

  async function hasEvents(res) {
    return false
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
    if (input) {
      const userMessage: IChatMessage = {
        message: input,
        time: new Date().toISOString(),
        user: "user"
      }

      setHistory((prevHistory) => [...prevHistory, userMessage])

      const res = await fetch('/api/chat', {
        headers: {
          "Content-type": "application/json"
        },
        body: input,
        method: "POST"
      })
      if (await hasEvents(res)) {
        const eventData = (await res.json())
        setEvent(eventData)
        openModal()
      } else {
        const botMessage: IChatMessage = {
          message: "await res.json()",
          time: new Date().toISOString(),
          user: "bot"
        }

        setHistory((prevHistory) => [...prevHistory, botMessage])
      }
      setInput("")
    }
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [history])

  return (
    <>
      {" "}
      <EventsModal isOpen={isOpen} closeModal={closeModal} events={events}/>
      <div className="chat-wrapper px-5 flex flex-col justify-between">
        <div className="px-[3vh]" style={{ overflowY: "auto" }}>
          {history.map((msg) => (
            <div className="max-w-full">
              {msg.user === "bot" ? (
                <BotMessage message={msg.message} />
              ) : (
                <UserMessage message={msg.message} />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div style={{ marginTop: "auto" }}>
          <div className="flex gap-x-[2vh]">
            <input value={input} onChange={handleInputChange} />
            <button type="button" onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </>
  )
}
