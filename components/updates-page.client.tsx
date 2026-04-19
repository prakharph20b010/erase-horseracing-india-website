"use client"

import { useMemo, useState } from "react"
import type { BlogPost } from "@/lib/types"
import { useEditMode } from "@/components/editable/use-edit-mode"
import { EditableImage } from "@/components/editable/editable-image"
import UpdatesRichEditor from "@/components/editable/updates-rich-editor.client"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Calendar } from "lucide-react"

function sortPublished(posts: BlogPost[]) {
  return posts
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.published_at ?? "").getTime() -
        new Date(a.published_at ?? "").getTime()
    )
}

export default function UpdatesPageClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const { ready, enabled } = useEditMode()
  const canEdit = ready && enabled

  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)

  const indexBySlug = useMemo(() => {
    const m = new Map<string, number>()
    posts.forEach((p, i) => {
      if (p.slug) m.set(p.slug, i)
    })
    return m
  }, [posts])

  const published = useMemo(() => sortPublished(posts), [posts])

  return (
    <div className="container mx-auto max-w-6xl">
      {canEdit && <UpdatesRichEditor initialPosts={posts} onPostsChange={setPosts} />}

      {published.length > 0 ? (
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {published.map((post) => {
            const idx = indexBySlug.get(post.slug)
            return (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group relative">
                <Link href={`/updates/${post.slug}`}>
                  <div className="aspect-video w-full overflow-hidden bg-muted flex items-center justify-center">
                    {typeof idx === "number" ? (
                      <EditableImage
                        file="data/posts.json"
                        path={[idx, "image_url"]}
                        src={post.image_url || ""}
                        alt={post.title}
                        uploadDir={`articles/${post.slug}`}
                        uploadName="cover"
                        placeholderText="No image available"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : post.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground italic">No image available</span>
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
                    {post.excerpt && <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>}
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>
      ) : (
        <p className="text-center text-muted-foreground mt-10">No updates yet.</p>
      )}
    </div>
  )
}
