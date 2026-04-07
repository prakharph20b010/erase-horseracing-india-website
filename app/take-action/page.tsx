import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckCircle } from "lucide-react"
import content from "@/data/pages/take-action.json"
import { EditableText } from "@/components/editable/editable-text"
import { GoogleFormEmbed } from "@/components/google-form-embed"

export const metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
}

export default function TakeActionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="py-20 md:py-32 px-6 bg-muted/30 border-b">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <EditableText
              file="data/pages/take-action.json"
              path={["hero", "title"]}
              value={content.hero.title}
              as="h1"
              className="font-serif text-5xl md:text-6xl font-bold text-foreground"
            />
            <EditableText
              file="data/pages/take-action.json"
              path={["hero", "subtitle"]}
              value={content.hero.subtitle}
              as="p"
              multiline
              className="text-xl text-muted-foreground leading-relaxed"
            />
          </div>
        </section>

        {/* Pledge Section */}
        <section id="pledge" className="py-20 md:py-32 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-16">
              <EditableText
                file="data/pages/take-action.json"
                path={["pledge", "title"]}
                value={content.pledge.title}
                as="h2"
                className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8"
              />

              <div className="prose prose-invert max-w-none mb-12">
                <div className="bg-muted/30 p-8 md:p-12 rounded-lg border border-border space-y-6 text-lg text-foreground leading-relaxed">
                  {content.pledge.intro.map((line, idx) => (
                    <EditableText
                      key={idx}
                      file="data/pages/take-action.json"
                      path={["pledge", "intro", idx]}
                      value={line}
                      as="p"
                      multiline
                    />
                  ))}
                  <ul className="space-y-3 list-none">
                    {content.pledge.commitments.map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <EditableText
                          file="data/pages/take-action.json"
                          path={["pledge", "commitments", idx]}
                          value={item}
                          as="span"
                        />
                      </li>
                    ))}
                  </ul>
                  <EditableText
                    file="data/pages/take-action.json"
                    path={["pledge", "closing"]}
                    value={content.pledge.closing}
                    as="p"
                    multiline
                  />
                </div>
              </div>

              <div className="space-y-6">
                <EditableText
                  file="data/pages/take-action.json"
                  path={["pledge", "form", "title"]}
                  value={content.pledge.form.title}
                  as="h3"
                  className="font-serif text-2xl font-bold"
                />
                <GoogleFormEmbed
                  src="https://forms.gle/WkKgeYrExo5gHxb79"
                  title="Pledge form"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Section */}
        <section id="volunteer" className="py-20 md:py-32 px-6 bg-muted/30 border-t border-b">
          <div className="container mx-auto max-w-4xl">
            <EditableText
              file="data/pages/take-action.json"
              path={["volunteer", "title"]}
              value={content.volunteer.title}
              as="h2"
              className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8"
            />

            <EditableText
              file="data/pages/take-action.json"
              path={["volunteer", "subtitle"]}
              value={content.volunteer.subtitle}
              as="p"
              multiline
              className="text-lg text-muted-foreground leading-relaxed mb-12"
            />

            <div className="space-y-6">
              <EditableText
                file="data/pages/take-action.json"
                path={["volunteer", "form", "title"]}
                value={content.volunteer.form.title}
                as="h3"
                className="font-serif text-2xl font-bold"
              />
              <GoogleFormEmbed
                src="https://forms.gle/6y5aaFHycG4EaTvk6"
                title="Volunteer contact form"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
