import { NextResponse } from 'next/server'
import { pool } from '@/lib/database'

// Force dynamic rendering - don't static generate this API route
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Skip database connection during build if dummy URL is set
    if (process.env.DATABASE_URL?.includes('dummy')) {
      return NextResponse.json({ testimonials: [] })
    }
    
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
    return NextResponse.json({ testimonials: [] }, { status: 200 })
  }
}