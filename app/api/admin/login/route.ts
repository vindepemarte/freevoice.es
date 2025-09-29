import { NextRequest, NextResponse } from 'next/server'
import { validateAdminCredentials, createAdminSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await validateAdminCredentials(email, password)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const sessionId = await createAdminSession(user.id)

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}