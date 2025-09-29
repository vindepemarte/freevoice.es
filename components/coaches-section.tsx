"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/hooks/use-language"

const coaches = [
  {
    name: "David Cardano",
    role: {
      es: "Dr. en Ciencias de la Motricidad, Psicólogo, Psicoterapeuta",
      it: "Dott. in Scienze della Motricità, Psicologo, Psicoterapeuta",
    },
    image: "/professional-male-coach-with-glasses.jpg",
    specialties: {
      es: ["Psicología", "Motricidad", "Terapia"],
      it: ["Psicologia", "Motricità", "Terapia"],
    },
    bio: {
      es: "Especialista en psicología del rendimiento y desarrollo personal a través del movimiento.",
      it: "Specialista in psicologia della performance e sviluppo personale attraverso il movimento.",
    },
  },
  {
    name: "Laura Monza",
    role: {
      es: "Entrenadora Mental, Coach Spiritual de Vida, Psicóloga",
      it: "Mental Trainer, Coach Spirituale di Vita, Psicologa",
    },
    image: "/professional-female-spiritual-coach.jpg",
    specialties: {
      es: ["Coaching Mental", "Espiritualidad", "Desarrollo Personal"],
      it: ["Coaching Mentale", "Spiritualità", "Sviluppo Personale"],
    },
    bio: {
      es: "Experta en transformación personal y coaching espiritual para artistas y performers.",
      it: "Esperta in trasformazione personale e coaching spirituale per artisti e performer.",
    },
  },
  {
    name: "Jenny Rospo",
    role: {
      es: "Cantante, Vocal Coach",
      it: "Cantante, Vocal Coach",
    },
    image: "/professional-female-vocal-coach-singing.jpg",
    specialties: {
      es: ["Técnica Vocal", "Interpretación", "Performance"],
      it: ["Tecnica Vocale", "Interpretazione", "Performance"],
    },
    bio: {
      es: "Cantante profesional y coach vocal especializada en liberación de la voz auténtica.",
      it: "Cantante professionale e vocal coach specializzata nella liberazione della voce autentica.",
    },
  },
  {
    name: "Marian Giral Vega",
    role: {
      es: "Bailarina, Instructora de Cuerpo y Corazón",
      it: "Ballerina, Istruttrice di Corpo e Cuore",
    },
    image: "/professional-female-dance-instructor.jpg",
    specialties: {
      es: ["Danza", "Expresión Corporal", "Conexión Emocional"],
      it: ["Danza", "Espressione Corporea", "Connessione Emotiva"],
    },
    bio: {
      es: "Bailarina profesional especializada en la conexión entre cuerpo, corazón y expresión artística.",
      it: "Ballerina professionale specializzata nella connessione tra corpo, cuore ed espressione artistica.",
    },
  },
]

export function CoachesSection() {
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

  return (
    <section ref={sectionRef} id="coaches" className="py-12 xs:py-16 sm:py-24">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 xs:mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 xs:mb-4 text-balance transition-all duration-1200 ease-out delay-300 px-2 xs:px-0 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ fontFamily: '"Bebas Neue", "Arial Black", sans-serif' }}>{t.coaches.title}</h2>
          <p className={`text-sm xs:text-base sm:text-lg text-white/90 max-w-2xl mx-auto text-pretty transition-all duration-1200 ease-out delay-500 px-2 xs:px-0 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>{t.coaches.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 sm:gap-8 px-2 xs:px-0">
          {coaches.map((coach, index) => (
            <Card
              key={index}
              className={`bg-card border-border overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                animationDelay: `${700 + (index * 200)}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={coach.image || "/placeholder.svg"}
                  alt={coach.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-3 xs:p-4 sm:p-6 group-hover:bg-white/95 transition-colors duration-300">
                <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-card-foreground mb-1 group-hover:text-[#3C318D] transition-colors duration-300 leading-tight">{coach.name}</h3>
                <p className="text-primary font-medium mb-2 xs:mb-3 text-xs xs:text-sm leading-tight group-hover:text-[#F02A30] transition-colors duration-300">{coach.role[language]}</p>

                <div className="flex flex-wrap gap-1 xs:gap-2 mb-3 xs:mb-4">
                  {coach.specialties[language].map((specialty, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs xs:text-xs group-hover:bg-[#9852A7]/10 group-hover:text-[#9852A7] transition-colors duration-300 px-2 py-1">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <p className="text-muted-foreground text-xs xs:text-sm leading-relaxed group-hover:text-[#3C318D]/80 transition-colors duration-300">{coach.bio[language]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
