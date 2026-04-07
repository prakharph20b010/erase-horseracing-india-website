"use client"

import { Card } from "@/components/ui/card"
import { Twitter, Linkedin, Instagram } from "lucide-react"
import shared from "@/data/pages/shared.json"
import { EditableText } from "@/components/editable/editable-text"

export function NewsletterSection() {
  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/erasehorse", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ]

  return (
    <section className="py-20 md:py-32 px-6 bg-background">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-8 md:p-12 border-2">
          <div className="text-center space-y-8">
            <div>
              <EditableText
                file="data/pages/shared.json"
                path={["newsletter", "title"]}
                value={shared.newsletter.title}
                as="h2"
                className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4"
              />
              <EditableText
                file="data/pages/shared.json"
                path={["newsletter", "subtitle"]}
                value={shared.newsletter.subtitle}
                as="p"
                multiline
                className="text-lg text-muted-foreground leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-center gap-6 pt-4 border-t">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
