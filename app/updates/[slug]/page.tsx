import fs from "fs"
import path from "path"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft } from "lucide-react"
import type { BlogPost } from "@/lib/types"
import { EditableText } from "@/components/editable/editable-text"
import { EditableImage } from "@/components/editable/editable-image"
import { RemoveItemButton } from "@/components/editable/list-controls"
import { PostContent } from "@/components/post-content"

type Props = {
  params: { slug: string }
}

function readLocalPosts(): BlogPost[] {
  try {
    const file = path.join(process.cwd(), "data", "posts.json")
    const raw = fs.readFileSync(file, "utf-8")
    return JSON.parse(raw) as BlogPost[]
  } catch {
    return []
  }
}

export async function generateStaticParams() {
  const posts = readLocalPosts().filter((p) => p.published)
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const posts = readLocalPosts()
  const post = posts.find((p) => p.slug === params.slug && p.published)
  if (!post) return { title: "Update Not Found" }
  return {
    title: `${post.title} – Erase Horseracing India`,
    description: post.excerpt ?? (post.content || "").slice(0, 160),
  }
}

export const dynamic = "error"

export default function UpdateArticlePage({ params }: Props) {
  const posts = readLocalPosts()
  const postIndex = posts.findIndex((p) => p.slug === params.slug && p.published)
  const post = postIndex >= 0 ? posts[postIndex] : null
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <div className="container mx-auto px-6 pt-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/updates">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Updates
            </Link>
          </Button>
        </div>

        <article className="py-12 md:py-16 px-6">
          <div className="container mx-auto max-w-4xl relative">
            <RemoveItemButton file="data/posts.json" path={[]} index={postIndex} />

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time>{post!.published_at ?? ""}</time>
              </div>
              <span>•</span>
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
                uploadDir={`articles/${post!.slug}`}
                uploadName="cover"
                placeholderText="No image available"
                className="w-full h-full object-cover"
              />
            </div>

            {post!.content && /<\/?[a-z][\s\S]*>/i.test(post!.content) ? (
              <div
                className="prose prose-lg max-w-none"
                // Content is authored locally; we allow HTML for rich formatting.
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html:
                    process.env.NODE_ENV === "production"
                      ? post!.content
                          .replaceAll(' src="/', ' src="/erase-horseracing-india-website/')
                          .replaceAll(' srcset="/', ' srcset="/erase-horseracing-india-website/')
                      : post!.content,
                }}
              />
            ) : (
              <PostContent post={post!} />
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
