"use client"

import { useMemo, useState } from "react"
import type { Racetrack } from "@/lib/types"
import { appendContentItem } from "@/lib/editable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FormState = {
  name: string
  city: string
  state: string
  latitude: string
  longitude: string
  total_deaths: string
  status: Racetrack["status"]
  description: string
}

export default function RacetrackAddForm({
  racetracks,
  onAdded,
}: {
  racetracks: Racetrack[]
  onAdded: (item: Racetrack) => void
}) {
  const [form, setForm] = useState<FormState>({
    name: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
    total_deaths: "0",
    status: "active",
    description: "",
  })
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const nextId = useMemo(() => {
    let max = 0
    for (const t of racetracks) {
      const n = Number.parseInt(String(t.id), 10)
      if (Number.isFinite(n)) max = Math.max(max, n)
    }
    return String(max + 1)
  }, [racetracks])

  const update = (key: keyof FormState, value: string) =>
    setForm((s) => ({ ...s, [key]: value }))

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setMessage(null)

    const name = form.name.trim()
    if (!name) {
      setMessage("Name is required.")
      return
    }

    const lat = Number(form.latitude)
    const lng = Number(form.longitude)
    if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
      setMessage("Latitude must be a number between -90 and 90.")
      return
    }
    if (!Number.isFinite(lng) || lng < -180 || lng > 180) {
      setMessage("Longitude must be a number between -180 and 180.")
      return
    }

    const deaths = Math.max(0, Number(form.total_deaths) || 0)
    const now = new Date().toISOString().split("T")[0]
    const id = racetracks.some((t) => String(t.id) === nextId) ? String(Date.now()) : nextId

    const item: Racetrack = {
      id,
      name,
      city: form.city.trim(),
      state: form.state.trim(),
      latitude: lat,
      longitude: lng,
      description: form.description.trim() || null,
      total_deaths: deaths,
      status: form.status,
      created_at: now,
      updated_at: now,
    }

    setBusy(true)
    try {
      await appendContentItem("data/racetracks.json", [], item)
      onAdded(item)
      setMessage("Saved to data/racetracks.json.")
      setForm((s) => ({
        ...s,
        name: "",
        city: "",
        state: "",
        latitude: "",
        longitude: "",
        total_deaths: "0",
        description: "",
      }))
    } catch {
      setMessage("Error saving entry.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-lg border border-border bg-background p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-sm font-semibold">Add location (edit mode)</div>
          <div className="text-xs text-muted-foreground">Adds a new marker to the map by appending to data/racetracks.json.</div>
        </div>
        <div className="text-xs text-muted-foreground">Next id: {nextId}</div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="rt-name">Name</Label>
          <Input id="rt-name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Racetrack name" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="rt-city">City</Label>
          <Input id="rt-city" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="City" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="rt-state">State</Label>
          <Input id="rt-state" value={form.state} onChange={(e) => update("state", e.target.value)} placeholder="State" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="rt-lat">Latitude</Label>
          <Input id="rt-lat" inputMode="decimal" value={form.latitude} onChange={(e) => update("latitude", e.target.value)} placeholder="e.g. 13.0827" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="rt-lng">Longitude</Label>
          <Input id="rt-lng" inputMode="decimal" value={form.longitude} onChange={(e) => update("longitude", e.target.value)} placeholder="e.g. 77.6151" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="rt-deaths">Total deaths</Label>
          <Input id="rt-deaths" inputMode="numeric" value={form.total_deaths} onChange={(e) => update("total_deaths", e.target.value)} placeholder="0" />
        </div>

        <div className="space-y-1.5">
          <Label>Status</Label>
          <Select value={form.status} onValueChange={(v) => setForm((s) => ({ ...s, status: v as Racetrack["status"] }))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">active</SelectItem>
              <SelectItem value="closed">closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="rt-desc">Description (optional)</Label>
          <Input id="rt-desc" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Short note (optional)" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={busy}>
          {busy ? "Saving..." : "Add to map JSON"}
        </Button>
        {message && <div className="text-sm text-muted-foreground">{message}</div>}
      </div>
    </form>
  )
}

