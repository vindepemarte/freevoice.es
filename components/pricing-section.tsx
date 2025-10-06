"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Clock, AlertTriangle, MessageCircle, Calendar, MapPin, Users, Utensils, Smartphone, Heart, Eye, X } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useDynamicContent } from "@/hooks/use-dynamic-content"
import { useWorkshopDates } from "@/hooks/use-workshop-dates"
import { Workshop } from "@/lib/workshop-dates"
import { BookingForm } from "@/components/booking-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WorkshopWithItinerary extends Workshop {
  itinerary_it?: string
  itinerary_es?: string
}

export function PricingSection() {
  const { t, language } = useLanguage()
  const { getContent } = useDynamicContent()
  const { nextWorkshopText } = useWorkshopDates(language as 'es' | 'it')
  const [isVisible, setIsVisible] = useState(false)
  const [workshops, setWorkshops] = useState<WorkshopWithItinerary[]>([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Get dynamic WhatsApp number with fallback
  const dynamicWhatsApp = getContent('contact', 'whatsapp', language as 'it' | 'es')
  const contactWhatsApp = dynamicWhatsApp || '+34697798991'
  // Clean the WhatsApp number for the URL (remove non-numeric characters except +)
  const cleanWhatsApp = contactWhatsApp.replace(/[^0-9+]/g, '')

  // Load workshops from database
  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const response = await fetch('/api/public/workshops')
        if (response.ok) {
          const data = await response.json()
          if (data.workshops && data.workshops.length > 0) {
            setWorkshops(data.workshops)
          } else {
            // Fallback to default workshop structure
            setWorkshops([{
              id: 1,
              title_it: 'Workshop di 1 Giorno - Ottobre',
              title_es: 'Taller de 1 Día - Octubre',
              description_it: 'Esperienza immersiva di 8 ore per scoprire la tua voce autentica attraverso tecniche vocali, lavoro corporeo e respirazione.',
              description_es: 'Experiencia inmersiva de 8 horas para descubrir tu voz auténtica a través de técnicas vocales, trabajo corporal y respiración.',
              price: 90,
              date: '2025-10-12',
              location: 'Healing Garden, Guía de Isora',
              instructors: 'Jenny Rospo & Marian Giral Vega',
              max_participants: 20,
              is_active: true,
              is_popular: true
            }])
          }
        }
      } catch (error) {
        console.error('Error loading workshops:', error)
        // Use fallback data
        setWorkshops([{
          id: 1,
          title_it: 'Workshop di 1 Giorno - Ottobre',
          title_es: 'Taller de 1 Día - Octubre',
          description_it: 'Esperienza immersiva di 8 ore per scoprire la tua voce autentica attraverso tecniche vocali, lavoro corporeo e respirazione.',
          description_es: 'Experiencia inmersiva de 8 horas para descubrir tu voz auténtica a través de técnicas vocales, trabajo corporal y respiración.',
          price: 90,
          date: '2025-10-12',
          location: 'Healing Garden, Guía de Isora',
          instructors: 'Jenny Rospo & Marian Giral Vega', 
          max_participants: 20,
          is_active: true,
          is_popular: true
        }])
      } finally {
        setLoading(false)
      }
    }

    loadWorkshops()
  }, [])

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

  // Function to format date without timezone issues
  const formatWorkshopDate = (dateString: string) => {
    // Extract just the date part to avoid timezone conversion issues
    const datePart = dateString.split('T')[0] // Gets "2025-10-12" from "2025-10-12T22:00:00.000Z"
    const [year, month, day] = datePart.split('-')
    
    if (language === 'es') {
      return `${day}/${month}/${year}`
    } else {
      return `${day}/${month}/${year}`
    }
  }

  // Convert workshops to pricing plans format
  const workshopPlans = workshops.map(workshop => ({
    id: `workshop${workshop.id}`,
    name: language === 'es' ? workshop.title_es : workshop.title_it,
    price: `€${workshop.price}`,
    period: language === 'es' ? 'por persona' : 'a persona',
    duration: language === "es" ? "8 horas" : "8 ore",
    date: formatWorkshopDate(workshop.date),
    location: workshop.location,
    instructors: workshop.instructors,
    description: language === 'es' ? workshop.description_es : workshop.description_it,
    features: [
      language === "es" ? "Lecciones de canto completas" : "Lezioni di canto complete",
      language === "es" ? "Técnicas vocales avanzadas" : "Tecniche vocali avanzate", 
      language === "es" ? "Trabajo de respiración" : "Lavoro sulla respirazione",
      language === "es" ? "Ambiente natural inspirador" : "Ambiente naturale ispirante",
      language === "es" ? `Grupos pequeños (máx ${workshop.max_participants} personas)` : `Piccoli gruppi (max ${workshop.max_participants} persone)`,
      language === "es" ? "Certificado de participación" : "Certificato di partecipazione"
    ],
    popular: workshop.is_popular,
    fullDetails: {
      // Workshop details would be here
    }
  }))

  // If no workshops from database, use fallback
  const fallbackWorkshops = [{
    id: "workshop1day",
    name: language === "es" ? "Taller de 1 Día - Octubre" : "Workshop di 1 Giorno - Ottobre",
    price: "€90",
    period: language === "es" ? "por persona" : "a persona",
    duration: language === "es" ? "8 horas" : "8 ore",
    date: language === "es" ? "12 Octubre 2025" : "12 Ottobre 2025",
    location: "Healing Garden, Guía de Isora",
    instructors: "Jenny Rospo & Marian Giral Vega",
    description: language === "es" 
      ? "Experiencia inmersiva de 8 horas para descubrir tu voz auténtica a través de técnicas vocales, trabajo corporal y respiración."
      : "Esperienza immersiva di 8 ore per scoprire la tua voce autentica attraverso tecniche vocali, lavoro corporeo e respirazione.",
    features: [
      language === "es" ? "Lecciones de canto completas" : "Lezioni di canto complete",
      language === "es" ? "Técnicas vocales avanzadas" : "Tecniche vocali avanzate", 
      language === "es" ? "Trabajo de respiración" : "Lavoro sulla respirazione",
      language === "es" ? "Ambiente natural inspirador" : "Ambiente naturale ispirante",
      language === "es" ? "Grupos pequeños (máx 10 personas)" : "Piccoli gruppi (max 10 persone)",
      language === "es" ? "Certificado de participación" : "Certificato di partecipazione"
    ],
    popular: true,
    fullDetails: {}
  }]

  const plansToShow = workshopPlans.length > 0 ? workshopPlans : fallbackWorkshops

  // Function to parse itinerary from database
  const parseItinerary = (itineraryText: string) => {
    if (!itineraryText) return []
    
    return itineraryText.split('\n').map(line => {
      const match = line.match(/^(\d{1,2}:\d{2})\s*-\s*(.+)$/)
      if (match) {
        return {
          time: match[1],
          title: match[2],
          description: ''
        }
      }
      return null
    }).filter(Boolean)
  }

  // Function to get itinerary for current language
  const getWorkshopItinerary = (workshop: WorkshopWithItinerary) => {
    const itineraryText = language === 'es' ? workshop.itinerary_es : workshop.itinerary_it
    return parseItinerary(itineraryText || '')
  }

  const handleWhatsAppBooking = (workshopType: string, workshopName: string, price: string) => {
    const workshopDetails = {
      workshop1day: language === "es" ? `Taller de 1 Día - Octubre (€90)` : `Workshop di 1 Giorno - Ottobre (€90)`,
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

    const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(message)}`
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
              <span className="text-xs xs:text-sm text-center">{nextWorkshopText || t.pricing.nextRetreat}</span>
            </div>
          </div>
        </div>

        {/* Multiple workshops layout with proper spacing */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-6 lg:gap-8 max-w-6xl mx-auto px-3 xs:px-4 sm:px-6">
          {plansToShow.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-white/98 border-[#9852A7]/20 flex flex-col shadow-lg transition-all duration-500 hover:shadow-2xl rounded-2xl w-[280px] xs:w-[320px] sm:w-[400px] lg:w-[500px] max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] mx-auto ${
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
                  <BookingForm workshopType={plan.id}>
                    <Button
                      className="w-full px-4 xs:px-6 sm:px-8 py-3 xs:py-4 sm:py-5 font-semibold text-sm xs:text-base sm:text-lg lg:text-xl transition-all duration-300 hover:scale-105 rounded-xl bg-[#F02A30] hover:bg-[#F02A30]/90 text-white shadow-lg hover:shadow-xl animate-pulse leading-tight"
                    >
                      <span className="text-center break-words">
                        {language === "es" ? `Reservar ${plan.name}` : `Prenota ${plan.name}`}
                      </span>
                    </Button>
                  </BookingForm>
                  

                  
                  {/* Workshop Details Modal */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full py-2 xs:py-3 sm:py-4 font-medium text-sm xs:text-base sm:text-lg border-[#3C318D]/30 text-[#3C318D] hover:bg-[#3C318D] hover:text-white transition-all duration-300 hover:scale-105 rounded-xl"
                      >
                        <Eye className="h-4 w-4 xs:h-5 xs:w-5 mr-2" />
                        {language === "es" ? "Ver Itinerario Completo" : "Vedi Itinerario Completo"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-[#3C318D]/20 shadow-2xl">
                      <DialogHeader className="relative">
                        <DialogTitle className="text-2xl font-bold text-[#3C318D] text-center mb-4 pr-8">
                          {language === "es" ? "Itinerario del Taller" : "Itinerario del Workshop"}
                        </DialogTitle>
                        <DialogClose asChild>
                          <button
                            className="absolute top-0 right-0 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-500 hover:text-gray-700"
                            aria-label="Close modal"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </DialogClose>
                      </DialogHeader>
                      
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-6 bg-[#F8F9FA] border border-[#3C318D]/10">
                          <TabsTrigger value="overview" className="text-[#3C318D] data-[state=active]:bg-white data-[state=active]:text-[#3C318D] data-[state=active]:shadow-sm">
                            {language === "es" ? "Resumen" : "Panoramica"}
                          </TabsTrigger>
                          <TabsTrigger value="schedule" className="text-[#3C318D] data-[state=active]:bg-white data-[state=active]:text-[#3C318D] data-[state=active]:shadow-sm">
                            {language === "es" ? "Horario" : "Programma"}
                          </TabsTrigger>
                          <TabsTrigger value="details" className="text-[#3C318D] data-[state=active]:bg-white data-[state=active]:text-[#3C318D] data-[state=active]:shadow-sm">
                            {language === "es" ? "Detalles" : "Dettagli"}
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="space-y-6">
                          <div className="text-center">
                            <h3 className="text-xl font-semibold text-[#3C318D] mb-4">
                              {language === "es" 
                                ? "🎶 Canta para reencontrarte, crece para resonar con tu alma auténtica"
                                : "🎶 Canta per ritrovarti, cresci per risuonare con la tua anima autentica"}
                            </h3>
                            <p className="text-[#3C318D]/80 text-lg leading-relaxed">
                              {language === "es" 
                                ? "Un día especial para redescubrir tu voz... y algo más profundo. Una experiencia dedicada a quienes cantan, hablan, crean con la voz - y a quienes desean reconectarse con su esencia a través del sonido, la respiración, el cuerpo y el silencio."
                                : "Una giornata speciale per ritrovare la tua voce... e qualcosa di più profondo. Un'esperienza dedicata a chi canta, a chi parla, a chi crea con la voce – e a chi desidera riconnettersi con la propria essenza attraverso il suono, il respiro, il corpo e il silenzio."}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#9852A7]/10 p-6 rounded-xl">
                              <h4 className="font-semibold text-[#3C318D] mb-3 flex items-center">
                                <Heart className="h-5 w-5 mr-2 text-[#F02A30]" />
                                {language === "es" ? "¿Qué te espera?" : "Cosa ti aspetta?"}
                              </h4>
                              <p className="text-[#3C318D]/80 text-sm leading-relaxed">
                                {language === "es" 
                                  ? "Un recorrido experiencial entre voz, cuerpo, respiración y emoción, pensado para quienes desean usar la voz de manera más auténtica, libre y consciente."
                                  : "Un percorso esperienziale tra voce, corpo, respiro e emozione, pensato per chi desidera usare la voce in modo più autentico, libero e consapevole."}
                              </p>
                            </div>
                            
                            <div className="bg-[#F02A30]/10 p-6 rounded-xl">
                              <h4 className="font-semibold text-[#3C318D] mb-3 flex items-center">
                                <Users className="h-5 w-5 mr-2 text-[#9852A7]" />
                                {language === "es" ? "¿A quién está dirigido?" : "A chi è rivolto?"}
                              </h4>
                              <ul className="text-[#3C318D]/80 text-sm space-y-1">
                                <li>• {language === "es" ? "Quienes cantan, por pasión o profesión" : "A chi canta, per passione o professione"}</li>
                                <li>• {language === "es" ? "Profesionales de la voz" : "A chi lavora con la voce"}</li>
                                <li>• {language === "es" ? "Quienes buscan su voz auténtica" : "A chi vuole ritrovare la propria voce autentica"}</li>
                              </ul>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="schedule" className="space-y-6">
                          <div className="bg-gradient-to-r from-[#9852A7]/10 to-[#3C318D]/10 p-6 rounded-xl">
                            <h3 className="text-xl font-semibold text-[#3C318D] mb-6 text-center">
                              {language === "es" ? "Programa del Día" : "Programma della Giornata"}
                            </h3>
                            
                            <div className="space-y-4">
                              {(() => {
                                // Get the first active workshop's itinerary
                                const workshop = workshops.find(w => w.is_active)
                                if (!workshop) {
                                  // Fallback to hardcoded schedule if no workshop data
                                  const fallbackSchedule = [
                                    { time: "09:30", title: language === "es" ? "Llegada y bienvenida" : "Arrivo e accoglienza", description: language === "es" ? "Momento de conexión y preparación" : "Momento di connessione e preparazione" },
                                    { time: "10:00", title: language === "es" ? "Inicio de actividades" : "Inizio attività", description: language === "es" ? "Conexión con la naturaleza y respiración, ejercicios vocales al aire libre" : "Connessione con la natura e il respiro, esercizi vocali all'aria aperta" },
                                    { time: "13:00", title: language === "es" ? "Pausa para el almuerzo" : "Pausa pranzo", description: language === "es" ? "Tiempo para la alimentación consciente" : "Tempo per l'alimentazione consapevole" },
                                    { time: "14:00", title: language === "es" ? "Sesión de tarde" : "Sessione pomeridiana", description: language === "es" ? "Experiencias de canto en movimiento, exploraciones expresivas" : "Esperienze di canto in movimento, esplorazioni espressive" },
                                    { time: "18:30", title: language === "es" ? "Círculo de cierre" : "Cerchio di chiusura", description: language === "es" ? "Compartir, reflexión y celebración" : "Condivisioni, riflessione e celebrazione" }
                                  ]
                                  return fallbackSchedule.map((item, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                      <div className={`text-white px-3 py-1 rounded-lg text-sm font-medium min-w-[80px] text-center ${
                                        index % 4 === 0 ? 'bg-[#F02A30]' : 
                                        index % 4 === 1 ? 'bg-[#9852A7]' : 
                                        index % 4 === 2 ? 'bg-[#3C318D]' : 'bg-[#F02A30]'
                                      }`}>
                                        {item.time}
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-[#3C318D]">
                                          {item.title}
                                        </h4>
                                        <p className="text-[#3C318D]/70 text-sm">
                                          {item.description}
                                        </p>
                                      </div>
                                    </div>
                                  ))
                                }
                                
                                // Use database itinerary
                                const itinerary = getWorkshopItinerary(workshop)
                                return itinerary.map((item: any, index: number) => (
                                  <div key={index} className="flex items-start space-x-4">
                                    <div className={`text-white px-3 py-1 rounded-lg text-sm font-medium min-w-[80px] text-center ${
                                      index % 4 === 0 ? 'bg-[#F02A30]' : 
                                      index % 4 === 1 ? 'bg-[#9852A7]' : 
                                      index % 4 === 2 ? 'bg-[#3C318D]' : 'bg-[#F02A30]'
                                    }`}>
                                      {item.time}
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-[#3C318D]">
                                        {item.title}
                                      </h4>
                                      {item.description && (
                                        <p className="text-[#3C318D]/70 text-sm">
                                          {item.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                ))
                              })()
                              }
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="details" className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#3C318D]/10 p-6 rounded-xl">
                              <h4 className="font-semibold text-[#3C318D] mb-4 flex items-center">
                                <Utensils className="h-5 w-5 mr-2 text-[#F02A30]" />
                                {language === "es" ? "Qué traer" : "Cosa portare"}
                              </h4>
                              <ul className="text-[#3C318D]/80 text-sm space-y-2">
                                <li>• {language === "es" ? "Un corazón abierto y ganas de experimentar" : "Un cuore aperto e la voglia di metterti in gioco"}</li>
                                <li>• {language === "es" ? "Agua o infusión" : "Acqua o tisana"}</li>
                                <li>• {language === "es" ? "Cuaderno para inspiraciones" : "Un block notes per annotare ispirazioni"}</li>
                                <li>• {language === "es" ? "Ropa cómoda" : "Abiti comodi"}</li>
                                <li>• {language === "es" ? "Almuerzo ligero y saludable" : "Pranzo semplice e leggero"}</li>
                              </ul>
                            </div>
                            
                            <div className="bg-[#F02A30]/10 p-6 rounded-xl">
                              <h4 className="font-semibold text-[#3C318D] mb-4 flex items-center">
                                <Smartphone className="h-5 w-5 mr-2 text-[#9852A7]" />
                                {language === "es" ? "Día sin móvil" : "Una giornata senza cellulare"}
                              </h4>
                              <p className="text-[#3C318D]/80 text-sm leading-relaxed">
                                {language === "es" 
                                  ? "Durante las actividades, los teléfonos permanecerán en silencio. Un pequeño ritual para volver a la presencia y redescubrir el poder de la escucha verdadera."
                                  : "Durante le attività, i telefoni resteranno in silenzio. Un piccolo rituale per tornare in presenza e riscoprire la potenza dell'ascolto vero."}
                              </p>
                            </div>
                            
                            <div className="bg-[#9852A7]/10 p-6 rounded-xl">
                              <h4 className="font-semibold text-[#3C318D] mb-4 flex items-center">
                                <MapPin className="h-5 w-5 mr-2 text-[#F02A30]" />
                                {language === "es" ? "Ubicación" : "Luogo"}
                              </h4>
                              <p className="text-[#3C318D]/80 text-sm">
                                <strong>The Healing Garden</strong><br />
                                Guía de Isora, Tenerife<br />
                                {language === "es" ? "En un contexto natural e inspirador" : "In un contesto naturale e ispirante"}
                              </p>
                            </div>
                            
                            <div className="bg-[#3C318D]/10 p-6 rounded-xl">
                              <h4 className="font-semibold text-[#3C318D] mb-4 flex items-center">
                                <Users className="h-5 w-5 mr-2 text-[#9852A7]" />
                                {language === "es" ? "Facilitadores" : "Con gratitudine, vi accompagneranno"}
                              </h4>
                              <div className="text-[#3C318D]/80 text-sm space-y-2">
                                <p><strong>Jenny Rospo</strong> - {language === "es" ? "Cantante vocal coach" : "Cantante vocal coach"}</p>
                                <p><strong>Marian Giral Vega</strong> - {language === "es" ? "Bailarina, profesora Body-brain" : "Ballerina Insegnante Body brain"}</p>
                                <p><strong>Freddy Martin</strong> - {language === "es" ? "Cantante showman" : "Cantante Showman"}</p>
                                <p className="text-xs italic">
                                  {language === "es" 
                                    ? "Tres almas apasionadas, listas para acompañarte con competencia, presencia y corazón."
                                    : "Tre anime appassionate, pronte a sostenervi con competenza, presenza e cuore."}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center bg-gradient-to-r from-[#F02A30]/10 to-[#9852A7]/10 p-6 rounded-xl">
                            <h4 className="font-semibold text-[#3C318D] mb-3">
                              💫 {language === "es" ? "Contribución" : "Contributo"}
                            </h4>
                            <p className="text-2xl font-bold text-[#F02A30] mb-2">€90</p>
                            <p className="text-[#3C318D]/80 text-sm">
                              {language === "es" 
                                ? "Para toda la jornada de workshop (8 horas). El pago se puede efectuar al finalizar el workshop o según modalidades acordadas."
                                : "per l'intera giornata di workshop (8 ore). Il pagamento potrà essere effettuato al termine del workshop o secondo modalità concordate."}
                            </p>
                            <p className="text-[#F02A30] font-medium text-sm mt-2">
                              🌺 {language === "es" ? "Plazas limitadas - reserva recomendada" : "Posti limitati – prenotazione consigliata"}
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
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
            <strong>{nextWorkshopText || t.pricing.nextRetreat}</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
