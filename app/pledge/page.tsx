import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PledgeForm } from "@/components/pledge-form"
import { Heart, Users, TrendingUp, Shield } from "lucide-react"

export const metadata = {
  title: "Sign the Pledge - Erase Horseracing India",
  description: "Join thousands in pledging to never attend or support horse racing. Stand with us for change.",
}

export default function PledgePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Header Section */}
        <section className="py-16 md:py-20 px-6 bg-muted/30 border-b">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground text-balance">Take the Pledge</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Join thousands of compassionate people across India who refuse to support an industry built on animal
              suffering. Your voice matters.
            </p>
          </div>
        </section>

        {/* Why Pledge Section */}
        <section className="py-12 md:py-16 px-6">
          <div className="container mx-auto max-w-5xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Why Your Pledge Matters
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-muted/30 rounded-lg space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold">Build a Movement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every signature strengthens our collective voice. When thousands pledge, lawmakers and industry
                  leaders must listen.
                </p>
              </div>

              <div className="p-6 bg-muted/30 rounded-lg space-y-3">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-serif text-xl font-bold">Create Economic Pressure</h3>
                <p className="text-muted-foreground leading-relaxed">
                  By refusing to attend races, we demonstrate that there's no social license for this exploitation. The
                  industry cannot survive without public support.
                </p>
              </div>

              <div className="p-6 bg-muted/30 rounded-lg space-y-3">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-bold">Support Legal Action</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your pledge demonstrates public opposition to racing, strengthening legal challenges and policy
                  advocacy efforts.
                </p>
              </div>

              <div className="p-6 bg-muted/30 rounded-lg space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold">Honor the Horses</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Each pledge is a promise to the horses who have suffered: their deaths will not be in vain, and we
                  will fight for change.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Pledge */}
        <section className="py-12 md:py-16 px-6 bg-primary/5 border-y border-primary/20">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">The Pledge</h2>
              <div className="bg-background p-8 rounded-lg border-2 border-primary/20 space-y-4">
                <p className="text-lg leading-relaxed italic text-foreground">
                  "I pledge to never attend, support, or bet on horse racing. I recognize that horse racing causes
                  preventable suffering and death. I commit to speaking out against this exploitation and supporting
                  efforts to end horse racing in India."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 md:py-16 px-6">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Add Your Name</h2>
              <p className="text-muted-foreground">Join the movement for horses</p>
            </div>
            <PledgeForm />
          </div>
        </section>

        {/* What Happens Next */}
        <section className="py-12 md:py-16 px-6 bg-muted/30">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6 text-center">What Happens Next?</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Your pledge is recorded</h3>
                  <p className="text-muted-foreground text-sm">
                    We'll add your name to our growing list of supporters fighting to end horse racing.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Stay informed</h3>
                  <p className="text-muted-foreground text-sm">
                    You'll receive updates on our campaigns, legal victories, and opportunities to take further action.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Amplify your impact</h3>
                  <p className="text-muted-foreground text-sm">
                    Share your pledge on social media and encourage others to join. Change happens when we speak up
                    together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
