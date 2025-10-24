import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      role,
      content_it,
      content_es,
      image_url,
      image_data,
    } = body

    // Validate required fields
    if (!name || !content_it || !content_es) {
      return NextResponse.json(
        { error: 'Name and content in both languages are required' },
        { status: 400 }
      )
    }

    // Skip database during build if dummy URL is set
    if (process.env.DATABASE_URL?.includes('dummy')) {
      return NextResponse.json({ success: true, message: 'Build mode - testimonial not saved' })
    }

    const client = await pool.connect()
    try {
      // Insert testimonial with is_approved = false by default
      const result = await client.query(`
        INSERT INTO testimonials (
          name, role, content_it, content_es, image_url, image_data,
          is_approved, display_order
        ) VALUES ($1, $2, $3, $4, $5, $6, false, 999)
        RETURNING id
      `, [name, role || '', content_it, content_es, image_url || null, image_data || null])

      return NextResponse.json({
        success: true,
        message: 'Testimonial submitted successfully! It will be reviewed by our team.',
        testimonialId: result.rows[0].id
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error submitting testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to submit testimonial' },
      { status: 500 }
    )
  }
}
