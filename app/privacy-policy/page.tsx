"use client"

import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Users, MessageCircle, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  const { language } = useLanguage()

  const content = {
    es: {
      title: "Política de Privacidad",
      lastUpdated: "Última actualización: 15 de enero de 2025",
      backToHome: "Volver al Inicio",
      sections: {
        intro: {
          title: "1. Introducción",
          content: `Free Voice Academy ("nosotros", "nuestro" o "la empresa") se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando visita nuestro sitio web freevoice.es y utiliza nuestros servicios de coaching vocal en Tenerife, España.

Al utilizar nuestros servicios, usted acepta las prácticas descritas en esta política.`
        },
        dataController: {
          title: "2. Responsable del Tratamiento",
          content: `Free Voice Academy
Ubicación: Tenerife, España
Email: info@freevoice.es
Teléfono: +34 697 78 89 91

Somos el responsable del tratamiento de sus datos personales de acuerdo con el Reglamento General de Protección de Datos (RGPD) y la legislación española de protección de datos.`
        },
        dataCollection: {
          title: "3. Información que Recopilamos",
          content: `Recopilamos los siguientes tipos de información:

• **Información de Contacto**: Nombre, número de teléfono, dirección de email
• **Información de Comunicación**: Mensajes enviados a través de WhatsApp, formularios de contacto
• **Información Técnica**: Dirección IP, tipo de navegador, páginas visitadas, tiempo de visita
• **Cookies**: Información almacenada en su dispositivo para mejorar la experiencia del usuario`
        },
        legalBasis: {
          title: "4. Base Legal para el Tratamiento",
          content: `Procesamos sus datos personales basándonos en:

• **Consentimiento**: Cuando nos proporciona voluntariamente su información
• **Interés Legítimo**: Para mejorar nuestros servicios y comunicarnos con usted
• **Ejecución de Contrato**: Para proporcionar los servicios de coaching solicitados`
        },
        dataUse: {
          title: "5. Cómo Utilizamos su Información",
          content: `Utilizamos su información para:

• Responder a sus consultas y proporcionar información sobre nuestros workshops
• Procesar reservas y pagos para nuestros servicios
• Enviar confirmaciones y actualizaciones sobre workshops
• Mejorar nuestros servicios y experiencia del usuario
• Cumplir con obligaciones legales y regulatorias`
        },
        whatsapp: {
          title: "6. Uso de WhatsApp",
          content: `**IMPORTANTE**: Utilizamos WhatsApp como método de contacto principal.

• WhatsApp es un servicio de terceros operado por Meta Platforms
• Al contactarnos por WhatsApp, sus datos se procesan según la política de privacidad de WhatsApp
• Obtenemos su consentimiento antes de procesar información compartida vía WhatsApp
• Sus conversaciones de WhatsApp pueden incluir información personal que utilizamos para proporcionar nuestros servicios
• Puede retirar su consentimiento para comunicaciones de WhatsApp en cualquier momento`
        },
        dataSharing: {
          title: "7. Compartir Información",
          content: `No vendemos ni alquilamos su información personal. Podemos compartir información con:

• **Proveedores de Servicios**: Para procesar pagos, hosting web, análisis
• **WhatsApp/Meta**: Cuando se comunica con nosotros a través de WhatsApp
• **Autoridades Legales**: Cuando sea requerido por ley
• **Socios de Confianza**: Solo con su consentimiento explícito`
        },
        cookies: {
          title: "8. Cookies y Tecnologías Similares",
          content: `Utilizamos cookies para:

• **Cookies Necesarias**: Funcionalidad básica del sitio web
• **Cookies de Análisis**: Entender cómo usa nuestro sitio
• **Cookies de Marketing**: Personalizar contenido y anuncios

Puede gestionar las preferencias de cookies a través del banner de cookies en nuestro sitio.`
        },
        rights: {
          title: "9. Sus Derechos",
          content: `Bajo el RGPD, usted tiene derecho a:

• **Acceso**: Solicitar una copia de sus datos personales
• **Rectificación**: Corregir información inexacta
• **Supresión**: Solicitar la eliminación de sus datos
• **Limitación**: Restringir el procesamiento de sus datos
• **Portabilidad**: Recibir sus datos en formato estructurado
• **Oposición**: Oponerse al procesamiento de sus datos
• **Retirar Consentimiento**: En cualquier momento

Para ejercer estos derechos, contáctenos en info@freevoice.es`
        },
        retention: {
          title: "10. Retención de Datos",
          content: `Conservamos sus datos personales durante:

• **Datos de Contacto**: Hasta que retire su consentimiento
• **Información de Workshop**: 3 años después del último servicio
• **Comunicaciones de WhatsApp**: Según sea necesario para proporcionar servicios
• **Datos de Cookies**: Según las preferencias establecidas`
        },
        security: {
          title: "11. Seguridad de Datos",
          content: `Implementamos medidas de seguridad apropiadas para proteger sus datos:

• Cifrado de datos en tránsito y en reposo
• Acceso restringido a información personal
• Auditorías regulares de seguridad
• Capacitación del personal en protección de datos`
        },
        international: {
          title: "12. Transferencias Internacionales",
          content: `Algunos de nuestros proveedores de servicios pueden estar ubicados fuera del EEE. Aseguramos que estas transferencias cumplan con los requisitos del RGPD mediante:

• Cláusulas contractuales estándar
• Decisiones de adecuación de la Comisión Europea
• Otras salvaguardas apropiadas`
        },
        changes: {
          title: "13. Cambios a esta Política",
          content: `Podemos actualizar esta política ocasionalmente. Le notificaremos sobre cambios significativos:

• Publicando la nueva política en nuestro sitio web
• Enviando un aviso por email si tiene una cuenta con nosotros
• A través de WhatsApp si es su método de comunicación preferido`
        },
        contact: {
          title: "14. Contacto",
          content: `Para preguntas sobre esta política o para ejercer sus derechos, contáctenos:

**Free Voice Academy**
📧 Email: info@freevoice.es
📱 WhatsApp: +34 697 78 89 91
📍 Ubicación: Tenerife, España

También puede contactar a la Agencia Española de Protección de Datos si tiene preocupaciones sobre nuestro manejo de sus datos personales.`
        }
      }
    },
    it: {
      title: "Politica sulla Privacy",
      lastUpdated: "Ultimo aggiornamento: 15 gennaio 2025",
      backToHome: "Torna alla Home",
      sections: {
        intro: {
          title: "1. Introduzione",
          content: `Free Voice Academy ("noi", "nostro" o "l'azienda") si impegna a proteggere la vostra privacy. Questa Politica sulla Privacy spiega come raccogliamo, utilizziamo, divulghiamo e proteggiamo le vostre informazioni quando visitate il nostro sito web freevoice.es e utilizzate i nostri servizi di coaching vocale a Tenerife, Spagna.

Utilizzando i nostri servizi, accettate le pratiche descritte in questa politica.`
        },
        dataController: {
          title: "2. Titolare del Trattamento",
          content: `Free Voice Academy
Ubicazione: Tenerife, Spagna
Email: info@freevoice.es
Telefono: +34 697 78 89 91

Siamo il titolare del trattamento dei vostri dati personali in conformità al Regolamento Generale sulla Protezione dei Dati (GDPR) e alla legislazione spagnola sulla protezione dei dati.`
        },
        dataCollection: {
          title: "3. Informazioni che Raccogliamo",
          content: `Raccogliamo i seguenti tipi di informazioni:

• **Informazioni di Contatto**: Nome, numero di telefono, indirizzo email
• **Informazioni di Comunicazione**: Messaggi inviati tramite WhatsApp, moduli di contatto
• **Informazioni Tecniche**: Indirizzo IP, tipo di browser, pagine visitate, tempo di visita
• **Cookie**: Informazioni memorizzate sul vostro dispositivo per migliorare l'esperienza utente`
        },
        legalBasis: {
          title: "4. Base Legale per il Trattamento",
          content: `Trattiamo i vostri dati personali basandoci su:

• **Consenso**: Quando ci fornite volontariamente le vostre informazioni
• **Interesse Legittimo**: Per migliorare i nostri servizi e comunicare con voi
• **Esecuzione del Contratto**: Per fornire i servizi di coaching richiesti`
        },
        dataUse: {
          title: "5. Come Utilizziamo le Vostre Informazioni",
          content: `Utilizziamo le vostre informazioni per:

• Rispondere alle vostre richieste e fornire informazioni sui nostri workshop
• Elaborare prenotazioni e pagamenti per i nostri servizi
• Inviare conferme e aggiornamenti sui workshop
• Migliorare i nostri servizi e l'esperienza utente
• Rispettare gli obblighi legali e normativi`
        },
        whatsapp: {
          title: "6. Uso di WhatsApp",
          content: `**IMPORTANTE**: Utilizziamo WhatsApp come metodo di contatto principale.

• WhatsApp è un servizio di terze parti gestito da Meta Platforms
• Contattandoci tramite WhatsApp, i vostri dati vengono elaborati secondo la politica sulla privacy di WhatsApp
• Otteniamo il vostro consenso prima di elaborare informazioni condivise tramite WhatsApp
• Le vostre conversazioni WhatsApp possono includere informazioni personali che utilizziamo per fornire i nostri servizi
• Potete ritirare il consenso per le comunicazioni WhatsApp in qualsiasi momento`
        },
        dataSharing: {
          title: "7. Condivisione delle Informazioni",
          content: `Non vendiamo né affittiamo le vostre informazioni personali. Possiamo condividere informazioni con:

• **Fornitori di Servizi**: Per elaborare pagamenti, hosting web, analisi
• **WhatsApp/Meta**: Quando comunicate con noi tramite WhatsApp
• **Autorità Legali**: Quando richiesto dalla legge
• **Partner di Fiducia**: Solo con il vostro consenso esplicito`
        },
        cookies: {
          title: "8. Cookie e Tecnologie Simili",
          content: `Utilizziamo i cookie per:

• **Cookie Necessari**: Funzionalità di base del sito web
• **Cookie di Analisi**: Capire come utilizzate il nostro sito
• **Cookie di Marketing**: Personalizzare contenuti e annunci

Potete gestire le preferenze dei cookie tramite il banner dei cookie sul nostro sito.`
        },
        rights: {
          title: "9. I Vostri Diritti",
          content: `Sotto il GDPR, avete il diritto di:

• **Accesso**: Richiedere una copia dei vostri dati personali
• **Rettifica**: Correggere informazioni inesatte
• **Cancellazione**: Richiedere l'eliminazione dei vostri dati
• **Limitazione**: Limitare l'elaborazione dei vostri dati
• **Portabilità**: Ricevere i vostri dati in formato strutturato
• **Opposizione**: Opporsi all'elaborazione dei vostri dati
• **Ritirare il Consenso**: In qualsiasi momento

Per esercitare questi diritti, contattateci a info@freevoice.es`
        },
        retention: {
          title: "10. Conservazione dei Dati",
          content: `Conserviamo i vostri dati personali per:

• **Dati di Contatto**: Fino a quando ritirate il consenso
• **Informazioni Workshop**: 3 anni dopo l'ultimo servizio
• **Comunicazioni WhatsApp**: Secondo necessità per fornire servizi
• **Dati Cookie**: Secondo le preferenze impostate`
        },
        security: {
          title: "11. Sicurezza dei Dati",
          content: `Implementiamo misure di sicurezza appropriate per proteggere i vostri dati:

• Crittografia dei dati in transito e a riposo
• Accesso limitato alle informazioni personali
• Audit di sicurezza regolari
• Formazione del personale sulla protezione dei dati`
        },
        international: {
          title: "12. Trasferimenti Internazionali",
          content: `Alcuni dei nostri fornitori di servizi potrebbero essere ubicati fuori dal SEE. Assicuriamo che questi trasferimenti rispettino i requisiti GDPR tramite:

• Clausole contrattuali standard
• Decisioni di adeguatezza della Commissione Europea
• Altre salvaguardie appropriate`
        },
        changes: {
          title: "13. Modifiche a questa Politica",
          content: `Potremmo aggiornare questa politica occasionalmente. Vi notificheremo cambiamenti significativi:

• Pubblicando la nuova politica sul nostro sito web
• Inviando un avviso via email se avete un account con noi
• Tramite WhatsApp se è il vostro metodo di comunicazione preferito`
        },
        contact: {
          title: "14. Contatto",
          content: `Per domande su questa politica o per esercitare i vostri diritti, contattateci:

**Free Voice Academy**
📧 Email: info@freevoice.es
📱 WhatsApp: +34 697 78 89 91
📍 Ubicazione: Tenerife, Spagna

Potete anche contattare l'Agenzia Spagnola per la Protezione dei Dati se avete preoccupazioni sul nostro trattamento dei vostri dati personali.`
        }
      }
    }
  }

  const currentContent = content[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9852A7] via-[#3C318D] to-[#1E1B4B]">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:text-white/80 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentContent.backToHome}
              </Button>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {currentContent.title}
            </h1>
            <p className="text-white/80 text-sm">
              {currentContent.lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 space-y-8">
            {Object.entries(currentContent.sections).map(([key, section]) => (
              <section key={key} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#3C318D] flex items-center gap-2">
                  {key === 'whatsapp' && <MessageCircle className="w-5 h-5" />}
                  {key === 'rights' && <Shield className="w-5 h-5" />}
                  {key === 'contact' && <Mail className="w-5 h-5" />}
                  {section.title}
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <Link href="/">
              <Button className="bg-white text-[#9852A7] hover:bg-white/90">
                {currentContent.backToHome}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}