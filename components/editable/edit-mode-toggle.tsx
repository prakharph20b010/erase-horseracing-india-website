"use client"

import { useEffect, useState } from "react"
import { isLocalhost, setEditEnabled } from "@/lib/editable"
import { useEditMode } from "@/components/editable/use-edit-mode"

export function EditModeToggle() {
  const [visible, setVisible] = useState(false)
  const { ready, enabled } = useEditMode()

  useEffect(() => {
    setVisible(isLocalhost())
  }, [])

  if (!visible || !ready) return null

  const toggle = () => {
    const next = !enabled
    setEditEnabled(next)
    window.location.reload()
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
        enabled
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background text-foreground border-border"
      }`}
      aria-pressed={enabled}
    >
      Edit Mode: {enabled ? "On" : "Off"}
    </button>
  )
}
