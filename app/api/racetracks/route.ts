import fs from "fs"
import path from "path"

const isLocalRequest = (request: Request) => {
  const host = request.headers.get("host") ?? ""
  return host.includes("localhost") || host.includes("127.0.0.1")
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production" || !isLocalRequest(request)) {
    return new Response("Forbidden", { status: 403 })
  }

  try {
    const body = await request.json()
    const dataPath = path.join(process.cwd(), "data", "racetracks.json")
    let existing: any[] = []
    if (fs.existsSync(dataPath)) {
      const raw = fs.readFileSync(dataPath, "utf8")
      existing = raw ? JSON.parse(raw) : []
    }

    const max = existing.reduce((acc, item) => {
      const n = Number.parseInt(String(item?.id ?? ""), 10)
      if (!Number.isFinite(n)) return acc
      return Math.max(acc, n)
    }, 0)
    const id = String(max + 1 || Date.now())
    const now = new Date().toISOString().split("T")[0]

    const name = String(body.name ?? "").trim()
    if (!name) {
      return new Response("Name is required", { status: 400 })
    }

    const latitude = Number(body.latitude)
    const longitude = Number(body.longitude)
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return new Response("Latitude/longitude are required", { status: 400 })
    }

    const next = {
      id,
      name,
      city: String(body.city ?? "").trim(),
      state: String(body.state ?? "").trim(),
      latitude,
      longitude,
      description: body.description ? String(body.description) : null,
      total_deaths: Number(body.total_deaths) || 0,
      status: body.status === "closed" ? "closed" : "active",
      created_at: now,
      updated_at: now,
    }

    existing.push(next)
    fs.writeFileSync(dataPath, JSON.stringify(existing, null, 2) + "\n", { encoding: "utf8" })

    return new Response(JSON.stringify({ ok: true, item: next }), { status: 200, headers: { "content-type": "application/json" } })
  } catch (err) {
    return new Response("Error", { status: 500 })
  }
}
