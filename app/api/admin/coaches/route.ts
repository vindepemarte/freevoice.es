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
        SELECT * FROM coaches 
        ORDER BY display_order ASC, created_at DESC
      `)
      return NextResponse.json({ coaches: result.rows })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching coaches:', error)
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
      title_it,
      title_es,
      bio_it,
      bio_es,
      image_url,
      specialties_it,
      specialties_es,
      display_order,
    } = body

    const client = await pool.connect()
    try {
      const result = await client.query(`
        INSERT INTO coaches (
          name, title_it, title_es, bio_it, bio_es, image_url,
          specialties_it, specialties_es, display_order
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `, [name, title_it, title_es, bio_it, bio_es, image_url, specialties_it, specialties_es, display_order])

      return NextResponse.json({ coach: result.rows[0] })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error creating coach:', error)
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
      title_it,
      title_es,
      bio_it,
      bio_es,
      image_url,
      specialties_it,
      specialties_es,
      display_order,
    } = body

    const client = await pool.connect()
    try {
      const result = await client.query(`
        UPDATE coaches SET 
          name = $2, title_it = $3, title_es = $4, bio_it = $5, bio_es = $6,
          image_url = $7, specialties_it = $8, specialties_es = $9, display_order = $10,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *
      `, [id, name, title_it, title_es, bio_it, bio_es, image_url, specialties_it, specialties_es, display_order])

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Coach not found' }, { status: 404 })
      }

      return NextResponse.json({ coach: result.rows[0] })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error updating coach:', error)
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
      return NextResponse.json({ error: 'Coach ID required' }, { status: 400 })
    }

    const client = await pool.connect()
    try {
      const result = await client.query('DELETE FROM coaches WHERE id = $1 RETURNING id', [id])
      
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Coach not found' }, { status: 404 })
      }

      return NextResponse.json({ success: true })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error deleting coach:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}