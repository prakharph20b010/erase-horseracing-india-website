import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ReportForm } from "@/components/report-form"
import { Shield, Eye, FileText, Lock } from "lucide-react"

export const metadata = {
  title: "Report an Incident - Erase Horseracing India",
  description: "Report racing injuries, deaths, or abuse. Your report helps document the reality of horse racing.",
}

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Header Section */}
        <section className="py-16 md:py-20 px-6 bg-muted/30 border-b">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground text-balance">
              Report an Incident
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              If you've witnessed a horse injury, death, or abuse at a racetrack, your report is crucial. Every
              documented incident helps build the case for ending horse racing.
            </p>
          </div>
        </section>

        {/* Why Report Section */}
        <section className="py-12 md:py-16 px-6">
          <div className="container mx-auto max-w-5xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Why Your Report Matters
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-muted/30 rounded-lg space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold">Document the Truth</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The racing industry often conceals injuries and deaths. Your eyewitness account creates an independent
                  record of what really happens on the track.
                </p>
              </div>

              <div className="p-6 bg-muted/30 rounded-lg space-y-3">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-serif text-xl font-bold">Hold Industry Accountable</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your reports help us track patterns, identify problem tracks, and demonstrate the systemic nature of
                  racing cruelty.
                </p>
              </div>

              <div className="p-6 bg-muted/30 rounded-lg space-y-3">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-bold">Support Legal Action</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Documented incidents strengthen legal challenges to racing and support investigations by animal
                  welfare authorities.
                </p>
              </div>

              <div className="p-6 bg-muted/30 rounded-lg space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold">Your Privacy Protected</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You can report anonymously if you prefer. We'll handle all reports with confidentiality and use them
                  only for advocacy purposes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 md:py-16 px-6 bg-muted/30">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Submit Your Report</h2>
              <p className="text-muted-foreground">Provide as much detail as possible</p>
            </div>
            <ReportForm />
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-12 md:py-16 px-6">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6 text-center">
              What Happens to Your Report?
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Review and verification</h3>
                  <p className="text-muted-foreground text-sm">
                    Our team reviews each report to verify details and assess the incident's severity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Database documentation</h3>
                  <p className="text-muted-foreground text-sm">
                    Verified incidents are added to our database to track patterns and identify problem venues.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Advocacy and legal use</h3>
                  <p className="text-muted-foreground text-sm">
                    Reports support our legal challenges, media campaigns, and advocacy efforts to end horse racing.
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
