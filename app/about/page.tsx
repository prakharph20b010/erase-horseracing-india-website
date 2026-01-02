import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Target, Eye, Scale, Heart } from "lucide-react"

export const metadata = {
  title: "About Us - Erase Horseracing India",
  description: "Learn about our mission to end horse racing in India and create a future where horses are respected.",
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Placeholder Name",
      role: "Founder & Lead Advocate",
      bio: "Brief bio goes here. This is template content.",
    },
    { name: "Placeholder Name", role: "Research Director", bio: "Brief bio goes here. This is template content." },
    { name: "Placeholder Name", role: "Communications Lead", bio: "Brief bio goes here. This is template content." },
    { name: "Placeholder Name", role: "Legal Advisor", bio: "Brief bio goes here. This is template content." },
    { name: "Placeholder Name", role: "Campaign Manager", bio: "Brief bio goes here. This is template content." },
    { name: "Placeholder Name", role: "Community Organizer", bio: "Brief bio goes here. This is template content." },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Header Section */}
        <section className="py-16 md:py-24 px-6 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 border-b relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto max-w-4xl text-center space-y-6 relative z-10">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground text-balance">
              About Our Mission
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We are a grassroots movement dedicated to ending the exploitation of horses in India's racing industry.
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center space-y-6 mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Our Mission</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                To end horse racing in India through advocacy, education, legal action, and public awareness — creating
                a future where horses are respected as sentient beings with the right to live free from exploitation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-muted/30 rounded-lg space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-bold">What We Do</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Document racing deaths and injuries across India</li>
                  <li>• Support legal challenges to racing under animal welfare laws</li>
                  <li>• Conduct investigative research on industry practices</li>
                  <li>• Build public opposition through education and advocacy</li>
                  <li>• Honor horses who have died with memorial pages</li>
                </ul>
              </div>

              <div className="p-8 bg-muted/30 rounded-lg space-y-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-serif text-2xl font-bold">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A future where horse racing no longer exists in India. Where every horse lives free from the physical
                  and psychological trauma of racing. Where their inherent value is recognized, and their right to
                  freedom is protected by law and embraced by society.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-16 md:py-24 px-6 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Why This Matters
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Horse racing is not a sport — it's systematic exploitation. Horses don't choose to race. They're bred
                into captivity, trained through force and fear, and pushed beyond their natural limits for human profit
                and entertainment.
              </p>
              <p>
                The industry calls deaths "accidents" and injuries "part of the sport." But when horses die at a rate of
                one every nine days across Indian tracks, when catastrophic injuries are routine, when horses race while
                injured or medicated — this isn't sport. It's abuse, dressed up in tradition and spectacle.
              </p>
              <p>
                We exist because horses cannot speak for themselves. Because the industry won't stop on its own. Because
                every horse who dies on a racetrack dies for nothing but human greed and entertainment.
              </p>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-5xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Our Approach
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-muted/30 rounded-lg space-y-4 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold">Legal Action</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Supporting challenges to racing under the Prevention of Cruelty to Animals Act and building legal
                  precedent for animal rights.
                </p>
              </div>

              <div className="p-6 bg-muted/30 rounded-lg space-y-4 text-center">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto">
                  <Eye className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-serif text-xl font-bold">Investigation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Documenting deaths, exposing conditions, and conducting research that reveals the truth behind racing
                  industry PR.
                </p>
              </div>

              <div className="p-6 bg-muted/30 rounded-lg space-y-4 text-center">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-bold">Advocacy</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Building a mass movement through education, memorials, and public campaigns that shift social
                  attitudes toward racing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-muted/5 to-transparent">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Dedicated individuals working to end horse racing in India
              </p>
              <p className="text-sm text-muted-foreground italic">Template content - Replace with real team members</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="group p-8 rounded-2xl border border-border/40 bg-gradient-to-br from-muted/20 to-muted/5 hover:border-primary/40 hover:shadow-lg transition-all"
                >
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-primary/20 mb-6 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="text-3xl text-primary/40">👤</div>
                  </div>

                  <div className="text-center space-y-3">
                    <h3 className="font-serif text-xl font-bold text-foreground">{member.name}</h3>
                    <p className="text-sm font-semibold text-primary">{member.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 rounded-2xl bg-muted/30 border border-border/40 text-center">
              <p className="text-muted-foreground">
                <span className="font-semibold">Clearly marked as replaceable content.</span> Update team member cards
                with real names, roles, photos, and bios.
              </p>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-16 md:py-24 px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-3xl text-center space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Join the Movement</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Change happens when ordinary people refuse to accept cruelty as entertainment. Add your voice to thousands
              demanding an end to horse racing.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link href="/pledge">Sign the Pledge</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
