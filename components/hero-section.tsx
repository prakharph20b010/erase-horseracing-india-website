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
        {/* Left image */}
        <div
          className="hidden md:block w-2/3 relative overflow-hidden"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <img
            src="/injured-racing-horse.jpg"
            alt="Horse"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right image */}
        <div className="hidden md:block w-1/3 relative overflow-hidden">
          <img
            src="/injured-racing-horse.jpg"
            alt="Horse"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Reduced overlay strip */}
        <div className="absolute top-0 right-0 bottom-0 w-[5%] bg-black/40 pointer-events-none" />

        {/* Mobile */}
        <div className="md:hidden flex w-full h-full absolute inset-0">
          <div className="w-2/3 relative overflow-hidden">
            <img
              src="/wild-horse-free.jpg"
              alt="Wild horse"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/3 relative overflow-hidden">
            <img
              src="/injured-racing-horse.jpg"
              alt="Injured horse"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto max-w-5xl text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white">
          Every Horse Deserves Freedom
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
          Behind every race is a story of exploitation. Behind every statistic is a life lost.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg">
            <Link href="/take-action">
              Take Action
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline">
            <Link href="/memorials">View Memorials</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
