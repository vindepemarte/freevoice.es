"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Volume2, Pause } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useState } from "react"

export function JennyIntroSection() {
  const { t, language } = useLanguage()
  const [showVideo, setShowVideo] = useState(false)

  const handlePlayVideo = () => {
    setShowVideo(true)
  }

  return (
    <section className="py-16 sm:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance" style={{ fontFamily: '"Bebas Neue", "Arial Black", sans-serif' }}>
              {language === "es" ? "Conoce a Free Voice Academy" : "Incontra La Free Voice Academy"}
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto text-pretty">
              {language === "es"

                ? "Nuestro equipo de coaches expertos te presenta Free Voice Academy"
                : "Il nostro team di coach esperti ti presenta Free Voice Academy"}
            </p>
          </div>

          <Card className="bg-card border-border overflow-hidden shadow-xl">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gradient-to-br from-[#9852A7]/10 to-[#3C318D]/10">
                {!showVideo ? (
                  // Video Thumbnail
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/free-voice-logo.png"
                      alt="Jenny Rospo"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/30 transition-colors">
                      <Button
                        size="lg"
                        onClick={handlePlayVideo}
                        className="bg-[#F02A30]/90 hover:bg-[#F02A30] text-white rounded-full w-24 h-24 p-0 shadow-2xl transform hover:scale-110 transition-all duration-300"
                      >
                        <Play className="h-10 w-10 ml-1" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  // YouTube Video Player
                  <div className="absolute inset-0">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/htH-nZSfKO0?autoplay=1&rel=0&modestbranding=1"
                      title={language === "es" ? "Introducción Free Voice Academy" : "Introduzione Free Voice Academy"}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Video Controls Overlay - only show when not playing actual video */}
                {!showVideo && (
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-white">
                      <Volume2 className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        {language === "es" ? "Introducción al Workshop" : "Introduzione al Workshop"}
                      </span>
                    </div>
                    <div className="text-white text-sm bg-black/50 px-2 py-1 rounded">3:45</div>
                  </div>
                )}
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold text-card-foreground mb-4">
                  Free Voice Academy - {language === "es" ? "Workshop" : "Workshop"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "es"

                    ? "En este video, descubre cómo nuestros workshops transforman vidas a través de técnicas innovadoras de expresión vocal. Conoce la experiencia única que te espera y cómo puedes liberar tu voz auténtica en un ambiente seguro y profesional."
                    : "In questo video, scopri come i nostri workshop trasformano le vite attraverso tecniche innovative di espressione vocale. Conosci l'esperienza unica che ti aspetta e come puoi liberare la tua voce autentica in un ambiente sicuro e professionale."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
