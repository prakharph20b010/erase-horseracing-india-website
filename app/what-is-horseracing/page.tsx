"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function WhatIsHorseracingPage() {
  const [expandedIndex, setExpandedIndex] = useState(0)

  const sections = [
    {
      title: "Introduction",
      content:
        "Horse racing is an industry built on gambling and entertainment, at the expense of horses. Portrayed as a traditional sport, it is actually a system that exploits animals for profit. This guide explains the practices, harms, and consequences of racing.",
      icon: "🐴",
    },
    {
      title: "Separation at Birth",
      content:
        "Foals are separated from their mothers within weeks of birth, disrupting natural bonding. This early separation causes psychological trauma to both mother and foal. The foals are then raised in isolation, with limited social interaction.",
      icon: "💔",
    },
    {
      title: "Confinement",
      content:
        "Racehorses spend most of their lives confined to small stalls, often only 12x12 feet. They are locked in for up to 23 hours a day with minimal exercise. This unnatural confinement causes behavioral problems, muscle atrophy, and mental distress.",
      icon: "🔒",
    },
    {
      title: "Training Methods",
      content:
        "Horses are forced to train intensively from a young age, pushing their bodies beyond natural limits. Training is often abusive, using harsh techniques and equipment. Young horses are given illegal and legal drugs to enhance performance and mask pain.",
      icon: "⚡",
    },
    {
      title: "Whipping",
      content:
        "Jockeys regularly whip horses during races, sometimes over 100 times per race. This is done not out of necessity, but for sport and entertainment. Whipping causes pain, fear, and injuries to horses already running at dangerous speeds.",
      icon: "🪶",
    },
    {
      title: "Mouth Bits and Control",
      content:
        "Racehorses wear severe bits and tongue ties that cause pain and restrict breathing. These devices are used to control horses through pain rather than trust. Horses often have bleeding mouths and scarring from constant bit pressure.",
      icon: "⚙️",
    },
    {
      title: "Starting Gates",
      content:
        "Horses are forcibly loaded into metal starting gates before races. Many horses panic and resist, leading to injuries before the race even begins. The gates themselves cause psychological trauma and injuries to horses.",
      icon: "🚪",
    },
    {
      title: "Breeding Practices",
      content:
        "Horses are bred for speed and size, creating genetic problems and health issues. Breeding occurs without regard for the animals' welfare or genetics. Many bred horses are culled if they don't show promise on the track.",
      icon: "🧬",
    },
    {
      title: "Injuries and Fractures",
      content:
        "Racing causes frequent injuries including fractures, tendon tears, and soft tissue damage. Many injuries are hidden from the public. Injured horses are often euthanized immediately.",
      icon: "🩹",
    },
    {
      title: "Heat Stress",
      content:
        "Horses racing in hot conditions suffer from severe heat stress and dehydration. Their bodies are pushed beyond safe limits. Heat stress can be fatal and often goes unaddressed.",
      icon: "🔥",
    },
    {
      title: "Lung Bleeding (EIPH)",
      content:
        "Intense racing causes microscopic bleeding in horses' lungs. This condition is common but often hidden from the public. Affected horses suffer from reduced oxygen and performance anxiety.",
      icon: "💨",
    },
    {
      title: "Colic",
      content:
        "The stress and confinement of racing predisposes horses to colic (digestive distress). Colic is painful and often fatal. It remains one of the leading causes of death in racehorses.",
      icon: "🤢",
    },
    {
      title: "Retirement Myths",
      content:
        "When horses are no longer profitable, they are typically discarded. Only a small percentage are adopted or live comfortable retirements. Most are sent to slaughter or left to suffer in neglect.",
      icon: "😢",
    },
    {
      title: "Sudden Deaths",
      content:
        "Horses collapse and die on the track, often in view of crowds. These deaths are normalized and quickly forgotten. The industry continues without pause or accountability.",
      icon: "⚠️",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="py-20 md:py-32 px-6 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border-b relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto max-w-4xl text-center space-y-6 relative z-10">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">What Is Horseracing?</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              An educational deep dive into the practices, harms, and realities behind this industry
            </p>
          </div>
        </section>

        <section className="py-20 md:py-32 px-6">
          <div className="container mx-auto max-w-4xl space-y-4">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br from-muted/30 to-muted/5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-transparent group-hover:to-primary/5 transition-all duration-300" />

                <button
                  onClick={() => setExpandedIndex(expandedIndex === idx ? -1 : idx)}
                  className="relative w-full px-6 md:px-8 py-6 text-left flex items-start gap-4 hover:bg-muted/20 transition-colors"
                >
                  <span className="text-3xl md:text-4xl flex-shrink-0 mt-1">{section.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {section.title}
                    </h2>
                    {expandedIndex !== idx && (
                      <p className="text-muted-foreground mt-2 line-clamp-1">{section.content}</p>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                      expandedIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedIndex === idx && (
                  <div className="relative px-6 md:px-8 pb-6 border-t border-border/20">
                    <p className="text-lg text-muted-foreground leading-relaxed">{section.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
