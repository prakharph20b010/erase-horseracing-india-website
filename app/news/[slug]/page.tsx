import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).single()

  if (!post) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: `${post.title} - Erase Horseracing India`,
    description: post.excerpt || post.content.slice(0, 160),
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error || !post) {
    notFound()
  }

  // Fetch related posts
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .neq("id", post.id)
    .order("published_at", { ascending: false })
    .limit(3)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Back Button */}
        <div className="container mx-auto px-6 pt-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <article className="py-12 md:py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
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
              <span>•</span>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 text-pretty">{post.excerpt}</p>
            )}

            {/* Featured Image */}
            {post.image_url && (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted mb-12">
                <img
                  src={post.image_url || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-foreground leading-relaxed whitespace-pre-line space-y-4">{post.content}</div>
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Share this article</h3>
                  <p className="text-sm text-muted-foreground">Help spread awareness about this issue</p>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="py-12 md:py-16 px-6 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <Link href={`/news/${relatedPost.slug}`}>
                      {relatedPost.image_url && (
                        <div className="aspect-video w-full overflow-hidden bg-muted">
                          <img
                            src={relatedPost.image_url || "/placeholder.svg"}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardContent className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <time>
                            {relatedPost.published_at
                              ? new Date(relatedPost.published_at).toLocaleDateString("en-IN", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })
                              : ""}
                          </time>
                        </div>
                        <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-3xl text-center space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Take Action Today</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Knowledge is power, but action creates change. Join us in fighting to end horse racing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link href="/pledge">Sign the Pledge</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/report">Report an Incident</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
