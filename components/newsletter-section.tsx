"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, Instagram } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    const supabase = await createClient()
    const { error } = await supabase.from("subscriptions").insert([{ email }])

    if (error) {
      setMessage("Error subscribing. Please try again.")
    } else {
      setMessage("Thank you for subscribing!")
      setEmail("")
      setTimeout(() => setMessage(""), 3000)
    }
    setLoading(false)
  }

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
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Stay Informed</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Get updates on our campaigns, legal victories, and new horse memorials.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" size="lg" disabled={loading}>
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              {message && (
                <p className={`text-sm ${message.includes("Thank") ? "text-green-600" : "text-destructive"}`}>
                  {message}
                </p>
              )}
            </form>

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
