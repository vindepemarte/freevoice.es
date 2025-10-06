import { NextResponse } from 'next/server'
import { Pool } from 'pg'

export async function GET() {
  console.log('🚀 WORKSHOPS API: Starting request')
  console.log('🚀 WORKSHOPS API: NODE_ENV =', process.env.NODE_ENV)
  console.log('🚀 WORKSHOPS API: DATABASE_URL length =', process.env.DATABASE_URL?.length)
  
  // Create connection directly in the API to avoid module loading issues
  const connectionString = process.env.DATABASE_URL!
  console.log('🚀 WORKSHOPS API: Raw connection string first 50:', connectionString.substring(0, 50))
  
  const url = new URL(connectionString)
  const poolConfig = {
    user: url.username,
    password: url.password,
    host: url.hostname,
    port: parseInt(url.port) || 5432,
    database: url.pathname.slice(1),
    ssl: false,
    max: 5
  }
  
  console.log('🚀 WORKSHOPS API: Extracted config:')
  console.log('   Host:', poolConfig.host)
  console.log('   Port:', poolConfig.port)
  console.log('   Database:', poolConfig.database)
  
  const apiPool = new Pool(poolConfig)
  
  try {
    console.log('🚀 WORKSHOPS API: Attempting database connection...')
    const client = await apiPool.connect()
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
    return NextResponse.json({ workshops: [], error: (error as any)?.message })
  } finally {
    await apiPool.end()
  }
}