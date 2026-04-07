import fs from "fs"
import path from "path"

const isLocalRequest = (request: Request) => {
  const host = request.headers.get("host") ?? ""
  return host.includes("localhost") || host.includes("127.0.0.1")
}

const publicRoot = path.join(process.cwd(), "public")

const sanitizeDir = (dir: string) =>
  dir
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/\.\.(\/|\\)/g, "")
    .replace(/\/{2,}/g, "/")

const sanitizeName = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "") || "image"

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production" || !isLocalRequest(request)) {
    return new Response("Forbidden", { status: 403 })
  }

  const form = await request.formData()
  const file = form.get("file")
  const dirRaw = String(form.get("dir") || "uploads")
  const nameRaw = String(form.get("name") || "")

  if (!(file instanceof File)) {
    return new Response("Missing file", { status: 400 })
  }

  const safeDir = sanitizeDir(dirRaw)
  const targetDir = path.join(publicRoot, safeDir)
  const resolved = path.resolve(targetDir)
  if (!resolved.startsWith(publicRoot)) {
    return new Response("Invalid path", { status: 400 })
  }

  fs.mkdirSync(resolved, { recursive: true })

  const originalExt = path.extname(file.name)
  const baseName = sanitizeName(nameRaw || path.basename(file.name, originalExt))
  const ext = originalExt || ".png"
  const filename = `${baseName}-${Date.now()}${ext}`
  const outPath = path.join(resolved, filename)

  const buffer = Buffer.from(await file.arrayBuffer())
  fs.writeFileSync(outPath, buffer)

  const publicPath = `/${safeDir}/${filename}`
  try {
    const libraryPath = path.join(publicRoot, "media-library.json")
    let existing: { items?: Array<{ path: string; name: string; dir: string; uploadedAt: string }> } = {}
    if (fs.existsSync(libraryPath)) {
      const raw = fs.readFileSync(libraryPath, "utf8")
      existing = raw ? JSON.parse(raw) : {}
    }
    const items = Array.isArray(existing.items) ? existing.items : []
    const filtered = items.filter((item) => item.path !== publicPath)
    filtered.unshift({
      path: publicPath,
      name: filename,
      dir: safeDir,
      uploadedAt: new Date().toISOString(),
    })
    const out = JSON.stringify({ items: filtered }, null, 2) + "\n"
    fs.writeFileSync(libraryPath, out, { encoding: "utf8" })
  } catch {
    // Ignore manifest errors; upload still succeeds.
  }

  return Response.json({ path: publicPath })
}
