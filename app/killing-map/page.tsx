import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AlertTriangle } from "lucide-react"
import InteractiveIndiaMap from "@/components/interactive-india-map"
import content from "@/data/pages/killing-map.json"
import type { Racetrack } from "@/lib/types"
import { EditableText } from "@/components/editable/editable-text"
import { AddItemButton, RemoveItemButton } from "@/components/editable/list-controls"

export const metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
}

export default function KillingMapPage() {
  const racetracks = content.racetracks as Racetrack[]
  const totalDeaths = racetracks.reduce((sum, track) => sum + track.total_deaths, 0)

  const stats = content.stats.map((stat) => {
    if (stat.value === "{totalDeaths}+") {
      return { ...stat, value: `${totalDeaths}+` }
    }
    if (stat.value === "{trackCount}") {
      return { ...stat, value: String(racetracks.length) }
    }
    return stat
  })

  const toneToRing = (tone: string) => {
    if (tone === "destructive") return "text-destructive"
    if (tone === "accent") return "text-accent"
    return "text-primary"
  }

  const toneToBg = (tone: string) => {
    if (tone === "destructive") return "bg-destructive/20"
    if (tone === "accent") return "bg-accent/20"
    return "bg-primary/20"
  }

  const toneToCard = (tone: string) => {
    if (tone === "destructive") return "from-destructive/10 to-destructive/5 border-destructive/20 hover:border-destructive/40"
    if (tone === "accent") return "from-accent/10 to-accent/5 border-accent/20 hover:border-accent/40"
    return "from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="py-20 md:py-32 px-6 bg-gradient-to-br from-destructive/5 via-transparent to-accent/5 border-b relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-10 w-72 h-72 bg-destructive/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto max-w-4xl text-center space-y-6 relative z-10">
            <EditableText
              file="data/pages/killing-map.json"
              path={["hero", "title"]}
              value={content.hero.title}
              as="h1"
              className="font-serif text-5xl md:text-6xl font-bold text-foreground"
            />
            <EditableText
              file="data/pages/killing-map.json"
              path={["hero", "subtitle"]}
              value={content.hero.subtitle}
              as="p"
              className="text-xl text-muted-foreground leading-relaxed"
            />
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {stats.map((stat, idx) => (
                <div
                  key={stat.title}
                  className={`group p-8 rounded-2xl bg-gradient-to-br ${toneToCard(stat.tone)} border transition-all hover:shadow-lg`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg ${toneToBg(stat.tone)} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <AlertTriangle className={`h-6 w-6 ${toneToRing(stat.tone)}`} />
                    </div>
                    <EditableText
                      file="data/pages/killing-map.json"
                      path={["stats", idx, "title"]}
                      value={stat.title}
                      as="h3"
                      className="font-serif text-xl font-bold"
                    />
                  </div>
                  <p className={`text-4xl font-bold ${toneToRing(stat.tone)}`}>{stat.value}</p>
                  <EditableText
                    file="data/pages/killing-map.json"
                    path={["stats", idx, "subtitle"]}
                    value={stat.subtitle}
                    as="p"
                    className="text-sm text-muted-foreground mt-2"
                  />
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="mb-16">
              <EditableText
                file="data/pages/killing-map.json"
                path={["map", "title"]}
                value={content.map.title}
                as="h2"
                className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center"
              />

              <InteractiveIndiaMap racetracks={racetracks} />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {racetracks.map((track, idx) => (
                <div key={track.id} className="rounded-lg border p-4 relative">
                  <RemoveItemButton file="data/pages/killing-map.json" path={["racetracks"]} index={idx} />
                  <EditableText
                    file="data/pages/killing-map.json"
                    path={["racetracks", idx, "name"]}
                    value={track.name}
                    as="h3"
                    className="font-semibold"
                  />
                  <EditableText
                    file="data/pages/killing-map.json"
                    path={["racetracks", idx, "city"]}
                    value={track.city}
                    as="p"
                    className="text-sm text-muted-foreground"
                  />
                </div>
              ))}
            </div>

            <AddItemButton
              file="data/pages/killing-map.json"
              path={["racetracks"]}
              label="+ Add Racetrack"
              template={{
                id: String(Date.now()),
                name: "New Racetrack",
                city: "City",
                state: "State",
                latitude: 0,
                longitude: 0,
                description: null,
                total_deaths: 0,
                status: "active",
                created_at: new Date().toISOString().slice(0, 10),
                updated_at: new Date().toISOString().slice(0, 10),
              }}
            />

            {/* Context */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-muted/30 to-muted/10 border border-border/40">
              <EditableText
                file="data/pages/killing-map.json"
                path={["context", "title"]}
                value={content.context.title}
                as="h3"
                className="font-serif text-2xl font-bold mb-2"
              />
              <EditableText
                file="data/pages/killing-map.json"
                path={["context", "text"]}
                value={content.context.text}
                as="p"
                multiline
                className="text-muted-foreground leading-relaxed"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
