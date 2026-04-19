"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import type { BlogPost } from "@/lib/types"
import { appendContentItem, updateContent } from "@/lib/editable"
import { useEditMode } from "@/components/editable/use-edit-mode"
import { MediaLibrary } from "@/components/editable/media-library"
import QuillEditor from "@/components/editable/quill-editor.client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function stripHtml(html: string) {
  return html
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function looksLikeHtml(content: string) {
  return /<\/?[a-z][\s\S]*>/i.test(content)
}

function textToHtml(text: string) {
  const trimmed = (text || "").trim()
  if (!trimmed) return ""
  return trimmed
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("")
}

async function uploadImage({
  file,
  dir,
  name,
}: {
  file: File
  dir: string
  name?: string
}): Promise<string> {
  const form = new FormData()
  form.append("file", file)
  form.append("dir", dir)
  if (name) form.append("name", name)

  const res = await fetch("/api/content/upload", { method: "POST", body: form })
  if (!res.ok) throw new Error("Upload failed")
  const data = (await res.json()) as { path?: string }
  if (!data.path) throw new Error("Upload failed")
  return data.path
}

type Draft = {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  published: boolean
  published_at: string
  image_url: string
  html: string
}

function draftFromPost(post: BlogPost): Draft {
  const html = post.content
    ? looksLikeHtml(post.content)
      ? post.content
      : textToHtml(post.content)
    : ""
  return {
    id: post.id,
    title: post.title || "",
    slug: post.slug || "",
    excerpt: post.excerpt ?? "",
    author: post.author || "Erase Horseracing India",
    published: !!post.published,
    published_at: post.published_at ?? "",
    image_url: post.image_url ?? "",
    html,
  }
}

function newDraft(): Draft {
  const now = todayISO()
  return {
    id: String(Date.now()),
    title: "",
    slug: "",
    excerpt: "",
    author: "Erase Horseracing India",
    published: true,
    published_at: now,
    image_url: "",
    html: "",
  }
}

export default function UpdatesRichEditor({
  initialPosts,
  onPostsChange,
}: {
  initialPosts: BlogPost[]
  onPostsChange?: (next: BlogPost[]) => void
}) {
  const { ready, enabled } = useEditMode()
  const canEdit = ready && enabled

  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [draft, setDraft] = useState<Draft>(() => newDraft())
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const coverInputRef = useRef<HTMLInputElement | null>(null)
  const [showCoverLibrary, setShowCoverLibrary] = useState(false)

  const basePath = process.env.NODE_ENV === "production" ? "/erase-horseracing-india-website" : ""
  const resolvedCover = draft.image_url && draft.image_url.startsWith("/") ? `${basePath}${draft.image_url}` : draft.image_url

  const effectiveSlug = useMemo(() => slugify(draft.slug || draft.title), [draft.slug, draft.title])
  const uploadDir = useMemo(() => `articles/${effectiveSlug || "untitled"}`, [effectiveSlug])

  const slugs = useMemo(() => posts.map((p) => p.slug), [posts])

  useEffect(() => {
    onPostsChange?.(posts)
  }, [posts, onPostsChange])

  useEffect(() => {
    if (selectedIndex === null) return
    const p = posts[selectedIndex]
    if (!p) return
    setDraft(draftFromPost(p))
  }, [selectedIndex, posts])

  const selectNew = () => {
    setSelectedIndex(null)
    setDraft(newDraft())
    setMessage(null)
  }

  const save = async () => {
    if (!canEdit) return
    setMessage(null)

    const title = draft.title.trim()
    if (!title) {
      setMessage("Title is required.")
      return
    }
    const slug = effectiveSlug
    if (!slug) {
      setMessage("Slug is required.")
      return
    }

    const slugConflict =
      selectedIndex === null
        ? slugs.includes(slug)
        : posts.some((p, i) => i !== selectedIndex && p.slug === slug)
    if (slugConflict) {
      setMessage("Slug already exists. Choose a unique slug.")
      return
    }

    const now = todayISO()
    const html = draft.html || ""
    const excerpt =
      draft.excerpt.trim() ||
      (stripHtml(html).slice(0, 180) ? stripHtml(html).slice(0, 180) : null)

    const post: BlogPost = {
      id: draft.id,
      title,
      slug,
      excerpt: excerpt ? String(excerpt) : null,
      content: html,
      image_url: draft.image_url.trim() ? draft.image_url.trim() : null,
      published: !!draft.published,
      published_at: draft.published_at || now,
      author: draft.author.trim() || "Erase Horseracing India",
      created_at: selectedIndex === null ? now : posts[selectedIndex]?.created_at ?? now,
      updated_at: now,
    }

    setBusy(true)
    try {
      if (selectedIndex === null) {
        await appendContentItem("data/posts.json", [], post)
        setPosts((prev) => {
          const next = [...prev, post]
          setSelectedIndex(next.length - 1)
          return next
        })
        setMessage("Added.")
      } else {
        await updateContent("data/posts.json", [selectedIndex], post)
        setPosts((prev) => prev.map((p, i) => (i === selectedIndex ? post : p)))
        setMessage("Saved.")
      }
    } catch (err: any) {
      setMessage(err?.message || "Save failed.")
    } finally {
      setBusy(false)
    }
  }

  const handleEmbedUpload = async (fileObj: File) => {
    if (!effectiveSlug) {
      setMessage("Set a title/slug before uploading images.")
      throw new Error("Missing slug")
    }
    return uploadImage({ file: fileObj, dir: uploadDir, name: fileObj.name })
  }

  const handleCoverUpload = async (fileObj: File) => {
    if (!effectiveSlug) {
      setMessage("Set a title/slug before uploading a cover image.")
      return
    }
    const path = await uploadImage({ file: fileObj, dir: uploadDir, name: "cover" })
    setDraft((d) => ({ ...d, image_url: path }))
  }

  if (!canEdit) return null

  return (
    <Card className="mt-10">
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-lg font-semibold">Updates Editor</div>
            <div className="text-xs text-muted-foreground">
              Word-like editor with styling, links, lists, and images. Images upload into `/public/{uploadDir}/`.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={selectNew}>
              New
            </Button>
            <Button type="button" size="sm" onClick={save} disabled={busy}>
              {busy ? "Saving..." : selectedIndex === null ? "Add" : "Save"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-1 space-y-2">
            <div className="text-sm font-semibold">Existing updates</div>
            <div className="max-h-[320px] overflow-auto rounded border border-border">
              {posts.length === 0 ? (
                <div className="p-3 text-sm text-muted-foreground">No posts yet.</div>
              ) : (
                <div className="divide-y divide-border">
                  {posts.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className={`w-full p-3 text-left hover:bg-muted ${
                        idx === selectedIndex ? "bg-muted" : ""
                      }`}
                    >
                      <div className="text-sm font-medium line-clamp-1">{p.title || "(untitled)"}</div>
                      <div className="text-[11px] text-muted-foreground line-clamp-1">/{p.slug}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="upd-title">Title</Label>
                <Input
                  id="upd-title"
                  value={draft.title}
                  onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="upd-slug">Slug</Label>
                <Input
                  id="upd-slug"
                  value={draft.slug}
                  onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))}
                  placeholder="optional (auto from title)"
                />
                <div className="text-[11px] text-muted-foreground">Final slug: {effectiveSlug || "—"}</div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="upd-author">Author</Label>
                <Input
                  id="upd-author"
                  value={draft.author}
                  onChange={(e) => setDraft((d) => ({ ...d, author: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="upd-excerpt">Excerpt (optional)</Label>
                <Textarea
                  id="upd-excerpt"
                  value={draft.excerpt}
                  onChange={(e) => setDraft((d) => ({ ...d, excerpt: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="flex items-center justify-between rounded border border-border p-3">
                <div>
                  <div className="text-sm font-medium">Published</div>
                  <div className="text-xs text-muted-foreground">Show on the Updates list</div>
                </div>
                <Switch
                  checked={draft.published}
                  onCheckedChange={(v) => setDraft((d) => ({ ...d, published: v }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="upd-date">Published date</Label>
                <Input
                  id="upd-date"
                  type="date"
                  value={draft.published_at}
                  onChange={(e) => setDraft((d) => ({ ...d, published_at: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold">Cover image</div>
                  <div className="text-xs text-muted-foreground">Stored path is saved to JSON.</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button type="button" size="sm" variant="outline" onClick={() => setShowCoverLibrary(true)} disabled={!effectiveSlug}>
                    Library
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      const input = coverInputRef.current
                      if (!input) return
                      input.value = ""
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const anyInput = input as any
                      if (typeof anyInput.showPicker === "function") anyInput.showPicker()
                      else input.click()
                    }}
                    disabled={!effectiveSlug}
                  >
                    Upload
                  </Button>
                </div>
              </div>

              <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted flex items-center justify-center">
                {resolvedCover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resolvedCover} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-xs text-muted-foreground italic">{effectiveSlug ? "No cover image" : "Set a title/slug first"}</div>
                )}
              </div>

              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const f = e.target.files?.[0]
                  if (!f) return
                  try {
                    await handleCoverUpload(f)
                  } catch (err: any) {
                    setMessage(err?.message || "Upload failed.")
                  }
                }}
              />

              <MediaLibrary
                open={showCoverLibrary}
                dir={uploadDir}
                onClose={() => setShowCoverLibrary(false)}
                onSelect={(path) => {
                  setDraft((d) => ({ ...d, image_url: path }))
                  setShowCoverLibrary(false)
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold">Content</div>
                  <div className="text-xs text-muted-foreground">
                    Use the image button to upload and embed images.
                  </div>
                </div>
              </div>

              <QuillEditor
                value={draft.html}
                onChange={(val: string) => setDraft((d) => ({ ...d, html: val }))}
                onUploadImage={handleEmbedUpload}
                placeholder="Write your update..."
              />
            </div>

            {message && <div className="text-sm text-muted-foreground">{message}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
