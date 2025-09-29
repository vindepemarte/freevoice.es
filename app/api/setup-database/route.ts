import { NextRequest, NextResponse } from 'next/server'
import { initializeDatabase, seedInitialData } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    // Add a simple security check - you can remove this after setup
    const { setupKey } = await request.json()
    
    if (setupKey !== 'freevoice-setup-2025') {
      return NextResponse.json(
        { error: 'Invalid setup key' }, 
        { status: 401 }
      )
    }

    console.log('🚀 Starting database initialization...')

    // Initialize database tables
    await initializeDatabase()
    console.log('✅ Database tables created successfully')

    // Seed initial data
    await seedInitialData()
    console.log('✅ Initial data seeded successfully')

    return NextResponse.json({
      success: true,
      message: 'Database initialized and seeded successfully',
      adminCredentials: {
        email: 'xk7m9p@freevoice.es',
        password: 'K9mR7nQ2vX8pL5wY',
        note: 'Please change these credentials after first login'
      }
    })

  } catch (error) {
    console.error('❌ Database setup failed:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Database setup failed',
      details: (error as any)?.message || 'Unknown error'
    }, { status: 500 })
  }
}

// Also allow GET for easier testing
export async function GET() {
  return NextResponse.json({
    message: 'Database setup endpoint',
    instructions: 'Send a POST request with { "setupKey": "freevoice-setup-2025" } to initialize the database'
  })
}