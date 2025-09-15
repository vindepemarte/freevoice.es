"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Clock, AlertTriangle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function PricingSection() {
  const { t, language } = useLanguage()

  const pricingPlans = [
    {
      id: "essential",
      name: t.pricing.essential.name,
      price: "€180",
      period: t.pricing.essential.period,
      description: t.pricing.essential.description,
      features: [
        language === "es" ? "3 días, 2 noches alojamiento" : "3 giorni, 2 notti alloggio",
        language === "es" ? "6 sesiones de coaching vocal" : "6 sessioni di coaching vocale",
        language === "es" ? "Todas las comidas incluidas" : "Tutti i pasti inclusi",
        language === "es" ? "Talleres de trabajo corporal" : "Workshop di lavoro corporeo",
        language === "es" ? "Orientación nutricional básica" : "Orientamento nutrizionale di base",
        language === "es" ? "Sesiones de práctica grupal" : "Sessioni di pratica di gruppo",
        language === "es" ? "Acceso al grupo privado WhatsApp" : "Accesso al gruppo privato WhatsApp",
        language === "es"
          ? "Llamadas semanales 2h con coaches (4 coaches diferentes mensualmente)"
          : "Chiamate settimanali 2h con coach (4 coach diversi mensilmente)",
      ],
      popular: false,
    },
    {
      id: "premium",
      name: t.pricing.premium.name,
      price: "€350",
      period: t.pricing.premium.period,
      description: t.pricing.premium.description,
      features: [
        language === "es" ? "Todo lo del Esencial" : "Tutto dell'Essenziale",
        language === "es" ? "4 días en lugar de 3" : "4 giorni invece di 3",
        language === "es" ? "3 horas de coaching 1-on-1" : "3 ore di coaching 1-on-1",
        language === "es" ? "Plan nutricional personalizado" : "Piano nutrizionale personalizzato",
        language === "es" ? "Sesión en estudio de grabación" : "Sessione in studio di registrazione",
        language === "es" ? "Video de feedback de actuación" : "Video di feedback della performance",
        language === "es" ? "Acceso al grupo privado WhatsApp" : "Accesso al gruppo privato WhatsApp",
        language === "es"
          ? "Llamadas semanales + reserva 1-on-1 (€50/hora)"
          : "Chiamate settimanali + prenotazione 1-on-1 (€50/ora)",
      ],
      popular: true,
    },
    {
      id: "vip",
      name: t.pricing.vip.name,
      price: "€750",
      period: t.pricing.vip.period,
      description: t.pricing.vip.description,
      features: [
        language === "es" ? "Todo lo del Premium" : "Tutto del Premium",
        language === "es" ? "7 días experiencia total" : "7 giorni esperienza totale",
        language === "es"
          ? "5 días coaching + 1 día prep + 1 día actuación"
          : "5 giorni coaching + 1 giorno prep + 1 giorno performance",
        language === "es" ? "3 sesiones individuales 1-on-1" : "3 sessioni individuali 1-on-1",
        language === "es"
          ? "Actuación en vivo con DJFaxBeat en Tenerife"
          : "Performance dal vivo con DJFaxBeat a Tenerife",
        language === "es"
          ? "Grabación profesional de tu actuación"
          : "Registrazione professionale della tua performance",
        language === "es" ? "Acceso al grupo privado WhatsApp" : "Accesso al gruppo privato WhatsApp",
        language === "es" ? "Reserva prioritaria de coach 1-on-1" : "Prenotazione prioritaria coach 1-on-1",
      ],
      popular: false,
    },
  ]

  const handleWhatsAppBooking = (journeyType: string, journeyName: string, price: string) => {
    const journeyDetails = {
      essential: language === "es" ? "Retiro Esencial (3 días)" : "Ritiro Essenziale (3 giorni)",
      premium: language === "es" ? "Viaje Premium (4 días + 3h 1-on-1)" : "Viaggio Premium (4 giorni + 3h 1-on-1)",
      vip:
        language === "es"
          ? "Intensivo VIP (7 días total con actuación en vivo)"
          : "Intensivo VIP (7 giorni totali con performance dal vivo)",
    }

    const message =
      language === "es"
        ? `¡Hola! Me gustaría reservar mi lugar en ${journeyDetails[journeyType as keyof typeof journeyDetails]} - ${price}. 

Por favor, envíenme más información sobre:
- Fechas disponibles
- Proceso de reserva
- Detalles del programa

¡Gracias!`
        : `Ciao! Vorrei prenotare il mio posto per ${journeyDetails[journeyType as keyof typeof journeyDetails]} - ${price}.

Per favore, inviatemi maggiori informazioni su:
- Date disponibili
- Processo di prenotazione
- Dettagli del programma

Grazie!`

    const whatsappUrl = `https://wa.me/34123456789?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="pricing" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">{t.pricing.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t.pricing.subtitle}</p>

          <div className="inline-flex items-center space-x-2 bg-red-100 border border-red-300 text-red-800 rounded-lg px-4 py-3 mt-6">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-bold">{t.pricing.spotsLeft}</span>
            <Clock className="h-4 w-4 ml-2" />
            <span className="text-sm">{t.pricing.nextRetreat}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-card border-border flex flex-col ${
                plan.popular ? "ring-2 ring-primary shadow-lg scale-105" : "hover:shadow-lg transition-shadow"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    {language === "es" ? "Más Popular" : "Più Popolare"}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold text-card-foreground mb-2">{plan.name}</CardTitle>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/ {plan.period}</span>
                </div>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0 flex-grow flex flex-col">
                <ul className="space-y-3 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-card-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full mt-8 ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  }`}
                  onClick={() => handleWhatsAppBooking(plan.id, plan.name, plan.price)}
                >
                  {language === "es" ? `Reservar ${plan.name}` : `Prenota ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-card-foreground mb-3">{t.pricing.included}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-primary" />
                <span>
                  {language === "es" ? "Acceso al grupo privado WhatsApp" : "Accesso al gruppo privato WhatsApp"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-primary" />
                <span>
                  {language === "es"
                    ? "Llamadas semanales 2h con coaches rotativos"
                    : "Chiamate settimanali 2h con coach a rotazione"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-primary" />
                <span>{language === "es" ? "4 coaches diferentes mensualmente" : "4 coach diversi mensilmente"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-primary" />
                <span>
                  {language === "es"
                    ? "Videollamadas 1-on-1 disponibles (€50/hora)"
                    : "Videochiamate 1-on-1 disponibili (€50/ora)"}
                </span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground">
            <strong>{language === "es" ? "Próximo retiro:" : "Prossimo ritiro:"}</strong> {t.pricing.nextRetreat}
          </p>
        </div>
      </div>
    </section>
  )
}
