import { Event } from "@/definitions/types/event"
import { ShowEvent } from "../ShowEvent"

interface Props {
    event?: Event
  }


export default function EventCard({ event }: Props){
    console.log(event.description)
    return(<div className="cardItem
    duration-150
    text-center
    hover:scale-105 hover:shadow-lg">
      <div className="title-bg pt-[10px]"><h1>Title</h1></div>
        
        <p className="px-4">description</p>
        </div>)
}