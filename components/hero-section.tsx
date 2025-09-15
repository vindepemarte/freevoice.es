"use client"

import { Button } from "@/components/ui/button"
import { Play, Star, Clock, AlertCircle } from "lucide-react"
import { BookingForm } from "@/components/booking-form"
import { useLanguage } from "@/hooks/use-language"

export function HeroSection() {
  const { t, language } = useLanguage()

  const handleScheduleCall = () => {
    const message =
      language === "es"
        ? "Me gustaría más información sobre el taller Free Voice"
        : "Vorrei maggiori informazioni sul workshop Free Voice"
    const whatsappUrl = `https://wa.me/34697798991?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-red-50">
        <img
          src="/music-coaching-session-with-vocal-exercises-and-in.jpg"
          alt="Music coaching session"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-background/20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Urgency Banner */}
          <div className="inline-flex items-center space-x-2 bg-red-500 text-white rounded-full px-6 py-3 mb-4 animate-pulse">
            <AlertCircle className="h-5 w-5" />
            <span className="font-bold text-sm uppercase tracking-wide">{t.hero.urgentBooking}</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-card border border-border rounded-full px-4 py-2 mb-6">
            <Star className="h-4 w-4 text-accent fill-current" />
            <span className="text-sm font-medium text-card-foreground">{t.hero.badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            {t.hero.title.split(", ")[0]}, <span className="text-primary">{t.hero.title.split(", ")[1]}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <BookingForm>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg shadow-lg"
              >
                {t.hero.bookSpot}
              </Button>
            </BookingForm>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg group bg-transparent border-2"
              onClick={handleScheduleCall}
            >
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              {t.hero.scheduleCall}
            </Button>
          </div>

          {/* Spots Left Warning */}
          <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-300 text-amber-800 rounded-lg px-4 py-2 mb-6">
            <Clock className="h-4 w-4" />
            <span className="font-semibold text-sm">{t.hero.spotsLeft}</span>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-accent fill-current" />
                ))}
              </div>
              <span>{t.hero.rating}</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <span>{t.hero.nextRetreat}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
