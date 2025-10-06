import { useState, useEffect } from 'react'
import { Workshop, getNextUpcomingWorkshop, getNextWorkshopText, getFallbackWorkshops } from '@/lib/workshop-dates'

/**
 * Hook to manage dynamic workshop dates
 */
export function useWorkshopDates(language: 'es' | 'it') {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [nextWorkshopText, setNextWorkshopText] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        console.log('Loading workshops from API...')
        const response = await fetch('/api/public/workshops')
        
        if (response.ok) {
          const data = await response.json()
          console.log('Workshops loaded from API:', data)
          setWorkshops(data.workshops || data)
          const nextText = getNextWorkshopText(data.workshops || data, language)
          console.log('Next workshop text:', nextText)
          setNextWorkshopText(nextText)
        } else {
          console.log('API response not ok, using fallback workshops')
          // Use fallback workshops
          const fallbackWorkshops = getFallbackWorkshops(language)
          setWorkshops(fallbackWorkshops)
          const nextText = getNextWorkshopText(fallbackWorkshops, language)
          console.log('Fallback workshop text:', nextText)
          setNextWorkshopText(nextText)
        }
      } catch (error) {
        console.error('Error loading workshops:', error)
        // Use fallback workshops
        const fallbackWorkshops = getFallbackWorkshops(language)
        setWorkshops(fallbackWorkshops)
        const nextText = getNextWorkshopText(fallbackWorkshops, language)
        console.log('Error fallback workshop text:', nextText)
        setNextWorkshopText(nextText)
      } finally {
        setLoading(false)
      }
    }

    loadWorkshops()
  }, [language])

  // Update text when language changes
  useEffect(() => {
    if (workshops.length > 0) {
      const nextText = getNextWorkshopText(workshops, language)
      setNextWorkshopText(nextText)
    }
  }, [language, workshops])

  const nextWorkshop = getNextUpcomingWorkshop(workshops)

  return {
    workshops,
    nextWorkshop,
    nextWorkshopText,
    loading
  }
}