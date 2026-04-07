"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import content from "@/data/pages/what-is-horseracing.json"
import { EditableText } from "@/components/editable/editable-text"
import { EditableImage } from "@/components/editable/editable-image"
import { AddItemButton, RemoveItemButton } from "@/components/editable/list-controls"
import { useEditMode } from "@/components/editable/use-edit-mode"

export default function WhatIsHorseracingPage() {
  const [expandedIndex, setExpandedIndex] = useState(0)
  const [revealed, setRevealed] = useState<number[]>([])
  const { ready, enabled } = useEditMode()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <section className="py-20 md:py-32 px-6 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border-b relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto max-w-4xl text-center space-y-6 relative z-10">
            <EditableText
              file="data/pages/what-is-horseracing.json"
              path={["hero", "title"]}
              value={content.hero.title}
              as="h1"
              className="font-serif text-5xl md:text-6xl font-bold text-foreground"
            />
            <EditableText
              file="data/pages/what-is-horseracing.json"
              path={["hero", "subtitle"]}
              value={content.hero.subtitle}
              as="p"
              multiline
              className="text-xl text-muted-foreground leading-relaxed"
            />
          </div>
        </section>

        <section className="py-20 md:py-32 px-6">
          <div className="container mx-auto max-w-4xl space-y-4">
            {content.sections.map((section, idx) => (
              <div key={idx} className="rounded-xl border border-border/40 relative">
                <RemoveItemButton file="data/pages/what-is-horseracing.json" path={["sections"]} index={idx} />
                <button
                  onClick={() => setExpandedIndex(expandedIndex === idx ? -1 : idx)}
                  className="w-full px-6 py-6 text-left flex items-start"
                >
                  <div className="flex-1">
                    <EditableText
                      file="data/pages/what-is-horseracing.json"
                      path={["sections", idx, "title"]}
                      value={section.title}
                      as="h2"
                      className="text-2xl font-bold"
                    />
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform ${
                      expandedIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedIndex === idx && (
                  <div className="px-6 pb-6 space-y-6">
                    {(section.image || (ready && enabled)) && (
                      <div className="relative">
                        <EditableImage
                          file="data/pages/what-is-horseracing.json"
                          path={["sections", idx, "image"]}
                          src={section.image || ""}
                          alt={section.title}
                          uploadDir="pages/what-is-horseracing/sections"
                          uploadName={section.title}
                          placeholderText="No image available"
                          className={`w-full rounded-lg object-cover transition-all duration-300 ${
                            section.blur && !revealed.includes(idx) ? "blur-md" : ""
                          }`}
                        />

                        {section.blur && !revealed.includes(idx) && (
                          <button
                            onClick={() => setRevealed((prev) => [...prev, idx])}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <span className="bg-black/70 text-white text-sm px-4 py-2 rounded">
                              Sensitive content â€” tap to reveal
                            </span>
                          </button>
                        )}
                      </div>
                    )}

                    {section.youtubeId && (
                      <iframe
                        className="w-full aspect-video rounded-lg"
                        src={`https://www.youtube.com/embed/${section.youtubeId}`}
                        allowFullScreen
                      />
                    )}

                    <EditableText
                      file="data/pages/what-is-horseracing.json"
                      path={["sections", idx, "content"]}
                      value={section.content}
                      as="div"
                      multiline
                      className="text-lg text-muted-foreground leading-relaxed tracking-normal whitespace-pre-line"
                    />
                  </div>
                )}
              </div>
            ))}

            <AddItemButton
              file="data/pages/what-is-horseracing.json"
              path={["sections"]}
              label="+ Add Section"
              template={{ title: "New Section", content: "", image: "", youtubeId: "" }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
