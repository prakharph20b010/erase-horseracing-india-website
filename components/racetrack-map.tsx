"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, TrendingUp } from "lucide-react"
import type { Racetrack } from "@/lib/types"

interface RacetrackMapProps {
  racetracks: Racetrack[]
}

type TrackWithCoords = Racetrack & {
  lat?: number | string
  lng?: number | string
  latitude?: number | string
  longitude?: number | string
}

function getNumber(value: unknown) {
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

export function RacetrackMap({ racetracks }: RacetrackMapProps) {
  const [selectedTrack, setSelectedTrack] = useState<TrackWithCoords | null>(null)

  const tracks = racetracks as TrackWithCoords[]

  const maxDeaths = useMemo(() => {
    const values = tracks.map((t) => getNumber(t.total_deaths) ?? 0)
    return Math.max(1, ...values)
  }, [tracks])

  // Tune these if dots still need a small shift.
  const bounds = {
    minLat: 6.5,
    maxLat: 37.5,
    minLng: 68,
    maxLng: 98,
  }

  const project = (lat: number, lng: number) => {
    const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100
    const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100

    return {
      x: Math.max(2, Math.min(98, x)),
      y: Math.max(2, Math.min(98, y)),
    }
  }

  const getMarkerSize = (deaths: number) => {
    const scaled = Math.sqrt(Math.max(0, deaths) / maxDeaths)
    return 10 + scaled * 18
  }

  const visibleTracks = tracks.filter((track) => {
    const lat = getNumber(track.lat ?? track.latitude)
    const lng = getNumber(track.lng ?? track.longitude)
    return lat !== null && lng !== null
  })

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f3f0ea]">
            <div className="absolute inset-0 flex items-center justify-center p-3">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/india.svg`}
                alt="India map"
                className="h-[92%] w-[92%] object-contain opacity-90 pointer-events-none select-none"
                draggable={false}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/10 pointer-events-none" />

            {visibleTracks.map((track) => {
              const lat = getNumber(track.lat ?? track.latitude)
              const lng = getNumber(track.lng ?? track.longitude)
              if (lat === null || lng === null) return null

              const { x, y } = project(lat, lng)
              const deaths = getNumber(track.total_deaths) ?? 0
              const size = getMarkerSize(deaths)
              const isSelected = selectedTrack?.id === track.id

              return (
                <button
                  key={String(track.id ?? track.name)}
                  type="button"
                  onClick={() => setSelectedTrack(track)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none transition-transform duration-200 hover:scale-110 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                  }}
                  aria-label={`${track.name}, ${deaths} deaths`}
                  title={`${track.name} — ${deaths} deaths`}
                >
                  <div
                    className={[
                      "flex h-full w-full items-center justify-center rounded-full border border-white/70 shadow-md",
                      isSelected ? "bg-destructive ring-4 ring-destructive/20" : "bg-destructive/80",
                    ].join(" ")}
                  >
                    <MapPin className="h-1/2 w-1/2 text-white" />
                  </div>
                </button>
              )
            })}

            <div className="absolute bottom-4 left-4 rounded-lg bg-background/95 p-4 shadow-lg backdrop-blur">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-4 w-4 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Racetrack</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Circle size = death count</span>
              </div>
            </div>

            {visibleTracks.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-lg bg-background/90 px-4 py-2 text-sm text-muted-foreground shadow">
                  No coordinates available to plot on the map.
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedTrack && (
        <Card className="border-2 border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  {selectedTrack.name}
                </h3>
                <p className="text-muted-foreground">
                  {selectedTrack.city}
                  {selectedTrack.state ? `, ${selectedTrack.state}` : ""}
                </p>
              </div>

              <div className="text-right">
                <div className="font-serif text-3xl font-bold text-destructive">
                  {selectedTrack.total_deaths}
                </div>
                <p className="text-sm text-muted-foreground">Deaths</p>
              </div>
            </div>

            {selectedTrack.description ? (
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {selectedTrack.description}
              </p>
            ) : null}

            <div className="mt-4">
              <span
                className={[
                  "inline-flex items-center rounded-full px-3 py-1 text-sm",
                  selectedTrack.status === "active"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-muted-foreground",
                ].join(" ")}
              >
                {selectedTrack.status === "active" ? "Currently Operating" : "Closed"}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
