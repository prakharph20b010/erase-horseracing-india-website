"use client"

import dynamic from "next/dynamic"
import type { Racetrack } from "@/lib/types"

const InteractiveIndiaMap = dynamic(() => import("./interactive-india-map"), { ssr: false })

interface Props {
  racetracks: Racetrack[]
}

export default function InteractiveIndiaMapClient({ racetracks }: Props) {
  return <InteractiveIndiaMap racetracks={racetracks} />
}
