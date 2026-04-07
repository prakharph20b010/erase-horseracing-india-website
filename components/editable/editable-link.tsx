"use client"

import type { MouseEvent } from "react"
import { updateContent, type ContentPath } from "@/lib/editable"
import { EditableText } from "@/components/editable/editable-text"
import { useEditMode } from "@/components/editable/use-edit-mode"

type EditableLinkProps = {
  file: string
  textPath: ContentPath
  hrefPath: ContentPath
  text: string
  href: string
  className?: string
}

export function EditableLink({ file, textPath, hrefPath, text, href, className }: EditableLinkProps) {
  const { ready, enabled } = useEditMode()
  const editable = ready && enabled

  const handleEditHref = async (event: MouseEvent<HTMLAnchorElement>) => {
    if (!editable || !(event.altKey || event.ctrlKey)) return
    event.preventDefault()
    const next = window.prompt("Enter link URL", href)
    if (!next || next === href) return
    await updateContent(file, hrefPath, next)
  }

  return (
    <a href={href} className={className} onClick={handleEditHref}>
      <EditableText file={file} path={textPath} value={text} as="span" />
    </a>
  )
}
