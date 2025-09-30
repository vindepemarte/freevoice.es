"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Award } from "lucide-react"
import { BookingForm } from "@/components/booking-form"
import { useLanguage } from "@/hooks/use-language"

export function CTASection() {
  const { t, language } = useLanguage()

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#9852A7] via-[#B85FC7] to-[#F02A30] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            style={{ fontFamily: '"Bebas Neue", "Arial Black", sans-serif' }}
          >
            {t.cta.title}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto">
            {t.cta.subtitle}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg mb-2">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">200+</div>
              <div className="text-xs sm:text-sm text-white/80">{t.cta.happyStudents}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg mb-2">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">4.9/5</div>
              <div className="text-xs sm:text-sm text-white/80">{t.cta.averageRating}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg mb-2">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">7</div>
              <div className="text-xs sm:text-sm text-white/80">{t.cta.daysMaxExperience}</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <BookingForm>
              <Button size="lg" className="bg-white text-[#9852A7] hover:bg-white/90 px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold w-full sm:w-auto">
                {t.cta.bookSpot}
              </Button>
            </BookingForm>
          </div>

          <p className="text-xs sm:text-sm text-white/80 mt-4 sm:mt-6">{t.cta.limited}</p>
        </div>
      </div>
    </section>
  )
}
