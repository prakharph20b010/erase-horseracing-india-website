// app/memorials/page.tsx
import fs from "fs"
import path from "path"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MemorialGrid } from "@/components/memorial-grid"
import type { Horse } from "@/lib/types"
import content from "@/data/pages/memorials.json"
import { EditableText } from "@/components/editable/editable-text"
import { AddItemButton } from "@/components/editable/list-controls"

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
    .slice()
    .sort((a, b) => {
      const da = a.date_of_death ? new Date(a.date_of_death).getTime() : 0
      const db = b.date_of_death ? new Date(b.date_of_death).getTime() : 0
      return db - da // newest first
    })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="py-20 md:py-32 px-6 border-b">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <EditableText
              file="data/pages/memorials.json"
              path={["hero", "title"]}
              value={content.hero.title}
              as="h1"
              className="font-serif text-5xl md:text-6xl font-bold"
            />
            <EditableText
              file="data/pages/memorials.json"
              path={["hero", "subtitle"]}
              value={content.hero.subtitle}
              as="p"
              className="text-xl text-muted-foreground"
            />

            <p className="text-base text-muted-foreground">
              <EditableText
                file="data/pages/memorials.json"
                path={["hero", "count_label"]}
                value={content.hero.count_label}
                as="span"
              />
              : {" "}
              <span className="font-semibold text-foreground">
                {memorials.length}
              </span>
            </p>
          </div>
        </section>

        {/* Memorial grid */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-7xl">
            {memorials.length > 0 ? (
              <MemorialGrid horses={memorials} />
            ) : (
              <EditableText
                file="data/pages/memorials.json"
                path={["empty", "message"]}
                value={content.empty.message}
                as="p"
                className="text-center text-muted-foreground"
              />
            )}

            <AddItemButton
              file="data/memorials.json"
              path={[]}
              label="+ Add Memorial"
              template={{
                id: `memorial-${Date.now()}`,
                name: "NEW HORSE",
                slug: `new-horse-${Date.now()}`,
                image_url: "",
                date_of_birth: null,
                date_of_death: "",
                cause_of_death: "",
                story: "",
                racetrack_id: "",
                created_at: new Date().toISOString().slice(0, 10),
                updated_at: new Date().toISOString().slice(0, 10),
              }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
