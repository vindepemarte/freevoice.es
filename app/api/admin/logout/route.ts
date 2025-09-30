import { NextResponse } from 'next/server'
import { destroyAdminSession } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    console.log('Logout attempt started')
    
    // Get the cookie value first
    const cookieStore = cookies()
    const sessionId = cookieStore.get('admin_session')?.value
    console.log('Session ID found:', sessionId ? 'YES' : 'NO')
    
    // Destroy the session in database
    await destroyAdminSession()
    
    // Force clear cookies with multiple path attempts
    const response = NextResponse.json({ success: true })
    
    // Clear cookie with root path
    response.cookies.set('admin_session', '', {
      expires: new Date(0),
      path: '/'
    })
    
    // Also clear cookie with /admin path (in case it exists)
    response.cookies.set('admin_session', '', {
      expires: new Date(0),
      path: '/admin'
    })
    
    console.log('Logout completed successfully')
    return response
    
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}