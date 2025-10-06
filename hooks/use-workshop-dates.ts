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
        const response = await fetch('/api/public/workshops')
        
        if (response.ok) {
          const data = await response.json()
          setWorkshops(data)
          const nextText = getNextWorkshopText(data, language)
          setNextWorkshopText(nextText)
        } else {
          // Use fallback workshops
          const fallbackWorkshops = getFallbackWorkshops(language)
          setWorkshops(fallbackWorkshops)
          const nextText = getNextWorkshopText(fallbackWorkshops, language)
          setNextWorkshopText(nextText)
        }
      } catch (error) {
        console.error('Error loading workshops:', error)
        // Use fallback workshops
        const fallbackWorkshops = getFallbackWorkshops(language)
        setWorkshops(fallbackWorkshops)
        const nextText = getNextWorkshopText(fallbackWorkshops, language)
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