import fs from "fs"
import path from "path"

const isLocalRequest = (request: Request) => {
  const host = request.headers.get("host") ?? ""
  return host.includes("localhost") || host.includes("127.0.0.1")
}

const dataRoot = path.join(process.cwd(), "data")

const getDeep = (obj: any, pathParts: Array<string | number>) => {
  let current = obj
  for (let i = 0; i < pathParts.length; i++) {
    const key = pathParts[i]
    if (current == null) return undefined
    current = current[key]
  }
  return current
}

const setDeep = (obj: any, pathParts: Array<string | number>, value: any) => {
  let current = obj
  for (let i = 0; i < pathParts.length - 1; i++) {
    const key = pathParts[i]
    if (current[key] === undefined) {
      current[key] = typeof pathParts[i + 1] === "number" ? [] : {}
    }
    current = current[key]
  }
  current[pathParts[pathParts.length - 1]] = value
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production" || !isLocalRequest(request)) {
    return new Response("Forbidden", { status: 403 })
  }

  const body = await request.json()
  const file = String(body.file || "")
  const pathParts = body.path as Array<string | number>
  let value: any = String(body.value ?? "")

  if (!file.startsWith("data/") || !file.endsWith(".json")) {
    return new Response("Invalid file", { status: 400 })
  }
  if (!Array.isArray(pathParts) || pathParts.length === 0) {
    return new Response("Invalid path", { status: 400 })
  }

  const fullPath = path.join(process.cwd(), file)
  const resolved = path.resolve(fullPath)
  if (!resolved.startsWith(dataRoot)) {
    return new Response("Invalid path", { status: 400 })
  }

  const raw = fs.readFileSync(resolved, "utf8")
  const json = JSON.parse(raw)
  const current = getDeep(json, pathParts)

  if (typeof current === "number") {
    const num = Number(value)
    if (Number.isFinite(num)) value = num
  }

  setDeep(json, pathParts, value)

  const out = JSON.stringify(json, null, 2) + "\n"
  fs.writeFileSync(resolved, out, { encoding: "utf8" })

  return new Response("OK", { status: 200 })
}
