"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Volume2 } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useState } from "react"

export function JennyIntroSection() {
  const { t, language } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayVideo = () => {
    setIsPlaying(true)
    // In a real implementation, this would trigger video playback
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              {language === "es" ? "Conoce a Jenny Rospo" : "Incontra Jenny Rospo"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {language === "es"
                ? "Nuestra fundadora y coach principal te presenta el workshop Free Voice Academy"
                : "La nostra fondatrice e coach principale ti presenta il workshop Free Voice Academy"}
            </p>
          </div>

          <Card className="bg-card border-border overflow-hidden shadow-xl">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-accent/10">
                {/* Video Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/professional-female-vocal-coach-singing.jpg"
                    alt="Jenny Rospo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Button
                      size="lg"
                      onClick={handlePlayVideo}
                      className="bg-white/90 hover:bg-white text-black rounded-full w-20 h-20 p-0 shadow-lg"
                    >
                      <Play className="h-8 w-8 ml-1" />
                    </Button>
                  </div>
                </div>

                {/* Video Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-white">
                    <Volume2 className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {language === "es" ? "Introducción al Workshop" : "Introduzione al Workshop"}
                    </span>
                  </div>
                  <div className="text-white text-sm">3:45</div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Jenny Rospo - {language === "es" ? "Fundadora" : "Fondatrice"}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {language === "es"
                    ? "En este video, Jenny te explica la filosofía detrás de Free Voice Academy y cómo nuestro enfoque único puede ayudarte a descubrir tu voz auténtica y transformar tu vida a través del poder de la expresión vocal."
                    : "In questo video, Jenny ti spiega la filosofia dietro Free Voice Academy e come il nostro approccio unico può aiutarti a scoprire la tua voce autentica e trasformare la tua vita attraverso il potere dell'espressione vocale."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
