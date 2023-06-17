import { Dev } from "@/definitions/types/dev"

interface Props {
    dev?: Dev
  }

export default function EventCard({ dev }: Props){
    return(<div className="cardItem
    text-center w-[20vw]">
      <center>
<div className="rounded-full bg-white w-[20vh] h-[20vh]"></div>
      <div className="font-black italic"><h1>{dev.username}</h1></div>
        
        <p className="px-4">{dev.role}</p>
        </center>
        </div>)
}