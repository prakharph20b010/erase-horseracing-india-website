"use client"

import type { Racetrack } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, TrendingUp } from "lucide-react"
import { useState } from "react"

interface RacetrackMapProps {
  racetracks: Racetrack[]
}

export function RacetrackMap({ racetracks }: RacetrackMapProps) {
  const [selectedTrack, setSelectedTrack] = useState<Racetrack | null>(null)

  // Calculate bounds for the map (India's approximate bounds)
  const indiaBounds = {
    minLat: 6.5,
    maxLat: 35.5,
    minLng: 68,
    maxLng: 97.5,
  }

  // Convert lat/lng to percentage for positioning
  const getPosition = (lat: number, lng: number) => {
    const x = ((lng - indiaBounds.minLng) / (indiaBounds.maxLng - indiaBounds.minLng)) * 100
    const y = ((indiaBounds.maxLat - lat) / (indiaBounds.maxLat - indiaBounds.minLat)) * 100
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
  }

  // Calculate marker size based on deaths
  const getMarkerSize = (deaths: number) => {
    const maxDeaths = Math.max(...racetracks.map((t) => t.total_deaths))
    const minSize = 12
    const maxSize = 32
    return minSize + (deaths / maxDeaths) * (maxSize - minSize)
  }

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative w-full aspect-[16/10] bg-muted/30">
            {/* Map Background - Simplified India outline */}
            <div className="absolute inset-0 p-8">
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
                <path
                  d="M 20,10 L 25,15 L 30,12 L 35,15 L 40,10 L 45,15 L 48,12 L 52,15 L 55,20 L 58,25 L 60,30 L 62,40 L 63,50 L 62,60 L 60,70 L 55,75 L 50,78 L 45,80 L 40,82 L 35,80 L 30,78 L 25,75 L 22,70 L 20,65 L 18,60 L 17,50 L 18,40 L 19,30 L 20,20 Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </svg>
            </div>

            {/* Racetrack Markers */}
            {racetracks.map((track) => {
              if (!track.latitude || !track.longitude) return null

              const pos = getPosition(Number(track.latitude), Number(track.longitude))
              const size = getMarkerSize(track.total_deaths)

              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                  }}
                  aria-label={`${track.name} - ${track.total_deaths} deaths`}
                >
                  <div
                    className={`w-full h-full rounded-full flex items-center justify-center ${
                      selectedTrack?.id === track.id
                        ? "bg-destructive shadow-lg ring-2 ring-destructive ring-offset-2"
                        : "bg-destructive/80 hover:bg-destructive"
                    }`}
                  >
                    <MapPin className="h-1/2 w-1/2 text-white" />
                  </div>
                </button>
              )
            })}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur p-4 rounded-lg shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Racetrack</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Size = Death count</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Track Info */}
      {selectedTrack && (
        <Card className="border-2 border-primary">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-foreground">{selectedTrack.name}</h3>
                <p className="text-muted-foreground">
                  {selectedTrack.city}, {selectedTrack.state}
                </p>
              </div>
              <div className="text-right">
                <div className="font-serif text-3xl font-bold text-destructive">{selectedTrack.total_deaths}</div>
                <p className="text-sm text-muted-foreground">Deaths</p>
              </div>
            </div>
            {selectedTrack.description && (
              <p className="text-muted-foreground leading-relaxed">{selectedTrack.description}</p>
            )}
            <div className="mt-4 inline-flex items-center gap-1 text-sm">
              <span
                className={`px-2 py-1 rounded ${
                  selectedTrack.status === "active"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-muted-foreground"
                }`}
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
