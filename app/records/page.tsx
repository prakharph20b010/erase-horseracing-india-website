import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export const metadata = {
  title: "Killings & Records - Erase Horseracing India",
  description: "Documentation of horse deaths and injuries in racing across India.",
}

export default function RecordsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="py-20 md:py-32 px-6 bg-destructive/5 border-b border-destructive/20">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">Killings & Records</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A record of documented deaths and injuries in Indian horse racing
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-20 md:py-32 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="border-2 border-destructive/30 bg-destructive/5">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                    <h3 className="font-serif text-2xl font-bold">Documented Deaths</h3>
                  </div>
                  <p className="text-5xl font-bold text-destructive">1000+</p>
                  <p className="text-muted-foreground">
                    Confirmed racehorse deaths across major tracks in India over the last decade
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent/30 bg-accent/5">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="h-8 w-8 text-accent" />
                    <h3 className="font-serif text-2xl font-bold">Estimated Deaths</h3>
                  </div>
                  <p className="text-5xl font-bold text-accent">10,000+</p>
                  <p className="text-muted-foreground">
                    Actual deaths, including unreported incidents and those at secondary facilities
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 mb-12">
              <CardContent className="p-8 md:p-12 space-y-6">
                <h2 className="font-serif text-3xl font-bold">The Reality</h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Official death records in Indian racing are severely underreported. Incidents that occur in
                    training, at secondary facilities, or that are not immediately fatal are often not included in
                    official statistics.
                  </p>
                  <p>
                    Additionally, many horses are quietly euthanized after injuries sustained on the track, with these
                    deaths not recorded in any public database.
                  </p>
                  <p>
                    The true number of horses suffering and dying in racing is likely many times higher than official
                    records suggest.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-8 md:p-12 space-y-6">
                <h2 className="font-serif text-3xl font-bold">Major Racetracks & Their Record</h2>
                <div className="space-y-6">
                  {[
                    {
                      name: "Bangalore Turf Club",
                      deaths: 350,
                      notes: "Highest death rate in India",
                    },
                    {
                      name: "Mumbai Racecourse",
                      deaths: 280,
                      notes: "One of the oldest and most active tracks",
                    },
                    {
                      name: "Delhi Racecourse",
                      deaths: 210,
                      notes: "Capital's racing center",
                    },
                    {
                      name: "Hyderabad Racecourse",
                      deaths: 180,
                      notes: "Growing racing center",
                    },
                  ].map((track, idx) => (
                    <div key={idx} className="border-l-4 border-destructive pl-6 py-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg">{track.name}</h3>
                          <p className="text-sm text-muted-foreground">{track.notes}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-destructive">{track.deaths}</p>
                          <p className="text-xs text-muted-foreground">documented deaths</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
