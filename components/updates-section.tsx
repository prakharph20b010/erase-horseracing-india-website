import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"
import type { BlogPost } from "@/lib/types"

interface UpdatesSectionProps {
  posts: BlogPost[]
}

export function UpdatesSection({ posts }: UpdatesSectionProps) {
  return (
    <section className="py-20 md:py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Latest Updates</h2>
          <p className="text-lg text-muted-foreground">News and stories from the movement</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {posts.slice(0, 3).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
              {post.image_url && (
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={post.image_url || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
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
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt && <p className="text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>}
                </div>
                <Button asChild variant="link" className="px-0 w-fit">
                  <Link href={`/updates/${post.slug}`}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/updates">
              View All Updates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
