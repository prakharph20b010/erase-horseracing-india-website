import { createClient } from "@/lib/supabase/server"
import type { Horse, Racetrack } from "@/lib/types"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, AlertTriangle, ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: horse } = await supabase.from("horses").select("*").eq("slug", slug).single()

  if (!horse) {
    return {
      title: "Memorial Not Found",
    }
  }

  return {
    title: `${horse.name} - Memorial - Erase Horseracing India`,
    description: horse.story.slice(0, 160),
  }
}

export default async function MemorialDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: horse, error } = await supabase.from("horses").select("*").eq("slug", slug).single()

  if (error || !horse) {
    notFound()
  }

  // Fetch racetrack info if available
  let racetrack: Racetrack | null = null
  if (horse.racetrack_id) {
    const { data } = await supabase.from("racetracks").select("*").eq("id", horse.racetrack_id).single()
    racetrack = data
  }

  // Fetch related horses from the same racetrack
  let relatedHorses: Horse[] = []
  if (horse.racetrack_id) {
    const { data } = await supabase
      .from("horses")
      .select("*")
      .eq("racetrack_id", horse.racetrack_id)
      .neq("id", horse.id)
      .order("date_of_death", { ascending: false })
      .limit(3)
    relatedHorses = (data as Horse[]) || []
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Back Button */}
        <div className="container mx-auto px-6 pt-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/memorials">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Memorials
            </Link>
          </Button>
        </div>

        {/* Memorial Header */}
        <section className="py-12 md:py-16 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Image */}
              {horse.image_url && (
                <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
                  <img
                    src={horse.image_url || "/placeholder.svg"}
                    alt={horse.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">{horse.name}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Heart className="h-4 w-4 fill-current" />
                    <span className="text-sm">Forever in our hearts</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {horse.date_of_birth && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-muted-foreground">Born</p>
                        <p className="text-foreground">
                          {new Date(horse.date_of_birth).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  {horse.date_of_death && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-muted-foreground">Died</p>
                        <p className="text-foreground">
                          {new Date(horse.date_of_death).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  {horse.cause_of_death && (
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-muted-foreground">Cause of Death</p>
                        <p className="text-foreground">{horse.cause_of_death}</p>
                      </div>
                    </div>
                  )}

                  {racetrack && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-muted-foreground">Location</p>
                        <Link href="/map" className="text-foreground hover:text-primary transition-colors">
                          {racetrack.name}, {racetrack.city}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12 md:py-16 px-6 bg-muted/30">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Their Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-line">{horse.story}</p>
            </div>
          </div>
        </section>

        {/* Related Memorials */}
        {relatedHorses.length > 0 && (
          <section className="py-12 md:py-16 px-6">
            <div className="container mx-auto max-w-5xl">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
                More Horses Lost at {racetrack?.name}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedHorses.map((relatedHorse) => (
                  <Card key={relatedHorse.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <Link href={`/memorials/${relatedHorse.slug}`}>
                      {relatedHorse.image_url && (
                        <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                          <img
                            src={relatedHorse.image_url || "/placeholder.svg"}
                            alt={relatedHorse.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardContent className="p-4 space-y-2">
                        <h3 className="font-serif text-xl font-bold group-hover:text-primary transition-colors">
                          {relatedHorse.name}
                        </h3>
                        {relatedHorse.date_of_death && (
                          <p className="text-sm text-muted-foreground">
                            {new Date(relatedHorse.date_of_death).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "long",
                            })}
                          </p>
                        )}
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
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Honor {horse.name}'s Memory</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Join us in fighting to end horse racing so no more horses endure this preventable suffering.
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
