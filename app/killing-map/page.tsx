import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AlertTriangle } from "lucide-react"

export const metadata = {
  title: "Killing Map - Erase Horseracing India",
  description: "Interactive map of documented deaths and injuries across Indian racing tracks.",
}

export default function KillingMapPage() {
  const racetracks = [
    { name: "Bangalore Turf Club", deaths: 350, lat: 13.1939, lng: 77.5941, state: "Karnataka" },
    { name: "Mumbai Racecourse", deaths: 280, lat: 19.0176, lng: 72.8298, state: "Maharashtra" },
    { name: "Delhi Racecourse", deaths: 210, lat: 28.5355, lng: 77.2707, state: "Delhi" },
    { name: "Hyderabad Racecourse", deaths: 180, lat: 17.385, lng: 78.4867, state: "Telangana" },
    { name: "Pune Racecourse", deaths: 120, lat: 18.5204, lng: 73.8567, state: "Maharashtra" },
    { name: "Kolkata Racecourse", deaths: 95, lat: 22.5726, lng: 88.3639, state: "West Bengal" },
  ]

  const maxDeaths = Math.max(...racetracks.map((t) => t.deaths))
  const totalDeaths = racetracks.reduce((sum, t) => sum + t.deaths, 0)

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
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">Killing Map</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Interactive map of documented deaths across Indian racing tracks
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20 hover:border-destructive/40 transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">Documented Deaths</h3>
                </div>
                <p className="text-4xl font-bold text-destructive">{totalDeaths}+</p>
                <p className="text-sm text-muted-foreground mt-2">Across tracked facilities</p>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertTriangle className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">Estimated Total</h3>
                </div>
                <p className="text-4xl font-bold text-accent">10,000+</p>
                <p className="text-sm text-muted-foreground mt-2">Including unreported incidents</p>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">Major Tracks</h3>
                </div>
                <p className="text-4xl font-bold text-primary">{racetracks.length}</p>
                <p className="text-sm text-muted-foreground mt-2">Locations documented</p>
              </div>
            </div>

            {/* Interactive Map Section */}
            <div className="mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">Deaths by Track</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Visual Map Representation */}
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-border/40 bg-muted/20 p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                  <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                    {/* India outline simplified */}
                    <path
                      d="M 100 150 L 150 120 L 180 130 L 200 100 L 220 120 L 240 110 L 250 140 L 260 150 L 270 180 L 280 200 L 270 220 L 250 240 L 220 250 L 180 240 L 150 260 L 120 250 L 100 230 L 90 200 Z"
                      fill="currentColor"
                      className="text-muted/30"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-muted/50"
                    />
                    {/* Racetrack markers */}
                    {racetracks.map((track, idx) => {
                      const normalized = (track.deaths / maxDeaths) * 8 + 4
                      const x = 100 + (track.lng - 72) * 6
                      const y = 150 + (track.lat - 13) * -4
                      return (
                        <g key={idx}>
                          <circle
                            cx={x}
                            cy={y}
                            r={normalized}
                            fill="currentColor"
                            className="text-destructive/60"
                            opacity="0.7"
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r={normalized}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-destructive/40"
                          />
                        </g>
                      )
                    })}
                  </svg>
                  <div className="absolute bottom-4 left-4 right-4 text-xs text-muted-foreground">
                    <p>Circle size = Death count</p>
                    <p className="mt-1">Larger circles indicate higher documented deaths</p>
                  </div>
                </div>

                {/* Track List */}
                <div className="space-y-4">
                  {racetracks
                    .sort((a, b) => b.deaths - a.deaths)
                    .map((track, idx) => {
                      const percentage = (track.deaths / maxDeaths) * 100
                      return (
                        <div
                          key={idx}
                          className="group p-4 rounded-xl border border-border/40 hover:border-destructive/40 transition-all hover:shadow-lg hover:bg-muted/20"
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <h3 className="font-bold text-foreground group-hover:text-destructive transition-colors">
                                {track.name}
                              </h3>
                              <p className="text-xs text-muted-foreground">{track.state}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-2xl font-bold text-destructive">{track.deaths}</p>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-destructive to-accent"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>

            {/* Context */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-muted/30 to-muted/10 border border-border/40 space-y-4">
              <h3 className="font-serif text-2xl font-bold">Understanding the Data</h3>
              <p className="text-muted-foreground leading-relaxed">
                Official death records in Indian racing are severely underreported. Incidents that occur in training, at
                secondary facilities, or that are not immediately fatal are often not included in official statistics.
                Additionally, many horses are quietly euthanized after injuries sustained on the track. The true number
                of horses suffering and dying in racing is likely many times higher than these figures.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
