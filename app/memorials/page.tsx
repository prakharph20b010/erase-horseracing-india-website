// app/memorials/page.tsx
import fs from "fs"
import path from "path"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MemorialGrid } from "@/components/memorial-grid"
import type { Horse } from "@/lib/types"

function readLocalMemorials(): Horse[] {
  try {
    const file = path.join(process.cwd(), "data", "memorials.json")
    const raw = fs.readFileSync(file, "utf8")
    return JSON.parse(raw) as Horse[]
  } catch {
    return []
  }
}

export const dynamic = "error" // enforce static-only

export default function MemorialsPage() {
  const memorials = readLocalMemorials()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="py-20 md:py-32 px-6 border-b">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h1 className="font-serif text-5xl md:text-6xl font-bold">
              Memorials
            </h1>
            <p className="text-xl text-muted-foreground">
              Each horse had a name, a story, and a life worth remembering.
            </p>
          </div>
        </section>

        {/* Memorial grid */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-7xl">
            {memorials.length > 0 ? (
              <MemorialGrid horses={memorials} />
            ) : (
              <p className="text-center text-muted-foreground">
                No memorials available.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

