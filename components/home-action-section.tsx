import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Users } from "lucide-react"
import shared from "@/data/pages/shared.json"
import { EditableText } from "@/components/editable/editable-text"
import { AddItemButton, RemoveItemButton } from "@/components/editable/list-controls"

export function HomeActionSection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <EditableText
            file="data/pages/shared.json"
            path={["homeAction", "title"]}
            value={shared.homeAction.title}
            as="h2"
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {shared.homeAction.cards.map((card, idx) => (
            <Card key={idx} className="border-2 overflow-hidden hover:shadow-lg transition-all relative">
              <RemoveItemButton file="data/pages/shared.json" path={["homeAction", "cards"]} index={idx} />
              <CardContent className="p-8 md:p-12 space-y-6 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-destructive/10 flex items-center justify-center">
                    {idx === 0 ? (
                      <Heart className="h-7 w-7 text-destructive" />
                    ) : (
                      <Users className="h-7 w-7 text-primary" />
                    )}
                  </div>
                  <EditableText
                    file="data/pages/shared.json"
                    path={["homeAction", "cards", idx, "title"]}
                    value={card.title}
                    as="h3"
                    className="font-serif text-3xl font-bold"
                  />
                  <EditableText
                    file="data/pages/shared.json"
                    path={["homeAction", "cards", idx, "text"]}
                    value={card.text}
                    as="p"
                    multiline
                    className="text-lg text-muted-foreground leading-relaxed"
                  />
                </div>
                <Button asChild size="lg" className="w-full" variant={idx === 0 ? "default" : "secondary"}>
                  <Link href={card.button.href}>
                    <EditableText
                      file="data/pages/shared.json"
                      path={["homeAction", "cards", idx, "button", "label"]}
                      value={card.button.label}
                      as="span"
                    />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <AddItemButton
          file="data/pages/shared.json"
          path={["homeAction", "cards"]}
          label="+ Add Card"
          template={{
            title: "New Action",
            text: "Describe the action here.",
            button: { label: "Learn More", href: "/take-action" },
          }}
          promptFields={[
            { path: "title", label: "Card title" },
            { path: "text", label: "Card text" },
            { path: "button.label", label: "Button label" },
            { path: "button.href", label: "Button link" },
          ]}
        />
      </div>
    </section>
  )
}
