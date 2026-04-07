import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import content from "@/data/pages/records.json"
import { EditableText } from "@/components/editable/editable-text"
import { AddItemButton, RemoveItemButton } from "@/components/editable/list-controls"

export const metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
}

export default function RecordsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="py-20 md:py-32 px-6 bg-destructive/5 border-b border-destructive/20">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <EditableText
              file="data/pages/records.json"
              path={["hero", "title"]}
              value={content.hero.title}
              as="h1"
              className="font-serif text-5xl md:text-6xl font-bold text-foreground"
            />
            <EditableText
              file="data/pages/records.json"
              path={["hero", "subtitle"]}
              value={content.hero.subtitle}
              as="p"
              className="text-xl text-muted-foreground leading-relaxed"
            />
          </div>
        </section>

        {/* Statistics */}
        <section className="py-20 md:py-32 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {content.stats.map((stat, idx) => (
                <Card
                  key={stat.title}
                  className={`border-2 ${
                    stat.tone === "destructive"
                      ? "border-destructive/30 bg-destructive/5"
                      : "border-accent/30 bg-accent/5"
                  }`}
                >
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertTriangle
                        className={`h-8 w-8 ${stat.tone === "destructive" ? "text-destructive" : "text-accent"}`}
                      />
                      <EditableText
                        file="data/pages/records.json"
                        path={["stats", idx, "title"]}
                        value={stat.title}
                        as="h3"
                        className="font-serif text-2xl font-bold"
                      />
                    </div>
                    <EditableText
                      file="data/pages/records.json"
                      path={["stats", idx, "value"]}
                      value={stat.value}
                      as="p"
                      className={`text-5xl font-bold ${stat.tone === "destructive" ? "text-destructive" : "text-accent"}`}
                    />
                    <EditableText
                      file="data/pages/records.json"
                      path={["stats", idx, "description"]}
                      value={stat.description}
                      as="p"
                      multiline
                      className="text-muted-foreground"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 mb-12">
              <CardContent className="p-8 md:p-12 space-y-6">
                <EditableText
                  file="data/pages/records.json"
                  path={["reality", "title"]}
                  value={content.reality.title}
                  as="h2"
                  className="font-serif text-3xl font-bold"
                />
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  {content.reality.paragraphs.map((p, idx) => (
                    <EditableText
                      key={idx}
                      file="data/pages/records.json"
                      path={["reality", "paragraphs", idx]}
                      value={p}
                      as="p"
                      multiline
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-8 md:p-12 space-y-6">
                <EditableText
                  file="data/pages/records.json"
                  path={["tracks", "title"]}
                  value={content.tracks.title}
                  as="h2"
                  className="font-serif text-3xl font-bold"
                />
                <div className="space-y-6">
                  {content.tracks.items.map((track, idx) => (
                    <div key={idx} className="border-l-4 border-destructive pl-6 py-4 relative">
                      <RemoveItemButton file="data/pages/records.json" path={["tracks", "items"]} index={idx} />
                      <div className="flex items-start justify-between">
                        <div>
                          <EditableText
                            file="data/pages/records.json"
                            path={["tracks", "items", idx, "name"]}
                            value={track.name}
                            as="h3"
                            className="font-bold text-lg"
                          />
                          <EditableText
                            file="data/pages/records.json"
                            path={["tracks", "items", idx, "notes"]}
                            value={track.notes}
                            as="p"
                            className="text-sm text-muted-foreground"
                          />
                        </div>
                        <div className="text-right">
                          <EditableText
                            file="data/pages/records.json"
                            path={["tracks", "items", idx, "deaths"]}
                            value={String(track.deaths)}
                            as="p"
                            className="text-3xl font-bold text-destructive"
                          />
                          <p className="text-xs text-muted-foreground">documented deaths</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <AddItemButton
                  file="data/pages/records.json"
                  path={["tracks", "items"]}
                  label="+ Add Track"
                  template={{ name: "New Track", deaths: 0, notes: "Notes..." }}
                />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
