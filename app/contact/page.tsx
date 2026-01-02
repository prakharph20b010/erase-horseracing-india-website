import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

export const metadata = {
  title: "Contact - Erase Horseracing India",
  description: "Get in touch with Erase Horseracing India. Send us a message or reach out directly.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="py-20 md:py-32 px-6 bg-muted/30 border-b">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">Contact Us</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have a message or question? Reach out to us below.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 md:py-32 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="border-2">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-muted-foreground">contact@erasehorseracing.org</p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">Phone</h3>
                  <p className="text-muted-foreground">+91 (XXX) XXX-XXXX</p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">Location</h3>
                  <p className="text-muted-foreground">India</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl">
              <Card className="border-2">
                <CardContent className="p-8 md:p-12 space-y-6">
                  <h2 className="font-serif text-3xl font-bold">Send us a Message</h2>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
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
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Subject</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Message</label>
                      <textarea
                        rows={6}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background resize-none"
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
