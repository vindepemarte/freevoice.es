"use client"

import { useState, useEffect } from 'react'

interface Workshop {
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

interface Testimonial {
  id: number
  name: string
  role: string
  content_it: string
  content_es: string
  video_url: string
  image_url: string
  is_approved: boolean
  display_order: number
}

interface SiteContent {
  id: number
  section: string
  content_key: string
  content_it: string
  content_es: string
}

export function useWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWorkshops() {
      try {
        const response = await fetch('/api/admin/workshops')
        if (response.ok) {
          const data = await response.json()
          setWorkshops(data.workshops)
        } else {
          setError('Failed to fetch workshops')
        }
      } catch (err) {
        setError('Network error')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkshops()
  }, [])

  return { workshops, loading, error, refetch: () => setLoading(true) }
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/admin/testimonials')
        if (response.ok) {
          const data = await response.json()
          setTestimonials(data.testimonials)
        } else {
          setError('Failed to fetch testimonials')
        }
      } catch (err) {
        setError('Network error')
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return { testimonials, loading, error, refetch: () => setLoading(true) }
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch('/api/admin/content')
        if (response.ok) {
          const data = await response.json()
          setContent(data.content)
        } else {
          setError('Failed to fetch content')
        }
      } catch (err) {
        setError('Network error')
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  return { content, loading, error, refetch: () => setLoading(true) }
}

export function usePublicWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchPublicWorkshops() {
      try {
        setLoading(true)
        const response = await fetch('/api/public/workshops')
        if (response.ok) {
          const data = await response.json()
          setWorkshops(data.workshops)
        }
      } catch (err) {
        console.error('Failed to fetch public workshops:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPublicWorkshops()
  }, [])

  return { workshops, loading }
}

export function usePublicTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchPublicTestimonials() {
      try {
        setLoading(true)
        const response = await fetch('/api/public/testimonials')
        if (response.ok) {
          const data = await response.json()
          setTestimonials(data.testimonials)
        }
      } catch (err) {
        console.error('Failed to fetch public testimonials:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPublicTestimonials()
  }, [])

  return { testimonials, loading }
}