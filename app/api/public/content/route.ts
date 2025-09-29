import { NextResponse } from 'next/server'
import { pool } from '@/lib/database'

export async function GET() {
  try {
    // Skip database connection during build if dummy URL is set
    if (process.env.DATABASE_URL?.includes('dummy')) {
      return NextResponse.json({ content: [] })
    }
    
    const client = await pool.connect()
    try {
      const result = await client.query('SELECT * FROM site_content ORDER BY section, content_key')
      return NextResponse.json({ content: result.rows })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching public content:', error)
    return NextResponse.json({ content: [] }, { status: 200 })
  }
}