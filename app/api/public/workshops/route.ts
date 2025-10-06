import { NextResponse } from 'next/server'
import { pool } from '@/lib/database'

export async function GET() {
  try {
    const poolInstance = pool() // Call the function to get pool instance
    const client = await poolInstance.connect()
    try {
      const result = await client.query(`
        SELECT * FROM workshops 
        WHERE is_active = true
        ORDER BY created_at DESC
      `)
      
      // Fix timezone issue for date display - format date without timezone conversion
      const workshops = result.rows.map(workshop => ({
        ...workshop,
        date: workshop.date ? `${workshop.date.getFullYear()}-${String(workshop.date.getMonth() + 1).padStart(2, '0')}-${String(workshop.date.getDate()).padStart(2, '0')}` : null
      }))
      
      return NextResponse.json({ workshops })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching public workshops:', error)
    return NextResponse.json({ workshops: [] }) // Return empty array instead of error
  }
}