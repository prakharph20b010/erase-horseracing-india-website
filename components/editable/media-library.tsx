"use client"

import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"

type LibraryItem = {
  path: string
  name: string
}

export function MediaLibrary({
  open,
  dir,
  onClose,
  onSelect,
}: {
  open: boolean
  dir?: string
  onClose: () => void
  onSelect: (path: string) => void
}) {
  const [items, setItems] = useState<LibraryItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const query = useMemo(() => {
    const ts = Date.now()
    return `/media-library.json?ts=${ts}`
  }, [])

  useEffect(() => {
    if (!open) return
    setLoading(true)
    setError(null)
    fetch(query, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) return { items: [] }
        return res.json()
      })
      .then((data) => {
        const all = data.items ?? []
        if (!dir) {
          setItems(all)
          return
        }
        const cleaned = dir.replace(/^\/+/, "")
        const normalized = cleaned.split("\\").join("/")
        const prefix = `/${normalized}/`
        setItems(
          all.filter((item: LibraryItem & { dir?: string }) => {
            if (item.dir) return item.dir === dir
            return item.path.startsWith(prefix)
          })
        )
      })
      .catch((err: any) => setError(err?.message || "Failed to load media library."))
      .finally(() => setLoading(false))
  }, [open, query, dir])

  if (!open) return null
  if (typeof document === "undefined") return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-4xl rounded-lg bg-background shadow-xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <h3 className="text-sm font-semibold">Media Library</h3>
            <p className="text-xs text-muted-foreground">
              {dir ? `Folder: /public/${dir}` : "All uploaded images"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold px-2 py-1 rounded border border-border hover:bg-muted"
          >
            Close
          </button>
        </div>

        <div className="p-4">
          {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <p className="text-sm text-muted-foreground">No images found.</p>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {items.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => onSelect(item.path)}
                  className="group rounded border border-border overflow-hidden text-left hover:shadow"
                >
                  <div className="aspect-video bg-muted">
                    <img
                      src={item.path}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="px-2 py-1 text-[11px] text-muted-foreground truncate">
                    {item.name}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
