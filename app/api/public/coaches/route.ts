import { NextResponse } from 'next/server'
import { pool } from '@/lib/database'

export async function GET() {
  try {
    const poolInstance = pool() // Call the function to get pool instance
    const client = await poolInstance.connect()
    try {
      const result = await client.query(`
        SELECT * FROM coaches 
        WHERE 1=1 
        ORDER BY display_order ASC, created_at DESC
      `)
      return NextResponse.json({ coaches: result.rows })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching public coaches:', error)
    return NextResponse.json({ coaches: [] }) // Return empty array instead of error
  }
}