import { NextRequest, NextResponse } from 'next/server'
import { validateAdminSession } from '@/lib/auth'
import { pool } from '@/lib/database'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const user = await validateAdminSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { currentPassword, newEmail, newPassword } = body

    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required' }, { status: 400 })
    }

    const client = await pool.connect()
    try {
      // Verify current password
      const userResult = await client.query(
        'SELECT * FROM admin_users WHERE id = $1',
        [user.id]
      )

      if (userResult.rows.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      const currentUser = userResult.rows[0]
      const isValidPassword = await bcrypt.compare(currentPassword, currentUser.password_hash)

      if (!isValidPassword) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
      }

      // Prepare update data
      let updateQuery = 'UPDATE admin_users SET updated_at = CURRENT_TIMESTAMP'
      const updateValues: any[] = [user.id]
      let paramCount = 1

      // Update email if provided and different
      if (newEmail && newEmail !== currentUser.email) {
        // Check if email already exists
        const emailCheck = await client.query(
          'SELECT id FROM admin_users WHERE email = $1 AND id != $2',
          [newEmail, user.id]
        )
        
        if (emailCheck.rows.length > 0) {
          return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
        }

        paramCount++
        updateQuery += `, email = $${paramCount}`
        updateValues.push(newEmail)
      }

      // Update password if provided
      if (newPassword) {
        if (newPassword.length < 8) {
          return NextResponse.json({ error: 'New password must be at least 8 characters long' }, { status: 400 })
        }

        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
        
        paramCount++
        updateQuery += `, password_hash = $${paramCount}`
        updateValues.push(hashedPassword)
      }

      updateQuery += ' WHERE id = $1 RETURNING id, email, updated_at'

      const result = await client.query(updateQuery, updateValues)

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
      }

      // If email or password changed, invalidate all sessions
      if (newEmail || newPassword) {
        await client.query('DELETE FROM admin_sessions WHERE user_id = $1', [user.id])
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Profile updated successfully',
        user: result.rows[0]
      })

    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error updating admin profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}