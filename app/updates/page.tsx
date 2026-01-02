import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"

export const metadata = {
  title: "Updates - Erase Horseracing India",
  description: "Latest news and updates from the movement to end horse racing in India.",
}

export default async function UpdatesPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="py-20 md:py-32 px-6 bg-muted/30 border-b">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">Latest Updates</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              News, stories, and progress from the movement
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-20 md:py-32 px-6">
          <div className="container mx-auto max-w-7xl">
            {posts && posts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
                  >
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
                                  month: "long",
                                  day: "numeric",
                                })
                              : ""}
                          </time>
                        </div>
                        <h3 className="font-serif text-2xl font-bold leading-tight">
                          <Link href={`/updates/${post.slug}`} className="hover:text-primary transition-colors">
                            {post.title}
                          </Link>
                        </h3>
                        {post.excerpt && <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>}
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
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No updates yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
