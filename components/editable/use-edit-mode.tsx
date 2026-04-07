"use client"

import { useEffect, useState } from "react"
import { isEditEnabled, isLocalhost } from "@/lib/editable"

export function useEditMode() {
  const [ready, setReady] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const local = isLocalhost()
    const on = local && isEditEnabled()
    setEnabled(on)
    setReady(true)
  }, [])

  return { ready, enabled }
}
