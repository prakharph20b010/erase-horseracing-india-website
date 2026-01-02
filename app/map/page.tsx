import { createClient } from "@/lib/supabase/server"
import type { Racetrack } from "@/lib/types"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RacetrackMap } from "@/components/racetrack-map"
import { RacetrackList } from "@/components/racetrack-list"

export const metadata = {
  title: "Racetrack Map - Erase Horseracing India",
  description: "Explore racetracks across India and see the documented deaths at each venue.",
}

export default async function MapPage() {
  const supabase = await createClient()

  const { data: racetracks, error } = await supabase
    .from("racetracks")
    .select("*")
    .order("total_deaths", { ascending: false })

  if (error) {
    console.error("Error fetching racetracks:", error)
  }

  const totalDeaths = racetracks?.reduce((sum, track) => sum + (track.total_deaths || 0), 0) || 0
  const activeRacetracks = racetracks?.filter((t) => t.status === "active").length || 0

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Header Section */}
        <section className="py-16 md:py-20 px-6 bg-muted/30 border-b">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground text-balance">Map of Suffering</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Each marker represents a racetrack where horses have died. This interactive map reveals the nationwide
              scale of racing's toll on horses.
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto pt-4">
              <div className="space-y-1">
                <div className="font-serif text-4xl font-bold text-destructive">{totalDeaths}+</div>
                <p className="text-sm text-muted-foreground">Total Deaths</p>
              </div>
              <div className="space-y-1">
                <div className="font-serif text-4xl font-bold text-foreground">{activeRacetracks}</div>
                <p className="text-sm text-muted-foreground">Active Tracks</p>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 md:py-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <RacetrackMap racetracks={(racetracks as Racetrack[]) || []} />
          </div>
        </section>

        {/* Racetrack List */}
        <section className="py-12 md:py-16 px-6 bg-muted/30">
          <div className="container mx-auto max-w-5xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Racetracks by Deaths
            </h2>
            <RacetrackList racetracks={(racetracks as Racetrack[]) || []} />
          </div>
        </section>

        {/* Context Section */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Understanding the Data</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  These numbers represent only documented deaths—horses who died on the track, in training, or shortly
                  after racing. The true toll is likely much higher.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-muted/50 rounded-lg space-y-3">
                  <h3 className="font-serif text-xl font-bold">What's Not Counted</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Horses sent to slaughter after racing careers end</li>
                    <li>• Deaths during transport to and from tracks</li>
                    <li>• Training injuries that lead to euthanasia</li>
                    <li>• Long-term health issues from racing stress</li>
                  </ul>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg space-y-3">
                  <h3 className="font-serif text-xl font-bold">Why This Matters</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Each death is 100% preventable</li>
                    <li>• Industry self-regulation has failed</li>
                    <li>• Public awareness drives policy change</li>
                    <li>• Transparency holds the industry accountable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-3xl text-center space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Help Us Track Every Loss</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              If you've witnessed a racing death or injury at any of these venues, your report helps us document the
              true cost of racing.
            </p>
            <div className="pt-4">
              <a
                href="/report"
                className="inline-flex items-center justify-center h-12 px-8 text-lg font-medium bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors"
              >
                Submit a Report
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
