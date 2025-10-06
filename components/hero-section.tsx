"use client"

import { Button } from "@/components/ui/button"
import { Star, Clock, AlertCircle } from "lucide-react"
import { BookingForm } from "@/components/booking-form"
import { useLanguage } from "@/hooks/use-language"
import { useDynamicContent } from "@/hooks/use-dynamic-content"
import { useWorkshopDates } from "@/hooks/use-workshop-dates"
import { useEffect, useState } from "react"

export function HeroSection() {
  const { t, language } = useLanguage()
  const { getContent, isLoading } = useDynamicContent()
  const { nextWorkshopText } = useWorkshopDates(language as 'es' | 'it')
  const [isVisible, setIsVisible] = useState(false)

  // Get dynamic content with fallbacks to static translations
  const dynamicTitle = getContent('hero', 'title', language as 'it' | 'es')
  const dynamicSubtitle = getContent('hero', 'subtitle', language as 'it' | 'es')
  
  const heroTitle = dynamicTitle || t.hero.title
  const heroSubtitle = dynamicSubtitle || t.hero.subtitle

  useEffect(() => {
    setIsVisible(true)
  }, [])

return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-28">
      {/* Brand-aligned background with proper color distribution */}
      <div className="absolute inset-0">
        <img
          src="/music-coaching-session-with-vocal-exercises-and-in.jpg"
          alt="Coaching vocal profesional"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2363]/80 via-[#3C318D]/50 to-[#9852A7]/30" />
      </div>

      <div className={`relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="max-w-4xl mx-auto">
          {/* Standalone Logo */}
          <div className={`mb-4 sm:mb-6 md:mb-8 flex justify-center transition-all duration-1200 ease-out delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <img
              src="/free-voice-logo.png"
              alt="Free Voice Academy"
              className="w-[250px] h-[250px] xs:w-[260px] xs:h-[260px] sm:w-[270px] sm:h-[270px] md:w-[280px] md:h-[280px] lg:w-[290px] lg:h-[290px] xl:w-[300px] xl:h-[300px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Authority Badge */}
          <div className={`inline-flex items-center space-x-2 bg-white/95 border border-[#9852A7]/30 rounded-full px-3 xs:px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 md:mb-8 shadow-lg transition-all duration-1000 ease-out delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Star className="h-3 w-3 xs:h-4 xs:w-4 text-[#F02A30] fill-current" />
            <span className="text-xs xs:text-sm font-medium text-[#3C318D]">{t.hero.badge}</span>
          </div>

          {/* Benefits-Oriented Headline */}
          <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 xs:mb-4 sm:mb-6 text-balance leading-tight drop-shadow-lg transition-all duration-1200 ease-out delay-600 px-2 xs:px-0 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`} style={{ fontFamily: '"Bebas Neue", "Arial Black", sans-serif' }}>
            {heroTitle}
          </h1>

          {/* Emotional Outcome Focused Subheadline */}
          <p className={`text-base xs:text-lg sm:text-xl md:text-2xl text-white/90 mb-4 xs:mb-6 sm:mb-8 max-w-3xl mx-auto text-pretty leading-relaxed drop-shadow-md transition-all duration-1000 ease-out delay-800 px-2 xs:px-0 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {heroSubtitle}
          </p>

          {/* Primary CTA - Single Focus */}
          <div className={`mb-4 xs:mb-6 sm:mb-8 transition-all duration-1200 ease-out delay-1000 px-2 xs:px-0 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <BookingForm>
              <Button
                size="lg"
                className="bg-[#F02A30] hover:bg-[#F02A30]/90 text-white px-6 xs:px-8 sm:px-12 py-3 xs:py-3 sm:py-4 text-base xs:text-lg sm:text-xl font-semibold shadow-xl rounded-full transform hover:scale-105 transition-all duration-200 animate-pulse w-full xs:w-auto"
              >
                {t.hero.bookSpot}
              </Button>
            </BookingForm>

          </div>

          {/* Scarcity - Spots Left */}
          <div className={`inline-flex items-center space-x-2 bg-white/95 border border-amber-300 text-amber-800 rounded-lg px-3 xs:px-4 sm:px-6 py-2 xs:py-2 sm:py-3 mb-4 xs:mb-6 sm:mb-8 shadow-lg transition-all duration-1000 ease-out delay-1200 mx-2 xs:mx-0 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Clock className="h-4 w-4 xs:h-5 xs:w-5" />
            <span className="font-semibold text-xs xs:text-sm sm:text-base">{t.hero.spotsLeft}</span>
          </div>

          {/* Social Proof Above the Fold */}
          <div className={`flex flex-col items-center justify-center gap-3 xs:gap-4 sm:flex-row sm:gap-6 text-white/90 transition-all duration-1200 ease-out delay-1400 px-2 xs:px-0 mb-8 xs:mb-12 sm:mb-16 md:mb-20 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 xs:h-5 xs:w-5 text-[#F02A30] fill-current" />
                ))}
              </div>
              <span className="font-medium text-sm xs:text-base">{t.hero.rating}</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/30" />
            <span className="font-medium text-sm xs:text-base text-center">{nextWorkshopText || t.hero.nextRetreat}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
