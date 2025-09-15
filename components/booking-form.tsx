"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useLanguage } from "@/hooks/use-language"

interface BookingFormProps {
  children: React.ReactNode
  journeyType?: "essential" | "premium" | "vip"
}

export function BookingForm({ children, journeyType }: BookingFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    journey: journeyType || "",
    message: "",
    language: language,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const journeyNames = {
      essential: language === "es" ? "Retiro Esencial (3 días)" : "Ritiro Essenziale (3 giorni)",
      premium: language === "es" ? "Viaje Premium (4 días + 3h 1-on-1)" : "Viaggio Premium (4 giorni + 3h 1-on-1)",
      vip:
        language === "es"
          ? "Intensivo VIP (7 días total con actuación en vivo)"
          : "Intensivo VIP (7 giorni totali con performance dal vivo)",
    }

    const selectedJourney = journeyNames[formData.journey as keyof typeof journeyNames] || formData.journey

    const message =
      language === "es"
        ? `¡Hola! Me gustaría reservar mi lugar en Free Voice Academy.

📋 Mis datos:
• Nombre: ${formData.name}
• Email: ${formData.email}
• Teléfono: ${formData.phone}
• Journey seleccionado: ${selectedJourney}
• Idioma preferido: ${formData.language === "es" ? "Español" : "Italiano"}

💬 Mensaje adicional: ${formData.message || "Ninguno"}

¡Espero su respuesta para completar la reserva!`
        : `Ciao! Vorrei prenotare il mio posto alla Free Voice Academy.

📋 I miei dati:
• Nome: ${formData.name}
• Email: ${formData.email}
• Telefono: ${formData.phone}
• Viaggio selezionato: ${selectedJourney}
• Lingua preferita: ${formData.language === "es" ? "Spagnolo" : "Italiano"}

💬 Messaggio aggiuntivo: ${formData.message || "Nessuno"}

Aspetto la vostra risposta per completare la prenotazione!`

    const whatsappUrl = `https://wa.me/34697798991?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md w-[95vw] max-w-[95vw] sm:w-full mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {language === "es" ? "Reserva Tu Lugar Ahora" : "Prenota Il Tuo Posto Ora"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">{language === "es" ? "Nombre Completo *" : "Nome Completo *"}</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder={language === "es" ? "Tu nombre completo" : "Il tuo nome completo"}
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <Label htmlFor="phone">{language === "es" ? "Número de Teléfono *" : "Numero di Telefono *"}</Label>
            <Input
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="+34 123 456 789"
            />
          </div>

          <div>
            <Label htmlFor="journey">{language === "es" ? "Seleccionar Viaje *" : "Seleziona Viaggio *"}</Label>
            <Select
              value={formData.journey}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, journey: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder={language === "es" ? "Elige tu viaje" : "Scegli il tuo viaggio"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="essential">
                  {language === "es" ? "Retiro Esencial - €180" : "Ritiro Essenziale - €180"}
                </SelectItem>
                <SelectItem value="premium">
                  {language === "es" ? "Viaje Premium - €350" : "Viaggio Premium - €350"}
                </SelectItem>
                <SelectItem value="vip">
                  {language === "es" ? "Intensivo VIP - €750" : "Intensivo VIP - €750"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="language">{language === "es" ? "Idioma Preferido" : "Lingua Preferita"}</Label>
            <Select
              value={formData.language}
              onValueChange={(value: "es" | "it") => setFormData((prev) => ({ ...prev, language: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">{language === "es" ? "Mensaje Adicional" : "Messaggio Aggiuntivo"}</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              placeholder={
                language === "es"
                  ? "Cualquier pregunta o solicitud especial..."
                  : "Qualsiasi domanda o richiesta speciale..."
              }
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            {language === "es" ? "Enviar Mensaje WhatsApp" : "Invia Messaggio WhatsApp"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
