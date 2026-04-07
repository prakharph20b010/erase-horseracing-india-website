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
import content from "@/data/pages/memorial-article.json"
import { EditableText } from "@/components/editable/editable-text"
import { EditableImage } from "@/components/editable/editable-image"

/** Local data type â€” mirrors lib/types.Horse */
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
    title: `${item.name} â€” Memorial`,
    description: item.story?.slice(0, 160) ?? `${item.name} memorial`,
  }
}

export default function MemorialPage({ params }: Props) {
  const mems = readLocalMemorials()
  const memorialIndex = mems.findIndex((m) => m.slug === params.slug)
  const memorial = memorialIndex >= 0 ? mems[memorialIndex] : null
  if (!memorial) notFound()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <div className="container mx-auto px-6 pt-6">
          <Button asChild variant="ghost" size="sm">
            <Link href={content.back.href}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              <EditableText
                file="data/pages/memorial-article.json"
                path={["back", "label"]}
                value={content.back.label}
                as="span"
              />
            </Link>
          </Button>
        </div>

        <article className="py-12 md:py-16 px-6">
          <div className="container mx-auto max-w-3xl">
            <EditableText
              file="data/memorials.json"
              path={[memorialIndex, "name"]}
              value={memorial.name}
              as="h1"
              className="font-serif text-4xl font-bold mb-4"
            />

            <p className="text-sm text-muted-foreground mb-6">
              <EditableText
                file="data/pages/memorial-article.json"
                path={["labels", "born"]}
                value={content.labels.born}
                as="span"
              />: {" "}
              <EditableText
                file="data/memorials.json"
                path={[memorialIndex, "date_of_birth"]}
                value={memorial.date_of_birth ?? "â€”"}
                as="span"
              /> â€¢ {" "}
              <EditableText
                file="data/pages/memorial-article.json"
                path={["labels", "died"]}
                value={content.labels.died}
                as="span"
              />: {" "}
              <EditableText
                file="data/memorials.json"
                path={[memorialIndex, "date_of_death"]}
                value={memorial.date_of_death ?? "â€”"}
                as="span"
              />
            </p>

            <div className="aspect-video w-full overflow-hidden rounded-lg mb-8 bg-muted flex items-center justify-center">
              <EditableImage
                file="data/memorials.json"
                path={[memorialIndex, "image_url"]}
                src={memorial.image_url?.replace(/^\/+/, "") || ""}
                alt={memorial.name}
                uploadDir="pages/memorials/detail"
                uploadName={memorial.slug || memorial.name}
                placeholderText="No image available"
                className="w-full h-full object-cover"
              />
            </div>

            <EditableText
              file="data/memorials.json"
              path={[memorialIndex, "story"]}
              value={memorial.story ?? ""}
              as="div"
              multiline
              className="prose max-w-none whitespace-pre-line mb-6"
            />

            <div className="text-sm text-muted-foreground">
              <p><span className="font-semibold">
                <EditableText
                  file="data/pages/memorial-article.json"
                  path={["labels", "cause"]}
                  value={content.labels.cause}
                  as="span"
                />:
              </span> {" "}
                <EditableText
                  file="data/memorials.json"
                  path={[memorialIndex, "cause_of_death"]}
                  value={memorial.cause_of_death ?? content.labels.unknown}
                  as="span"
                />
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
