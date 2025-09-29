import { NextResponse } from 'next/server'
import { pool } from '@/lib/database'

export async function GET() {
  try {
    const client = await pool.connect()
    try {
      const result = await client.query(`
        SELECT * FROM testimonials 
        WHERE is_approved = true
        ORDER BY display_order ASC, created_at DESC
      `)
      return NextResponse.json({ testimonials: result.rows })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching public testimonials:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}