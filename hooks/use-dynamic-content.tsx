"use client"

import { useState, useEffect, createContext, useContext } from 'react'

interface SiteContent {
  id: number
  section: string
  content_key: string
  content_it: string
  content_es: string
}

interface DynamicContentContextType {
  content: SiteContent[]
  getContent: (section: string, key: string, language: 'it' | 'es') => string
  isLoading: boolean
}

const DynamicContentContext = createContext<DynamicContentContextType>({
  content: [],
  getContent: () => '',
  isLoading: true
})

export function DynamicContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/public/content')
        console.log('[useDynamicContent] Fetch response status:', response.status)
        if (response.ok) {
          const data = await response.json()
          console.log('[useDynamicContent] Fetched data:', data)
          console.log('[useDynamicContent] Content items:', data.content?.length || 0)
          setContent(data.content || [])
        } else {
          console.error('[useDynamicContent] Fetch failed with status:', response.status)
        }
      } catch (error) {
        console.error('Failed to fetch dynamic content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  const getContent = (section: string, key: string, language: 'it' | 'es'): string => {
    const item = content.find(c => c.section === section && c.content_key === key)
    if (!item) {
      console.log(`[useDynamicContent] NOT FOUND: section='${section}', key='${key}', language='${language}'`)
      return ''
    }
    const value = language === 'it' ? (item.content_it || '') : (item.content_es || '')
    console.log(`[useDynamicContent] FOUND: section='${section}', key='${key}', language='${language}', value='${value}'`)
    return value
  }

  return (
    <DynamicContentContext.Provider value={{ content, getContent, isLoading }}>
      {children}
    </DynamicContentContext.Provider>
  )
}

export function useDynamicContent() {
  const context = useContext(DynamicContentContext)
  if (!context) {
    throw new Error('useDynamicContent must be used within a DynamicContentProvider')
  }
  return context
}