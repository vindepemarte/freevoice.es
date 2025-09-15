"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Play, Volume2 } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const testimonials = [
  {
    name: "Maria Rodriguez",
    role: {
      es: "Cantante Profesional",
      it: "Cantante Professionale",
    },
    image: "/happy-female-singer-headshot.jpg",
    videoThumbnail: "/female-singer-testimonial-video.jpg",
    content: {
      es: "Free Voice Academy transformó completamente mi enfoque del canto. La combinación de coaching vocal, trabajo corporal y orientación nutricional me dio herramientas que nunca supe que necesitaba. ¡Mi voz nunca ha sido más fuerte!",
      it: "Free Voice Academy ha trasformato completamente il mio approccio al canto. La combinazione di coaching vocale, lavoro corporeo e orientamento nutrizionale mi ha dato strumenti che non sapevo di aver bisogno. La mia voce non è mai stata più forte!",
    },
    rating: 5,
    videoDuration: "2:34",
  },
  {
    name: "Alessandro Bianchi",
    role: {
      es: "Actor de Teatro",
      it: "Attore Teatrale",
    },
    image: "/confident-male-actor-headshot.jpg",
    videoThumbnail: "/male-actor-testimonial-video.jpg",
    content: {
      es: "La experiencia inmersiva de 3 días cambió mi vida. No solo mejoré mi técnica vocal, sino que también gané confianza y aprendí a conectar con mi voz auténtica. ¡Altamente recomendado!",
      it: "L'esperienza immersiva di 3 giorni ha cambiato la mia vita. Non solo ho migliorato la mia tecnica vocale, ma ho anche acquisito fiducia e imparato a connettermi con la mia voce autentica. Altamente raccomandato!",
    },
    rating: 5,
    videoDuration: "3:12",
  },
  {
    name: "Carmen Gutierrez",
    role: {
      es: "Profesora de Música",
      it: "Insegnante di Musica",
    },
    image: "/professional-female-music-teacher.jpg",
    videoThumbnail: "/female-music-teacher-testimonial-video.jpg",
    content: {
      es: "Como educadora musical, al principio era escéptica. Pero el enfoque holístico realmente funciona. Los coaches son increíblemente conocedores, y el entorno del retiro permite un aprendizaje profundo y enfocado.",
      it: "Come educatrice musicale, all'inizio ero scettica. Ma l'approccio olistico funziona davvero. I coach sono incredibilmente competenti, e l'ambiente del ritiro permette un apprendimento profondo e focalizzato.",
    },
    rating: 5,
    videoDuration: "2:58",
  },
  {
    name: "Roberto Silva",
    role: {
      es: "Director de Coro",
      it: "Direttore di Coro",
    },
    image: "/mature-male-choir-director.jpg",
    videoThumbnail: "/male-choir-director-testimonial-video.jpg",
    content: {
      es: "Vine para mejorar mi propia voz pero me fui con mucho más. Las sesiones de trabajo corporal me ayudaron a entender la conexión entre el bienestar físico y el rendimiento vocal. ¡Experiencia increíble!",
      it: "Sono venuto per migliorare la mia voce ma me ne sono andato con molto di più. Le sessioni di lavoro corporeo mi hanno aiutato a capire la connessione tra benessere fisico e performance vocale. Esperienza incredibile!",
    },
    rating: 5,
    videoDuration: "4:21",
  },
]

export function TestimonialsSection() {
  const { t, language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setPlayingVideo(null)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setPlayingVideo(null)
  }

  const handlePlayVideo = (index: number) => {
    setPlayingVideo(index)
    // In a real implementation, this would trigger video playback
  }

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 8000) // Longer interval for video testimonials
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">{t.testimonials.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t.testimonials.subtitle}</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Video Testimonial */}
            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-accent/10">
                  <img
                    src={testimonials[currentIndex].videoThumbnail || "/placeholder.svg"}
                    alt={`${testimonials[currentIndex].name} testimonial`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Button
                      size="lg"
                      onClick={() => handlePlayVideo(currentIndex)}
                      className="bg-white/90 hover:bg-white text-black rounded-full w-16 h-16 p-0 shadow-lg"
                    >
                      <Play className="h-6 w-6 ml-1" />
                    </Button>
                  </div>

                  {/* Video Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-white">
                      <Volume2 className="h-4 w-4" />
                      <span className="text-sm font-medium">{testimonials[currentIndex].name}</span>
                    </div>
                    <div className="text-white text-sm">{testimonials[currentIndex].videoDuration}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Content */}
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>

                <p className="text-lg text-card-foreground mb-6 leading-relaxed">
                  "{testimonials[currentIndex].content[language]}"
                </p>

                <div className="flex items-center space-x-4">
                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-card-foreground">{testimonials[currentIndex].name}</h4>
                    <p className="text-muted-foreground text-sm">{testimonials[currentIndex].role[language]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="rounded-full w-10 h-10 p-0 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="rounded-full w-10 h-10 p-0 bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
