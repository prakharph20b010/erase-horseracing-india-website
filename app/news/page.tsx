// app/news/page.tsx
import fs from "fs"
import path from "path"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import type { BlogPost } from "@/lib/types"
import content from "@/data/pages/news.json"
import { EditableText } from "@/components/editable/editable-text"
import postsData from "@/data/posts.json"
import { EditableImage } from "@/components/editable/editable-image"

function readLocalPosts(): BlogPost[] {
  try {
    const file = path.join(process.cwd(), "data", "posts.json")
    const raw = fs.readFileSync(file, "utf8")
    return JSON.parse(raw) as BlogPost[]
  } catch {
    return []
  }
}

export const dynamic = "error" // enforce static-only

export default function NewsPage() {
  const posts = readLocalPosts()
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.published_at ?? "").getTime() -
        new Date(a.published_at ?? "").getTime()
    )
  const indexBySlug = new Map<string, number>()
  ;(postsData as BlogPost[]).forEach((p, i) => {
    if (p.slug) indexBySlug.set(p.slug, i)
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="py-20 md:py-32 px-6 border-b">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <EditableText
              file="data/pages/news.json"
              path={["hero", "title"]}
              value={content.hero.title}
              as="h1"
              className="font-serif text-5xl md:text-6xl font-bold"
            />
            <EditableText
              file="data/pages/news.json"
              path={["hero", "subtitle"]}
              value={content.hero.subtitle}
              as="p"
              className="text-xl text-muted-foreground"
            />
          </div>
        </section>

        {/* News list */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {posts.map((post) => {
                  const idx = indexBySlug.get(post.slug)
                  return (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <Link href={`/news/${post.slug}`}>
                      <div className="aspect-video w-full overflow-hidden bg-muted flex items-center justify-center">
                        {typeof idx === "number" ? (
                          <EditableImage
                            file="data/posts.json"
                            path={[idx, "image_url"]}
                            src={post.image_url || ""}
                            alt={post.title}
                            uploadDir="pages/news/cards"
                            uploadName={post.slug || post.title}
                            placeholderText="No image available"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : post.image_url ? (
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <span className="text-xs text-muted-foreground italic">
                            No image available
                          </span>
                        )}
                      </div>
                      <CardContent className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <time>{post.published_at ?? ""}</time>
                        </div>
                        <h2 className="font-serif text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                      </CardContent>
                    </Link>
                  </Card>
                  )
                })}
              </div>
            ) : (
              <EditableText
                file="data/pages/news.json"
                path={["empty", "message"]}
                value={content.empty.message}
                as="p"
                className="text-center text-muted-foreground"
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
