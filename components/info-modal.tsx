"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function InfoModal() {
  const { t, language } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white transition-all duration-300 border border-white/30"
        >
          <Info className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#3C318D]">
            {t.infoModal.title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4 text-gray-700">
          {/* Content will be updated with actual PDF content */}
          <div className="prose prose-sm max-w-none">
            {language === "es" ? (
              <div>
                <h3 className="text-lg font-semibold text-[#3C318D] mb-3">Información del Workshop Free Voice</h3>
                <p className="mb-4">
                  Bienvenido al Workshop de Free Voice Academy, una experiencia transformadora 
                  diseñada para ayudarte a descubrir y liberar tu voz auténtica.
                </p>
                
                <h4 className="font-semibold text-[#9852A7] mt-4 mb-2">¿Qué incluye?</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Técnicas vocales profesionales</li>
                  <li>Trabajo corporal integrado</li>
                  <li>Ejercicios de respiración avanzados</li>
                  <li>Orientación nutricional personalizada</li>
                  <li>Acceso al grupo privado de WhatsApp</li>
                </ul>

                <h4 className="font-semibold text-[#9852A7] mt-4 mb-2">Horario</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>09:30 - Llegada y bienvenida</li>
                  <li>10:00 - Inicio de actividades</li>
                  <li>13:00-14:00 - Pausa para el almuerzo</li>
                  <li>18:30 - Círculo de cierre</li>
                </ul>

                <h4 className="font-semibold text-[#9852A7] mt-4 mb-2">Qué traer</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Ropa cómoda para movimiento</li>
                  <li>Cuaderno y bolígrafo</li>
                  <li>Botella de agua o infusión</li>
                  <li>Comida ligera y saludable</li>
                </ul>

                <h4 className="font-semibold text-[#9852A7] mt-4 mb-2">Políticas</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Teléfonos en modo silencioso durante las sesiones</li>
                  <li>Plazas limitadas - reserva anticipada recomendada</li>
                  <li>Ambiente de respeto y confidencialidad</li>
                </ul>

                <p className="mt-4 text-sm italic text-gray-600">
                  Para más información, contáctanos por WhatsApp al +34 697 798 991
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-[#3C318D] mb-3">Informazioni sul Workshop Free Voice</h3>
                <p className="mb-4">
                  Benvenuto al Workshop di Free Voice Academy, un'esperienza trasformativa 
                  progettata per aiutarti a scoprire e liberare la tua voce autentica.
                </p>
                
                <h4 className="font-semibold text-[#9852A7] mt-4 mb-2">Cosa include?</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Tecniche vocali professionali</li>
                  <li>Lavoro corporeo integrato</li>
                  <li>Esercizi di respirazione avanzati</li>
                  <li>Orientamento nutrizionale personalizzato</li>
                  <li>Accesso al gruppo privato WhatsApp</li>
                </ul>

                <h4 className="font-semibold text-[#9852A7] mt-4 mb-2">Orario</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>09:30 - Arrivo e accoglienza</li>
                  <li>10:00 - Inizio attività</li>
                  <li>13:00-14:00 - Pausa pranzo</li>
                  <li>18:30 - Cerchio di chiusura</li>
                </ul>

                <h4 className="font-semibold text-[#9852A7] mt-4 mb-2">Cosa portare</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Abbigliamento comodo per il movimento</li>
                  <li>Quaderno e penna</li>
                  <li>Bottiglia d'acqua o tisana</li>
                  <li>Pranzo leggero e sano</li>
                </ul>

                <h4 className="font-semibold text-[#9852A7] mt-4 mb-2">Politiche</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Telefoni in modalità silenziosa durante le sessioni</li>
                  <li>Posti limitati - prenotazione anticipata consigliata</li>
                  <li>Ambiente di rispetto e riservatezza</li>
                </ul>

                <p className="mt-4 text-sm italic text-gray-600">
                  Per maggiori informazioni, contattaci su WhatsApp al +34 697 798 991
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
