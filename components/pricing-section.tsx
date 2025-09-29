"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Clock, AlertTriangle, MessageCircle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { BookingForm } from "@/components/booking-form"

export function PricingSection() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Updated pricing structure per design requirements: Single workshop only
  const workshopPlans = [
    {
      id: "workshop1day",
      name: t.pricing.workshop1Day.name,
      price: t.pricing.workshop1Day.price,
      period: t.pricing.workshop1Day.period,
      duration: t.pricing.workshop1Day.duration,
      date: t.pricing.workshop1Day.date,
      location: t.pricing.workshop1Day.location,
      instructors: t.pricing.workshop1Day.instructors,
      description: t.pricing.workshop1Day.description,
      features: t.pricing.workshop1Day.features,
      popular: true, // Single workshop is always highlighted
      fullDetails: t.pricing.workshop1Day.fullDetails,
    },
  ]

  const handleWhatsAppBooking = (workshopType: string, workshopName: string, price: string) => {
    const workshopDetails = {
      workshop1day: language === "es" ? `Workshop de 1 Día - Octubre (€90)` : `Workshop di 1 Giorno - Ottobre (€90)`,
    }

    const message =
      language === "es"
        ? `¡Hola! Me gustaría reservar mi lugar en ${workshopDetails[workshopType as keyof typeof workshopDetails]}.

Por favor, envíenme más información sobre:
- Detalles del programa
- Proceso de reserva
- Qué incluye el workshop

¡Gracias!`
        : `Ciao! Vorrei prenotare il mio posto per ${workshopDetails[workshopType as keyof typeof workshopDetails]}.

Per favore, inviatemi maggiori informazioni su:
- Dettagli del programma
- Processo di prenotazione
- Cosa include il workshop

Grazie!`

    const whatsappUrl = `https://wa.me/34697798991?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section ref={sectionRef} id="pricing" className="py-12 xs:py-16 sm:py-24 bg-transparent relative">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 xs:mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 xs:mb-4 text-balance transition-all duration-1200 ease-out delay-300 px-2 xs:px-0 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ fontFamily: '"Bebas Neue", "Arial Black", sans-serif' }}>{t.pricing.title}</h2>
          <p className={`text-sm xs:text-base sm:text-lg text-white/90 max-w-2xl mx-auto text-pretty transition-all duration-1200 ease-out delay-500 px-2 xs:px-0 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>{t.pricing.subtitle}</p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 bg-red-100 border border-red-300 text-red-800 rounded-lg px-3 xs:px-4 py-3 xs:py-4 mt-4 xs:mt-6 transition-all duration-1200 ease-out delay-700 mx-2 xs:mx-0 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 xs:h-5 xs:w-5" />
              <span className="font-bold text-xs xs:text-sm">{t.pricing.spotsLeft}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-3 w-3 xs:h-4 xs:w-4" />
              <span className="text-xs xs:text-sm text-center">{t.pricing.nextRetreat}</span>
            </div>
          </div>
        </div>

        {/* Single workshop layout - centered */}
        <div className="flex justify-center max-w-5xl mx-auto px-3 xs:px-4 sm:px-6">
          {workshopPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-white/98 border-[#9852A7]/20 flex flex-col shadow-lg transition-all duration-500 hover:shadow-2xl rounded-2xl max-w-md w-full ${
                plan.popular 
                  ? "ring-2 ring-[#F02A30] shadow-xl scale-100 hover:scale-105 animate-fade-in-up" 
                  : "hover:shadow-xl hover:scale-105 animate-fade-in-up"
              } ${isVisible ? '' : 'opacity-0 translate-y-8'}`}
              style={{ 
                animationDelay: `${900 + (index * 300)}ms`,
                animationFillMode: 'both'
              }}
            >
              {plan.popular && (
                <div className={`absolute -top-2 xs:-top-3 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out ${
                  isVisible ? 'opacity-100 scale-100 -translate-y-0' : 'opacity-0 scale-75 translate-y-2'
                }`} style={{ animationDelay: `${1200 + (index * 300)}ms` }}>
                  <Badge className="bg-[#F02A30] text-white px-3 xs:px-4 py-1 animate-pulse shadow-lg text-xs xs:text-sm">
                    <Star className="h-2 w-2 xs:h-3 xs:w-3 mr-1" />
                    {language === "es" ? "Más Popular" : "Più Popolare"}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4 xs:pb-6 px-4 xs:px-6 sm:px-8 pt-6 xs:pt-8">
                <CardTitle className={`text-xl xs:text-2xl sm:text-3xl font-bold text-[#3C318D] mb-3 xs:mb-4 transition-colors duration-300`}>{plan.name}</CardTitle>
                <div className="mb-3 xs:mb-4">
                  <span className="text-4xl xs:text-5xl sm:text-6xl font-bold text-[#F02A30] hover:scale-110 transition-all duration-300">{plan.price}</span>
                  <span className="text-muted-foreground ml-2 text-sm xs:text-base">/ {plan.period}</span>
                </div>
                <div className="space-y-2 text-sm xs:text-base text-[#3C318D]/80">
                  <p><strong>{language === "es" ? "Duración:" : "Durata:"}</strong> {plan.duration}</p>
                  <p><strong>{language === "es" ? "Fecha:" : "Data:"}</strong> {plan.date}</p>
                  <p><strong>{language === "es" ? "Ubicación:" : "Luogo:"}</strong> {plan.location}</p>
                  <p><strong>{language === "es" ? "Instructores:" : "Istruttori:"}</strong> {plan.instructors}</p>
                </div>
                <p className="text-muted-foreground text-sm xs:text-base sm:text-lg leading-relaxed px-2 mt-4">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0 flex-grow flex flex-col px-4 xs:px-6 sm:px-8 pb-6 xs:pb-8">
                <ul className="space-y-3 xs:space-y-4 flex-grow mb-6 xs:mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-start space-x-3 xs:space-x-4 transition-all duration-300 delay-${idx * 100} ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}>
                      <Check className="h-4 w-4 xs:h-5 xs:w-5 text-[#9852A7] mt-1 flex-shrink-0" />
                      <span className="text-card-foreground text-sm xs:text-base sm:text-lg leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3">
                  <BookingForm workshopType={plan.id as "workshop1day"}>
                    <Button
                      className="w-full py-3 xs:py-4 sm:py-5 font-semibold text-base xs:text-lg sm:text-xl transition-all duration-300 hover:scale-105 rounded-xl bg-[#F02A30] hover:bg-[#F02A30]/90 text-white shadow-lg hover:shadow-xl animate-pulse"
                    >
                      {language === "es" ? `Reservar ${plan.name}` : `Prenota ${plan.name}`}
                    </Button>
                  </BookingForm>
                  
                  <Button
                    variant="outline"
                    className="w-full py-2 xs:py-3 sm:py-4 font-medium text-sm xs:text-base sm:text-lg border-[#9852A7] text-[#9852A7] hover:bg-[#9852A7] hover:text-white transition-all duration-300 hover:scale-105 rounded-xl"
                    onClick={() => handleWhatsAppBooking(plan.id, plan.name, plan.price)}
                  >
                    <MessageCircle className="h-4 w-4 xs:h-5 xs:w-5 mr-2" />
                    {language === "es" ? "Hablar por WhatsApp" : "Parla su WhatsApp"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={`text-center mt-10 xs:mt-12 sm:mt-16 transition-all duration-700 ease-out px-3 xs:px-4 sm:px-6 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '1500ms' }}>
          <div className={`bg-white/98 border border-[#9852A7]/20 rounded-2xl p-6 xs:p-8 sm:p-10 max-w-3xl mx-auto shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ animationDelay: '1600ms' }}>
            <h3 className={`text-lg xs:text-xl sm:text-2xl font-semibold text-[#3C318D] mb-4 xs:mb-6 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '1700ms' }}>{t.pricing.included}</h3>
            <div className="text-sm xs:text-base sm:text-lg text-[#3C318D]/80 space-y-3 xs:space-y-4">
              <div className={`flex items-center justify-center space-x-3 xs:space-x-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ animationDelay: '1800ms' }}>
                <Check className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-[#9852A7] flex-shrink-0" />
                <span>
                  {language === "es" ? "Acceso al grupo privado WhatsApp" : "Accesso al gruppo privato WhatsApp"}
                </span>
              </div>
              <div className={`flex items-center justify-center space-x-3 xs:space-x-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ animationDelay: '1900ms' }}>
                <Check className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-[#9852A7] flex-shrink-0" />
                <span>
                  {language === "es" ? "Seguimiento personalizado" : "Follow-up personalizzato"}
                </span>
              </div>
            </div>
          </div>
          <p className={`text-white/80 mt-4 xs:mt-6 transition-all duration-500 hover:scale-105 text-sm xs:text-base sm:text-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '2000ms' }}>
            <strong>{t.pricing.nextRetreat}</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
