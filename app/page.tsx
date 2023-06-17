"use client"

import DevGrid from "@/components/DevGrid/DevGrid";
import { DEV_DATA } from "@/data/dev.data";
export default function Home(){

  return(
      <div>
         <center className="mt-[30vh]">
          <h1 className="text-[8vh] font-serif my-[2vh]">ai-trippers</h1>
        <a className="button"  href="/register">get started</a>
        <h1 className="text-[4vh]  tracking-[0.3vh] font-serif mt-[50vh] mb-[10vh]">meet the team</h1>
<DevGrid dev={DEV_DATA}/>
</center>

      </div>
  )
}