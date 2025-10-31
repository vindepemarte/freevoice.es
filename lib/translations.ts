export const translations = {
  es: {
    // Navigation
    nav: {
      home: "Home",
      about: "Chi Siamo",
      workshops: "Workshop",
      testimonials: "Testimonianze",
      contact: "Contatto",
      bookNow: "Prenota Ora"
    },
    // Navigation Info Modal
    infoModal: {
      title: "Información del Workshop",
      content: "Contenido del PDF de información aquí" // Will be updated with actual PDF content
    },
    // Hero Section
    hero: {
      badge: "Academia de Coaching Vocal #1",
      title: "Transforma Tu Voz, Transforma Tu Vida",
      subtitle: "Descubre el poder de tu voz auténtica con nuestro enfoque holístico que combina técnicas vocales avanzadas, trabajo corporal y orientación nutricional personalizada.",
      cta: "Reserva Tu Plaza",
      secondaryCta: "Más Información",
      socialProof: {
        students: "200+ Estudiantes",
        rating: "4.9/5 Valoración",
        satisfaction: "98% Satisfacción"
      },
      bookSpot: "Reserva Tu Lugar Ahora",
      scheduleCall: "Hablar por WhatsApp",
      rating: "4.9/5 de más de 200 estudiantes",
      nextRetreat: "Próximo workshop:", // Dynamic date will be appended
      spotsLeft: "¡Solo 3 lugares disponibles!",
      urgentBooking: "RESERVA AHORA - ÚLTIMOS LUGARES",
      whatsappMessage: "¡Hola! Quiero más información sobre el workshop Free Voice. ¿Quedan lugares disponibles?"
    },
    // Features
    features: {
      title: "¿Por Qué Elegir Free Voice Academy?",
      subtitle:
        "Nuestro enfoque holístico único combina coaching vocal, trabajo corporal y nutrición en una experiencia de retiro inmersiva que transforma vidas.",
      vocal: {
        title: "Coaching Vocal Personalizado",
        description:
          "Sesiones individuales con coaches expertos para desarrollar tu voz única y superar desafíos vocales.",
      },
      body: {
        title: "Trabajo Corporal y Bienestar",
        description:
          "Integra el bienestar físico con el entrenamiento vocal a través de ejercicios de respiración y técnicas de alineación corporal.",
      },
      nutrition: {
        title: "Orientación Nutricional",
        description:
          "Aprende cómo la nutrición adecuada apoya la salud vocal y el rendimiento general con planes de comidas personalizados.",
      },
      community: {
        title: "Experiencia Inmersiva de 3 Días",
        description:
          "Quédate en nuestro hermoso centro de retiro con alojamiento completo, comidas y soporte 24/7 incluido.",
      },
    },
    // Coaches
    coaches: {
      title: "Conoce a Nuestros 4 Coaches Expertos",
      subtitle: "Aprende de profesionales experimentados dedicados a tu transformación vocal",
    },
    // Testimonials
    testimonials: {
      title: "Lo Que Dicen Nuestros Estudiantes",
      subtitle: "Descubre cómo nuestro enfoque holístico ha transformado las voces y vidas de más de 200 estudiantes",
      testimonial1: {
        text: "El workshop cambió completamente mi relación con mi voz. No solo mejoré técnicamente, sino que también gané confianza en mí misma.",
        author: "María González",
        role: "Cantante"
      },
      testimonial2: {
        text: "La combinación de técnica vocal, trabajo corporal y nutrición fue reveladora. Ahora entiendo mi voz de una manera completamente nueva.",
        author: "Carlos Ruiz",
        role: "Actor"
      },
      testimonial3: {
        text: "Los coaches son increíbles. Su enfoque personalizado me ayudó a superar bloqueos que tenía desde hace años.",
        author: "Ana Martín",
        role: "Profesora"
      }
    },
    // Pricing
    pricing: {
      title: "Workshop de Transformación Vocal",
      subtitle:
        "Experiencia inmersiva de un día completo. Incluye acceso al grupo privado WhatsApp para seguimiento continuo.",
      workshop1Day: {
        name: "Workshop de 1 Día - Octubre",
        price: "€90",
        period: "experiencia de 8 horas",
        duration: "10:00 - 18:00",
        // Note: date is now dynamically loaded from database
        location: "Healing Garden, Guía de Isora", 
        instructors: "Jenny Rospo & Marian Giral Vega",
        description: "Experiencia inmersiva de 8 horas para descubrir tu voz auténtica a través de técnicas vocales, trabajo corporal y respiración",
        features: [
          "Trabajo vocal intensivo",
          "Técnicas de respiración avanzadas",
          "Ejercicios de movimiento corporal",
          "Conexión con la naturaleza",
          "Pausa para el almuerzo incluida",
          "Ambiente de apoyo y seguro",
          "Experiencia transformadora grupal",
          "Acceso al grupo privado de WhatsApp"
        ],
        fullDetails: {
          schedule: {
            "09:30": "Llegada y bienvenida",
            "10:00": "Comienzo de la actividad", 
            "13:00 - 14:00": "Pausa para el almuerzo",
            "18:30": "Círculo de cierre"
          },
          whatToBring: [
            "Ropa cómoda",
            "Cuaderno", 
            "Agua/infusión de hierbas",
            "Comida ligera y saludable"
          ],
          policies: [
            "Teléfonos en modo silencioso durante las actividades",
            "Plazas limitadas - se recomienda reserva"
          ]
        }
      },
      included: "¿Qué Incluye el Workshop?",
      nextRetreat: "Próximo workshop:", // Dynamic date will be appended
      spotsLeft: "¡Plazas limitadas disponibles!",
    },
    // FAQ
    faq: {
      title: "Preguntas Frecuentes",
      items: [
        {
          question: "¿Qué incluye el workshop?",
          answer: "Nuestros workshops incluyen técnicas de respiración, ejercicios vocales, trabajo corporal y orientación nutricional personalizada."
        },
        {
          question: "¿Necesito experiencia previa?",
          answer: "No, nuestros workshops están diseñados para todos los niveles, desde principiantes hasta cantantes con experiencia."
        },
        {
          question: "¿Qué debo traer?",
          answer: "Solo necesitas ropa cómoda para el trabajo corporal y ganas de aprender. Nosotros proporcionamos todo el material necesario."
        },
        {
          question: "¿Hay seguimiento después del workshop?",
          answer: "Sí, incluimos acceso a nuestro grupo privado de WhatsApp y seguimiento personalizado para continuar tu progreso."
        }
      ]
    },
    // CTA
    cta: {
      title: "¿Listo para Transformar Tu Voz?",
      subtitle:
        "Únete a cientos de estudiantes que han descubierto su voz auténtica y transformado sus vidas. Tu viaje hacia la libertad vocal comienza aquí.",
      bookSpot: "Reserva Tu Lugar Ahora",
      scheduleCall: "Programar una Llamada",
      limited: "Lugares limitados disponibles • Próximo workshop: TBD", // Date will be dynamic
      happyStudents: "Estudiantes Felices",
      averageRating: "Calificación Promedio",
      daysMaxExperience: "Días Máx Experiencia",
    },
    // Footer
    footer: {
      brand: "Free Voice",
      description:
        "Transformando vidas a través del poder de la voz. Únete a nuestra comunidad de cantantes apasionados y descubre tu sonido auténtico.",
      quickLinks: "Enlaces Rápidos",
      programs: "Programas",
      contact: "Contáctanos",
      retreat3Day: "Retiro de 3 Días",
      onlineCoaching: "Coaching Online",
      groupWorkshops: "Talleres Grupales",
      privateSessions: "Sesiones Privadas",
      corporateTraining: "Formación Corporativa",
      privacyPolicy: "Política de Privacidad",
      termsOfService: "Términos de Servicio",
      cookiePolicy: "Política de Cookies",
      rights: "© 2025 Free Voice Academy. Todos los derechos reservados.",
    },
    // Common
    common: {
      book: "Reservar",
      learnMore: "Saber Más",
      getStarted: "Comenzar",
      happyStudents: "Estudiantes Felices",
      averageRating: "Calificación Promedio",
      dayExperience: "Días Máx Experiencia",
    },
  },
  it: {
    // Navigation
    nav: {
      home: "Home",
      features: "Caratteristiche",
      coaches: "Coach",
      testimonials: "Testimonianze",
      pricing: "Prezzi",
      faq: "FAQ",
      contact: "Contatto",
    },
    // Navigation Info Modal
    infoModal: {
      title: "Informazioni sul Workshop",
      content: "Contenuto del PDF di informazioni qui" // Will be updated with actual PDF content
    },
    // Hero Section
    hero: {
      badge: "Accademia di Coaching Vocale #1",
      title: "Trasforma la Tua Voce, Trasforma la Tua Vita",
      subtitle: "Scopri il potere della tua voce autentica con il nostro approccio olistico che combina tecniche vocali avanzate, lavoro corporeo e orientamento nutrizionale personalizzato.",
      cta: "Prenota il Tuo Posto",
      secondaryCta: "Maggiori Informazioni",
      socialProof: {
        students: "200+ Studenti",
        rating: "4.9/5 Valutazione",
        satisfaction: "98% Soddisfazione"
      },
      bookSpot: "Prenota Il Tuo Posto Ora",
      scheduleCall: "Parla su WhatsApp",
      rating: "4.9/5 da oltre 200 studenti",
      nextRetreat: "Prossimo workshop:", // Dynamic date will be appended
      spotsLeft: "Solo 3 posti disponibili!",
      urgentBooking: "PRENOTA ORA - ULTIMI POSTI",
      whatsappMessage: "Ciao! Voglio maggiori informazioni sul workshop Free Voice. Ci sono ancora posti disponibili?"
    },
    // Features
    features: {
      title: "Perché Scegliere Free Voice Academy?",
      subtitle:
        "Il nostro approccio olistico unico combina coaching vocale, lavoro corporeo e nutrizione in un'esperienza di ritiro immersiva che trasforma le vite.",
      vocal: {
        title: "Coaching Vocale Personalizzato",
        description:
          "Sessioni individuali con coach esperti per sviluppare la tua voce unica e superare le sfide vocali.",
      },
      body: {
        title: "Lavoro Corporeo e Benessere",
        description:
          "Integra il benessere fisico con l'allenamento vocale attraverso esercizi di respirazione e tecniche di allineamento corporeo.",
      },
      nutrition: {
        title: "Orientamento Nutrizionale",
        description:
          "Impara come la nutrizione adeguata supporta la salute vocale e le prestazioni generali con piani pasto personalizzati.",
      },
      community: {
        title: "Esperienza Immersiva di 3 Giorni",
        description:
          "Soggiorna nel nostro bellissimo centro ritiri con alloggio completo, pasti e supporto 24/7 incluso.",
      },
    },
    // Coaches
    coaches: {
      title: "Incontra I Nostri 4 Coach Esperti",
      subtitle: "Impara da professionisti esperti dedicati alla tua trasformazione vocale",
    },
    // Testimonials
    testimonials: {
      title: "Cosa Dicono I Nostri Studenti",
      subtitle: "Scopri come il nostro approccio olistico ha trasformato le voci e le vite di oltre 200 studenti",
      testimonial1: {
        text: "Il workshop ha cambiato completamente il mio rapporto con la mia voce. Non solo sono migliorata tecnicamente, ma ho anche acquisito fiducia in me stessa.",
        author: "María González",
        role: "Cantante"
      },
      testimonial2: {
        text: "La combinazione di tecnica vocale, lavoro corporeo e nutrizione è stata rivelante. Ora capisco la mia voce in un modo completamente nuovo.",
        author: "Carlos Ruiz",
        role: "Attore"
      },
      testimonial3: {
        text: "I coach sono incredibili. Il loro approccio personalizzato mi ha aiutato a superare blocchi che avevo da anni.",
        author: "Ana Martín",
        role: "Insegnante"
      }
    },
    // Pricing
    pricing: {
      title: "Workshop di Trasformazione Vocale",
      subtitle:
        "Esperienza immersiva di una giornata completa. Include accesso al gruppo privato WhatsApp per supporto continuo.",
      workshop1Day: {
        name: "Workshop di 1 Giorno - Ottobre",
        price: "€90",
        period: "esperienza di 8 ore",
        duration: "10:00 - 18:00",
        // Note: date is now dynamically loaded from database
        location: "Healing Garden, Guía de Isora",
        instructors: "Jenny Rospo & Marian Giral Vega",
        description: "Esperienza immersiva di 8 ore per scoprire la tua voce autentica attraverso tecniche vocali, lavoro corporeo e respirazione",
        features: [
          "Lavoro vocale intensivo",
          "Tecniche di respirazione avanzate",
          "Esercizi di movimento corporeo",
          "Connessione con la natura",
          "Pausa pranzo inclusa",
          "Ambiente supportivo e sicuro",
          "Esperienza trasformativa di gruppo",
          "Accesso al gruppo WhatsApp privato"
        ],
        fullDetails: {
          schedule: {
            "09:30": "Arrivo e accoglienza",
            "10:00": "Inizio attività",
            "13:00 - 14:00": "Pausa pranzo", 
            "18:30": "Cerchio di chiusura"
          },
          whatToBring: [
            "Abiti comodi",
            "Quaderno",
            "Acqua/tisane",
            "Pranzo leggero e sano"
          ],
          policies: [
            "Telefoni in modalità silenziosa durante le attività",
            "Posti limitati - prenotazione consigliata"
          ]
        }
      },
      included: "Cosa Include il Workshop?",
      nextRetreat: "Prossimo workshop:", // Dynamic date will be appended
      spotsLeft: "¡Posti limitati disponibili!",
    },
    // FAQ
    faq: {
      title: "Domande Frequenti",
      items: [
        {
          question: "Cosa include il workshop?",
          answer: "I nostri workshop includono tecniche di respirazione, esercizi vocali, lavoro corporeo e orientamento nutrizionale personalizzato."
        },
        {
          question: "Ho bisogno di esperienza precedente?",
          answer: "No, i nostri workshop sono progettati per tutti i livelli, dai principianti ai cantanti con esperienza."
        },
        {
          question: "Cosa devo portare?",
          answer: "Hai bisogno solo di vestiti comodi per il lavoro corporeo e voglia di imparare. Forniamo tutto il materiale necessario."
        },
        {
          question: "C'è un follow-up dopo il workshop?",
          answer: "Sì, includiamo l'accesso al nostro gruppo privato WhatsApp e follow-up personalizzato per continuare i tuoi progressi."
        }
      ]
    },
    // CTA
    cta: {
      title: "Pronto a Trasformare La Tua Voce?",
      subtitle:
        "Unisciti a centinaia di studenti che hanno scoperto la loro voce autentica e trasformato le loro vite. Il tuo viaggio verso la libertà vocale inizia qui.",
      bookSpot: "Prenota Il Tuo Posto Ora",
      scheduleCall: "Programma una Chiamata",
      limited: "Posti limitati disponibili • Prossimo workshop: TBD", // Date will be dynamic
      happyStudents: "Studenti Felici",
      averageRating: "Valutazione Media",
      daysMaxExperience: "Giorni Max Esperienza",
    },
    // Footer
    // Footer
    footer: {
      brand: "Free Voice",
      description:
        "Trasformando vite attraverso il potere della voce. Unisciti alla nostra comunità di cantanti appassionati e scopri il tuo suono autentico.",
      quickLinks: "Link Rapidi",
      programs: "Programmi",
      contact: "Contattaci",
      retreat3Day: "Ritiro di 3 Giorni",
      onlineCoaching: "Coaching Online",
      groupWorkshops: "Workshop di Gruppo",
      privateSessions: "Sessioni Private",
      corporateTraining: "Formazione Aziendale",
      privacyPolicy: "Politica sulla Privacy",
      termsOfService: "Termini di Servizio",
      cookiePolicy: "Politica sui Cookie",
      rights: "© 2025 Free Voice Academy. Tutti i diritti riservati.",
    },
    // Common
    common: {
      book: "Prenota",
      learnMore: "Scopri di Più",
      getStarted: "Inizia",
      happyStudents: "Studenti Felici",
      averageRating: "Valutazione Media",
      dayExperience: "Giorni Max Esperienza",
    },
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.es
