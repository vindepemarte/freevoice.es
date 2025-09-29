import { NextResponse } from 'next/server'
import { pool } from '@/lib/database'

export async function GET() {
  try {
    const client = await pool.connect()
    try {
      const result = await client.query(`
        SELECT * FROM workshops 
        WHERE is_active = true
        ORDER BY is_popular DESC, created_at DESC
      `)
      return NextResponse.json({ workshops: result.rows })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching public workshops:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}