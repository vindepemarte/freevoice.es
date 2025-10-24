import { NextRequest, NextResponse } from 'next/server'
import { validateAdminSession } from '@/lib/auth'
import { pool } from '@/lib/database'

export async function GET() {
  try {
    const user = await validateAdminSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await pool.connect()
    try {
      const result = await client.query(`
        SELECT * FROM testimonials 
        ORDER BY display_order ASC, created_at DESC
      `)
      return NextResponse.json({ testimonials: result.rows })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await validateAdminSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      role,
      content_it,
      content_es,
      video_url,
      video_data,
      image_url,
      image_data,
      is_approved,
      display_order,
    } = body

    const client = await pool.connect()
    try {
      const result = await client.query(`
        INSERT INTO testimonials (
          name, role, content_it, content_es, video_url, video_data, image_url, image_data,
          is_approved, display_order
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `, [name, role, content_it, content_es, video_url, video_data, image_url, image_data, is_approved, display_order])

      return NextResponse.json({ testimonial: result.rows[0] })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await validateAdminSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      id,
      name,
      role,
      content_it,
      content_es,
      video_url,
      video_data,
      image_url,
      image_data,
      is_approved,
      display_order,
    } = body

    const client = await pool.connect()
    try {
      const result = await client.query(`
        UPDATE testimonials SET 
          name = $2, role = $3, content_it = $4, content_es = $5,
          video_url = $6, video_data = $7, image_url = $8, image_data = $9, is_approved = $10, display_order = $11,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *
      `, [id, name, role, content_it, content_es, video_url, video_data, image_url, image_data, is_approved, display_order])

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
      }

      return NextResponse.json({ testimonial: result.rows[0] })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await validateAdminSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID required' }, { status: 400 })
    }

    const client = await pool.connect()
    try {
      const result = await client.query('DELETE FROM testimonials WHERE id = $1 RETURNING id', [id])
      
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
      }

      return NextResponse.json({ success: true })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}