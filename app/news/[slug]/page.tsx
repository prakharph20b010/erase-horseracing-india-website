// app/news/[slug]/page.tsx
import fs from "fs"
import path from "path"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import content from "@/data/pages/news-article.json"
import { EditableText } from "@/components/editable/editable-text"
import { EditableImage } from "@/components/editable/editable-image"
import { RemoveItemButton } from "@/components/editable/list-controls"


type Post = {
  id: string
  title: string
  excerpt?: string | null
  content: string
  slug: string
  image_url?: string | null
  published: boolean
  published_at?: string | null
  author?: string
  created_at?: string
  updated_at?: string
}

/**
 * Helper: read posts from data/posts.json at build time.
 * This is intentionally synchronous (fs.readFileSync) so it works in SSG.
 */
function readLocalPosts(): Post[] {
  try {
    const file = path.join(process.cwd(), "data", "posts.json")
    const raw = fs.readFileSync(file, "utf-8")
    return JSON.parse(raw) as Post[]
  } catch (e) {
    // fallback to an empty array so build doesn't crash if file missing
    return []
  }
}

/* -----------------------------
   Types & SSG plumbing
   ---------------------------- */
type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = readLocalPosts().filter((p) => p.published)
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const posts = readLocalPosts()
  const post = posts.find((p) => p.slug === params.slug && p.published)
  if (!post) {
    return { title: "Article Not Found" }
  }
  return {
    title: `${post.title} â€“ Erase Horseracing India`,
    description: post.excerpt ?? post.content.slice(0, 160),
  }
}

/* -----------------------------
   Page component (static)
   ---------------------------- */
export default function NewsArticlePage({ params }: Props) {
  const posts = readLocalPosts()
  const indexBySlug = new Map<string, number>()
  posts.forEach((p, i) => {
    if (p.slug) indexBySlug.set(p.slug, i)
  })
  const postIndex = posts.findIndex((p) => p.slug === params.slug && p.published)
  const post = postIndex >= 0 ? posts[postIndex] : null

  if (!post) {
    notFound()
  }

  // simple related posts: latest published excluding current
  const relatedPosts = posts
    .filter((p) => p.published && p.slug !== post!.slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <div className="container mx-auto px-6 pt-6">
          <Button asChild variant="ghost" size="sm">
            <Link href={content.back.href}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              <EditableText
                file="data/pages/news-article.json"
                path={["back", "label"]}
                value={content.back.label}
                as="span"
              />
            </Link>
          </Button>
        </div>

        <article className="py-12 md:py-16 px-6">
          <div className="container mx-auto max-w-4xl relative">
            <RemoveItemButton file="data/posts.json" path={[]} index={postIndex} />
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time>
                  {post!.published_at ?? ""}
                </time>
              </div>
              <span>â€¢</span>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <EditableText
                  file="data/posts.json"
                  path={[postIndex, "author"]}
                  value={post!.author ?? "Erase Horseracing India"}
                  as="span"
                />
              </div>
            </div>

            <EditableText
              file="data/posts.json"
              path={[postIndex, "title"]}
              value={post!.title}
              as="h1"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            />

            {post!.excerpt && (
              <EditableText
                file="data/posts.json"
                path={[postIndex, "excerpt"]}
                value={post!.excerpt}
                as="p"
                multiline
                className="text-xl text-muted-foreground mb-8"
              />
            )}

            <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted mb-12 flex items-center justify-center">
              <EditableImage
                file="data/posts.json"
                path={[postIndex, "image_url"]}
                src={post!.image_url || ""}
                alt={post!.title}
                uploadDir="pages/news/posts"
                uploadName={post!.slug || post!.title}
                placeholderText="No image available"
                className="w-full h-full object-cover"
              />
            </div>

            <EditableText
              file="data/posts.json"
              path={[postIndex, "content"]}
              value={post!.content}
              as="div"
              multiline
              className="prose prose-lg max-w-none whitespace-pre-line"
            />

            <div className="mt-12 pt-8 border-t flex justify-between items-center flex-wrap gap-4">
              <div>
                <EditableText
                  file="data/pages/news-article.json"
                  path={["share", "title"]}
                  value={content.share.title}
                  as="h3"
                  className="font-semibold"
                />
                <EditableText
                  file="data/pages/news-article.json"
                  path={["share", "subtitle"]}
                  value={content.share.subtitle}
                  as="p"
                  className="text-sm text-muted-foreground"
                />
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                <EditableText
                  file="data/pages/news-article.json"
                  path={["share", "button"]}
                  value={content.share.button}
                  as="span"
                />
              </Button>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="py-12 md:py-16 px-6 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
              <EditableText
                file="data/pages/news-article.json"
                path={["related", "title"]}
                value={content.related.title}
                as="h2"
                className="font-serif text-3xl font-bold text-foreground mb-8"
              />
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => {
                  const idx = indexBySlug.get(rp.slug)
                  return (
                  <Card key={rp.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <Link href={`/news/${rp.slug}`}>
                      <div className="aspect-video w-full overflow-hidden bg-muted flex items-center justify-center">
                        {typeof idx === "number" ? (
                          <EditableImage
                            file="data/posts.json"
                            path={[idx, "image_url"]}
                            src={rp.image_url || ""}
                            alt={rp.title}
                            uploadDir="pages/news/posts"
                            uploadName={rp.slug || rp.title}
                            placeholderText="No image available"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : rp.image_url ? (
                          <img
                            src={rp.image_url}
                            alt={rp.title}
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
                          <time>{rp.published_at ?? ""}</time>
                        </div>
                        <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">{rp.title}</h3>
                      </CardContent>
                    </Link>
                  </Card>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
