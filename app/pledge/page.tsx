import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PledgeForm } from "@/components/pledge-form"
import { Heart, Users, TrendingUp, Shield } from "lucide-react"
import content from "@/data/pages/pledge.json"
import { EditableText } from "@/components/editable/editable-text"
import { AddItemButton, RemoveItemButton } from "@/components/editable/list-controls"

export const metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
}

export default function PledgePage() {
  const icons = [Users, TrendingUp, Shield, Heart]
  const iconBgs = ["bg-primary/10", "bg-secondary/10", "bg-accent/10", "bg-primary/10"]
  const iconColors = ["text-primary", "text-secondary", "text-accent", "text-primary"]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Header Section */}
        <section className="py-16 md:py-20 px-6 bg-muted/30 border-b">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <EditableText
              file="data/pages/pledge.json"
              path={["hero", "title"]}
              value={content.hero.title}
              as="h1"
              className="font-serif text-4xl md:text-6xl font-bold text-foreground text-balance"
            />
            <EditableText
              file="data/pages/pledge.json"
              path={["hero", "subtitle"]}
              value={content.hero.subtitle}
              as="p"
              multiline
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            />
          </div>
        </section>

        {/* Why Pledge Section */}
        <section className="py-12 md:py-16 px-6">
          <div className="container mx-auto max-w-5xl">
            <EditableText
              file="data/pages/pledge.json"
              path={["why", "title"]}
              value={content.why.title}
              as="h2"
              className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-center"
            />
            <div className="grid md:grid-cols-2 gap-6">
              {content.why.cards.map((card, idx) => {
                const Icon = icons[idx] || Heart
                return (
                  <div key={idx} className="p-6 bg-muted/30 rounded-lg space-y-3 relative">
                    <RemoveItemButton file="data/pages/pledge.json" path={["why", "cards"]} index={idx} />
                    <div className={`w-12 h-12 rounded-lg ${iconBgs[idx] ?? "bg-primary/10"} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${iconColors[idx] ?? "text-primary"}`} />
                    </div>
                    <EditableText
                      file="data/pages/pledge.json"
                      path={["why", "cards", idx, "title"]}
                      value={card.title}
                      as="h3"
                      className="font-serif text-xl font-bold"
                    />
                    <EditableText
                      file="data/pages/pledge.json"
                      path={["why", "cards", idx, "text"]}
                      value={card.text}
                      as="p"
                      multiline
                      className="text-muted-foreground leading-relaxed"
                    />
                  </div>
                )
              })}
            </div>

            <AddItemButton
              file="data/pages/pledge.json"
              path={["why", "cards"]}
              label="+ Add Card"
              template={{ title: "New Reason", text: "Explain why this matters..." }}
            />
          </div>
        </section>

        {/* The Pledge */}
        <section className="py-12 md:py-16 px-6 bg-primary/5 border-y border-primary/20">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center space-y-6">
              <EditableText
                file="data/pages/pledge.json"
                path={["pledge", "title"]}
                value={content.pledge.title}
                as="h2"
                className="font-serif text-3xl md:text-4xl font-bold text-foreground"
              />
              <div className="bg-background p-8 rounded-lg border-2 border-primary/20 space-y-4">
                <EditableText
                  file="data/pages/pledge.json"
                  path={["pledge", "text"]}
                  value={content.pledge.text}
                  as="p"
                  multiline
                  className="text-lg leading-relaxed italic text-foreground"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 md:py-16 px-6">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <EditableText
                file="data/pages/pledge.json"
                path={["form", "title"]}
                value={content.form.title}
                as="h2"
                className="font-serif text-3xl font-bold text-foreground mb-2"
              />
              <EditableText
                file="data/pages/pledge.json"
                path={["form", "subtitle"]}
                value={content.form.subtitle}
                as="p"
                className="text-muted-foreground"
              />
            </div>
            <PledgeForm />
          </div>
        </section>

        {/* What Happens Next */}
        <section className="py-12 md:py-16 px-6 bg-muted/30">
          <div className="container mx-auto max-w-3xl">
            <EditableText
              file="data/pages/pledge.json"
              path={["next", "title"]}
              value={content.next.title}
              as="h2"
              className="font-serif text-3xl font-bold text-foreground mb-6 text-center"
            />
            <div className="space-y-4">
              {content.next.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <EditableText
                      file="data/pages/pledge.json"
                      path={["next", "steps", idx, "title"]}
                      value={step.title}
                      as="h3"
                      className="font-semibold mb-1"
                    />
                    <EditableText
                      file="data/pages/pledge.json"
                      path={["next", "steps", idx, "text"]}
                      value={step.text}
                      as="p"
                      multiline
                      className="text-muted-foreground text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
