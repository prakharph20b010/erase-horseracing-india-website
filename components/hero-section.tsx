"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

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
          className="hidden md:block w-2/3 relative overflow-hidden"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <img
            //src="/wild-horse-free.jpg"
            src="/injured-racing-horse.jpg"
            alt="Wild horse running free in nature"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Right side: Injured racing horse - showing harsh reality */}
        <div className="hidden md:block w-1/3 relative overflow-hidden bg-black/60">
          <img
            src="/injured-racing-horse.jpg"
            alt="Injured horse from racing industry showing the harsh reality"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-foreground transform -skew-x-2 origin-top-right pointer-events-none" />

        {/* Mobile: Split imagery - clearer on smaller screens */}
        <div className="md:hidden flex w-full h-full absolute inset-0">
          <div className="w-2/3 relative overflow-hidden">
            <img
              src="/wild-horse-free.jpg"
              alt="Wild horse running free"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <div className="w-1/3 relative overflow-hidden bg-black/60">
            <img
              src="/injured-racing-horse.jpg"
              alt="Injured racing horse"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto max-w-5xl text-center space-y-8">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-background leading-tight text-balance">
          Every Horse Deserves Freedom
        </h1>
        <p className="text-xl md:text-2xl text-background/90 max-w-3xl mx-auto leading-relaxed text-pretty">
          Behind every race is a story of exploitation. Behind every statistic is a life lost.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="text-lg bg-background text-foreground hover:bg-background/90">
            <Link href="/take-action">
              Take Action
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-lg bg-transparent text-background border-background hover:bg-background/10"
          >
            <Link href="/memorials">View Memorials</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
