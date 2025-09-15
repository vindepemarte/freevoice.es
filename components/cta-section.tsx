"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Award } from "lucide-react"
import { BookingForm } from "@/components/booking-form"
import { useLanguage } from "@/hooks/use-language"

export function CTASection() {
  const { t, language } = useLanguage()

  const handleScheduleCall = () => {
    const message =
      language === "es"
        ? "Me gustaría más información sobre el taller de Free Voice"
        : "Vorrei maggiori informazioni sul workshop di Free Voice"
    const whatsappUrl = `https://wa.me/34123456789?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-card border-border shadow-xl max-w-4xl mx-auto">
          <CardContent className="p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-4 text-balance">{t.cta.title}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">{t.cta.subtitle}</p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-card-foreground">200+</div>
                <div className="text-sm text-muted-foreground">{t.cta.happyStudents}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-2">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-card-foreground">4.9/5</div>
                <div className="text-sm text-muted-foreground">{t.cta.averageRating}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-2">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-card-foreground">7</div>
                <div className="text-sm text-muted-foreground">{t.cta.daysMaxExperience}</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <BookingForm>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                  {t.cta.bookSpot}
                </Button>
              </BookingForm>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg bg-transparent"
                onClick={handleScheduleCall}
              >
                {t.cta.scheduleCall}
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">{t.cta.limited}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
