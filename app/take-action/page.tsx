import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export const metadata = {
  title: "Take Action - Erase Horseracing India",
  description: "Join the movement. Sign the pledge or volunteer with us to end horse racing in India.",
}

export default function TakeActionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="py-20 md:py-32 px-6 bg-muted/30 border-b">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">Take Action</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your voice matters. Choose how you want to support the movement to end horse racing in India.
            </p>
          </div>
        </section>

        {/* Pledge Section */}
        <section id="pledge" className="py-20 md:py-32 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">Take the Pledge</h2>

              <div className="prose prose-invert max-w-none mb-12">
                <div className="bg-muted/30 p-8 md:p-12 rounded-lg border border-border space-y-6 text-lg text-foreground leading-relaxed">
                  <p>
                    I pledge to stand against the exploitation of horses in racing. I recognize that horse racing is
                    built on the suffering of animals who cannot consent to participate.
                  </p>
                  <p>I commit to:</p>
                  <ul className="space-y-3 list-none">
                    <li className="flex gap-3 items-start">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <span>Never attend or financially support horse racing events</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <span>Advocate for policy changes to ban racing in my community</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <span>Raise awareness about the realities of horse racing</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <span>Support organizations working to end racing and protect horses</span>
                    </li>
                  </ul>
                  <p>
                    Every horse deserves freedom, not a racetrack. By taking this pledge, I join thousands of others
                    demanding change for horses across India.
                  </p>
                </div>
              </div>

              <Card className="border-2">
                <CardContent className="p-8 md:p-12 space-y-6">
                  <h3 className="font-serif text-2xl font-bold">Sign the Pledge</h3>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                        required
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="pledge-agree" required className="w-4 h-4" />
                      <label htmlFor="pledge-agree" className="text-sm">
                        I solemnly pledge to boycott horseracing and support efforts to end this industry in India
                      </label>
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                      Sign the Pledge
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Volunteer Section */}
        <section id="volunteer" className="py-20 md:py-32 px-6 bg-muted/30 border-t border-b">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">Volunteer With Us</h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Help us plan the next steps in this movement. We need skilled, passionate people to research, advocate,
              document, and build a future without horse racing. Share your talents and availability below.
            </p>

            <Card className="border-2">
              <CardContent className="p-8 md:p-12 space-y-6">
                <h3 className="font-serif text-2xl font-bold">Volunteer Form</h3>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">City</label>
                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Skills / How can you help?</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background resize-none"
                      placeholder="Tell us about your skills and how you'd like to contribute..."
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-medium">Availability</label>
                    <div className="space-y-2">
                      {["Weekdays", "Weekends", "Flexible", "Few hours per week", "Full-time"].map((option) => (
                        <div key={option} className="flex items-center gap-2">
                          <input type="checkbox" id={option} className="w-4 h-4" />
                          <label htmlFor={option} className="text-sm">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Submit Volunteer Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
