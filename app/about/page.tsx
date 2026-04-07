import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Target, Eye, Scale, Heart } from "lucide-react"
import aboutContent from "@/data/pages/about.json"
import { EditableText } from "@/components/editable/editable-text"
import { AddItemButton, RemoveItemButton } from "@/components/editable/list-controls"

export const metadata = {
  title: aboutContent.metadata.title,
  description: aboutContent.metadata.description,
}

export default function AboutPage() {
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
            <EditableText
              file="data/pages/about.json"
              path={["hero", "title"]}
              value={aboutContent.hero.title}
              as="h1"
              className="font-serif text-4xl md:text-6xl font-bold text-foreground text-balance"
            />
            <EditableText
              file="data/pages/about.json"
              path={["hero", "subtitle"]}
              value={aboutContent.hero.subtitle}
              as="p"
              multiline
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            />
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center space-y-6 mb-16">
              <EditableText
                file="data/pages/about.json"
                path={["mission", "title"]}
                value={aboutContent.mission.title}
                as="h2"
                className="font-serif text-3xl md:text-4xl font-bold text-foreground"
              />
              <EditableText
                file="data/pages/about.json"
                path={["mission", "text"]}
                value={aboutContent.mission.text}
                as="p"
                multiline
                className="text-xl text-muted-foreground leading-relaxed"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-muted/30 rounded-lg space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <EditableText
                  file="data/pages/about.json"
                  path={["mission", "what_we_do", "title"]}
                  value={aboutContent.mission.what_we_do.title}
                  as="h3"
                  className="font-serif text-2xl font-bold"
                />
                <ul className="space-y-2 text-muted-foreground">
                  {aboutContent.mission.what_we_do.items.map((item, idx) => (
                    <li key={idx}>
                      â€¢ {" "}
                      <EditableText
                        file="data/pages/about.json"
                        path={["mission", "what_we_do", "items", idx]}
                        value={item}
                        as="span"
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-muted/30 rounded-lg space-y-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-secondary" />
                </div>
                <EditableText
                  file="data/pages/about.json"
                  path={["mission", "vision", "title"]}
                  value={aboutContent.mission.vision.title}
                  as="h3"
                  className="font-serif text-2xl font-bold"
                />
                <EditableText
                  file="data/pages/about.json"
                  path={["mission", "vision", "text"]}
                  value={aboutContent.mission.vision.text}
                  as="p"
                  multiline
                  className="text-muted-foreground leading-relaxed"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-16 md:py-24 px-6 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <EditableText
              file="data/pages/about.json"
              path={["why", "title"]}
              value={aboutContent.why.title}
              as="h2"
              className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-center"
            />
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              {aboutContent.why.paragraphs.map((paragraph, idx) => (
                <EditableText
                  key={idx}
                  file="data/pages/about.json"
                  path={["why", "paragraphs", idx]}
                  value={paragraph}
                  as="p"
                  multiline
                />
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-5xl">
            <EditableText
              file="data/pages/about.json"
              path={["approach", "title"]}
              value={aboutContent.approach.title}
              as="h2"
              className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12 text-center"
            />
            <div className="grid md:grid-cols-3 gap-6">
              {aboutContent.approach.items.map((item, idx) => {
                const Icon = idx === 0 ? Scale : idx === 1 ? Eye : Heart
                const iconBg = idx === 0 ? "bg-primary/10" : idx === 1 ? "bg-secondary/10" : "bg-accent/10"
                const iconColor = idx === 0 ? "text-primary" : idx === 1 ? "text-secondary" : "text-accent"

                return (
                  <div key={idx} className="p-6 bg-muted/30 rounded-lg space-y-4 text-center relative">
                    <RemoveItemButton file="data/pages/about.json" path={["approach", "items"]} index={idx} />
                    <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center mx-auto`}>
                      <Icon className={`h-6 w-6 ${iconColor}`} />
                    </div>
                    <EditableText
                      file="data/pages/about.json"
                      path={["approach", "items", idx, "title"]}
                      value={item.title}
                      as="h3"
                      className="font-serif text-xl font-bold"
                    />
                    <EditableText
                      file="data/pages/about.json"
                      path={["approach", "items", idx, "text"]}
                      value={item.text}
                      as="p"
                      multiline
                      className="text-sm text-muted-foreground leading-relaxed"
                    />
                  </div>
                )
              })}
            </div>

            <AddItemButton
              file="data/pages/about.json"
              path={["approach", "items"]}
              label="+ Add Approach"
              template={{ title: "New Approach", text: "Describe the approach..." }}
            />
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-muted/5 to-transparent">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 space-y-4">
              <EditableText
                file="data/pages/about.json"
                path={["team", "title"]}
                value={aboutContent.team.title}
                as="h2"
                className="font-serif text-4xl md:text-5xl font-bold text-foreground"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aboutContent.team.members.map((member, idx) => (
                <div
                  key={idx}
                  className="group p-8 rounded-2xl border border-border/40 bg-gradient-to-br from-muted/20 to-muted/5 hover:border-primary/40 hover:shadow-lg transition-all relative"
                >
                  <RemoveItemButton file="data/pages/about.json" path={["team", "members"]} index={idx} />
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-primary/20 mb-6 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="text-3xl text-primary/40">ðŸ‘¤</div>
                  </div>

                  <div className="text-center space-y-3">
                    <EditableText
                      file="data/pages/about.json"
                      path={["team", "members", idx, "name"]}
                      value={member.name}
                      as="h3"
                      className="font-serif text-xl font-bold text-foreground"
                    />
                    <EditableText
                      file="data/pages/about.json"
                      path={["team", "members", idx, "role"]}
                      value={member.role}
                      as="p"
                      className="text-sm font-semibold text-primary"
                    />
                    <EditableText
                      file="data/pages/about.json"
                      path={["team", "members", idx, "bio"]}
                      value={member.bio}
                      as="p"
                      multiline
                      className="text-sm text-muted-foreground leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>

            <AddItemButton
              file="data/pages/about.json"
              path={["team", "members"]}
              label="+ Add Team Member"
              template={{ name: "New Member", role: "Role", bio: "Bio" }}
            />
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-16 md:py-24 px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-3xl text-center space-y-6">
            <EditableText
              file="data/pages/about.json"
              path={["cta", "title"]}
              value={aboutContent.cta.title}
              as="h2"
              className="font-serif text-3xl md:text-4xl font-bold"
            />
            <EditableText
              file="data/pages/about.json"
              path={["cta", "text"]}
              value={aboutContent.cta.text}
              as="p"
              multiline
              className="text-lg text-primary-foreground/90 leading-relaxed"
            />
            <div className="pt-4">
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link href={aboutContent.cta.button.href}>
                  <EditableText
                    file="data/pages/about.json"
                    path={["cta", "button", "label"]}
                    value={aboutContent.cta.button.label}
                    as="span"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
