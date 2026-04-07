"use client"

import type { MouseEvent } from "react"
import { appendContentItem, removeContentItem, type ContentPath } from "@/lib/editable"
import { useEditMode } from "@/components/editable/use-edit-mode"

const setByPath = (obj: any, path: string, value: any) => {
  const parts = path.split(".")
  let current = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    if (current[key] === undefined) current[key] = {}
    current = current[key]
  }
  current[parts[parts.length - 1]] = value
}

type PromptField = {
  path: string
  label: string
  placeholder?: string
}

export function AddItemButton({
  file,
  path,
  template,
  label = "+ Add",
  promptFields = [],
}: {
  file: string
  path: ContentPath
  template: any
  label?: string
  promptFields?: PromptField[]
}) {
  const { ready, enabled } = useEditMode()
  if (!ready || !enabled) return null

  const handleAdd = async () => {
    const next = structuredClone ? structuredClone(template) : JSON.parse(JSON.stringify(template))

    for (const field of promptFields) {
      const input = window.prompt(field.label, field.placeholder ?? "")
      if (input !== null) {
        setByPath(next, field.path, input)
      }
    }

    await appendContentItem(file, path, next)
    window.location.reload()
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="mt-4 inline-flex items-center gap-2 rounded border border-border px-3 py-1 text-xs font-semibold text-foreground hover:bg-muted"
    >
      {label}
    </button>
  )
}

export function RemoveItemButton({ file, path, index }: { file: string; path: ContentPath; index: number }) {
  const { ready, enabled } = useEditMode()
  if (!ready || !enabled) return null

  const handleRemove = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const ok = window.confirm("Remove this item?")
    if (!ok) return
    await removeContentItem(file, path, index)
    window.location.reload()
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      data-stop-image-click
      className="absolute top-2 right-2 z-30 rounded bg-black/70 px-2 py-1 text-[10px] font-semibold text-white"
    >
      Remove
    </button>
  )
}
