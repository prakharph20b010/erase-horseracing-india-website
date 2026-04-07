"use client"

import { useEditMode } from "@/components/editable/use-edit-mode"

export function EditOnly({ children }: { children: React.ReactNode }) {
  const { ready, enabled } = useEditMode()
  if (!ready || !enabled) return null
  return <>{children}</>
}
