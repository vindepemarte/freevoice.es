import { NextResponse } from 'next/server'
import { pool } from '@/lib/database'

export async function GET() {
  try {
    // Skip database connection during build if dummy URL is set
    if (process.env.DATABASE_URL?.includes('dummy')) {
      return NextResponse.json({ testimonials: [] })
    }
    
    const poolInstance = pool() // Call the function to get pool instance
    const client = await poolInstance.connect()
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