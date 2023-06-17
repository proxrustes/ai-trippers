import { Dev } from "@/definitions/types/dev"
import Image from "next/image"

interface Props {
  dev?: Dev
}

export default function DevCard({ dev }: Props) {
  return (
    <div
      className="cardItem
    text-center w-[20vw]"
    >
      <center>
        <Image
          src={dev.link}
          alt=""
          width={500}
          height={500}
          className="rounded-full w-[30vh] h-[30vh] mb-[1vh]"
        />
        <div className="font-black italic">
          <h1>{dev.username}</h1>
        </div>

        <h2 className=" tracking-[0.3vh]">{dev.role}</h2>
      </center>
    </div>
  )
}
