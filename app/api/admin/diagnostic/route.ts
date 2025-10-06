import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/database'
import { validateAdminSession } from '@/lib/auth'

export async function GET() {
  const diagnostic = {
    timestamp: new Date().toISOString(),
    status: 'checking',
    database: {
      connection: 'unknown',
      tables: [] as string[],
      adminUser: 'unknown'
    },
    session: {
      valid: false,
      user: null as { id: number; email: string } | null
    },
    errors: [] as string[]
  }

  try {
    // Check database connection
    const client = await pool.connect()
    try {
      diagnostic.database.connection = 'connected'
      
      // Check if tables exist
      const tablesResult = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name
      `)
      diagnostic.database.tables = tablesResult.rows.map(row => row.table_name)
      
      // Check if admin user exists
      if (diagnostic.database.tables.includes('admin_users')) {
        const userCount = await client.query('SELECT COUNT(*) as count FROM admin_users')
        diagnostic.database.adminUser = `${userCount.rows[0].count} user(s) found`
      }
      
    } finally {
      client.release()
    }
  } catch (error) {
    diagnostic.errors.push(`Database error: ${(error as any)?.message}`)
    diagnostic.database.connection = 'failed'
  }

  try {
    // Check session validation
    const user = await validateAdminSession()
    if (user) {
      diagnostic.session.valid = true
      diagnostic.session.user = { id: user.id, email: user.email }
    }
  } catch (error) {
    diagnostic.errors.push(`Session error: ${(error as any)?.message}`)
  }

  diagnostic.status = diagnostic.errors.length === 0 ? 'healthy' : 'issues_found'

  return NextResponse.json(diagnostic)
}

// POST endpoint to force database setup
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()
    
    if (action === 'setup') {
      const { initializeDatabase, seedInitialData } = await import('@/lib/database')
      
      await initializeDatabase()
      await seedInitialData()
      
      return NextResponse.json({
        success: true,
        message: 'Database setup completed'
      })
    }
    
    return NextResponse.json({
      error: 'Invalid action'
    }, { status: 400 })
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as any)?.message || 'Setup failed'
    }, { status: 500 })
  }
}