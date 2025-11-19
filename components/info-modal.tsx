"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function InfoModal({ children }: { children?: React.ReactNode }) {
  const { t, language } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white transition-all duration-300 border border-white/30"
          >
            <Info className="h-5 w-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white border-[#3C318D]/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F02A30]/5 via-[#9852A7]/5 to-[#3C318D]/5 rounded-lg"></div>
        <div className="relative z-10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#F02A30] to-[#3C318D] bg-clip-text text-transparent">
              {t.infoModal.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4 text-[#3C318D]">
            {/* Full PDF Content - Complete workshop information */}
            <div className="prose prose-sm max-w-none">
              {language === "es" ? (
                <div>
                  <h3 className="text-xl font-bold text-[#F02A30] mb-4">Workshop de Canto en Tenerife</h3>
                  <p className="text-lg font-semibold text-[#9852A7] mb-4">Voz y Crecimiento Personal</p>
                  <p className="mb-4 text-base leading-relaxed italic text-[#3C318D]">
                    Una experiencia transformadora entre escucha, expresión y libertad interior
                  </p>

                  <div className="bg-gradient-to-r from-[#F02A30]/10 to-[#9852A7]/10 p-5 rounded-lg mb-6 border-l-4 border-[#F02A30]">
                    <h4 className="font-bold text-[#3C318D] text-lg mb-3">Tu voz habla de ti</h4>
                    <p className="text-sm leading-relaxed mb-3">
                      El sonido que emites es único, un conjunto de tu experiencia vivida en cada matiz. 
                      Hay quienes capturan estos matices y comprenden su origen, para ayudarte a potenciar, 
                      mejorar y desarrollar lo que inconscientemente refleja tu vida.
                    </p>
                    <p className="text-sm leading-relaxed font-semibold">
                      Descubre la fuerza de tu voz auténtica a través de un nuevo enfoque que integra consciencia 
                      corporal, equilibrio interior, respiración consciente, unido a la técnica, para obtener un 
                      resultado evidente desde el primer workshop y la primera lección.
                    </p>
                  </div>

                  <h4 className="font-bold text-[#9852A7] mt-6 mb-3 text-lg">🎯 Un viaje entre escucha, expresión y transformación</h4>
                  <p className="mb-4 leading-relaxed">
                    El Workshop de Canto en Tenerife nace con la intención de acompañar a los participantes en un 
                    camino de crecimiento integral, donde la voz se convierte en el medio para explorarse a sí mismos, 
                    superar los miedos y liberarse de hábitos limitantes, reforzar la autoestima y el amor propio, 
                    valores éticos y la responsabilidad de la palabra.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    A través de disciplinas complementarias como diálogo, confrontación, psicología, postura, coaching 
                    espiritual, danza, actuación y vocal coaching, los expertos guiarán un proceso de redescubrimiento 
                    personal profundo y regenerador.
                  </p>
                  <div className="bg-white/80 p-4 rounded-lg border border-[#9852A7]/20 mb-4">
                    <p className="font-semibold text-[#3C318D] mb-2">🎯 El objetivo</p>
                    <p className="text-sm">
                      Potenciar tu potencial expresivo, aprendiendo a reconocer y utilizar la voz como instrumento 
                      de libertad, equilibrio y energía creativa.
                    </p>
                  </div>

                  <h4 className="font-bold text-[#9852A7] mt-6 mb-3 text-lg">🎯 Objetivos del Workshop</h4>
                  <p className="mb-3 text-sm">El camino está estructurado para ofrecer una experiencia completa de crecimiento personal y artístico:</p>
                  <ul className="list-none space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">•</span>
                      <span>Superar los bloqueos mentales y emocionales que obstaculizan una expresión auténtica y natural</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">•</span>
                      <span>Mejorar el uso de la voz y el cuerpo a través de mayor consciencia postural y dominio técnico</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">•</span>
                      <span>Potenciar la performance en todas sus dimensiones: voz, actuación, movimiento y equilibrio emocional</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">•</span>
                      <span>Proporcionar herramientas concretas para afrontar miedos y límites interiores</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">•</span>
                      <span>Integrar espiritualidad y consciencia para mejorar el bienestar mental</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">•</span>
                      <span>Introducir a los artistas al mundo del trabajo apoyándolos</span>
                    </li>
                  </ul>

                  <h4 className="font-bold text-[#9852A7] mt-6 mb-3 text-lg">✨ Qué esperar del workshop</h4>
                  <p className="mb-3 text-sm">Durante el workshop, cada experto guiará sesiones prácticas, ejercicios individuales y momentos de reflexión colectiva.</p>
                  <p className="mb-3 text-sm font-semibold">Será una experiencia inmersiva y participativa que permitirá:</p>
                  <ul className="list-none space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">✓</span>
                      <span className="text-sm">Experimentar el vínculo entre postura, respiración y voz</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">✓</span>
                      <span className="text-sm">Liberar emociones y tensiones físicas que limitan la expresión</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">✓</span>
                      <span className="text-sm">Fortalecer la presencia escénica y la consciencia corporal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">✓</span>
                      <span className="text-sm">Utilizar la voz con mayor libertad, intensidad y precisión</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">✓</span>
                      <span className="text-sm">Afrontar miedos y bloqueos interiores a través de un trabajo directo y transformador</span>
                    </li>
                  </ul>
                  <div className="bg-gradient-to-r from-[#9852A7]/10 to-[#3C318D]/10 p-4 rounded-lg mb-4">
                    <p className="text-sm italic">
                      El grupo trabajará en la sugestiva "magia del círculo", un contexto que favorece el compartir, 
                      la empatía y la escucha recíproca. Al mismo tiempo, cada participante recibirá atención individual, 
                      reconocido en su propia unicidad e irrepetibilidad.
                    </p>
                  </div>

                  <h4 className="font-bold text-[#9852A7] mt-6 mb-3 text-lg">🌟 Programa personalizado</h4>
                  <div className="bg-white/80 p-4 rounded-lg border border-[#9852A7]/20 mb-4">
                    <p className="text-sm mb-2">
                      <strong>Cada persona disfrutará de un programa personalizado, que se aplicará también al grupo.</strong>
                    </p>
                    <p className="text-sm">
                      Perfeccionamos el bienestar de tu voz: no solo canto, sino un camino de crecimiento personal para 
                      mejorar cada aspecto de la comunicación y de la vida, que se refleja en cualquier trabajo.
                    </p>
                  </div>
                  <p className="text-sm mb-4 italic">
                    Responsabilizando el diálogo y la importancia de la entonación, del modo y del color en el intercambio humano.
                  </p>

                  <h4 className="font-bold text-[#9852A7] mt-6 mb-3 text-lg">🎓 Los expertos que te guiarán</h4>
                  <div className="space-y-3 mb-4">
                    <div className="bg-white/80 p-4 rounded-lg border border-[#9852A7]/20">
                      <p className="font-bold text-[#3C318D] mb-2 text-base">JENNY ROSPO</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Cantante profesional que pone a disposición su experiencia y estudios para ayudar al futuro artista 
                        en la búsqueda de su propio potencial, crear una imagen e individualizar la originalidad del color vocal. 
                        Diplomada C.E.T., Jenny enfoca su enseñanza en la interpretación, trabajando sobre el aspecto técnico 
                        personal y único, sobre la respiración consciente y sobre la gestión de las emociones a través de la 
                        expresión vocal. El objetivo es ayudar al artista a vivir plenamente su propio arte sin miedos, con 
                        consciencia y alegría, divulgando su propio don con amor y pasión.
                      </p>
                    </div>
                    <div className="bg-white/80 p-4 rounded-lg border border-[#9852A7]/20">
                      <p className="font-bold text-[#3C318D] mb-2 text-base">LAURA MONZA</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Experta en crecimiento personal y espiritual, ofrecerá herramientas prácticas para el bienestar mental 
                        y emocional. A través de momentos de introspección y consciencia, acompañará a los participantes hacia 
                        una mayor autoeficacia, presencia escénica y conexión interior.
                      </p>
                    </div>
                    <div className="bg-white/80 p-4 rounded-lg border border-[#9852A7]/20">
                      <p className="font-bold text-[#3C318D] mb-2 text-base">MARIAN GIRAL VEGA</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Profesional del movimiento y de la danza, guiará un camino de exploración corporal, mostrando cómo 
                        el cuerpo y la música pueden fundirse para liberar la voz y amplificar la fuerza expresiva. Su trabajo 
                        ayudará a reencontrar armonía entre gesto, respiración y canto.
                      </p>
                    </div>
                    <div className="bg-white/80 p-4 rounded-lg border border-[#9852A7]/20">
                      <p className="font-bold text-[#3C318D] mb-2 text-base">DAVID CARDANO</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Psicólogo y performer, profundizará el vínculo entre mente y performance. Analizará cómo emociones, 
                        bloqueos psicológicos y postura influyen en la capacidad de expresarse libremente. Conducirá ejercicios 
                        dirigidos para mejorar la respiración, la liberación vocal y la presencia corporal, elementos fundamentales 
                        para cada forma de expresión artística.
                      </p>
                    </div>
                  </div>

                  <h4 className="font-bold text-[#9852A7] mt-6 mb-3 text-lg">🎯 Por qué participar</h4>
                  <div className="bg-gradient-to-r from-[#F02A30]/10 to-[#9852A7]/10 p-4 rounded-lg mb-4">
                    <p className="text-sm leading-relaxed mb-3">
                      Este workshop representa una oportunidad preciosa para quien desea unir técnica, emoción y consciencia 
                      en un único camino formativo.
                    </p>
                    <p className="text-sm leading-relaxed mb-3">
                      Con el apoyo de profesionales provenientes de diversas disciplinas, será posible descubrir nuevas 
                      herramientas para expresarse con autenticidad, confianza y fuerza interior.
                    </p>
                    <p className="text-sm leading-relaxed font-semibold">
                      Una ocasión para reconectarse con la propia voz más profunda, despertar la creatividad y vivir una 
                      experiencia transformadora capaz de dejar una huella duradera en la vida personal y artística.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#F02A30]/20 to-[#9852A7]/20 p-5 rounded-lg mt-6 border-2 border-[#F02A30]/30">
                    <p className="font-bold text-[#3C318D] mb-3 text-center text-lg">📞 Déjate guiar, escucha tu voz y comienza a volar</p>
                    <p className="text-center mb-3 font-semibold">Tenerife te espera para un viaje de crecimiento, expresión y libertad</p>
                    <p className="text-center mb-2 text-sm">Contáctanos por WhatsApp para más información</p>
                    <p className="text-center font-bold text-[#F02A30] text-xl">+34 697 798 991</p>
                    <p className="text-center text-sm mt-3 text-gray-600">Respuesta en menos de 1 hora • Plazas limitadas</p>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-[#F02A30] mb-4">Workshop di Canto a Tenerife</h3>
                  <p className="text-lg font-semibold text-[#9852A7] mb-4">Voce e Crescita Personale</p>
                  <p className="mb-4 text-base leading-relaxed italic text-[#3C318D]">
                    Un'esperienza trasformativa tra ascolto, espressione e libertà interiore
                  </p>

                  <div className="bg-gradient-to-r from-[#F02A30]/10 to-[#9852A7]/10 p-5 rounded-lg mb-6 border-l-4 border-[#F02A30]">
                    <h4 className="font-bold text-[#3C318D] text-lg mb-3">La tua voce racconta di te</h4>
                    <p className="text-sm leading-relaxed mb-3">
                      Il suono che emetti è unico, un insieme del tuo vissuto in ogni sfumatura. C'è chi cattura queste 
                      coloriture e ne comprende l'origine, così da poterti aiutare a potenziare, migliorare e sviluppare 
                      ciò che inconsciamente riflette la tua vita.
                    </p>
                    <p className="text-sm leading-relaxed font-semibold">
                      Scopri la forza della tua voce autentica attraverso un nuovo approccio che integra consapevolezza 
                      corporea, equilibrio interiore, respirazione cosciente, unito alla tecnica, per ottenere un risultato 
                      evidente dal primo workshop e dalla prima lezione.
                    </p>
                  </div>

                  <h4 className="font-bold text-[#9852A7] mt-6 mb-3 text-lg">🎯 Un viaggio tra ascolto, espressione e trasformazione</h4>
                  <p className="mb-4 leading-relaxed">
                    Il Workshop di Canto a Tenerife nasce con l'intento di accompagnare i partecipanti in un percorso 
                    di crescita integrale, dove la voce diventa il mezzo per esplorare sé stessi, superare le paure e 
                    liberarsi dalle abitudini limitanti, rafforzare autostima e amor proprio, valori etici e responsabilità 
                    della parola.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    Attraverso discipline complementari come dialogo, confronto, psicologia, postura, coaching spirituale, 
                    danza, recitazione e vocal coaching, gli esperti guideranno un processo di riscoperta personale 
                    profondo e rigenerante.
                  </p>
                  <div className="bg-white/80 p-4 rounded-lg border border-[#9852A7]/20 mb-4">
                    <p className="font-semibold text-[#3C318D] mb-2">🎯 L'obiettivo</p>
                    <p className="text-sm">
                      Potenziare il proprio potenziale espressivo, imparando a riconoscere e utilizzare la voce come 
                      strumento di libertà, equilibrio ed energia creativa.
                    </p>
                  </div>

                  <h4 className="font-bold text-[#9852A7] mt-6 mb-3 text-lg">🎯 Obiettivi del Workshop</h4>
                  <p className="mb-3 text-sm">Il percorso è strutturato per offrire un'esperienza completa di crescita personale e artistica:</p>
                  <ul className="list-none space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">•</span>
                      <span>Superare i blocchi mentali ed emotivi che ostacolano un'espressione autentica e naturale</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">•</span>
                      <span>Migliorare l'uso della voce e del corpo attraverso una maggiore consapevolezza posturale e padronanza tecnica</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">•</span>
                      <span>Potenziare la performance in tutte le sue dimensioni: voce, recitazione, movimento ed equilibrio emotivo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">•</span>
                      <span>Fornire strumenti concreti per affrontare paure e limiti interiori</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">•</span>
                      <span>Integrare spiritualità e consapevolezza per migliorare il benessere mentale</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">•</span>
                      <span>Introdurre gli artisti al mondo del lavoro supportandoli</span>
                    </li>
                  </ul>

                  <h4 className="font-bold text-[#9852A7] mt-6 mb-3 text-lg">✨ Cosa aspettarti</h4>
                  <p className="mb-3 text-sm">Durante il workshop, ogni esperto guiderà sessioni pratiche, esercizi individuali e momenti di riflessione collettiva.</p>
                  <p className="mb-3 text-sm font-semibold">Sarà un'esperienza immersiva e partecipativa che permetterà di:</p>
                  <ul className="list-none space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">✓</span>
                      <span className="text-sm">Sperimentare il legame tra postura, respirazione e voce</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">✓</span>
                      <span className="text-sm">Liberare emozioni e tensioni fisiche che limitano l'espressione</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">✓</span>
                      <span className="text-sm">Rafforzare la presenza scenica e la consapevolezza corporea</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">✓</span>
                      <span className="text-sm">Utilizzare la voce con maggiore libertà, intensità e precisione</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#F02A30] mr-2">✓</span>
                      <span className="text-sm">Affrontare paure e blocchi interiori attraverso un lavoro diretto e trasformativo</span>
                    </li>
                  </ul>
                  <div className="bg-gradient-to-r from-[#9852A7]/10 to-[#3C318D]/10 p-4 rounded-lg mb-4">
                    <p className="text-sm italic">
                      Il gruppo lavorerà nella suggestiva "magia del cerchio", un contesto che favorisce condivisione, 
                      empatia e ascolto reciproco. Allo stesso tempo, ogni partecipante riceverà un'attenzione individuale, 
                      riconosciuto nella propria unicità e irripetibilità.
                    </p>
                  </div>

                  <h4 className="font-bold text-[#9852A7] mt-6 mb-3 text-lg">🌟 Programma personalizzato</h4>
                  <div className="bg-white/80 p-4 rounded-lg border border-[#9852A7]/20 mb-4">
                    <p className="text-sm mb-2">
                      <strong>Ogni persona usufruirà di un programma personalizzato, che si applicherà anche al gruppo.</strong>
                    </p>
                    <p className="text-sm">
                      Perfezioniamo il benessere della tua voce: non solo canto, ma un percorso di crescita personale per 
                      migliorare ogni aspetto della comunicazione e della vita, che si riflette in qualsiasi lavoro.
                    </p>
                  </div>
                  <p className="text-sm mb-4 italic">
                    Responsabilizzando il dialogo e l'importanza dell'intonazione, del modo e del colore nell'interscambio umano.
                  </p>

                  <h4 className="font-bold text-[#9852A7] mt-6 mb-3 text-lg">🎓 Gli esperti che ti guideranno</h4>
                  <div className="space-y-3 mb-4">
                    <div className="bg-white/80 p-4 rounded-lg border border-[#9852A7]/20">
                      <p className="font-bold text-[#3C318D] mb-2 text-base">JENNY ROSPO</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Cantante professionista mette a disposizione la sua esperienza e i suoi studi per aiutare il futuro 
                        artista, nella ricerca del proprio potenziale, creare un'immagine e individuare l'originalità del 
                        colore vocale. Diplomata C.E.T., Jenny focalizza il suo insegnamento sull'interpretazione, lavorando 
                        sull'aspetto tecnico personale e unico, sulla respirazione cosciente e sulla gestione delle emozioni 
                        attraverso l'espressione vocale. L'obiettivo è aiutare l'artista a vivere a pieno la propria arte 
                        senza paure, con consapevolezza e allegria, divulgando il proprio dono con amore e passione.
                      </p>
                    </div>
                    <div className="bg-white/80 p-4 rounded-lg border border-[#9852A7]/20">
                      <p className="font-bold text-[#3C318D] mb-2 text-base">LAURA MONZA</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Esperta in crescita personale e spirituale, offrirà strumenti pratici per il benessere mentale ed 
                        emotivo. Attraverso momenti di introspezione e consapevolezza, accompagnerà i partecipanti verso 
                        una maggiore autoefficacia, presenza scenica e connessione interiore.
                      </p>
                    </div>
                    <div className="bg-white/80 p-4 rounded-lg border border-[#9852A7]/20">
                      <p className="font-bold text-[#3C318D] mb-2 text-base">MARIAN GIRAL VEGA</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Professionista del movimento e della danza, guiderà un percorso di esplorazione corporea, mostrando 
                        come il corpo e la musica possano fondersi per liberare la voce e amplificare la forza espressiva. 
                        Il suo lavoro aiuterà a ritrovare armonia tra gesto, respiro e canto.
                      </p>
                    </div>
                    <div className="bg-white/80 p-4 rounded-lg border border-[#9852A7]/20">
                      <p className="font-bold text-[#3C318D] mb-2 text-base">DAVID CARDANO</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Psicologo e performer, approfondirà il legame tra mente e performance. Analizzerà come emozioni, 
                        blocchi psicologici e postura influenzino la capacità di esprimersi liberamente. Condurrà esercizi 
                        mirati per migliorare la respirazione, il rilascio vocale e la presenza corporea, elementi fondamentali 
                        per ogni forma di espressione artistica.
                      </p>
                    </div>
                  </div>

                  <h4 className="font-bold text-[#9852A7] mt-6 mb-3 text-lg">🎯 Perché partecipare</h4>
                  <div className="bg-gradient-to-r from-[#F02A30]/10 to-[#9852A7]/10 p-4 rounded-lg mb-4">
                    <p className="text-sm leading-relaxed mb-3">
                      Questo workshop rappresenta un'opportunità preziosa per chi desidera unire tecnica, emozione e 
                      consapevolezza in un unico percorso formativo.
                    </p>
                    <p className="text-sm leading-relaxed mb-3">
                      Con il supporto di professionisti provenienti da diverse discipline, sarà possibile scoprire nuovi 
                      strumenti per esprimersi con autenticità, fiducia e forza interiore.
                    </p>
                    <p className="text-sm leading-relaxed font-semibold">
                      Un'occasione per riconnettersi con la propria voce più profonda, risvegliare la creatività e vivere 
                      un'esperienza trasformativa capace di lasciare un segno duraturo nella vita personale e artistica.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#F02A30]/20 to-[#9852A7]/20 p-5 rounded-lg mt-6 border-2 border-[#F02A30]/30">
                    <p className="font-bold text-[#3C318D] mb-3 text-center text-lg">📞 Lasciati guidare, ascolta la tua voce e inizia a volare</p>
                    <p className="text-center mb-3 font-semibold">Tenerife ti aspetta per un viaggio di crescita, espressione e libertà</p>
                    <p className="text-center mb-2 text-sm">Contattaci su WhatsApp per maggiori informazioni</p>
                    <p className="text-center font-bold text-[#F02A30] text-xl">+34 697 798 991</p>
                    <p className="text-center text-sm mt-3 text-gray-600">Risposta in meno di 1 ora • Posti limitati</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
