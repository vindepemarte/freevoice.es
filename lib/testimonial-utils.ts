import type { Language } from '@/lib/translations'

// Utility function to safely get testimonial content
export function getTestimonialContent(testimonial: any, language: Language, field: 'role' | 'content') {
  if (!testimonial) return ''
  
  // Handle database testimonials (content_it, content_es format)
  if (field === 'content') {
    if (testimonial.content_it && testimonial.content_es) {
      return language === 'es' ? testimonial.content_es : testimonial.content_it
    }
    if (testimonial.content?.[language]) {
      return testimonial.content[language]
    }
  }
  
  // Handle role field
  if (field === 'role') {
    if (typeof testimonial.role === 'string') {
      return testimonial.role
    }
    if (testimonial.role?.[language]) {
      return testimonial.role[language]
    }
  }
  
  return ''
}

// Utility function to safely get image URL
export function getTestimonialImage(testimonial: any) {
  if (!testimonial) return '/placeholder.svg'
  
  // Prioritize base64 image data from database
  if (testimonial.image_data) {
    return testimonial.image_data
  }
  
  // Fallback to image_url or image field
  return testimonial.image_url || testimonial.image || '/placeholder.svg'
}

// Utility function to safely get video URL
export function getTestimonialVideo(testimonial: any) {
  if (!testimonial) return null
  
  // Prioritize base64 video data from database
  if (testimonial.video_data) {
    return testimonial.video_data
  }
  
  // Fallback to video_url field
  return testimonial.video_url || null
}