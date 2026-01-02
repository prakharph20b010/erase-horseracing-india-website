import { createClient } from "@/lib/supabase/server"
import type { Horse } from "@/lib/types"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MemorialGrid } from "@/components/memorial-grid"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export const metadata = {
  title: "Horse Memorials - Erase Horseracing India",
  description: "Remember the horses who lost their lives to racing. Each memorial tells their story.",
}

export default async function MemorialsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase.from("horses").select("*").order("date_of_death", { ascending: false })

  if (params.search) {
    query = query.or(
      `name.ilike.%${params.search}%,story.ilike.%${params.search}%,cause_of_death.ilike.%${params.search}%`,
    )
  }

  const { data: horses, error } = await query

  if (error) {
    console.error("Error fetching horses:", error)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Header Section */}
        <section className="py-16 md:py-24 px-6 bg-muted/30 border-b">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground text-balance">
              In Memory of Those We Lost
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Each horse had a unique personality, dreams of freedom, and a life worth living. These memorials honor
              their memory and tell their truth.
            </p>
            <div className="pt-4">
              <form method="get" className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    name="search"
                    placeholder="Search by name, cause, or story..."
                    defaultValue={params.search}
                    className="pl-10 h-12"
                  />
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Memorials Grid */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-7xl">
            {horses && horses.length > 0 ? (
              <>
                <div className="mb-8 text-center">
                  <p className="text-muted-foreground">
                    Showing {horses.length} memorial{horses.length !== 1 ? "s" : ""}
                    {params.search && ` for "${params.search}"`}
                  </p>
                </div>
                <MemorialGrid horses={horses as Horse[]} />
              </>
            ) : (
              <div className="text-center py-16 space-y-4">
                <p className="text-xl text-muted-foreground">
                  {params.search ? `No memorials found for "${params.search}"` : "No memorials found"}
                </p>
                {params.search && (
                  <a href="/memorials" className="text-primary hover:underline">
                    Clear search
                  </a>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-24 px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-3xl text-center space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Their Deaths Were Not in Vain</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Every memorial you read represents a preventable tragedy. Join us in demanding change so no more horses
              suffer this fate.
            </p>
            <div className="pt-4">
              <a
                href="/pledge"
                className="inline-flex items-center justify-center h-12 px-8 text-lg font-medium bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors"
              >
                Sign the Pledge
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
