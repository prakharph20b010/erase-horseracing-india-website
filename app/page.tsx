"use client"

import { useState, useEffect } from "react"
import type { Horse, BlogPost, Racetrack } from "@/lib/types"
import Link from "next/link"
import InteractiveIndiaMap from "@/components/interactive-india-map"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { HomeActionSection } from "@/components/home-action-section"
import { UpdatesSection } from "@/components/updates-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MemorialGrid } from "@/components/memorial-grid"
import homeContent from "@/data/pages/home.json"
import memorialsData from "@/data/memorials.json"
import racetracksData from "@/data/racetracks.json"
import postsData from "@/data/posts.json"
import { EditableText } from "@/components/editable/editable-text"

const featuredHorses = (memorialsData as Horse[]).slice(0, 3)
const featuredRacetracks = racetracksData as Racetrack[]
const featuredPosts = (postsData as BlogPost[])
  .filter((post) => post.published)
  .sort(
    (a, b) =>
      new Date(b.published_at ?? "").getTime() -
      new Date(a.published_at ?? "").getTime()
  )
  .slice(0, 3)

export default function HomePage() {
  const [horses, setHorses] = useState<Horse[]>(featuredHorses)
  const [racetracks, setRacetracks] = useState<Racetrack[]>(featuredRacetracks)
  const [posts, setPosts] = useState<BlogPost[]>(featuredPosts)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Once you connect to Supabase, replace this with actual API calls:
    // const fetchData = async () => {
    //   try {
    //     const { data: horsesData } = await supabase.from('horses').select('*').limit(3)
    //     const { data: tracksData } = await supabase.from('racetracks').select('*')
    //     const { data: postsData } = await supabase.from('blog_posts').select('*').eq('published', true).limit(3)
    //     setHorses(horsesData || featuredHorses)
    //     setRacetracks(tracksData || featuredRacetracks)
    //     setPosts(postsData || featuredPosts)
    //   } catch (error) {
    //     console.error('[v0] Data fetch failed:', error)
    //   }
    // }
    // fetchData()
    setIsLoading(false)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <HeroSection />

   
        <section className="py-20 md:py-32 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            {/* Heading */}
            <div className="text-center mb-16 md:mb-24">
              <EditableText
                file="data/pages/home.json"
                path={["stats", "label"]}
                value={homeContent.stats.label}
                as="p"
                className="text-lg text-muted-foreground mb-4 tracking-wide"
              />
              <div className="font-serif text-7xl md:text-9xl font-bold text-destructive">
                <EditableText
                  file="data/pages/home.json"
                  path={["stats", "totalDeaths"]}
                  value={String(homeContent.stats.totalDeaths)}
                  as="span"
                />
                +
              </div>
            </div>

            {/* Interactive map */}
            <InteractiveIndiaMap racetracks={racetracks} />

          </div>
        </section>
        
        

        <HomeActionSection />

        {/* Remember Them Section */}
        {horses && horses.length > 0 && (
          <section className="py-20 md:py-32 px-6 bg-muted/30">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <EditableText
                  file="data/pages/home.json"
                  path={["remember", "title"]}
                  value={homeContent.remember.title}
                  as="h2"
                  className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4"
                />
                <EditableText
                  file="data/pages/home.json"
                  path={["remember", "subtitle"]}
                  value={homeContent.remember.subtitle}
                  as="p"
                  multiline
                  className="text-lg text-muted-foreground max-w-2xl mx-auto"
                />
              </div>

              <MemorialGrid horses={horses} />

              <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline">
                  <Link href="/memorials">
                    <EditableText
                      file="data/pages/home.json"
                      path={["remember", "button"]}
                      value={homeContent.remember.button}
                      as="span"
                    />
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {posts && posts.length > 0 && <UpdatesSection posts={posts} />}

        <NewsletterSection />
      </main>

      <Footer />
    </div>
  )
}
