import { Event } from "@/definitions/types/event"
import EventCard from "./EventCard"

interface Props {
  events: Event[]
}

export default function EventGrid({ events }: Props) {
  return (
    <div
      className="grid grid-cols-3
    justify-center gap-[4vh] mx-auto mt-[10vh] mb-[10vh]"
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
