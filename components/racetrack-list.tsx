import type { Racetrack } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, AlertTriangle } from "lucide-react"

interface RacetrackListProps {
  racetracks: Racetrack[]
}

export function RacetrackList({ racetracks }: RacetrackListProps) {
  return (
    <div className="space-y-4">
      {racetracks.map((track, index) => (
        <Card key={track.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Rank */}
              <div className="flex-shrink-0 text-center">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <span className="font-serif text-xl font-bold text-muted-foreground">#{index + 1}</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground">{track.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">
                        {track.city}, {track.state}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-serif text-3xl md:text-4xl font-bold text-destructive">
                      {track.total_deaths}
                    </div>
                    <p className="text-xs text-muted-foreground">deaths</p>
                  </div>
                </div>

                {track.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{track.description}</p>
                )}

                <div className="flex items-center gap-2">
                  {track.status === "active" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-destructive/10 text-destructive">
                      <AlertTriangle className="h-3 w-3" />
                      Currently Operating
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                      Closed
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
