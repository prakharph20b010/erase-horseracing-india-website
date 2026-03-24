"use client"

import { useMemo, useState } from "react"
import type { Racetrack } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, TrendingUp } from "lucide-react"

interface RacetrackMapProps {
  racetracks: Racetrack[]
}

type MapTrack = Racetrack & {
  latitude?: string | number
  longitude?: string | number
}

export function RacetrackMap({ racetracks }: RacetrackMapProps) {
  const [selectedTrack, setSelectedTrack] = useState<MapTrack | null>(null)

  const tracks = racetracks as MapTrack[]

  const maxDeaths = useMemo(() => {
    return Math.max(1, ...tracks.map((t) => Number(t.total_deaths ?? 0)))
  }, [tracks])

  // Approximate India bounds for lat/lng -> percentage positioning
  // Adjust these slightly if you want to shift dots more precisely.
  const indiaBounds = {
    minLat: 6.5,
    maxLat: 35.8,
    minLng: 68,
    maxLng: 97.8,
  }

  const getPosition = (lat: number, lng: number) => {
    const x =
      ((lng - indiaBounds.minLng) / (indiaBounds.maxLng - indiaBounds.minLng)) * 100
    const y =
      ((indiaBounds.maxLat - lat) / (indiaBounds.maxLat - indiaBounds.minLat)) * 100

    return {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    }
  }

  const getMarkerSize = (deaths: number) => {
    const value = Math.max(0, Number(deaths) || 0)
    const scaled = Math.sqrt(value / maxDeaths)
    const minSize = 14
    const maxSize = 34
    return minSize + scaled * (maxSize - minSize)
  }

  const visibleTracks = tracks.filter((track) => {
    return track.latitude != null && track.longitude != null
  })

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/20">
            {/* India map background */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <img
                src="/india.svg"
                alt="India map"
                className="h-full w-full object-contain opacity-80 select-none pointer-events-none"
                draggable={false}
              />
            </div>

            {/* soft overlay to make markers stand out */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/10 pointer-events-none" />

            {/* markers */}
            {visibleTracks.map((track) => {
              const lat = Number(track.latitude)
              const lng = Number(track.longitude)
              if (Number.isNaN(lat) || Number.isNaN(lng)) return null

              const { x, y } = getPosition(lat, lng)
              const size = getMarkerSize(Number(track.total_deaths ?? 0))
              const isSelected = selectedTrack?.id === track.id

              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setSelectedTrack(track)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none transition-transform duration-200 hover:scale-110 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                  }}
                  aria-label={`${track.name}, ${track.total_deaths} deaths`}
                >
                  <div
                    className={[
                      "flex h-full w-full items-center justify-center rounded-full",
                      "border border-white/70 shadow-md",
                      isSelected
                        ? "bg-destructive ring-4 ring-destructive/20"
                        : "bg-destructive/80 hover:bg-destructive",
                    ].join(" ")}
                  >
                    <MapPin className="h-1/2 w-1/2 text-white" />
                  </div>
                </button>
              )
            })}

            {/* legend */}
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

            {/* empty state */}
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
