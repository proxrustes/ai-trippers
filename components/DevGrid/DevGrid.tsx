import { Dev } from "@/definitions/types/dev"
import UserCard from "./UserCard"

interface Props {
  dev: Dev[]
  }

export default function DevGrid({ dev }: Props){
    return(<div  className="flex justify-between px-[15vw]"
      >
        {dev.map((dev) => <UserCard key={dev.id} dev={dev}/>)}
        </div>)
}