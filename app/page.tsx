"use client"

import { useState, useEffect } from "react"
import type { Horse, BlogPost, Racetrack } from "@/lib/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { DataAndMapSection } from "@/components/data-and-map-section"
import { HomeActionSection } from "@/components/home-action-section"
import { UpdatesSection } from "@/components/updates-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MemorialGrid } from "@/components/memorial-grid"

// Mock data for frontend development
const mockHorses: Horse[] = [
  {
    id: "1",
    name: "Star",
    born: "2015-01-15",
    died: "2020-06-10",
    racetrack: "Bangalore",
    cause_of_death: "Track injury - leg fracture",
    story: "Star was a promising racer until a catastrophic leg injury ended her life at just 5 years old.",
    slug: "star-bangalore",
    image_url: "/horse-memorial.jpg",
    created_at: "2024-01-01",
  },
  {
    id: "2",
    name: "Thunder",
    born: "2016-03-20",
    died: "2021-09-05",
    racetrack: "Delhi",
    cause_of_death: "Collapsed during race",
    story: "Thunder collapsed on the track during a race, pushing his body beyond its limits.",
    slug: "thunder-delhi",
    image_url: "/horse-racing-finish.png",
    created_at: "2024-01-01",
  },
  {
    id: "3",
    name: "Luna",
    born: "2017-07-10",
    died: "2022-04-18",
    racetrack: "Mumbai",
    cause_of_death: "Euthanized due to track injury",
    story: "Luna's promising career was cut short by a severe injury that left her unable to recover.",
    slug: "luna-mumbai",
    image_url: "/horse-in-field.jpg",
    created_at: "2024-01-01",
  },
]

const mockRacetracks: Racetrack[] = [
  { id: "1", name: "Bangalore Turf Club", city: "Bangalore", lat: 13.0827, lng: 77.6151, total_deaths: 24 },
  { id: "2", name: "Delhi Race Club", city: "Delhi", lat: 28.5244, lng: 77.0855, total_deaths: 18 },
  { id: "3", name: "Royal Western India Turf Club", city: "Mumbai", lat: 19.1136, lng: 72.8697, total_deaths: 31 },
  { id: "4", name: "Madras Horse Racing Club", city: "Chennai", lat: 13.0827, lng: 80.2707, total_deaths: 15 },
  { id: "5", name: "Kolkata Racing Association", city: "Kolkata", lat: 22.5726, lng: 88.3639, total_deaths: 12 },
  { id: "6", name: "Pune Race Course", city: "Pune", lat: 18.5204, lng: 73.8567, total_deaths: 9 },
]

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Hidden Cost of Horse Racing in India",
    excerpt: "Behind the glamour of horse racing lies a tragic reality of injury and death.",
    content: "Full article content here...",
    slug: "hidden-cost-horse-racing",
    published_at: "2024-01-15",
    image_url: "/horse-racing-track.jpg",
    published: true,
    created_at: "2024-01-15",
  },
  {
    id: "2",
    title: "Racing Injury Statistics Nobody Talks About",
    excerpt: "An analysis of documented and undocumented injuries in Indian horse racing.",
    content: "Full article content here...",
    slug: "racing-injury-statistics",
    published_at: "2024-01-10",
    image_url: "/statistical-analysis.jpg",
    published: true,
    created_at: "2024-01-10",
  },
  {
    id: "3",
    title: "International Standards for Horse Welfare",
    excerpt: "How India's racing standards compare to other countries.",
    content: "Full article content here...",
    slug: "international-horse-standards",
    published_at: "2024-01-05",
    image_url: "/international-standards.jpg",
    published: true,
    created_at: "2024-01-05",
  },
]

export default function HomePage() {
  const [horses, setHorses] = useState<Horse[]>(mockHorses)
  const [racetracks, setRacetracks] = useState<Racetrack[]>(mockRacetracks)
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts)
  const [totalDeaths, setTotalDeaths] = useState(109)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Once you connect to Supabase, replace this with actual API calls:
    // const fetchData = async () => {
    //   try {
    //     const { data: horsesData } = await supabase.from('horses').select('*').limit(3)
    //     const { data: tracksData } = await supabase.from('racetracks').select('*')
    //     const { data: postsData } = await supabase.from('blog_posts').select('*').eq('published', true).limit(3)
    //     setHorses(horsesData || mockHorses)
    //     setRacetracks(tracksData || mockRacetracks)
    //     setPosts(postsData || mockBlogPosts)
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

        <DataAndMapSection totalDeaths={totalDeaths} racetracks={racetracks} />

        <HomeActionSection />

        {/* Remember Them Section */}
        {horses && horses.length > 0 && (
          <section className="py-20 md:py-32 px-6 bg-muted/30">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Remember Them</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Each horse had a name, a story, and a life worth living. These are their memorials.
                </p>
              </div>

              <MemorialGrid horses={horses} />

              <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline">
                  <Link href="/memorials">
                    View All Memorials
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
