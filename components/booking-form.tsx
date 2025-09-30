"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageCircle, Shield } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface BookingFormProps {
  children: React.ReactNode
  workshopType?: "workshop1day" | "workshop3day"
}

export function BookingForm({ children, workshopType }: BookingFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    workshop: workshopType || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Minimal friction - directly format WhatsApp message
    const workshopDetails = {
      workshop1day: language === "es" ? "Workshop de 1 Día (€90)" : "Workshop di 1 Giorno (€90)",
    }

    const selectedWorkshop = workshopDetails[formData.workshop as keyof typeof workshopDetails] || 
      (language === "es" ? "Información general" : "Informazioni generali")

    const message =
      language === "es"
        ? `¡Hola! Quiero reservar mi lugar:

👤 Nombre: ${formData.name}
📞 WhatsApp: ${formData.whatsapp}
🎤 Workshop: ${selectedWorkshop}

¿Quedan lugares disponibles?
¡Gracias!`
        : `Ciao! Voglio prenotare il mio posto:

👤 Nome: ${formData.name}
📞 WhatsApp: ${formData.whatsapp}
🎤 Workshop: ${selectedWorkshop}

Ci sono ancora posti disponibili?
Grazie!`

    const whatsappUrl = `https://wa.me/34697798991?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
    
    // Reset form
    setFormData({ name: "", whatsapp: "", workshop: workshopType || "" })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md w-[90vw] max-w-[90vw] sm:w-full mx-auto bg-white border-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F02A30]/5 via-[#9852A7]/5 to-[#3C318D]/5 rounded-lg"></div>
        <div className="relative z-10">
          <DialogHeader className="text-center space-y-3 pb-6">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#F02A30] to-[#3C318D] bg-clip-text text-transparent">
              {language === "es" ? "Reserva Tu Lugar" : "Prenota Il Tuo Posto"}
            </DialogTitle>
            <p className="text-sm text-[#3C318D]/70 font-medium">
              {language === "es" ? "Solo 3 campos - ¡Rápido y fácil!" : "Solo 3 campi - Veloce e facile!"}
            </p>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#3C318D] font-semibold text-sm">
                {language === "es" ? "Tu Nombre *" : "Il Tuo Nome *"}
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder={language === "es" ? "Ej: María García" : "Es: Maria Rossi"}
                className="h-12 text-base border-2 border-[#9852A7]/20 focus:border-[#F02A30] focus:ring-2 focus:ring-[#F02A30]/20 rounded-xl transition-all duration-300 bg-white/80 backdrop-blur text-[#3C318D] placeholder:text-[#3C318D]/50 selection:bg-[#F02A30]/20 selection:text-[#3C318D]"
              />
            </div>

            {/* WhatsApp Field */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-[#3C318D] font-semibold text-sm">
                {language === "es" ? "Tu WhatsApp *" : "Il Tuo WhatsApp *"}
              </Label>
              <Input
                id="whatsapp"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData((prev) => ({ ...prev, whatsapp: e.target.value }))}
                placeholder="+34 600 000 000"
                className="h-12 text-base border-2 border-[#9852A7]/20 focus:border-[#F02A30] focus:ring-2 focus:ring-[#F02A30]/20 rounded-xl transition-all duration-300 bg-white/80 backdrop-blur text-[#3C318D] placeholder:text-[#3C318D]/50 selection:bg-[#F02A30]/20 selection:text-[#3C318D]"
              />
            </div>

            {/* Workshop Selection */}
            <div className="space-y-2">
              <Label htmlFor="workshop" className="text-[#3C318D] font-semibold text-sm">
                {language === "es" ? "Selecciona Workshop *" : "Seleziona Workshop *"}
              </Label>
              <Select
                value={formData.workshop}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, workshop: value }))}
                required
              >
                <SelectTrigger className="h-12 text-base border-2 border-[#9852A7]/20 focus:border-[#F02A30] focus:ring-2 focus:ring-[#F02A30]/20 rounded-xl transition-all duration-300 bg-white/80 backdrop-blur text-[#3C318D] selection:bg-[#F02A30]/20 selection:text-[#3C318D]">
                  <SelectValue placeholder={language === "es" ? "Elige tu workshop" : "Scegli il tuo workshop"} className="text-[#3C318D]/50" />
                </SelectTrigger>
                <SelectContent className="border-2 border-[#9852A7]/20 rounded-xl bg-white/95 backdrop-blur">
                  <SelectItem value="workshop1day" className="text-base py-3 hover:bg-[#F02A30]/10 focus:bg-[#F02A30]/10 rounded-lg text-[#3C318D] selection:bg-[#F02A30]/20 selection:text-[#3C318D]">
                    {language === "es" ? "Workshop de 1 Día - €90" : "Workshop di 1 Giorno - €90"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Privacy Assurance */}
            <div className="flex items-start space-x-3 text-xs text-[#3C318D]/70 bg-gradient-to-r from-[#9852A7]/5 to-[#3C318D]/5 p-4 rounded-xl border border-[#9852A7]/10">
              <Shield className="h-4 w-4 text-[#9852A7] mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                {language === "es" 
                  ? "Tus datos están seguros. Solo los usamos para contactarte sobre el workshop." 
                  : "I tuoi dati sono sicuri. Li usiamo solo per contattarti riguardo al workshop."}
              </span>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-14 bg-gradient-to-r from-[#F02A30] to-[#9852A7] hover:from-[#F02A30]/90 hover:to-[#9852A7]/90 text-white font-bold text-base rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={!formData.name || !formData.whatsapp || !formData.workshop}
            >
              <MessageCircle className="h-5 w-5 mr-3" />
              {language === "es" ? "Enviar a WhatsApp" : "Invia su WhatsApp"}
            </Button>
          </form>
          
          {/* Trust Signal */}
          <div className="text-center pt-4 border-t border-[#9852A7]/10 mt-6">
            <p className="text-xs text-[#3C318D]/60 font-medium">
              {language === "es" 
                ? "✓ Respuesta en menos de 1 hora • ✓ Sin spam garantizado" 
                : "✓ Risposta in meno di 1 ora • ✓ Niente spam garantito"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
