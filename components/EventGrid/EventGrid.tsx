import { Event } from "@/definitions/types/event"
import EventCard from "./EventCard"

interface Props {
  events?: Event[]
  }

export default function EventGrid({ events }: Props){
    return(<div  className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2
    justify-center gap-[16px] min-h-[150px] my-[56px] mx-auto"
      >
        {events.map((event) => <EventCard key={event.id} event={event}/>)}
        </div>)
}