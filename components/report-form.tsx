"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { Check, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function ReportForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    reporterName: "",
    reporterEmail: "",
    incidentType: "",
    racetrackName: "",
    incidentDate: "",
    description: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setError("")

    const supabase = createClient()

    try {
      const { error: insertError } = await supabase.from("reports").insert({
        reporter_name: formData.reporterName || null,
        reporter_email: formData.reporterEmail,
        incident_type: formData.incidentType as "injury" | "death" | "abuse" | "other",
        racetrack_name: formData.racetrackName,
        incident_date: formData.incidentDate || null,
        description: formData.description,
      })

      if (insertError) throw insertError

      setStatus("success")
      setTimeout(() => {
        router.push("/report/success")
      }, 1500)
    } catch (err) {
      console.error("Report submission error:", err)
      setError("Something went wrong. Please try again.")
      setStatus("error")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      incidentType: value,
    }))
  }

  if (status === "success") {
    return (
      <Card className="border-2 border-primary">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-serif text-2xl font-bold">Report Submitted Successfully!</h3>
          <p className="text-muted-foreground">Redirecting you...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reporterName">Your Name (Optional - Leave blank for anonymous)</Label>
            <Input
              id="reporterName"
              name="reporterName"
              type="text"
              value={formData.reporterName}
              onChange={handleChange}
              disabled={status === "loading"}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reporterEmail">
              Your Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="reporterEmail"
              name="reporterEmail"
              type="email"
              required
              value={formData.reporterEmail}
              onChange={handleChange}
              disabled={status === "loading"}
              placeholder="your.email@example.com"
            />
            <p className="text-xs text-muted-foreground">
              We'll only use this to follow up if needed. Your email won't be shared publicly.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="incidentType">
              Type of Incident <span className="text-destructive">*</span>
            </Label>
            <Select required value={formData.incidentType} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select incident type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="death">Horse Death</SelectItem>
                <SelectItem value="injury">Injury</SelectItem>
                <SelectItem value="abuse">Abuse or Mistreatment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="racetrackName">
                Racetrack Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="racetrackName"
                name="racetrackName"
                type="text"
                required
                value={formData.racetrackName}
                onChange={handleChange}
                disabled={status === "loading"}
                placeholder="e.g., Mahalaxmi Racecourse"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="incidentDate">Date of Incident (Optional)</Label>
              <Input
                id="incidentDate"
                name="incidentDate"
                type="date"
                value={formData.incidentDate}
                onChange={handleChange}
                disabled={status === "loading"}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Detailed Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              rows={6}
              required
              value={formData.description}
              onChange={handleChange}
              disabled={status === "loading"}
              placeholder="Please provide as much detail as possible: What happened? What did you observe? Were there any witnesses? What was the outcome?"
            />
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting Report...
              </>
            ) : (
              "Submit Report"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            All reports are confidential. We use them solely for advocacy and documentation purposes.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
