"use client"

import type { Horse } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
// Use the passed `horses` array for indexing so newly-added items are editable immediately
import { EditableText } from "@/components/editable/editable-text"
import { EditableImage } from "@/components/editable/editable-image"
import { RemoveItemButton } from "@/components/editable/list-controls"
import { useEditMode } from "@/components/editable/use-edit-mode"

interface MemorialGridProps {
  horses: Horse[]
}

export function MemorialGrid({ horses }: MemorialGridProps) {
  const { ready, enabled } = useEditMode()
  const editActive = ready && enabled
  const indexById = new Map<string, number>()
  ;(horses as Horse[]).forEach((m, i) => {
    if (m.id) indexById.set(m.id, i)
  })

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {horses.map((horse) => {
        const idx = indexById.get(horse.id)
        const CardWrapper: any = editActive ? "div" : Link
        const wrapperProps = editActive ? {} : { href: `/memorials/${horse.slug}` }
        return (
          <Card
            key={horse.id}
            className="overflow-hidden hover:shadow-lg transition-shadow group relative"
          >
            {typeof idx === "number" && (
              <RemoveItemButton file="data/memorials.json" path={[]} index={idx} />
            )}
            <CardWrapper {...wrapperProps}>
              <div className="aspect-[4/3] w-full overflow-hidden bg-muted flex items-center justify-center">
                {typeof idx === "number" ? (
                  <EditableImage
                    file="data/memorials.json"
                    path={[idx, "image_url"]}
                    src={horse.image_url?.replace(/^\/+/, "") || ""}
                    alt={horse.name}
                    uploadDir="pages/memorials/cards"
                    uploadName={horse.slug || horse.name}
                    placeholderText="No image available"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : horse.image_url ? (
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
                <h3 className="font-serif text-2xl font-bold group-hover:text-primary transition-colors">
                  {typeof idx === "number" ? (
                    <EditableText file="data/memorials.json" path={[idx, "name"]} value={horse.name} as="span" />
                  ) : (
                    horse.name
                  )}
                </h3>

                <div className="space-y-1 text-sm text-muted-foreground">
                  {horse.date_of_death && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time>
                        {horse.date_of_death
                          ? new Date(horse.date_of_death).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : ""}
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

                {horse.cause_of_death && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Incident:</span>{" "}
                    {typeof idx === "number" ? (
                      <EditableText file="data/memorials.json" path={[idx, "cause_of_death"]} value={horse.cause_of_death} as="span" />
                    ) : (
                      horse.cause_of_death
                    )}
                  </p>
                )}

                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {typeof idx === "number" ? (
                    <EditableText file="data/memorials.json" path={[idx, "story"]} value={horse.story} as="span" />
                  ) : (
                    horse.story
                  )}
                </p>
              </CardContent>
            </CardWrapper>
          </Card>
        )
      })}
    </div>
  )
}
