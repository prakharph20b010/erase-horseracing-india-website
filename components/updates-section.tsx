import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"
import type { BlogPost } from "@/lib/types"
import shared from "@/data/pages/shared.json"
import postsData from "@/data/posts.json"
import { EditableText } from "@/components/editable/editable-text"
import { EditableImage } from "@/components/editable/editable-image"
import { AddItemButton, RemoveItemButton } from "@/components/editable/list-controls"
import { EditOnly } from "@/components/editable/edit-only"

interface UpdatesSectionProps {
  posts: BlogPost[]
}

export function UpdatesSection({ posts }: UpdatesSectionProps) {
  const indexBySlug = new Map<string, number>()
  ;(postsData as BlogPost[]).forEach((p, i) => {
    if (p.slug) indexBySlug.set(p.slug, i)
  })

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <EditableText
            file="data/pages/shared.json"
            path={["updatesSection", "title"]}
            value={shared.updatesSection.title}
            as="h2"
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4"
          />
          <EditableText
            file="data/pages/shared.json"
            path={["updatesSection", "subtitle"]}
            value={shared.updatesSection.subtitle}
            as="p"
            className="text-lg text-muted-foreground"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {posts.slice(0, 3).map((post) => {
            const idx = indexBySlug.get(post.slug)
            return (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col relative">
                {typeof idx === "number" && (
                  <RemoveItemButton file="data/posts.json" path={[]} index={idx} />
                )}
                <EditOnly>
                  <Link
                    href={`/updates`}
                    className="absolute top-2 left-2 z-30 rounded bg-black/70 px-2 py-1 text-[10px] font-semibold text-white"
                  >
                    Edit
                  </Link>
                </EditOnly>
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
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      No image available
                    </span>
                  )}
                </div>
                <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <time>
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : ""}
                      </time>
                    </div>
                    <h3 className="font-serif text-xl font-bold leading-tight">
                      <Link href={`/updates/${post.slug}`} className="hover:text-primary transition-colors">
                        {typeof idx === "number" ? (
                          <EditableText
                            file="data/posts.json"
                            path={[idx, "title"]}
                            value={post.title}
                            as="span"
                          />
                        ) : (
                          post.title
                        )}
                      </Link>
                    </h3>
                    {post.excerpt && (
                      typeof idx === "number" ? (
                        <EditableText
                          file="data/posts.json"
                          path={[idx, "excerpt"]}
                          value={post.excerpt}
                          as="p"
                          multiline
                          className="text-muted-foreground leading-relaxed line-clamp-2"
                        />
                      ) : (
                        <p className="text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                      )
                    )}
                  </div>
                  <Button asChild variant="link" className="px-0 w-fit">
                    <Link href={`/updates/${post.slug}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* View all button */}
        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href={shared.updatesSection.button.href}>
              <EditableText
                file="data/pages/shared.json"
                path={["updatesSection", "button", "label"]}
                value={shared.updatesSection.button.label}
                as="span"
              />
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <AddItemButton
          file="data/posts.json"
          path={[]}
          label="+ Add Update"
          template={{
            id: String(Date.now()),
            title: "New Update Title",
            slug: `new-update-${Date.now()}`,
            excerpt: "Short summary...",
            content: "",
            blocks: [{ id: String(Date.now()), type: "paragraph", text: "Write your update..." }],
            image_url: null,
            published: true,
            published_at: new Date().toISOString().slice(0, 10),
            author: "Erase Horseracing India",
            created_at: new Date().toISOString().slice(0, 10),
            updated_at: new Date().toISOString().slice(0, 10),
          }}
          promptFields={[
            { path: "title", label: "Title" },
            { path: "slug", label: "Slug (url part)" },
            { path: "excerpt", label: "Excerpt" },
            { path: "author", label: "Author" },
          ]}
        />
      </div>
    </section>
  )
}
