import type { BlogPost, PostBlock } from "@/lib/types"

const INLINE_RE =
  /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|~~([^~]+)~~|_([^_]+)_|\*([^*]+)\*/g

function renderInline(text: string) {
  const out: Array<React.ReactNode> = []
  let lastIndex = 0
  let key = 0

  for (const match of text.matchAll(INLINE_RE)) {
    const index = match.index ?? 0
    if (index > lastIndex) {
      out.push(<span key={`t-${key++}`}>{text.slice(lastIndex, index)}</span>)
    }

    const [full, code, linkLabel, linkUrl, bold, strike, italicUnderscore, italicStar] = match as any
    if (code) {
      out.push(
        <code key={`c-${key++}`} className="rounded bg-muted px-1 py-0.5 text-[0.95em]">
          {code}
        </code>
      )
    } else if (linkLabel && linkUrl) {
      out.push(
        <a
          key={`a-${key++}`}
          href={linkUrl}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline underline-offset-4 hover:opacity-80"
        >
          {linkLabel}
        </a>
      )
    } else if (bold) {
      out.push(
        <strong key={`b-${key++}`} className="font-semibold">
          {bold}
        </strong>
      )
    } else if (strike) {
      out.push(<del key={`s-${key++}`}>{strike}</del>)
    } else if (italicUnderscore || italicStar) {
      out.push(<em key={`i-${key++}`}>{italicUnderscore ?? italicStar}</em>)
    } else {
      out.push(<span key={`u-${key++}`}>{full}</span>)
    }

    lastIndex = index + full.length
  }

  if (lastIndex < text.length) {
    out.push(<span key={`t-${key++}`}>{text.slice(lastIndex)}</span>)
  }

  return out
}

function renderTextBlock(text: string) {
  const lines = text.split("\n")
  return lines.map((line, idx) => (
    <p key={idx} className="leading-relaxed text-foreground/95">
      {renderInline(line)}
    </p>
  ))
}

export function PostContent({ post }: { post: Pick<BlogPost, "content" | "blocks"> }) {
  const blocks = Array.isArray(post.blocks) ? post.blocks : null

  if (!blocks || blocks.length === 0) {
    const content = (post.content || "").trim()
    if (!content) return null
    return <div className="space-y-4">{renderTextBlock(content)}</div>
  }

  return (
    <div className="space-y-5">
      {blocks.map((block) => (
        <BlockView key={block.id} block={block} />
      ))}
    </div>
  )
}

function BlockView({ block }: { block: PostBlock }) {
  if (block.type === "heading") {
    const Tag = block.level === 1 ? "h2" : block.level === 2 ? "h3" : "h4"
    return (
      <Tag className="font-serif font-bold tracking-tight text-foreground">
        {renderInline(block.text)}
      </Tag>
    )
  }

  if (block.type === "paragraph") {
    return <div className="space-y-3">{renderTextBlock(block.text)}</div>
  }

  if (block.type === "quote") {
    return (
      <blockquote className="border-l-4 border-border pl-4 text-muted-foreground italic">
        {renderInline(block.text)}
      </blockquote>
    )
  }

  if (block.type === "list") {
    const ListTag = block.ordered ? "ol" : "ul"
    return (
      <ListTag className={`ml-5 space-y-2 ${block.ordered ? "list-decimal" : "list-disc"}`}>
        {block.items.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {renderInline(item)}
          </li>
        ))}
      </ListTag>
    )
  }

  if (block.type === "divider") {
    return <hr className="border-border" />
  }

  if (block.type === "image") {
    const basePath = process.env.NODE_ENV === "production" ? "/erase-horseracing-india-website" : ""
    const resolvedSrc = block.src && block.src.startsWith("/") ? `${basePath}${block.src}` : block.src
    const width =
      block.width === "narrow" ? "max-w-lg" : block.width === "wide" ? "max-w-4xl" : "max-w-5xl"
    return (
      <figure className={`mx-auto w-full ${width}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={resolvedSrc} alt={block.alt || ""} className="w-full rounded-lg border border-border" />
        {(block.caption || block.alt) && (
          <figcaption className="mt-2 text-xs text-muted-foreground">
            {block.caption ? renderInline(block.caption) : block.alt}
          </figcaption>
        )}
      </figure>
    )
  }

  return null
}
