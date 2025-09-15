"use client"

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

  return (
    <section id="coaches" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">{t.coaches.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t.coaches.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map((coach, index) => (
            <Card
              key={index}
              className="bg-card border-border overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={coach.image || "/placeholder.svg"}
                  alt={coach.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-1">{coach.name}</h3>
                <p className="text-primary font-medium mb-3 text-sm leading-tight">{coach.role[language]}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {coach.specialties[language].map((specialty, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">{coach.bio[language]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
