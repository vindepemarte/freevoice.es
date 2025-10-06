import { NextResponse } from 'next/server'
import { pool } from '@/lib/database'

export async function GET() {
  console.log('🚀 WORKSHOPS API: Starting request')
  console.log('🚀 WORKSHOPS API: NODE_ENV =', process.env.NODE_ENV)
  console.log('🚀 WORKSHOPS API: DATABASE_URL length =', process.env.DATABASE_URL?.length)
  
  try {
    console.log('🚀 WORKSHOPS API: Attempting database connection...')
    const client = await pool.connect()
    console.log('✅ WORKSHOPS API: Database connected successfully')
    
    try {
      console.log('🚀 WORKSHOPS API: Executing query...')
      const result = await client.query(`
        SELECT * FROM workshops 
        WHERE is_active = true
        ORDER BY created_at DESC
      `)
      
      console.log('✅ WORKSHOPS API: Query completed')
      console.log('📊 WORKSHOPS API: Raw result rows:', result.rows.length)
      console.log('📊 WORKSHOPS API: First row sample:', result.rows[0] ? JSON.stringify(result.rows[0]) : 'NO ROWS')
      
      // Fix timezone issue for date display - format date without timezone conversion
      const workshops = result.rows.map(workshop => ({
        ...workshop,
        date: workshop.date ? `${workshop.date.getFullYear()}-${String(workshop.date.getMonth() + 1).padStart(2, '0')}-${String(workshop.date.getDate()).padStart(2, '0')}` : null
      }))
      
      console.log('📊 WORKSHOPS API: Processed workshops:', workshops.length)
      console.log('📊 WORKSHOPS API: Final response sample:', workshops[0] ? JSON.stringify(workshops[0]) : 'NO WORKSHOPS')
      
      return NextResponse.json({ workshops })
    } finally {
      client.release()
      console.log('🔄 WORKSHOPS API: Database client released')
    }
  } catch (error) {
    console.error('❌ WORKSHOPS API: Error occurred:', error)
    console.error('❌ WORKSHOPS API: Error message:', (error as any)?.message)
    console.error('❌ WORKSHOPS API: Error code:', (error as any)?.code)
    console.error('❌ WORKSHOPS API: Error stack:', (error as any)?.stack)
    return NextResponse.json({ workshops: [], error: (error as any)?.message })
  }
}