"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { Mail, Check } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    const supabase = createClient()

    try {
      const { error } = await supabase.from("subscriptions").insert({ email })

      if (error) {
        if (error.code === "23505") {
          // Duplicate email
          setMessage("You're already subscribed!")
          setStatus("success")
        } else {
          throw error
        }
      } else {
        setMessage("Thank you for subscribing!")
        setStatus("success")
        setEmail("")
      }
    } catch (error) {
      console.error("Subscription error:", error)
      setMessage("Something went wrong. Please try again.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-2 text-primary-foreground p-4 bg-primary-foreground/10 rounded-lg max-w-md mx-auto">
        <Check className="h-5 w-5" />
        <p className="font-medium">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading"}
            className="pl-10 h-12 bg-background text-foreground border-primary-foreground/20"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
      {status === "error" && <p className="text-sm text-primary-foreground/80 mt-2">{message}</p>}
    </form>
  )
}
