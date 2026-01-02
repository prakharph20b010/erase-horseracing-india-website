import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-24 px-6">
        <div className="container mx-auto max-w-2xl text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Article Not Found</h1>
          <p className="text-lg text-muted-foreground">
            We couldn't find the article you're looking for. It may have been moved or removed.
          </p>
          <div className="pt-4">
            <Button asChild size="lg">
              <Link href="/news">View All News</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
