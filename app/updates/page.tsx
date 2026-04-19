// app/updates/page.tsx
import fs from "fs"
import path from "path"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import type { BlogPost } from "@/lib/types"
import content from "@/data/pages/updates.json"
import { EditableText } from "@/components/editable/editable-text"
import UpdatesPageClient from "@/components/updates-page.client"

function readLocalPosts(): BlogPost[] {
  try {
    const file = path.join(process.cwd(), "data", "posts.json")
    const raw = fs.readFileSync(file, "utf8")
    return JSON.parse(raw) as BlogPost[]
  } catch {
    return []
  }
}

export const dynamic = "error" // static-only

export default function UpdatesPage() {
  const posts = readLocalPosts()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="py-20 md:py-32 px-6 border-b">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <EditableText
              file="data/pages/updates.json"
              path={["hero", "title"]}
              value={content.hero.title}
              as="h1"
              className="font-serif text-5xl md:text-6xl font-bold"
            />
            <EditableText
              file="data/pages/updates.json"
              path={["hero", "subtitle"]}
              value={content.hero.subtitle}
              as="p"
              className="text-xl text-muted-foreground"
            />
          </div>
        </section>

        {/* Updates list */}
        <section className="py-16 md:py-24 px-6">
          <UpdatesPageClient initialPosts={posts as BlogPost[]} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
