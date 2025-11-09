import { NextResponse } from 'next/server'
import { pool } from '@/lib/database'

export async function GET() {
  try {
    console.log('[API /public/content] DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET')
    
    // Skip database connection during build if dummy URL is set
    if (process.env.DATABASE_URL?.includes('dummy')) {
      console.log('[API /public/content] Dummy URL detected, returning empty array')
      return NextResponse.json({ content: [] })
    }
    
    const client = await pool.connect()
    try {
      const result = await client.query('SELECT * FROM site_content ORDER BY section, content_key')
      console.log('[API /public/content] Query result:', result.rows.length, 'rows')
      console.log('[API /public/content] Rows:', result.rows)
      return NextResponse.json({ content: result.rows })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching public content:', error)
    return NextResponse.json({ content: [] }, { status: 200 })
  }
}