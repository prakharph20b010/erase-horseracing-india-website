import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AlertTriangle } from "lucide-react"
import { RacetrackMap } from "@/components/racetrack-map"

export const metadata = {
  title: "Killing Map - Erase Horseracing India",
  description: "Interactive map of documented deaths and injuries across Indian racing tracks.",
}

const racetracks = [
  {
    id: "1",
    name: "Bangalore Turf Club",
    city: "Bangalore",
    state: "Karnataka",
    latitude: 13.1939,
    longitude: 77.5941,
    description: null,
    total_deaths: 350,
    status: "active" as const,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "2",
    name: "Mumbai Racecourse",
    city: "Mumbai",
    state: "Maharashtra",
    latitude: 19.0176,
    longitude: 72.8298,
    description: null,
    total_deaths: 280,
    status: "active" as const,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "3",
    name: "Delhi Racecourse",
    city: "Delhi",
    state: "Delhi",
    latitude: 28.5355,
    longitude: 77.2707,
    description: null,
    total_deaths: 210,
    status: "active" as const,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "4",
    name: "Hyderabad Racecourse",
    city: "Hyderabad",
    state: "Telangana",
    latitude: 17.385,
    longitude: 78.4867,
    description: null,
    total_deaths: 180,
    status: "active" as const,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "5",
    name: "Pune Racecourse",
    city: "Pune",
    state: "Maharashtra",
    latitude: 18.5204,
    longitude: 73.8567,
    description: null,
    total_deaths: 120,
    status: "active" as const,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "6",
    name: "Kolkata Racecourse",
    city: "Kolkata",
    state: "West Bengal",
    latitude: 22.5726,
    longitude: 88.3639,
    description: null,
    total_deaths: 95,
    status: "active" as const,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
]

const totalDeaths = racetracks.reduce((sum, track) => sum + track.total_deaths, 0)

export default function KillingMapPage() {
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
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">
              Killing Map
            </h1>
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
                <p className="text-sm text-muted-foreground mt-2">
                  Across tracked facilities
                </p>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertTriangle className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">Estimated Total</h3>
                </div>
                <p className="text-4xl font-bold text-accent">10,000+</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Including unreported incidents
                </p>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">Major Tracks</h3>
                </div>
                <p className="text-4xl font-bold text-primary">{racetracks.length}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Locations documented
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
                Deaths by Track
              </h2>

              <RacetrackMap racetracks={racetracks} />
            </div>

            {/* Context */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-muted/30 to-muted/10 border border-border/40">
              <h3 className="font-serif text-2xl font-bold mb-2">
                Understanding the Data
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Official death records in Indian racing are severely underreported.
                Many incidents occur in training or secondary facilities and never
                enter public statistics. The true toll is likely far higher.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
