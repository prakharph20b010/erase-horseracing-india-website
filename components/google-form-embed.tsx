import { cn } from "@/lib/utils"

type GoogleFormEmbedProps = {
  src: string
  title: string
  className?: string
}

export function GoogleFormEmbed({ src, title, className }: GoogleFormEmbedProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className
      )}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[720px] sm:h-[780px] md:h-[860px] lg:h-[940px]"
      />
    </div>
  )
}
