// app/memorials/[slug]/page.tsx
import fs from "fs"
import path from "path"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

/** Local data type — mirrors lib/types.Horse */
type Memorial = {
  id: string
  name: string
  slug: string
  image_url?: string | null
  date_of_birth?: string | null
  date_of_death?: string | null
  cause_of_death?: string | null
  story?: string
  racetrack_id?: string | null
  created_at?: string
  updated_at?: string
}

function readLocalMemorials(): Memorial[] {
  try {
    const file = path.join(process.cwd(), "data", "memorials.json")
    const raw = fs.readFileSync(file, "utf8")
    return JSON.parse(raw) as Memorial[]
  } catch (e) {
    return []
  }
}

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const items = readLocalMemorials()
  return items.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mems = readLocalMemorials()
  const item = mems.find((m) => m.slug === params.slug)
  if (!item) return { title: "Memorial not found" }
  return {
    title: `${item.name} — Memorial`,
    description: item.story?.slice(0, 160) ?? `${item.name} memorial`,
  }
}

export default function MemorialPage({ params }: Props) {
  const mems = readLocalMemorials()
  const memorial = mems.find((m) => m.slug === params.slug)
  if (!memorial) notFound()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <div className="container mx-auto px-6 pt-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/memorials">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Memorials
            </Link>
          </Button>
        </div>

        <article className="py-12 md:py-16 px-6">
          <div className="container mx-auto max-w-3xl">
            <h1 className="font-serif text-4xl font-bold mb-4">{memorial.name}</h1>

            <p className="text-sm text-muted-foreground mb-6">
              Born: {memorial.date_of_birth ?? "—"} • Died: {memorial.date_of_death ?? "—"}
            </p>

            {memorial.image_url && (
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
                <img src={memorial.image_url} alt={memorial.name} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="prose max-w-none whitespace-pre-line mb-6">
              {memorial.story}
            </div>

            <div className="text-sm text-muted-foreground">
              <p><span className="font-semibold">Cause of death:</span> {memorial.cause_of_death ?? "Unknown"}</p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

