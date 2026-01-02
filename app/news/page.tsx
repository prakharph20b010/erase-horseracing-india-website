import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "News & Updates - Erase Horseracing India",
  description: "Latest news, research, and updates from the movement to end horse racing in India.",
}

export default async function NewsPage() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Header Section */}
        <section className="py-16 md:py-20 px-6 bg-muted/30 border-b">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground text-balance">News & Updates</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              The latest research, legal victories, and advocacy updates in the fight to end horse racing in India.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        {posts && posts.length > 0 && (
          <section className="py-12 md:py-16 px-6">
            <div className="container mx-auto max-w-5xl">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  <FileText className="h-4 w-4" />
                  Featured
                </span>
              </div>
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <Link href={`/news/${posts[0].slug}`}>
                  {posts[0].image_url && (
                    <div className="aspect-[21/9] w-full overflow-hidden bg-muted">
                      <img
                        src={posts[0].image_url || "/placeholder.svg"}
                        alt={posts[0].title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <time>
                          {posts[0].published_at
                            ? new Date(posts[0].published_at).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : ""}
                        </time>
                      </div>
                      <span>•</span>
                      <span>{posts[0].author}</span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight hover:text-primary transition-colors">
                      {posts[0].title}
                    </h2>
                    {posts[0].excerpt && (
                      <p className="text-lg text-muted-foreground leading-relaxed">{posts[0].excerpt}</p>
                    )}
                    <Button variant="link" className="px-0 text-base">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </section>
        )}

        {/* All Posts */}
        {posts && posts.length > 1 && (
          <section className="py-12 md:py-16 px-6 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-8">All Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.slice(1).map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <Link href={`/news/${post.slug}`}>
                      {post.image_url && (
                        <div className="aspect-video w-full overflow-hidden bg-muted">
                          <img
                            src={post.image_url || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardContent className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
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
                        <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
                        )}
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty State */}
        {(!posts || posts.length === 0) && (
          <section className="py-24 px-6">
            <div className="container mx-auto max-w-2xl text-center space-y-4">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
              <h2 className="font-serif text-2xl font-bold text-foreground">No Articles Yet</h2>
              <p className="text-muted-foreground">Check back soon for news and updates from our campaign.</p>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-3xl text-center space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Stay Updated</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Subscribe to our newsletter for the latest news, campaigns, and ways you can help end horse racing.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link href="/#newsletter">Subscribe to Newsletter</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
