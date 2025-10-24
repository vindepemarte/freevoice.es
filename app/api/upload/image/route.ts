import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File
    const type = formData.get('type') as string // 'testimonial', 'coach', etc.
    const isPublic = formData.get('public') === 'true' // Check if it's a public upload
    const testimonialId = formData.get('testimonialId') as string // Optional: ID of testimonial to update

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const imageData = `data:${file.type};base64,${base64}`

    // If testimonialId is provided, update the database record
    if (testimonialId && type === 'testimonial') {
      const client = await pool.connect()
      try {
        await client.query(
          'UPDATE testimonials SET image_data = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
          [imageData, testimonialId]
        )
      } finally {
        client.release()
      }
    }

    return NextResponse.json({
      success: true,
      imageUrl: imageData, // Return base64 data URL
      filename: file.name,
      size: file.size,
      type: file.type
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
