import { TrendingDown, Heart, AlertCircle } from "lucide-react"

interface StatisticsSectionProps {
  totalHorses: number
  totalDeaths: number
}

export function StatisticsSection({ totalHorses, totalDeaths }: StatisticsSectionProps) {
  return (
    <section className="py-16 md:py-20 px-6 bg-destructive/5 border-y border-destructive/20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-destructive/10 mb-2">
              <AlertCircle className="h-7 w-7 text-destructive" />
            </div>
            <div className="font-serif text-5xl md:text-6xl font-bold text-destructive">{totalDeaths}+</div>
            <p className="text-lg font-medium text-foreground">Documented Deaths</p>
            <p className="text-sm text-muted-foreground">Across major racetracks in India</p>
          </div>

          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2">
              <Heart className="h-7 w-7 text-primary" />
            </div>
            <div className="font-serif text-5xl md:text-6xl font-bold text-primary">{totalHorses}</div>
            <p className="text-lg font-medium text-foreground">Horses Remembered</p>
            <p className="text-sm text-muted-foreground">Each with their own story</p>
          </div>

          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-2">
              <TrendingDown className="h-7 w-7 text-accent" />
            </div>
            <div className="font-serif text-5xl md:text-6xl font-bold text-accent">1/9</div>
            <p className="text-lg font-medium text-foreground">Deaths Per Day</p>
            <p className="text-sm text-muted-foreground">Average across Indian tracks</p>
          </div>
        </div>
      </div>
    </section>
  )
}
