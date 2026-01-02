import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Shield, Heart } from "lucide-react"

export const metadata = {
  title: "Report Submitted - Erase Horseracing India",
  description: "Thank you for reporting an incident. Your report helps us fight for horses.",
}

export default function ReportSuccessPage() {
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
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Thank You for Your Report</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Your eyewitness account is invaluable. Every documented incident strengthens our case for ending horse
                racing.
              </p>
            </div>

            <div className="pt-8 space-y-6">
              <h2 className="font-serif text-2xl font-bold text-foreground">What Happens Next?</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-muted/30 rounded-lg text-left space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">We Review Your Report</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our team will carefully review and verify the details. If needed, we may contact you for additional
                    information.
                  </p>
                </div>

                <div className="p-6 bg-muted/30 rounded-lg text-left space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold">Your Report Drives Change</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Documented incidents support our advocacy, legal challenges, and public awareness campaigns.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/pledge">Sign the Pledge</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/memorials">View Memorials</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
