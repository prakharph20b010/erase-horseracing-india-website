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
  // default: show all sections expanded for easier reading
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [expandAll, setExpandAll] = useState(true)
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

        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">Sections: {content.sections.length}</p>
              <div className="flex items-center gap-3">
                <button
                  className="text-sm text-primary underline"
                  onClick={() => setExpandAll((s) => !s)}
                >
                  {expandAll ? "Collapse all" : "Expand all"}
                </button>
                {ready && enabled && (
                  <AddItemButton
                    file="data/pages/what-is-horseracing.json"
                    path={["sections"]}
                    label="+ Add Section"
                    template={{ title: "New Section", content: "", image: "", youtubeId: "" }}
                  />
                )}
              </div>
            </div>

            <div className="space-y-8">
              {content.sections.map((section, idx) => {
                const isOpen = expandAll || expandedIndex === idx
                return (
                  <article key={idx} className="grid md:grid-cols-3 gap-6 items-start">
                    <div className="md:col-span-1">
                      {(section.image || (ready && enabled)) && (
                        <div className="mb-4">
                          <EditableImage
                            file="data/pages/what-is-horseracing.json"
                            path={["sections", idx, "image"]}
                            src={section.image || ""}
                            alt={section.title}
                            uploadDir="pages/what-is-horseracing/sections"
                            uploadName={section.title}
                            placeholderText="No image available"
                            className={`w-full h-44 md:h-56 rounded-lg object-cover transition-all duration-300 ${
                              section.blur && !revealed.includes(idx) ? "blur-md" : ""
                            }`}
                          />

                          {section.blur && !revealed.includes(idx) && (
                            <button
                              onClick={() => setRevealed((prev) => [...prev, idx])}
                              className="mt-2 text-xs text-muted-foreground"
                            >
                              Reveal sensitive image
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <header className="flex items-start justify-between">
                        <EditableText
                          file="data/pages/what-is-horseracing.json"
                          path={["sections", idx, "title"]}
                          value={section.title}
                          as="h3"
                          className="font-serif text-2xl md:text-3xl font-bold leading-tight"
                        />

                        <button
                          onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                          aria-expanded={isOpen}
                          className="ml-4 text-muted-foreground"
                        >
                          <ChevronDown className={`w-6 h-6 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                      </header>

                      <div className="mt-4 text-lg md:text-xl leading-relaxed text-muted-foreground prose prose-lg max-w-none">
                        {section.youtubeId && (
                          <iframe
                            className="w-full aspect-video rounded-lg mb-4"
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
                          className="whitespace-pre-line"
                        />
                      </div>

                      {ready && enabled && (
                        <div className="mt-4">
                          <RemoveItemButton file="data/pages/what-is-horseracing.json" path={["sections"]} index={idx} />
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
