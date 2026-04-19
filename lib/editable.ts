export const isLocalhost = () => {
  if (typeof window === "undefined") return false
  const host = window.location.hostname
  return host === "localhost" || host === "127.0.0.1"
}

const EDIT_KEY = "eh_edit_mode"

export const isEditEnabled = () => {
  if (typeof window === "undefined") return false
  return window.localStorage.getItem(EDIT_KEY) === "1"
}

export const setEditEnabled = (enabled: boolean) => {
  if (typeof window === "undefined") return
  window.localStorage.setItem(EDIT_KEY, enabled ? "1" : "0")
}

export type ContentPath = Array<string | number>

export async function updateContent(file: string, path: ContentPath, value: any) {
  if (!isLocalhost() || !isEditEnabled()) return
  await fetch("/api/content/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file, path, value }),
  })
}

export async function appendContentItem(file: string, path: ContentPath, value: any) {
  if (!isLocalhost() || !isEditEnabled()) return
  await fetch("/api/content/array", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file, path, action: "append", value }),
  })
}

export async function removeContentItem(file: string, path: ContentPath, index: number) {
  if (!isLocalhost() || !isEditEnabled()) return
  await fetch("/api/content/array", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file, path, action: "remove", index }),
  })
}
