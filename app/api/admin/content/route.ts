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
        SELECT * FROM site_content 
        ORDER BY section, content_key
      `)
      return NextResponse.json({ content: result.rows })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching site content:', error)
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
    const { section, content_key, content_it, content_es } = body

    const client = await pool.connect()
    try {
      const result = await client.query(`
        INSERT INTO site_content (section, content_key, content_it, content_es)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (section, content_key) 
        DO UPDATE SET 
          content_it = EXCLUDED.content_it,
          content_es = EXCLUDED.content_es,
          updated_at = CURRENT_TIMESTAMP
        RETURNING *
      `, [section, content_key, content_it, content_es])

      return NextResponse.json({ content: result.rows[0] })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error updating site content:', error)
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
    const { section, content_key, content_it, content_es } = body

    const client = await pool.connect()
    try {
      const result = await client.query(`
        UPDATE site_content SET 
          content_it = $3, content_es = $4, updated_at = CURRENT_TIMESTAMP
        WHERE section = $1 AND content_key = $2
        RETURNING *
      `, [section, content_key, content_it, content_es])

      if (result.rows.length === 0) {
        // Create if doesn't exist
        const insertResult = await client.query(`
          INSERT INTO site_content (section, content_key, content_it, content_es)
          VALUES ($1, $2, $3, $4)
          RETURNING *
        `, [section, content_key, content_it, content_es])
        
        return NextResponse.json({ content: insertResult.rows[0] })
      }

      return NextResponse.json({ content: result.rows[0] })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error updating site content:', error)
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
    const section = searchParams.get('section')
    const content_key = searchParams.get('content_key')

    if (!section || !content_key) {
      return NextResponse.json({ error: 'Section and content_key required' }, { status: 400 })
    }

    const client = await pool.connect()
    try {
      const result = await client.query(
        'DELETE FROM site_content WHERE section = $1 AND content_key = $2 RETURNING id',
        [section, content_key]
      )
      
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Content not found' }, { status: 404 })
      }

      return NextResponse.json({ success: true })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error deleting site content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}