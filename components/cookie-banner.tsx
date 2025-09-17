"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Cookie, Shield, Settings } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const { language, t } = useLanguage()

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const acceptNecessary = () => {
    localStorage.setItem("cookie-consent", "necessary")
    setIsVisible(false)
  }

  const rejectAll = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setIsVisible(false)
  }

  if (!isVisible) return null

  const cookieTexts = {
    es: {
      title: "🍪 Política de Cookies",
      description: "Utilizamos cookies para mejorar tu experiencia en nuestro sitio web y cumplir con las regulaciones de Tenerife y España.",
      necessary: "Cookies Necesarias",
      necessaryDesc: "Esenciales para el funcionamiento básico del sitio web.",
      analytics: "Cookies de Análisis",
      analyticsDesc: "Nos ayudan a entender cómo interactúas con nuestro sitio.",
      marketing: "Cookies de Marketing",
      marketingDesc: "Utilizadas para personalizar anuncios y contenido.",
      acceptAll: "Aceptar Todas",
      acceptNecessary: "Solo Necesarias",
      reject: "Rechazar Todas",
      customize: "Personalizar",
      privacy: "Ver Política de Privacidad",
      close: "Cerrar"
    },
    it: {
      title: "🍪 Politica sui Cookie",
      description: "Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito web e rispettare le normative di Tenerife e Spagna.",
      necessary: "Cookie Necessari",
      necessaryDesc: "Essenziali per il funzionamento di base del sito web.",
      analytics: "Cookie di Analisi",
      analyticsDesc: "Ci aiutano a capire come interagisci con il nostro sito.",
      marketing: "Cookie di Marketing",
      marketingDesc: "Utilizzati per personalizzare annunci e contenuti.",
      acceptAll: "Accetta Tutti",
      acceptNecessary: "Solo Necessari",
      reject: "Rifiuta Tutti",
      customize: "Personalizza",
      privacy: "Vedi Politica sulla Privacy",
      close: "Chiudi"
    }
  }

  const texts = cookieTexts[language]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Cookie className="w-5 h-5 text-[#9852A7]" />
              <h3 className="font-semibold text-gray-900">{texts.title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {texts.description}
            </p>

            {showDetails && (
              <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm text-gray-900">{texts.necessary}</h4>
                    <p className="text-xs text-gray-600">{texts.necessaryDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Settings className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm text-gray-900">{texts.analytics}</h4>
                    <p className="text-xs text-gray-600">{texts.analyticsDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Cookie className="w-4 h-4 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm text-gray-900">{texts.marketing}</h4>
                    <p className="text-xs text-gray-600">{texts.marketingDesc}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button
                onClick={acceptAll}
                className="bg-[#9852A7] hover:bg-[#9852A7]/90 text-white text-sm px-4 py-2"
              >
                {texts.acceptAll}
              </Button>
              <Button
                onClick={acceptNecessary}
                variant="outline"
                className="text-sm px-4 py-2 border-[#9852A7] text-[#9852A7] hover:bg-[#9852A7]/10"
              >
                {texts.acceptNecessary}
              </Button>
              <Button
                onClick={rejectAll}
                variant="ghost"
                className="text-sm px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                {texts.reject}
              </Button>
              <Button
                onClick={() => setShowDetails(!showDetails)}
                variant="ghost"
                className="text-sm px-4 py-2 text-[#9852A7] hover:text-[#9852A7]/80"
              >
                {texts.customize}
              </Button>
              <a
                href="/privacy-policy"
                className="text-sm text-[#9852A7] hover:text-[#9852A7]/80 underline px-2 py-2"
              >
                {texts.privacy}
              </a>
            </div>
          </div>
          
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X className="w-4 h-4" />
            <span className="sr-only">{texts.close}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}