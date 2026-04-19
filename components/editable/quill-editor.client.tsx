"use client"

import { useEffect, useMemo, useRef } from "react"
import "quill/dist/quill.snow.css"

type QuillInstance = {
  root: { innerHTML: string }
  on: (eventName: string, handler: (...args: any[]) => void) => void
  off: (eventName: string, handler: (...args: any[]) => void) => void
  getSelection: (focus?: boolean) => { index: number; length: number } | null
  getLength: () => number
  insertEmbed: (index: number, type: string, value: any, source?: string) => void
  setSelection: (index: number, length: number) => void
  clipboard: { dangerouslyPasteHTML: (html: string) => void }
}

export default function QuillEditor({
  value,
  onChange,
  onUploadImage,
  placeholder = "Write here...",
}: {
  value: string
  onChange: (html: string) => void
  onUploadImage?: (file: File) => Promise<string>
  placeholder?: string
}) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<QuillInstance | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const settingRef = useRef(false)

  const toolbar = useMemo(
    () => [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "link", "image"],
      ["clean"],
    ],
    []
  )

  useEffect(() => {
    let mounted = true
    let handler: (() => void) | null = null

    const init = async () => {
      if (!hostRef.current) return
      if (quillRef.current) return

      const mod = await import("quill")
      const Quill = (mod as any).default ?? (mod as any)
      if (!mounted) return

      const imageHandler = () => {
        if (!onUploadImage) return
        const input = fileInputRef.current
        if (!input) return
        input.value = ""
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyInput = input as any
        if (typeof anyInput.showPicker === "function") anyInput.showPicker()
        else input.click()
      }

      const quill: QuillInstance = new Quill(hostRef.current, {
        theme: "snow",
        placeholder,
        modules: {
          toolbar: {
            container: toolbar,
            handlers: {
              image: imageHandler,
            },
          },
        },
      })

      quillRef.current = quill

      settingRef.current = true
      quill.clipboard.dangerouslyPasteHTML(value || "")
      settingRef.current = false

      handler = () => {
        if (settingRef.current) return
        onChange(quill.root.innerHTML)
      }
      quill.on("text-change", handler)
    }

    void init()

    return () => {
      mounted = false
      const quill = quillRef.current
      if (quill && handler) {
        quill.off("text-change", handler)
      }
      quillRef.current = null
    }
  }, [onChange, onUploadImage, placeholder, toolbar, value])

  useEffect(() => {
    const quill = quillRef.current
    if (!quill) return
    const current = quill.root.innerHTML || ""
    const next = value || ""
    if (current === next) return
    settingRef.current = true
    quill.clipboard.dangerouslyPasteHTML(next)
    settingRef.current = false
  }, [value])

  const insertImage = async (fileObj: File) => {
    const quill = quillRef.current
    if (!quill || !onUploadImage) return
    const url = await onUploadImage(fileObj)
    const range = quill.getSelection(true)
    const index = range ? range.index : quill.getLength()
    quill.insertEmbed(index, "image", url, "user")
    quill.setSelection(index + 1, 0)
  }

  return (
    <div className="space-y-2">
      <div ref={hostRef} />
      {onUploadImage && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0]
            if (!f) return
            await insertImage(f)
            if (fileInputRef.current) fileInputRef.current.value = ""
          }}
        />
      )}
    </div>
  )
}

