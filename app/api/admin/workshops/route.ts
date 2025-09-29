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
        SELECT * FROM workshops 
        ORDER BY created_at DESC
      `)
      return NextResponse.json({ workshops: result.rows })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching workshops:', error)
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
      title_it,
      title_es,
      description_it,
      description_es,
      price,
      date,
      location,
      instructors,
      max_participants,
      is_active,
      is_popular,
    } = body

    const client = await pool.connect()
    try {
      const result = await client.query(`
        INSERT INTO workshops (
          title_it, title_es, description_it, description_es,
          price, date, location, instructors, max_participants,
          is_active, is_popular
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `, [
        title_it, title_es, description_it, description_es,
        price, date, location, instructors, max_participants,
        is_active, is_popular
      ])

      return NextResponse.json({ workshop: result.rows[0] })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error creating workshop:', error)
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
      title_it,
      title_es,
      description_it,
      description_es,
      price,
      date,
      location,
      instructors,
      max_participants,
      is_active,
      is_popular,
    } = body

    const client = await pool.connect()
    try {
      const result = await client.query(`
        UPDATE workshops SET 
          title_it = $2, title_es = $3, description_it = $4, description_es = $5,
          price = $6, date = $7, location = $8, instructors = $9,
          max_participants = $10, is_active = $11, is_popular = $12,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *
      `, [
        id, title_it, title_es, description_it, description_es,
        price, date, location, instructors, max_participants,
        is_active, is_popular
      ])

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Workshop not found' }, { status: 404 })
      }

      return NextResponse.json({ workshop: result.rows[0] })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error updating workshop:', error)
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
      return NextResponse.json({ error: 'Workshop ID required' }, { status: 400 })
    }

    const client = await pool.connect()
    try {
      const result = await client.query('DELETE FROM workshops WHERE id = $1 RETURNING id', [id])
      
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Workshop not found' }, { status: 404 })
      }

      return NextResponse.json({ success: true })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error deleting workshop:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}