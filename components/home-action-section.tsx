import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Users } from "lucide-react"

export function HomeActionSection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Take Action</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pledge Card */}
          <Card className="border-2 overflow-hidden hover:shadow-lg transition-all">
            <CardContent className="p-8 md:p-12 space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Heart className="h-7 w-7 text-destructive" />
                </div>
                <h3 className="font-serif text-3xl font-bold">Take the Pledge</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Commit to ending your support of horse racing and join thousands who stand for change.
                </p>
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href="/take-action#pledge">Go to Pledge</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Volunteer Card */}
          <Card className="border-2 overflow-hidden hover:shadow-lg transition-all">
            <CardContent className="p-8 md:p-12 space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-3xl font-bold">Volunteer With Us</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Help us plan the next steps in this movement. Share your skills and passion.
                </p>
              </div>
              <Button asChild size="lg" className="w-full" variant="secondary">
                <Link href="/take-action#volunteer">Volunteer Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
