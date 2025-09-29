"use client"

import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, AlertTriangle, Scale, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function TermsConditionsPage() {
  const { language } = useLanguage()

  const content = {
    es: {
      title: "Términos y Condiciones",
      lastUpdated: "Última actualización: 15 de enero de 2025",
      backToHome: "Volver al Inicio",
      sections: {
        intro: {
          title: "1. Introducción",
          content: `Bienvenido a Free Voice Academy. Estos Términos y Condiciones ("Términos") rigen el uso de nuestro sitio web freevoice.es y los servicios de coaching vocal que ofrecemos en Tenerife, España.

Al acceder a nuestro sitio web o utilizar nuestros servicios, usted acepta estar sujeto a estos Términos. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.`
        },
        company: {
          title: "2. Información de la Empresa",
          content: `**Free Voice Academy**
Ubicación: Tenerife, España
Email: info@freevoice.es
Teléfono: +34 697 78 89 91

Somos una academia de coaching vocal especializada en workshops inmersivos y transformación personal a través del poder de la voz.`
        },
        services: {
          title: "3. Descripción de Servicios",
          content: `Ofrecemos los siguientes servicios:

• **Workshop de 1 Día (€50)**: Introducción al coaching vocal con técnicas básicas de respiración y canto
• **Workshop de 3 Días (€180)**: Experiencia completa que incluye coaching vocal, trabajo corporal, orientación nutricional y acceso al grupo privado de WhatsApp
• **Seguimiento Post-Workshop**: Apoyo continuo a través de nuestro grupo privado de WhatsApp
• **Certificados de Participación**: Para workshops completados

Todos los workshops se realizan en nuestras instalaciones en Tenerife con coaches profesionales certificados.`
        },
        booking: {
          title: "4. Reservas y Pagos",
          content: `**Proceso de Reserva:**
• Las reservas se realizan principalmente a través de WhatsApp (+34 697 78 89 91)
• Se requiere confirmación por escrito para todas las reservas
• Los lugares están limitados y se asignan por orden de llegada

**Política de Pagos:**
• El pago completo se requiere para confirmar la reserva
• Aceptamos transferencias bancarias y otros métodos acordados
• Los precios están en euros (€) e incluyen IVA cuando corresponda
• Los precios pueden cambiar sin previo aviso para futuras reservas`
        },
        cancellation: {
          title: "5. Política de Cancelación y Reembolsos",
          content: `**Cancelaciones por parte del Cliente:**
• **30+ días antes**: Reembolso completo (100%)
• **15-29 días antes**: Reembolso del 50%
• **Menos de 14 días**: No hay reembolso disponible

**Cancelaciones por parte de Free Voice Academy:**
• En caso de cancelación por nuestra parte, se ofrecerá reembolso completo o reprogramación
• No somos responsables de gastos de viaje o alojamiento en caso de cancelación

**Circunstancias Excepcionales:**
• Casos de fuerza mayor (clima extremo, emergencias de salud pública) se evaluarán individualmente`
        },
        conduct: {
          title: "6. Código de Conducta",
          content: `Los participantes deben:

• Tratar a todos los participantes y staff con respeto
• Llegar puntualmente a todas las sesiones
• Participar activamente y de manera constructiva
• Mantener la confidencialidad de otros participantes
• Seguir las instrucciones de seguridad y bienestar

**Comportamientos Prohibidos:**
• Conducta disruptiva o irrespetuosa
• Uso de sustancias ilegales
• Grabación no autorizada de sesiones
• Compartir información personal de otros participantes

Nos reservamos el derecho de expulsar a participantes que violen estas normas sin reembolso.`
        },
        health: {
          title: "7. Consideraciones de Salud y Seguridad",
          content: `**Responsabilidad del Participante:**
• Informar sobre cualquier condición médica relevante
• Notificar alergias alimentarias o restricciones dietéticas
• Participar dentro de sus límites físicos
• Seguir las recomendaciones de seguridad del instructor

**Limitaciones:**
• Nuestros servicios no sustituyen el tratamiento médico profesional
• Los participantes participan bajo su propia responsabilidad
• Se recomienda consultar con un médico antes de participar si tiene condiciones de salud preexistentes`
        },
        whatsapp: {
          title: "8. Uso de WhatsApp",
          content: `**Comunicación Principal:**
• WhatsApp es nuestro método de comunicación preferido
• Al contactarnos por WhatsApp, acepta los términos de servicio de WhatsApp
• Las conversaciones pueden incluir información sobre servicios, horarios y seguimiento

**Grupo Privado de WhatsApp:**
• Incluido en el Workshop de 3 Días
• Proporciona seguimiento continuo y apoyo comunitario
• Los participantes deben mantener respeto y confidencialidad
• Nos reservamos el derecho de remover participantes que violen las normas del grupo`
        },
        intellectual: {
          title: "9. Propiedad Intelectual",
          content: `**Contenido de Free Voice Academy:**
• Todos los materiales, métodos y contenidos son propiedad de Free Voice Academy
• Prohibida la reproducción, distribución o uso comercial sin autorización escrita
• Los participantes pueden usar técnicas aprendidas para uso personal

**Contenido del Participante:**
• Al participar, otorga permiso para usar testimonios y fotos con fines promocionales
• Puede retirar este consentimiento en cualquier momento contactándonos`
        },
        liability: {
          title: "10. Limitación de Responsabilidad",
          content: `**Limitaciones:**
• Free Voice Academy no es responsable de lesiones durante la participación
• No garantizamos resultados específicos de nuestros programas
• Nuestra responsabilidad se limita al costo del servicio contratado
• No somos responsables de gastos de viaje, alojamiento o pérdidas indirectas

**Exenciones:**
• Los participantes asumen la responsabilidad de su participación
• Se recomienda encarecidamente un seguro de viaje personal
• Estas limitaciones se aplican en la medida permitida por la ley española`
        },
        privacy: {
          title: "11. Privacidad y Protección de Datos",
          content: `• El tratamiento de datos personales se rige por nuestra Política de Privacidad
• Cumplimos con el RGPD y la legislación española de protección de datos
• Los datos se utilizan únicamente para proporcionar servicios y comunicación relacionada
• Puede ejercer sus derechos de protección de datos contactándonos

Ver nuestra Política de Privacidad completa para más detalles.`
        },
        modifications: {
          title: "12. Modificaciones de los Términos",
          content: `• Nos reservamos el derecho de modificar estos términos en cualquier momento
• Los cambios se publicarán en nuestro sitio web con fecha de actualización
• El uso continuado de nuestros servicios constituye aceptación de los términos modificados
• Los cambios significativos se comunicarán por email o WhatsApp cuando sea posible`
        },
        governing: {
          title: "13. Ley Aplicable y Jurisdicción",
          content: `• Estos términos se rigen por las leyes de España
• Cualquier disputa se resolverá en los tribunales competentes de Tenerife, España
• Se intentará resolver disputas mediante mediación antes de proceder legalmente
• Los términos se interpretan de acuerdo con la legislación española de protección al consumidor`
        },
        contact: {
          title: "14. Contacto",
          content: `Para preguntas sobre estos Términos y Condiciones:

**Free Voice Academy**
📧 Email: info@freevoice.es
📱 WhatsApp: +34 697 78 89 91
📍 Ubicación: Tenerife, España

Horario de atención: Lunes a Viernes, 9:00 - 18:00 CET
Tiempo de respuesta típico: 24-48 horas`
        }
      }
    },
    it: {
      title: "Termini e Condizioni",
      lastUpdated: "Ultimo aggiornamento: 15 gennaio 2025",
      backToHome: "Torna alla Home",
      sections: {
        intro: {
          title: "1. Introduzione",
          content: `Benvenuti a Free Voice Academy. Questi Termini e Condizioni ("Termini") regolano l'uso del nostro sito web freevoice.es e i servizi di coaching vocale che offriamo a Tenerife, Spagna.

Accedendo al nostro sito web o utilizzando i nostri servizi, accettate di essere vincolati da questi Termini. Se non siete d'accordo con qualsiasi parte di questi termini, non dovreste utilizzare i nostri servizi.`
        },
        company: {
          title: "2. Informazioni sull'Azienda",
          content: `**Free Voice Academy**
Ubicazione: Tenerife, Spagna
Email: info@freevoice.es
Telefono: +34 697 78 89 91

Siamo un'accademia di coaching vocale specializzata in workshop immersivi e trasformazione personale attraverso il potere della voce.`
        },
        services: {
          title: "3. Descrizione dei Servizi",
          content: `Offriamo i seguenti servizi:

• **Workshop di 1 Giorno (€50)**: Introduzione al coaching vocale con tecniche base di respirazione e canto
• **Workshop di 3 Giorni (€180)**: Esperienza completa che include coaching vocale, lavoro corporeo, orientamento nutrizionale e accesso al gruppo privato WhatsApp
• **Follow-up Post-Workshop**: Supporto continuo attraverso il nostro gruppo privato WhatsApp
• **Certificati di Partecipazione**: Per workshop completati

Tutti i workshop si svolgono nelle nostre strutture a Tenerife con coach professionali certificati.`
        },
        booking: {
          title: "4. Prenotazioni e Pagamenti",
          content: `**Processo di Prenotazione:**
• Le prenotazioni si effettuano principalmente tramite WhatsApp (+34 697 78 89 91)
• È richiesta conferma scritta per tutte le prenotazioni
• I posti sono limitati e assegnati in ordine di arrivo

**Politica di Pagamento:**
• Il pagamento completo è richiesto per confermare la prenotazione
• Accettiamo bonifici bancari e altri metodi concordati
• I prezzi sono in euro (€) e includono IVA quando applicabile
• I prezzi possono cambiare senza preavviso per prenotazioni future`
        },
        cancellation: {
          title: "5. Politica di Cancellazione e Rimborsi",
          content: `**Cancellazioni da parte del Cliente:**
• **30+ giorni prima**: Rimborso completo (100%)
• **15-29 giorni prima**: Rimborso del 50%
• **Meno di 14 giorni**: Nessun rimborso disponibile

**Cancellazioni da parte di Free Voice Academy:**
• In caso di cancellazione da parte nostra, sarà offerto rimborso completo o riprogrammazione
• Non siamo responsabili per spese di viaggio o alloggio in caso di cancellazione

**Circostanze Eccezionali:**
• Casi di forza maggiore (clima estremo, emergenze di salute pubblica) saranno valutati individualmente`
        },
        conduct: {
          title: "6. Codice di Condotta",
          content: `I partecipanti devono:

• Trattare tutti i partecipanti e lo staff con rispetto
• Arrivare puntualmente a tutte le sessioni
• Partecipare attivamente e in modo costruttivo
• Mantenere la riservatezza degli altri partecipanti
• Seguire le istruzioni di sicurezza e benessere

**Comportamenti Proibiti:**
• Condotta dirompente o irrispettosa
• Uso di sostanze illegali
• Registrazione non autorizzata delle sessioni
• Condivisione di informazioni personali di altri partecipanti

Ci riserviamo il diritto di espellere partecipanti che violano queste norme senza rimborso.`
        },
        health: {
          title: "7. Considerazioni di Salute e Sicurezza",
          content: `**Responsabilità del Partecipante:**
• Informare su qualsiasi condizione medica rilevante
• Notificare allergie alimentari o restrizioni dietetiche
• Partecipare entro i propri limiti fisici
• Seguire le raccomandazioni di sicurezza dell'istruttore

**Limitazioni:**
• I nostri servizi non sostituiscono il trattamento medico professionale
• I partecipanti partecipano a proprio rischio
• Si raccomanda di consultare un medico prima di partecipare se si hanno condizioni di salute preesistenti`
        },
        whatsapp: {
          title: "8. Uso di WhatsApp",
          content: `**Comunicazione Principale:**
• WhatsApp è il nostro metodo di comunicazione preferito
• Contattandoci tramite WhatsApp, accettate i termini di servizio di WhatsApp
• Le conversazioni possono includere informazioni su servizi, orari e follow-up

**Gruppo Privato WhatsApp:**
• Incluso nel Workshop di 3 Giorni
• Fornisce follow-up continuo e supporto della comunità
• I partecipanti devono mantenere rispetto e riservatezza
• Ci riserviamo il diritto di rimuovere partecipanti che violano le norme del gruppo`
        },
        intellectual: {
          title: "9. Proprietà Intellettuale",
          content: `**Contenuto di Free Voice Academy:**
• Tutti i materiali, metodi e contenuti sono proprietà di Free Voice Academy
• Vietata la riproduzione, distribuzione o uso commerciale senza autorizzazione scritta
• I partecipanti possono usare le tecniche apprese per uso personale

**Contenuto del Partecipante:**
• Partecipando, concedete il permesso di usare testimonianze e foto per scopi promozionali
• Potete ritirare questo consenso in qualsiasi momento contattandoci`
        },
        liability: {
          title: "10. Limitazione di Responsabilità",
          content: `**Limitazioni:**
• Free Voice Academy non è responsabile per lesioni durante la partecipazione
• Non garantiamo risultati specifici dai nostri programmi
• La nostra responsabilità è limitata al costo del servizio contrattato
• Non siamo responsabili per spese di viaggio, alloggio o perdite indirette

**Esenzioni:**
• I partecipanti assumono la responsabilità della loro partecipazione
• È fortemente raccomandata un'assicurazione di viaggio personale
• Queste limitazioni si applicano nella misura consentita dalla legge spagnola`
        },
        privacy: {
          title: "11. Privacy e Protezione dei Dati",
          content: `• Il trattamento dei dati personali è regolato dalla nostra Politica sulla Privacy
• Rispettiamo il GDPR e la legislazione spagnola sulla protezione dei dati
• I dati sono utilizzati solo per fornire servizi e comunicazioni correlate
• Potete esercitare i vostri diritti di protezione dei dati contattandoci

Vedere la nostra Politica sulla Privacy completa per maggiori dettagli.`
        },
        modifications: {
          title: "12. Modifiche ai Termini",
          content: `• Ci riserviamo il diritto di modificare questi termini in qualsiasi momento
• I cambiamenti saranno pubblicati sul nostro sito web con data di aggiornamento
• L'uso continuato dei nostri servizi costituisce accettazione dei termini modificati
• I cambiamenti significativi saranno comunicati via email o WhatsApp quando possibile`
        },
        governing: {
          title: "13. Legge Applicabile e Giurisdizione",
          content: `• Questi termini sono regolati dalle leggi della Spagna
• Qualsiasi disputa sarà risolta nei tribunali competenti di Tenerife, Spagna
• Si tenterà di risolvere le dispute tramite mediazione prima di procedere legalmente
• I termini sono interpretati secondo la legislazione spagnola di protezione del consumatore`
        },
        contact: {
          title: "14. Contatto",
          content: `Per domande su questi Termini e Condizioni:

**Free Voice Academy**
📧 Email: info@freevoice.es
📱 WhatsApp: +34 697 78 89 91
📍 Ubicazione: Tenerife, Spagna

Orario di servizio: Lunedì a Venerdì, 9:00 - 18:00 CET
Tempo di risposta tipico: 24-48 ore`
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
                  {key === 'services' && <FileText className="w-5 h-5" />}
                  {key === 'cancellation' && <AlertTriangle className="w-5 h-5" />}
                  {key === 'liability' && <Scale className="w-5 h-5" />}
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