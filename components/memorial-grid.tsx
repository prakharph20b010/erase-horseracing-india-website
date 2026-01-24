import type { Horse } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"

interface MemorialGridProps {
  horses: Horse[]
}

export function MemorialGrid({ horses }: MemorialGridProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {horses.map((horse) => (
        <Card
          key={horse.id}
          className="overflow-hidden hover:shadow-lg transition-shadow group"
        >
          <Link href={`/memorials/${horse.slug}`}>

            {/* Image (or placeholder space) */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-muted flex items-center justify-center">
              {horse.image_url ? (
                <img
                  src={horse.image_url.replace(/^\/+/, "")}
                  alt={horse.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

              ) : (
                <span className="text-sm text-muted-foreground italic">
                  No image available
                </span>
              )}
            </div>

            <CardContent className="p-6 space-y-4">
              {/* Horse name */}
              <h3 className="font-serif text-2xl font-bold group-hover:text-primary transition-colors">
                {horse.name}
              </h3>

              {/* Date & Place of Death */}
              <div className="space-y-1 text-sm text-muted-foreground">
                {horse.date_of_death && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time>
                      {new Date(horse.date_of_death).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                )}

                {horse.racetrack_id && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{horse.racetrack_id}</span>
                  </div>
                )}
              </div>

              {/* Cause of death */}
              {horse.cause_of_death && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Incident:</span>{" "}
                  {horse.cause_of_death}
                </p>
              )}

              {/* Story */}
              <p className="text-muted-foreground leading-relaxed line-clamp-3">
                {horse.story}
              </p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}
