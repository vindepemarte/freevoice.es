"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Star, Play, Volume2, Award, Users } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { BookingForm } from "@/components/booking-form"
import { usePublicTestimonials } from "@/hooks/use-admin-data"
import { ResponsiveVideoPlayer } from "@/components/ui/responsive-video-player"
import { getTestimonialContent, getTestimonialImage, getTestimonialVideo } from '@/lib/testimonial-utils'
import { TestimonialSubmissionForm } from "@/components/testimonial-submission-form"

// Generate random rating between 4.8 and 5.0
const generateRandomRating = () => {
  return (Math.random() * 0.2 + 4.8).toFixed(1)
}

const testimonials = [
  {
    name: "María Rodríguez",
    location: "Madrid, España",
    role: {
      es: "Cantante Profesional",
      it: "Cantante Professionale",
    },
    image: "/happy-female-singer-headshot.jpg",
    videoThumbnail: "/female-singer-testimonial-video.jpg",
    videoSrc: "/testimonials/laura.mp4", // Add your video here
    content: {
      es: "En solo 3 días descubrí mi voz auténtica. El workshop de Free Voice me transformó completamente. Ahora canto con una confianza que nunca había sentido. ¡Vale cada euro!",
      it: "In soli 3 giorni ho scoperto la mia voce autentica. Il workshop di Free Voice mi ha trasformato completamente. Ora canto con una fiducia che non avevo mai sentito. Vale ogni euro!",
    },
    beforeAfter: {
      es: "De vergonzosa a confiada en 3 días",
      it: "Da timida a sicura in 3 giorni"
    },
    rating: 5,
    videoDuration: "2:34",
    workshopType: "3day"
  },
  {
    name: "Alessandro Bianchi",
    location: "Roma, Italia",
    role: {
      es: "Actor de Teatro",
      it: "Attore Teatrale",
    },
    image: "/confident-male-actor-headshot.jpg",
    videoThumbnail: "/male-actor-testimonial-video.jpg",
    videoSrc: "/testimonials/marco.mp4", // Add your video here
    content: {
      es: "Jenny y su equipo son increíbles. El trabajo corporal + vocal cambio mi actuación para siempre. Mis directores notan la diferencia inmediatamente. Mejor inversión de mi carrera.",
      it: "Jenny e il suo team sono incredibili. Il lavoro corporeo + vocale ha cambiato la mia recitazione per sempre. I miei registi notano subito la differenza. Miglior investimento della mia carriera.",
    },
    beforeAfter: {
      es: "Voz bloqueada → Interpretación libre",
      it: "Voce bloccata → Interpretazione libera"
    },
    rating: 5,
    videoDuration: "3:12",
    workshopType: "3day"
  },
  {
    name: "Carmen Gutiérrez",
    location: "Valencia, España",
    role: {
      es: "Profesora de Música",
      it: "Insegnante di Musica",
    },
    image: "/professional-female-music-teacher.jpg",
    videoThumbnail: "/female-music-teacher-testimonial-video.jpg",
    videoSrc: "/testimonials/cristina.mp4", // Add your video here
    content: {
      es: "Era escéptica al principio. Pero este workshop supera toda expectativa. La conexión cuerpo-voz-nutrición es REAL. Ahora enseño estos principios a mis estudiantes.",
      it: "Ero scettica all'inizio. Ma questo workshop supera ogni aspettativa. La connessione corpo-voce-nutrizione è REALE. Ora insegno questi principi ai miei studenti.",
    },
    beforeAfter: {
      es: "Escéptica → Convencida y transformada",
      it: "Scettica → Convinta e trasformata"
    },
    rating: 5,
    videoDuration: "2:58",
    workshopType: "1day"
  },
]

export function TestimonialsSection() {
  const { t, language } = useLanguage()
  const { testimonials: dynamicTestimonials, loading } = usePublicTestimonials()
  const [playingVideo, setPlayingVideo] = useState(false)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [dynamicRatings, setDynamicRatings] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Use dynamic testimonials if available, fallback to static ones
  const testimonialsToShow = dynamicTestimonials.length > 0 ? dynamicTestimonials : testimonials

  // Initialize dynamic ratings for each testimonial
  useEffect(() => {
    const ratings = testimonialsToShow.map(() => generateRandomRating())
    setDynamicRatings(ratings)
  }, [testimonialsToShow])

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

  const handlePlayVideo = () => {
    setPlayingVideo(!playingVideo)
  }

  // Auto-scroll testimonials with mobile-specific behavior
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const isMobile = window.innerWidth < 768

    const scroll = () => {
      if (isMobile) {
        // On mobile, show one testimonial at a time
        setCurrentTestimonialIndex((prev) => (prev + 1) % testimonialsToShow.length)
      } else {
        // On desktop, use horizontal scroll
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer
        const maxScroll = scrollWidth - clientWidth
        
        if (scrollLeft >= maxScroll) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          scrollContainer.scrollTo({ left: scrollLeft + 320, behavior: 'smooth' })
        }
      }
    }

    const interval = setInterval(scroll, 3000)
    return () => clearInterval(interval)
  }, [])

  // Handle window resize to update mobile behavior
  useEffect(() => {
    const handleResize = () => {
      // Reset testimonial index on resize
      setCurrentTestimonialIndex(0)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section ref={sectionRef} className="py-12 xs:py-16 sm:py-24 bg-transparent relative">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Authority Header with Statistics */}
        <div className={`text-center mb-12 xs:mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 xs:gap-4 sm:gap-6 mb-4 xs:mb-6 px-2 xs:px-4">
            <div className="flex items-center space-x-2 text-white">
              <Users className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
              <span className="font-bold text-sm xs:text-base sm:text-lg">200+</span>
              <span className="text-xs xs:text-sm">{language === "es" ? "Estudiantes" : "Studenti"}</span>
            </div>
            <div className="flex items-center space-x-2 text-[#F02A30]">
              <Award className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
              <span className="font-bold text-sm xs:text-base sm:text-lg">4.9/5</span>
              <span className="text-xs xs:text-sm">{language === "es" ? "Valoración" : "Valutazione"}</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Star className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 fill-current" />
              <span className="font-bold text-sm xs:text-base sm:text-lg">98%</span>
              <span className="text-xs xs:text-sm">{language === "es" ? "Satisfacción" : "Soddisfazione"}</span>
            </div>
          </div>
          
          <h2 className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 xs:mb-4 px-2 xs:px-4 transition-all duration-1200 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ fontFamily: '"Bebas Neue", "Arial Black", sans-serif' }}>
            {language === "es" ? "Transformaciones Reales, Resultados Comprobados" : "Trasformazioni Reali, Risultati Provati"}
          </h2>
          <p className={`text-sm xs:text-base sm:text-lg text-white/80 max-w-2xl mx-auto px-2 xs:px-4 transition-all duration-1200 ease-out delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {language === "es" 
              ? <span>Descubre cómo nuestros estudiantes<br />transformaron sus voces y vidas en solo 3 días</span>
              : <span>Scopri come i nostri studenti hanno<br />trasformato le loro voci e vite in soli 3 giorni</span>}
          </p>
        </div>

        {/* Main Compilation Video - 9:16 Aspect Ratio */}
        <div className={`max-w-xs xs:max-w-sm sm:max-w-md mx-auto mb-12 xs:mb-16 px-2 xs:px-4 transition-all duration-1000 ease-out delay-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <Card className="bg-white/98 border-[#9852A7]/20 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
                {playingVideo ? (
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={language === "es" 
                      ? "https://www.youtube.com/embed/5gA6ewP0nQk?autoplay=1&rel=0&modestbranding=1"
                      : "https://www.youtube.com/embed/bnT4iavyXTw?autoplay=1&rel=0&modestbranding=1"
                    }
                    title={language === "es" ? "Testimonios Free Voice Academy" : "Testimonianze Free Voice Academy"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    onEnded={() => setPlayingVideo(false)}
                  />
                ) : (
                  <>
                    <img
                      src="/testimonials-compilation-thumbnail.jpg"
                      alt="Free Voice testimonials compilation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/30 transition-colors">
                      <Button
                        size="lg"
                        onClick={handlePlayVideo}
                        className="bg-[#F02A30] hover:bg-[#F02A30]/90 text-white rounded-full w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 p-0 shadow-xl transform hover:scale-110 transition-all duration-300"
                      >
                        <Play className="h-4 w-4 xs:h-6 xs:w-6 sm:h-8 sm:w-8 ml-1" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Auto-Scrolling Testimonial Cards - Mobile Optimized */}
        <div className="relative">
          {/* Mobile: Single testimonial display */}
          <div className="md:hidden">
            <div className={`px-2 xs:px-4 flex justify-center transition-all duration-800 ease-out delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {testimonialsToShow.length > 0 && (
                <Card className="w-full max-w-xs xs:max-w-sm bg-white/98 border-[#9852A7]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-3 xs:p-4">
                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-2 xs:mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 xs:h-3 xs:w-3 text-[#F02A30] fill-current" />
                      ))}
                      <span className="ml-2 text-[#3C318D] font-semibold text-xs xs:text-xs">
                        {dynamicRatings[currentTestimonialIndex] || "5.0"}
                      </span>
                    </div>

                    {/* Testimonial Quote */}
                    <div className="mb-2 xs:mb-3 min-h-[60px] xs:min-h-[80px]">
                      <p className="text-[#3C318D]/90 leading-relaxed text-xs xs:text-xs line-clamp-4">
                        "{getTestimonialContent(testimonialsToShow[currentTestimonialIndex], language as 'it' | 'es', 'content')}"
                      </p>
                    </div>

                    {/* Student Info */}
                    <div className="flex items-center space-x-2">
                      <img
                        src={getTestimonialImage(testimonialsToShow[currentTestimonialIndex])}
                        alt={testimonialsToShow[currentTestimonialIndex]?.name || ''}
                        className="w-6 h-6 xs:w-8 xs:h-8 rounded-full object-cover border-2 border-[#9852A7]/20 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[#3C318D] text-xs xs:text-xs truncate">{testimonialsToShow[currentTestimonialIndex]?.name}</h4>
                        <p className="text-gray-600 text-xs xs:text-xs truncate">
                          {typeof testimonialsToShow[currentTestimonialIndex]?.role === 'string' 
                            ? testimonialsToShow[currentTestimonialIndex]?.role 
                            : (language === 'es' ? (testimonialsToShow[currentTestimonialIndex]?.role as any)?.es : (testimonialsToShow[currentTestimonialIndex]?.role as any)?.it) || testimonialsToShow[currentTestimonialIndex]?.role
                          }
                        </p>
                        <p className="text-[#3C318D]/60 text-xs xs:text-xs truncate">{(testimonialsToShow[currentTestimonialIndex] as any)?.location || ''}</p>
                      </div>
                      
                      {/* Workshop Badge */}
                      <Badge className="bg-[#F02A30] text-white text-xs xs:text-xs flex-shrink-0">
                        {language === "es" ? "Workshop" : "Workshop"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Mobile testimonial indicators */}
            <div className="flex justify-center mt-3 xs:mt-4 space-x-2">
              {testimonialsToShow.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonialIndex ? 'bg-[#F02A30]' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Horizontal scroll */}
          <div 
            ref={scrollRef}
            className={`hidden md:flex space-x-6 overflow-x-auto scrollbar-hide pb-4 transition-all duration-1000 ease-out delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Duplicate testimonials for seamless loop */}
            {[...testimonialsToShow, ...testimonialsToShow].map((testimonial, index) => {
              const originalIndex = index % testimonialsToShow.length
              const content = getTestimonialContent(testimonial, language as 'it' | 'es', 'content')
              
              return (
                <Card 
                  key={`${testimonial.name}-${index}`} 
                  className={`flex-shrink-0 w-80 bg-white/98 border-[#9852A7]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    isVisible ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ 
                    animationDelay: `${1200 + (originalIndex * 200)}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <CardContent className="p-6">
                    {/* Video Testimonial (if available) */}
                    {getTestimonialVideo(testimonial) && (
                      <div className="mb-4">
                        <ResponsiveVideoPlayer 
                          src={getTestimonialVideo(testimonial)!}
                          poster={getTestimonialImage(testimonial)}
                          className="h-32 rounded-lg"
                          controls={true}
                          preload="metadata"
                        />
                      </div>
                    )}
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-[#F02A30] fill-current" />
                      ))}
                      <span className="ml-2 text-[#3C318D] font-semibold text-sm">
                        {dynamicRatings[originalIndex] || "5.0"}
                      </span>
                    </div>

                    {/* Testimonial Quote */}
                    <div className="mb-4 h-24 overflow-hidden">
                      <p className="text-[#3C318D]/90 leading-relaxed text-sm line-clamp-4">
                        "{content}"
                      </p>
                    </div>

                    {/* Student Info */}
                    <div className="flex items-center space-x-3">
                      <img
                        src={getTestimonialImage(testimonial)}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#9852A7]/20"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#3C318D] text-sm">{testimonial.name}</h4>
                        <p className="text-gray-600 text-xs">
                          {typeof testimonial.role === 'string' 
                            ? testimonial.role 
                            : (language === 'es' ? (testimonial.role as any)?.es : (testimonial.role as any)?.it) || testimonial.role
                          }
                        </p>
                      </div>
                      
                      {/* Workshop Badge */}
                      <Badge className="bg-[#F02A30] text-white text-xs">
                        {language === "es" ? "Workshop" : "Workshop"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className={`text-center mt-12 xs:mt-16 transition-all duration-1000 ease-out delay-1400 px-2 xs:px-4 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-white/80 font-medium mb-4 xs:mb-6 text-sm xs:text-base">
            {language === "es" 
              ? "Únete a más de 200 estudiantes que ya transformaron sus vidas" 
              : "Unisciti a più di 200 studenti che hanno già trasformato le loro vite"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <BookingForm>
              <Button className="bg-[#F02A30] hover:bg-[#F02A30]/90 text-white font-bold px-6 xs:px-8 py-3 xs:py-4 text-base xs:text-lg rounded-full shadow-xl hover:scale-105 transition-all duration-300 w-full xs:w-auto">
                {language === "es" ? "Reserva tu Transformación" : "Prenota la tua Trasformazione"}
              </Button>
            </BookingForm>
            <TestimonialSubmissionForm />
          </div>
        </div>
      </div>
    </section>
  )
}
