"use client"

import { useEffect, useRef, useState } from "react"
import type { KeyboardEventHandler, MouseEventHandler, ElementType } from "react"
import { updateContent, type ContentPath } from "@/lib/editable"
import { useEditMode } from "@/components/editable/use-edit-mode"

const trimIfSingleLine = (text: string) => text.replace(/\s+/g, " ").trim()

type EditableTextProps = {
  file: string
  path: ContentPath
  value: string
  as?: ElementType
  className?: string
  multiline?: boolean
}

export function EditableText({
  file,
  path,
  value,
  as = "span",
  className,
  multiline = false,
}: EditableTextProps) {
  const Component = as as any
  const { ready, enabled } = useEditMode()
  const editable = ready && enabled
  const ref = useRef<HTMLElement | null>(null)
  const [current, setCurrent] = useState(value)

  useEffect(() => {
    setCurrent(value)
  }, [value])

  const handleBlur = async () => {
    if (!ref.current) return
    const raw = ref.current.innerText ?? ""
    const next = multiline ? raw : trimIfSingleLine(raw)
    if (next === current) return
    setCurrent(next)
    await updateContent(file, path, next)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    if (!multiline && event.key === "Enter") {
      event.preventDefault()
      ;(event.currentTarget as HTMLElement).blur()
    }
  }

  const handleClick: MouseEventHandler<HTMLElement> = (event) => {
    if (!editable) return
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <Component
      ref={ref}
      className={className}
      contentEditable={editable}
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      spellCheck={false}
    >
      {current}
    </Component>
  )
}
