/**
 * Workshop date utilities for dynamic date display
 */

export interface Workshop {
  id: number
  title_it: string
  title_es: string
  description_it: string
  description_es: string
  price: number
  date: string
  location: string
  instructors: string
  max_participants: number
  is_active: boolean
  is_popular: boolean
}

/**
 * Get the next upcoming workshop from a list of workshops
 */
export function getNextUpcomingWorkshop(workshops: Workshop[]): Workshop | null {
  if (!workshops || workshops.length === 0) return null
  
  const now = new Date()
  now.setHours(0, 0, 0, 0) // Reset time to start of day for accurate comparison
  
  // Filter active workshops that are in the future
  const upcomingWorkshops = workshops
    .filter(workshop => workshop.is_active)
    .filter(workshop => {
      const workshopDate = new Date(workshop.date)
      workshopDate.setHours(0, 0, 0, 0)
      return workshopDate >= now
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  
  return upcomingWorkshops[0] || null
}

/**
 * Format workshop date for display
 */
export function formatWorkshopDateForDisplay(dateString: string, language: 'es' | 'it'): string {
  const date = new Date(dateString)
  
  if (language === 'es') {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ]
    return `${date.getDate()} de ${months[date.getMonth()]} ${date.getFullYear()}`
  } else {
    const months = [
      'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
      'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'
    ]
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }
}

/**
 * Get next workshop display text for hero section
 */
export function getNextWorkshopText(workshops: Workshop[], language: 'es' | 'it'): string {
  const nextWorkshop = getNextUpcomingWorkshop(workshops)
  
  if (!nextWorkshop) {
    // Fallback text when no workshops are available
    return language === 'es' 
      ? 'Próximo workshop: Por anunciar'
      : 'Prossimo workshop: Da annunciare'
  }
  
  const formattedDate = formatWorkshopDateForDisplay(nextWorkshop.date, language)
  
  return language === 'es'
    ? `Próximo workshop: ${formattedDate}`
    : `Prossimo workshop: ${formattedDate}`
}

/**
 * Fallback workshops for when database is not available
 */
export const getFallbackWorkshops = (language: 'es' | 'it'): Workshop[] => [
  {
    id: 1,
    title_it: 'Workshop di 1 Giorno - Ottobre',
    title_es: 'Taller de 1 Día - Octubre',
    description_it: 'Esperienza immersiva di 8 ore per scoprire la tua voce autentica attraverso tecniche vocali, lavoro corporeo e respirazione.',
    description_es: 'Experiencia inmersiva de 8 horas para descubrir tu voz auténtica a través de técnicas vocales, trabajo corporal y respiración.',
    price: 90,
    date: '2025-10-12',
    location: 'Healing Garden, Guía de Isora',
    instructors: 'Jenny Rospo & Marian Giral Vega',
    max_participants: 20,
    is_active: true,
    is_popular: true
  }
]