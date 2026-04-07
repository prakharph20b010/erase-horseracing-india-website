"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import shared from "@/data/pages/shared.json"
import { EditableText } from "@/components/editable/editable-text"
import { EditableImage } from "@/components/editable/editable-image"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden bg-foreground">
      <div className="absolute inset-0 flex">
        {/* Left side: Wild horse - healthy and free */}
        <div
          className="hidden md:block w-1/2 relative overflow-hidden"
          
        >
          <EditableImage
            file="data/pages/shared.json"
            path={["hero", "images", "left"]}
            src={shared.hero.images.left}
            alt="Wild horse running free in nature"
            uploadDir="pages/home/hero"
            uploadName="home-hero-left"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side: Injured racing horse - showing harsh reality */}
        <div className="hidden md:block w-1/2 relative overflow-hidden bg-black/60">
          <EditableImage
            file="data/pages/shared.json"
            path={["hero", "images", "right"]}
            src={shared.hero.images.right}
            alt="Injured horse from racing industry showing the harsh reality"
            uploadDir="pages/home/hero"
            uploadName="home-hero-right"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-black/70 -translate-x-1/2 pointer-events-none" />
        {/* Mobile: Split imagery - clearer on smaller screens */}
        <div className="md:hidden absolute inset-0">
          <EditableImage
            file="data/pages/shared.json"
            path={["hero", "images", "mobile"]}
            src={shared.hero.images.mobile}
            alt="Horse"
            uploadDir="pages/home/hero"
            uploadName="home-hero-mobile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto max-w-5xl text-center space-y-8">
        <EditableText
          file="data/pages/shared.json"
          path={["hero", "title"]}
          value={shared.hero.title}
          as="h1"
          className="font-serif text-3xl sm:text-4xl md:text-7xl font-bold text-background leading-tight text-balance"
        />
        <EditableText
          file="data/pages/shared.json"
          path={["hero", "subtitle"]}
          value={shared.hero.subtitle}
          as="p"
          multiline
          className="text-base sm:text-lg md:text-2xl text-background/90 max-w-3xl mx-auto leading-relaxed text-pretty"
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="text-lg bg-background text-foreground hover:bg-background/90">
            <Link href={shared.hero.primary.href}>
              <EditableText
                file="data/pages/shared.json"
                path={["hero", "primary", "label"]}
                value={shared.hero.primary.label}
                as="span"
              />
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-lg bg-transparent text-background border-background hover:bg-background/10"
          >
            <Link href={shared.hero.secondary.href}>
              <EditableText
                file="data/pages/shared.json"
                path={["hero", "secondary", "label"]}
                value={shared.hero.secondary.label}
                as="span"
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
