import Link from "next/link"
import { Heart, Twitter, Linkedin, Instagram } from "lucide-react"
import shared from "@/data/pages/shared.json"
import { EditableText } from "@/components/editable/editable-text"
import { EditableLink } from "@/components/editable/editable-link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="space-y-4">
            <EditableText
              file="data/pages/shared.json"
              path={["footer", "brand"]}
              value={shared.footer.brand}
              as="h3"
              className="font-serif text-lg font-bold"
            />
            <EditableText
              file="data/pages/shared.json"
              path={["footer", "tagline"]}
              value={shared.footer.tagline}
              as="p"
              multiline
              className="text-sm text-muted-foreground leading-relaxed"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Pages</h4>
            <ul className="space-y-2 text-sm">
              {shared.navigation.links.slice(0, 4).map((link, idx) => (
                <li key={link.href}>
                  <EditableLink
                    file="data/pages/shared.json"
                    textPath={["navigation", "links", idx, "label"]}
                    hrefPath={["navigation", "links", idx, "href"]}
                    text={link.label}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Take Action</h4>
            <ul className="space-y-2 text-sm">
              {shared.navigation.links.slice(4, 7).map((link, idx) => (
                <li key={link.href}>
                  <EditableLink
                    file="data/pages/shared.json"
                    textPath={["navigation", "links", idx + 4, "label"]}
                    hrefPath={["navigation", "links", idx + 4, "href"]}
                    text={link.label}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <EditableLink
                  file="data/pages/shared.json"
                  textPath={["navigation", "links", 6, "label"]}
                  hrefPath={["navigation", "links", 6, "href"]}
                  text={shared.navigation.links[6]?.label ?? "Contact"}
                  href={shared.navigation.links[6]?.href ?? "/contact"}
                  className="text-muted-foreground hover:text-primary transition-colors"
                />
              </li>
              <li>
                <a
                  href="https://twitter.com/erasehorse"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              {shared.footer.links.map((link, idx) => (
                <li key={link.href}>
                  <EditableLink
                    file="data/pages/shared.json"
                    textPath={["footer", "links", idx, "label"]}
                    hrefPath={["footer", "links", idx, "href"]}
                    text={link.label}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://twitter.com/erasehorse"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-primary fill-primary" /> for the horses
          </p>
          <p className="text-xs text-muted-foreground">
            Â© {new Date().getFullYear()} {shared.footer.brand}. {shared.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
