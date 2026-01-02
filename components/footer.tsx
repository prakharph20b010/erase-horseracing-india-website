import Link from "next/link"
import { Heart, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold">Erase Horseracing India</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A movement to end horse racing exploitation and honor the horses who have suffered.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Pages</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/what-is-horseracing"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  What Is Horseracing?
                </Link>
              </li>
              <li>
                <Link href="/records" className="text-muted-foreground hover:text-primary transition-colors">
                  Records
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Take Action</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/take-action" className="text-muted-foreground hover:text-primary transition-colors">
                  Take Action
                </Link>
              </li>
              <li>
                <Link href="/memorials" className="text-muted-foreground hover:text-primary transition-colors">
                  Memorials
                </Link>
              </li>
              <li>
                <Link href="/updates" className="text-muted-foreground hover:text-primary transition-colors">
                  Updates
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
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
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Use
                </Link>
              </li>
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
            © {new Date().getFullYear()} Erase Horseracing India. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
