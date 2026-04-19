"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type FormState = {
  name: string
  city: string
  state: string
  latitude: string
  longitude: string
  description: string
  total_deaths: string
  status: "active" | "closed"
}

export default function MapEntryForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
    description: "",
    total_deaths: "0",
    status: "active",
  })
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState("")

  const update = (k: keyof FormState, v: string) =>
    setForm((s) => ({ ...s, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setMessage("")
    try {
      const payload = {
        name: form.name.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        description: form.description.trim() || null,
        total_deaths: Number(form.total_deaths) || 0,
        status: form.status || "active",
      }

      const res = await fetch("/api/racetracks", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Request failed")
      const data = await res.json()
      setMessage("Saved.")
      setForm({
        name: "",
        city: "",
        state: "",
        latitude: "",
        longitude: "",
        description: "",
        total_deaths: "0",
        status: "active",
      })
      return data
    } catch {
      setMessage("Error saving entry.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4 rounded-lg border border-border p-4 bg-background">
      <h3 className="text-lg font-semibold">Add racetrack</h3>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="admin-rt-name">Name</Label>
          <Input id="admin-rt-name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Name" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="admin-rt-city">City</Label>
          <Input id="admin-rt-city" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="City" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="admin-rt-state">State</Label>
          <Input id="admin-rt-state" value={form.state} onChange={(e) => update("state", e.target.value)} placeholder="State" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="admin-rt-lat">Latitude</Label>
          <Input id="admin-rt-lat" value={form.latitude} onChange={(e) => update("latitude", e.target.value)} placeholder="Latitude" inputMode="decimal" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="admin-rt-lng">Longitude</Label>
          <Input id="admin-rt-lng" value={form.longitude} onChange={(e) => update("longitude", e.target.value)} placeholder="Longitude" inputMode="decimal" />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="admin-rt-desc">Description (optional)</Label>
          <Input id="admin-rt-desc" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Description (optional)" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="admin-rt-deaths">Total deaths</Label>
          <Input id="admin-rt-deaths" value={form.total_deaths} onChange={(e) => update("total_deaths", e.target.value)} placeholder="Total deaths" inputMode="numeric" />
        </div>

        <div className="space-y-1.5">
          <Label>Status</Label>
          <Select value={form.status} onValueChange={(v) => setForm((s) => ({ ...s, status: v as FormState["status"] }))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">active</SelectItem>
              <SelectItem value="closed">closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button type="submit" disabled={busy}>
          {busy ? "Saving..." : "Save"}
        </Button>
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    </form>
  )
}

