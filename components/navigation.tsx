"use client"

import Link from "next/link"
import { Menu, X, Twitter, Linkedin, Instagram } from "lucide-react"
import { useState } from "react"
import shared from "@/data/pages/shared.json"
import { EditableText } from "@/components/editable/editable-text"
import { EditableLink } from "@/components/editable/editable-link"
import { EditModeToggle } from "@/components/editable/edit-mode-toggle"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/erasehorse", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ]
  const basePath =
    process.env.NODE_ENV === "production"
      ? "/erase-horseracing-india-website"
      : ""

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 font-serif text-lg font-bold hover:opacity-80 transition-opacity"
          >
            <img
              src={`${basePath}/logo.png`}
              alt="Erase Horseracing logo"
              className="h-10 w-auto"
            />

            <EditableText
              file="data/pages/shared.json"
              path={["navigation", "brand"]}
              value={shared.navigation.brand}
              as="span"
              className="hidden sm:inline"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {shared.navigation.links.map((link, idx) => (
              <EditableLink
                key={link.href}
                file="data/pages/shared.json"
                textPath={["navigation", "links", idx, "label"]}
                hrefPath={["navigation", "links", idx, "href"]}
                text={link.label}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              />
            ))}

            <EditableLink
              file="data/pages/shared.json"
              textPath={["navigation", "cta", "label"]}
              hrefPath={["navigation", "cta", "href"]}
              text={shared.navigation.cta.label}
              href={shared.navigation.cta.href}
              className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            />

            <EditModeToggle />

            {/* Desktop Social Icons */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            {shared.navigation.links.map((link, idx) => (
              <EditableLink
                key={link.href}
                file="data/pages/shared.json"
                textPath={["navigation", "links", idx, "label"]}
                hrefPath={["navigation", "links", idx, "href"]}
                text={link.label}
                href={link.href}
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              />
            ))}

            <div className="pt-2">
              <EditModeToggle />
            </div>

            {/* Mobile Social Icons */}
            <div className="flex items-center gap-3 pt-4 border-t">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
