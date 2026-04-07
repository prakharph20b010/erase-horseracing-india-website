"use client"

import { useState } from "react"

type FormState = {
  name: string
  city: string
  state: string
  latitude: string
  longitude: string
  total_deaths: string
  status: string
  image_url: string
}

export default function MapEntryForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
    total_deaths: "0",
    status: "active",
    image_url: "",
  })
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState("")

  const update = (k: keyof FormState, v: string) => setForm((s) => ({ ...s, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setMessage("")
    try {
      const payload = {
        name: form.name,
        city: form.city || null,
        state: form.state || null,
        latitude: Number(form.latitude) || null,
        longitude: Number(form.longitude) || null,
        total_deaths: Number(form.total_deaths) || 0,
        status: form.status || "active",
        image_url: form.image_url || null,
      }

      const res = await fetch("/api/racetracks", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Request failed")
      const data = await res.json()
      setMessage("Saved.")
      setForm({ name: "", city: "", state: "", latitude: "", longitude: "", total_deaths: "0", status: "active", image_url: "" })
      return data
    } catch (err) {
      setMessage("Error saving entry.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4 rounded-lg border p-4 bg-white">
      <h3 className="text-lg font-semibold">Add racetrack</h3>

      <div className="grid grid-cols-2 gap-2">
        <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Name" className="input" />
        <input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="City" className="input" />
        <input value={form.state} onChange={(e) => update("state", e.target.value)} placeholder="State" className="input" />
        <input value={form.status} onChange={(e) => update("status", e.target.value)} placeholder="Status" className="input" />
        <input value={form.latitude} onChange={(e) => update("latitude", e.target.value)} placeholder="Latitude" className="input" />
        <input value={form.longitude} onChange={(e) => update("longitude", e.target.value)} placeholder="Longitude" className="input" />
        <input value={form.total_deaths} onChange={(e) => update("total_deaths", e.target.value)} placeholder="Total deaths" className="input" />
        <input value={form.image_url} onChange={(e) => update("image_url", e.target.value)} placeholder="Image path (optional)" className="input col-span-2" />
      </div>

      <div className="flex items-center gap-2">
        <button disabled={busy} className="btn-primary px-3 py-1 rounded">
          {busy ? "Saving…" : "Save"}
        </button>
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    </form>
  )
}
