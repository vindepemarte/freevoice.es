import { NextResponse } from 'next/server'

// Force dynamic rendering - don't static generate this API route
export const dynamic = 'force-dynamic'

export async function GET() {
  console.log('🔥 TEST API: This endpoint is working!')
  console.log('🔥 TEST API: NODE_ENV =', process.env.NODE_ENV)
  console.log('🔥 TEST API: DATABASE_URL length =', process.env.DATABASE_URL?.length)
  
  return NextResponse.json({ 
    status: 'working',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    dbUrlLength: process.env.DATABASE_URL?.length || 0
  })
}