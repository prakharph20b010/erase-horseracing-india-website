import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Shield, Heart } from "lucide-react"
import content from "@/data/pages/report-success.json"
import { EditableText } from "@/components/editable/editable-text"

export const metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
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
              <EditableText
                file="data/pages/report-success.json"
                path={["hero", "title"]}
                value={content.hero.title}
                as="h1"
                className="font-serif text-4xl md:text-5xl font-bold text-foreground"
              />
              <EditableText
                file="data/pages/report-success.json"
                path={["hero", "subtitle"]}
                value={content.hero.subtitle}
                as="p"
                multiline
                className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              />
            </div>

            <div className="pt-8 space-y-6">
              <EditableText
                file="data/pages/report-success.json"
                path={["next", "title"]}
                value={content.next.title}
                as="h2"
                className="font-serif text-2xl font-bold text-foreground"
              />

              <div className="grid md:grid-cols-2 gap-4">
                {content.next.cards.map((card, idx) => {
                  const Icon = idx === 0 ? Shield : Heart
                  const iconBg = idx === 0 ? "bg-primary/10" : "bg-secondary/10"
                  const iconColor = idx === 0 ? "text-primary" : "text-secondary"

                  return (
                    <div key={idx} className="p-6 bg-muted/30 rounded-lg text-left space-y-3">
                      <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 ${iconColor}`} />
                      </div>
                      <EditableText
                        file="data/pages/report-success.json"
                        path={["next", "cards", idx, "title"]}
                        value={card.title}
                        as="h3"
                        className="font-semibold"
                      />
                      <EditableText
                        file="data/pages/report-success.json"
                        path={["next", "cards", idx, "text"]}
                        value={card.text}
                        as="p"
                        multiline
                        className="text-sm text-muted-foreground leading-relaxed"
                      />
                    </div>
                  )}
                })}
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {content.buttons.map((button, idx) => (
                <Button
                  key={button.href}
                  asChild
                  size="lg"
                  variant={button.variant === "outline" ? "outline" : "default"}
                >
                  <Link href={button.href}>
                    <EditableText
                      file="data/pages/report-success.json"
                      path={["buttons", idx, "label"]}
                      value={button.label}
                      as="span"
                    />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
