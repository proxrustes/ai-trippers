import { Event } from "@/definitions/types/event"

interface Props {
    event: Event
  }


export default function EventCard({ event }: Props){
    return(<div className="event-card duration-150
    text-center
    hover:scale-105 hover:shadow-lg h-[45vh] pt-[4vh]">
      
      <div className="bg-waves bg-[#78A1BB] py-[4vh]">
      <div className="bg-[#283044] py-[1vh]">
      <h1 className="text-[3vh] font-black text-[#D9D9D9]">{event.departs_from}</h1>
        </div>    </div>
        <h1 className="text-[2vh] font-black">{event.duration} ({event.availability})</h1>
        <p className="text-[2vh] p-[2vh]">{event.level}, accomodations {event.accommodation}</p>
        </div>)
}