import { NextResponse } from 'next/server'
import { pool } from '@/lib/database'

export async function GET() {
  console.log('═══════════════════════════════════════')
  console.log('🎯 [PUBLIC CONTENT API] Request received!')
  console.log('═══════════════════════════════════════')
  
  try {
    console.log('[API /public/content] DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET')
    
    // Skip database connection during build if dummy URL is set
    if (process.env.DATABASE_URL?.includes('dummy')) {
      console.log('[API /public/content] Dummy URL detected, returning empty array')
      return NextResponse.json({ content: [] })
    }
    
    console.log('[API /public/content] Attempting database connection...')
    const client = await pool.connect()
    try {
      console.log('[API /public/content] Connected! Executing query...')
      const result = await client.query('SELECT * FROM site_content ORDER BY section, content_key')
      console.log('[API /public/content] Query result:', result.rows.length, 'rows')
      
      if (result.rows.length > 0) {
        console.log('[API /public/content] First row sample:', JSON.stringify(result.rows[0]))
      } else {
        console.log('[API /public/content] ⚠️  WARNING: site_content table is EMPTY!')
      }
      
      console.log('[API /public/content] ✅ Returning', result.rows.length, 'content items')
      return NextResponse.json({ content: result.rows })
    } finally {
      client.release()
      console.log('[API /public/content] Database client released')
    }
  } catch (error) {
    console.error('❌ [API /public/content] ERROR:', error)
    return NextResponse.json({ content: [] }, { status: 200 })
  }
}