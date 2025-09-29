import { NextResponse } from 'next/server'
import { pool } from '@/lib/database'

export async function GET() {
  try {
    const client = await pool.connect()
    try {
      const result = await client.query('SELECT * FROM site_content ORDER BY section, content_key')
      return NextResponse.json({ content: result.rows })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching public content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}