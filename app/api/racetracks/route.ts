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

    const id = String(Date.now())
    const now = new Date().toISOString().split("T")[0]
    const next = {
      id,
      name: body.name || null,
      city: body.city || null,
      state: body.state || null,
      latitude: body.latitude ?? null,
      longitude: body.longitude ?? null,
      description: body.description || null,
      total_deaths: Number(body.total_deaths) || 0,
      status: body.status || "active",
      created_at: now,
      updated_at: now,
      image_url: body.image_url || null,
    }

    existing.push(next)
    fs.writeFileSync(dataPath, JSON.stringify(existing, null, 2) + "\n", { encoding: "utf8" })

    return new Response(JSON.stringify({ ok: true, item: next }), { status: 200, headers: { "content-type": "application/json" } })
  } catch (err) {
    return new Response("Error", { status: 500 })
  }
}
