import type { Horse } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Calendar } from "lucide-react"

interface MemorialGridProps {
  horses: Horse[]
}

export function MemorialGrid({ horses }: MemorialGridProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {horses.map((horse) => (
        <Card key={horse.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
          <Link href={`/memorials/${horse.slug}`}>
            {horse.image_url && (
              <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                  src={horse.image_url || "/placeholder.svg"}
                  alt={horse.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <CardContent className="p-6 space-y-3">
              <h3 className="font-serif text-2xl font-bold group-hover:text-primary transition-colors">{horse.name}</h3>
              {horse.date_of_death && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <time>
                    {new Date(horse.date_of_death).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              )}
              {horse.cause_of_death && <p className="text-sm text-muted-foreground">Cause: {horse.cause_of_death}</p>}
              <p className="text-muted-foreground leading-relaxed line-clamp-3">{horse.story}</p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}
