"use client"

import { useRef, useState } from "react"
import type { ChangeEventHandler, MouseEventHandler } from "react"
import { updateContent, type ContentPath } from "@/lib/editable"
import { useEditMode } from "@/components/editable/use-edit-mode"
import { MediaLibrary } from "@/components/editable/media-library"

type EditableImageProps = {
  file: string
  path: ContentPath
  src: string
  alt: string
  className?: string
  uploadDir?: string
  uploadName?: string
  placeholderText?: string
}

export function EditableImage({
  file,
  path,
  src,
  alt,
  className,
  uploadDir,
  uploadName,
  placeholderText = "No image available",
}: EditableImageProps) {
  const { ready, enabled } = useEditMode()
  const editable = ready && enabled
  const [current, setCurrent] = useState(src)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [showLibrary, setShowLibrary] = useState(false)

  const handleEdit: MouseEventHandler<HTMLElement> = async (event) => {
    if (!editable) return
    event.preventDefault()
    event.stopPropagation()
    if (uploadDir && inputRef.current) {
      inputRef.current.click()
      return
    }
    const next = window.prompt("Enter image URL/path", current)
    if (!next || next === current) return
    setCurrent(next)
    await updateContent(file, path, next)
  }

  const handleUpload: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (!editable || !uploadDir) return
    const fileObj = event.target.files?.[0]
    if (!fileObj) return

    const form = new FormData()
    form.append("file", fileObj)
    form.append("dir", uploadDir)
    if (uploadName) form.append("name", uploadName)

    const res = await fetch("/api/content/upload", {
      method: "POST",
      body: form,
    })

    if (!res.ok) {
      window.alert("Upload failed. Please try again.")
      return
    }

    const data = (await res.json()) as { path?: string }
    if (!data.path) return
    setCurrent(data.path)
    await updateContent(file, path, data.path)
    if (inputRef.current) inputRef.current.value = ""
  }

  const showPlaceholder = !current
  const openFilePicker = () => {
    if (!uploadDir) return
    const input = inputRef.current
    if (input) {
      input.value = ""
      // Prefer showPicker when available (Chromium), fallback to click.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyInput = input as any
      if (typeof anyInput.showPicker === "function") {
        anyInput.showPicker()
      } else {
        input.click()
      }
      return
    }
    setTimeout(() => {
      const next = inputRef.current
      if (!next) return
      next.value = ""
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyNext = next as any
      if (typeof anyNext.showPicker === "function") {
        anyNext.showPicker()
      } else {
        next.click()
      }
    }, 0)
  }

  const basePath = process.env.NODE_ENV === "production" ? "/erase-horseracing-india-website" : ""
  const resolvedSrc = current && current.startsWith("/") ? `${basePath}${current}` : current

  const handleOverlayClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!editable) return
    if (uploadDir) {
      openFilePicker()
      return
    }
    void handleEdit(event as any)
  }

  const handleWrapperClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!editable) return
    event.stopPropagation()
  }
  const handleWrapperPointerDown: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!editable) return
    event.stopPropagation()
  }

  const stopEvent: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  const stopPropagationOnly: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation()
  }

  return (
    <div
      className={editable ? "relative isolate" : undefined}
      onClick={handleWrapperClick}
      onPointerDown={handleWrapperPointerDown}
    >
      {showPlaceholder ? (
        <button
          type="button"
          onClick={handleOverlayClick}
          data-stop-image-click
          className={`relative z-10 flex items-center justify-center rounded border border-dashed border-border bg-muted/40 text-xs text-muted-foreground ${className ?? ""}`}
        >
          {placeholderText}
        </button>
      ) : (
        <img
          src={resolvedSrc}
          alt={alt}
          className={`${className ?? ""} relative z-0`}
          onClick={handleEdit}
        />
      )}
      {editable && (
        <div className="absolute top-2 right-2 z-50 flex items-center gap-2">
          {uploadDir && (
            <button
              type="button"
              onClick={(event) => {
                stopEvent(event)
                setShowLibrary(true)
              }}
              onMouseDown={stopPropagationOnly}
              onPointerDown={stopPropagationOnly}
              data-stop-image-click
              className="pointer-events-auto rounded bg-black/80 px-2 py-1 text-[11px] font-semibold text-white shadow"
            >
              Library
            </button>
          )}
          <button
            type="button"
            onClick={handleOverlayClick}
            onMouseDown={stopPropagationOnly}
            onPointerDown={(event) => {
              stopPropagationOnly(event)
              if (editable && uploadDir) openFilePicker()
            }}
            data-stop-image-click
            className="pointer-events-auto rounded bg-black/80 px-2 py-1 text-[11px] font-semibold text-white shadow"
          >
            {uploadDir ? "Upload" : "Edit"}
          </button>
        </div>
      )}
      {uploadDir && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      )}

      {uploadDir && (
        <MediaLibrary
          open={showLibrary}
          dir={uploadDir}
          onClose={() => setShowLibrary(false)}
          onSelect={async (selectedPath) => {
            setCurrent(selectedPath)
            await updateContent(file, path, selectedPath)
            setShowLibrary(false)
          }}
        />
      )}
    </div>
  )
}
