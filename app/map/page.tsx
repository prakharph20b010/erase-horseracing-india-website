// app/map/page.tsx
import fs from "fs"
import path from "path"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DataAndMapSection } from "@/components/data-and-map-section"
import type { Racetrack } from "@/lib/types"

function readLocalRacetracks(): Racetrack[] {
  try {
    const file = path.join(process.cwd(), "data", "racetracks.json")
    const raw = fs.readFileSync(file, "utf8")
    return JSON.parse(raw) as Racetrack[]
  } catch {
    return []
  }
}

export const dynamic = "error" // enforce static-only (good)

export default function MapPage() {
  const racetracks = readLocalRacetracks()
  const totalDeaths = racetracks.reduce((sum, r) => sum + r.total_deaths, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <DataAndMapSection
          totalDeaths={totalDeaths}
          racetracks={racetracks}
        />
      </main>

      <Footer />
    </div>
  )
}

