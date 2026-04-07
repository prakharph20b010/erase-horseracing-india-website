import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"
import content from "@/data/pages/contact.json"
import { EditableText } from "@/components/editable/editable-text"
import { GoogleFormEmbed } from "@/components/google-form-embed"

export const metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
}

export default function ContactPage() {
  const icons = [Mail, Phone, MapPin]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="py-20 md:py-32 px-6 bg-muted/30 border-b">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <EditableText
              file="data/pages/contact.json"
              path={["hero", "title"]}
              value={content.hero.title}
              as="h1"
              className="font-serif text-5xl md:text-6xl font-bold text-foreground"
            />
            <EditableText
              file="data/pages/contact.json"
              path={["hero", "subtitle"]}
              value={content.hero.subtitle}
              as="p"
              multiline
              className="text-xl text-muted-foreground leading-relaxed"
            />
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 md:py-32 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {content.info.map((item, idx) => {
                const Icon = icons[idx] ?? Mail
                return (
                  <Card key={item.label} className="border-2">
                    <CardContent className="p-8 space-y-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <EditableText
                        file="data/pages/contact.json"
                        path={["info", idx, "label"]}
                        value={item.label}
                        as="h3"
                        className="font-bold text-lg"
                      />
                      <EditableText
                        file="data/pages/contact.json"
                        path={["info", idx, "value"]}
                        value={item.value}
                        as="p"
                        className="text-muted-foreground"
                      />
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Contact Form */}
            <div className="max-w-3xl space-y-6">
              <EditableText
                file="data/pages/contact.json"
                path={["form", "title"]}
                value={content.form.title}
                as="h2"
                className="font-serif text-3xl font-bold"
              />
              <GoogleFormEmbed
                src="https://forms.gle/6y5aaFHycG4EaTvk6"
                title="Contact us form"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
