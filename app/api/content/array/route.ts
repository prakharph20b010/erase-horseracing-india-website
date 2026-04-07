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

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production" || !isLocalRequest(request)) {
    return new Response("Forbidden", { status: 403 })
  }

  const body = await request.json()
  const file = String(body.file || "")
  const pathParts = body.path as Array<string | number>
  const action = String(body.action || "")
  const value = body.value
  const index = typeof body.index === "number" ? body.index : null

  if (!file.startsWith("data/") || !file.endsWith(".json")) {
    return new Response("Invalid file", { status: 400 })
  }
  if (!Array.isArray(pathParts)) {
    return new Response("Invalid path", { status: 400 })
  }

  const fullPath = path.join(process.cwd(), file)
  const resolved = path.resolve(fullPath)
  if (!resolved.startsWith(dataRoot)) {
    return new Response("Invalid path", { status: 400 })
  }

  const raw = fs.readFileSync(resolved, "utf8")
  const json = JSON.parse(raw)
  const arr = pathParts.length === 0 ? json : getDeep(json, pathParts)

  if (!Array.isArray(arr)) {
    return new Response("Target is not an array", { status: 400 })
  }

  if (action === "append") {
    arr.push(value)
  } else if (action === "remove" && index !== null) {
    if (index < 0 || index >= arr.length) {
      return new Response("Invalid index", { status: 400 })
    }
    arr.splice(index, 1)
  } else {
    return new Response("Invalid action", { status: 400 })
  }

  const out = JSON.stringify(json, null, 2) + "\n"
  fs.writeFileSync(resolved, out, { encoding: "utf8" })

  return new Response("OK", { status: 200 })
}
