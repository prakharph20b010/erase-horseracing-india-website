import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Share2, Mail } from "lucide-react"

export const metadata = {
  title: "Thank You - Erase Horseracing India",
  description: "Thank you for signing the pledge to end horse racing in India.",
}

export default function PledgeSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-10 w-10 text-primary" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Thank You for Your Pledge!</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                You've joined thousands of compassionate people standing up for horses. Together, we will end this
                cruelty.
              </p>
            </div>

            <div className="pt-8 space-y-6">
              <h2 className="font-serif text-2xl font-bold text-foreground">What's Next?</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-muted/30 rounded-lg text-left space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Share2 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Spread the Word</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Share this campaign with friends and family. The more people who pledge, the stronger our movement
                    becomes.
                  </p>
                </div>

                <div className="p-6 bg-muted/30 rounded-lg text-left space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold">Stay Updated</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We'll send you updates on our progress, upcoming actions, and ways you can help create change.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/memorials">View Horse Memorials</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/report">Report an Incident</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
