"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mic, Heart, Utensils, Home } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function FeaturesSection() {
  const { t } = useLanguage()

  return (
    <section id="features" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">{t.features.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t.features.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{t.features.vocal.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.features.vocal.description}</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{t.features.body.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.features.body.description}</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{t.features.nutrition.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.features.nutrition.description}</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{t.features.community.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.features.community.description}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
