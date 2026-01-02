"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface Racetrack {
  id: string
  name: string
  city: string
  state: string
  total_deaths: number
  latitude?: number
  longitude?: number
  lat?: number
  lon?: number
}

interface DataAndMapSectionProps {
  totalDeaths: number
  racetracks: Racetrack[] | null
}

export function DataAndMapSection({ totalDeaths, racetracks }: DataAndMapSectionProps) {
  const [selectedTrack, setSelectedTrack] = useState<Racetrack | null>(null)

  const tracks = racetracks || []

  return (
    <section className="py-20 md:py-32 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 md:mb-24">
          <p className="text-lg text-muted-foreground mb-4 tracking-wide">DOCUMENTED RACEHORSE DEATHS IN INDIA</p>
          <div className="font-serif text-7xl md:text-9xl font-bold text-destructive text-balance">{totalDeaths}+</div>
        </div>

        {/* India Map Visualization */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Map Container */}
          <div className="md:col-span-2">
            <div className="relative w-full aspect-square md:aspect-auto md:h-96 bg-muted rounded-lg overflow-hidden border border-border">
              {/* Simple map placeholder with track markers */}
              <svg viewBox="0 0 500 600" className="w-full h-full">
                {/* India outline (simplified) */}
                <path
                  d="M 250 50 Q 280 80 300 120 L 320 180 Q 330 220 320 260 L 310 320 Q 300 360 270 380 L 200 390 Q 150 380 130 330 L 120 260 Q 110 180 130 120 Q 160 70 250 50 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground"
                />

                {/* Racetrack markers */}
                {tracks.map((track) => {
                  const lat = track.latitude ?? track.lat ?? 20
                  const lon = track.longitude ?? track.lon ?? 77

                  // Normalize lat/lon to SVG coordinates
                  const x = 250 + (lon - 77) * 15
                  const y = 200 + (lat - 20) * 15
                  const size = Math.max(8, Math.min(24, (track.total_deaths / Math.max(totalDeaths, 1)) * 40))

                  return (
                    <g
                      key={track.id}
                      onMouseEnter={() => setSelectedTrack(track)}
                      onMouseLeave={() => setSelectedTrack(null)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={size}
                        fill="rgb(220, 38, 38)"
                        fillOpacity="0.7"
                        className="hover:opacity-100"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r={size}
                        fill="none"
                        stroke="rgb(220, 38, 38)"
                        strokeWidth="2"
                        opacity="0"
                        className="group-hover:opacity-100"
                      />
                    </g>
                  )
                })}
              </svg>

              {/* Hover Tooltip */}
              {selectedTrack && (
                <div className="absolute bottom-4 left-4 bg-foreground text-background p-3 rounded-lg shadow-lg max-w-xs">
                  <p className="font-semibold text-sm">{selectedTrack.name}</p>
                  <p className="text-xs text-background/80">
                    {selectedTrack.city}, {selectedTrack.state}
                  </p>
                  <p className="font-bold text-lg mt-2">{selectedTrack.total_deaths} deaths</p>
                </div>
              )}
            </div>
          </div>

          {/* Track List */}
          <div className="space-y-3 md:max-h-96 md:overflow-y-auto">
            {tracks.length > 0 ? (
              tracks
                .sort((a, b) => b.total_deaths - a.total_deaths)
                .map((track) => (
                  <Card
                    key={track.id}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedTrack?.id === track.id
                        ? "border-primary border-2 bg-primary/5"
                        : "hover:border-primary hover:bg-muted"
                    }`}
                    onMouseEnter={() => setSelectedTrack(track)}
                    onMouseLeave={() => setSelectedTrack(null)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{track.name}</p>
                        <p className="text-xs text-muted-foreground">{track.city}</p>
                      </div>
                      <p className="font-bold text-lg text-destructive">{track.total_deaths}</p>
                    </div>
                  </Card>
                ))
            ) : (
              <div className="text-center text-sm text-muted-foreground py-8">
                <p>Loading racetrack data...</p>
              </div>
            )}
          </div>
        </div>

        {/* Context note */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Note:</span> These numbers represent only officially
            documented deaths. The actual count is significantly higher, as many injuries and deaths go unreported in
            the racing industry.
          </p>
        </div>
      </div>
    </section>
  )
}
