import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { pool } from './database'

export interface AdminUser {
  id: number
  email: string
}

export async function validateAdminCredentials(email: string, password: string): Promise<AdminUser | null> {
  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT id, email, password_hash FROM admin_users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return null
    }

    const user = result.rows[0]
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      return null
    }

    return { id: user.id, email: user.email }
  } catch (error) {
    console.error('Error validating admin credentials:', error)
    return null
  } finally {
    client.release()
  }
}

export async function createAdminSession(userId: number): Promise<string> {
  const client = await pool.connect()
  try {
    const sessionId = generateSessionId()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    await client.query(
      'INSERT INTO admin_sessions (id, user_id, expires_at) VALUES ($1, $2, $3)',
      [sessionId, userId, expiresAt]
    )

    // Set the session cookie
    const cookieStore = cookies()
    cookieStore.set('admin_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/admin'
    })

    return sessionId
  } catch (error) {
    console.error('Error creating admin session:', error)
    throw error
  } finally {
    client.release()
  }
}

export async function validateAdminSession(sessionId?: string): Promise<AdminUser | null> {
  if (!sessionId) {
    const cookieStore = cookies()
    sessionId = cookieStore.get('admin_session')?.value
  }

  if (!sessionId) {
    return null
  }

  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT u.id, u.email
      FROM admin_sessions s
      JOIN admin_users u ON s.user_id = u.id
      WHERE s.id = $1 AND s.expires_at > NOW()
    `, [sessionId])

    if (result.rows.length === 0) {
      // Clean up expired session
      await client.query('DELETE FROM admin_sessions WHERE id = $1', [sessionId])
      return null
    }

    return result.rows[0]
  } catch (error) {
    console.error('Error validating admin session:', error)
    return null
  } finally {
    client.release()
  }
}

export async function destroyAdminSession(sessionId?: string): Promise<void> {
  const cookieStore = cookies()
  
  if (!sessionId) {
    sessionId = cookieStore.get('admin_session')?.value
  }

  if (!sessionId) {
    return
  }

  const client = await pool.connect()
  try {
    await client.query('DELETE FROM admin_sessions WHERE id = $1', [sessionId])
    
    // Clear the cookie
    cookieStore.delete('admin_session')
  } catch (error) {
    console.error('Error destroying admin session:', error)
  } finally {
    client.release()
  }
}

function generateSessionId(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}