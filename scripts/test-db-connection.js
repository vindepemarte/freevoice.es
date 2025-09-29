#!/usr/bin/env node

import { pool } from '../lib/database.js'

async function testConnection() {
  console.log('Testing database connection...')
  console.log('NODE_ENV:', process.env.NODE_ENV)
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET')
  
  try {
    const client = await pool.connect()
    console.log('✅ Database connection successful!')
    
    // Test a simple query
    const result = await client.query('SELECT NOW() as current_time')
    console.log('✅ Query test successful:', result.rows[0])
    
    // Test admin_users table
    const adminResult = await client.query('SELECT COUNT(*) as count FROM admin_users')
    console.log('✅ Admin users table accessible, count:', adminResult.rows[0].count)
    
    client.release()
    console.log('✅ Connection released successfully')
    
  } catch (error) {
    console.error('❌ Database connection failed:')
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    console.error('Full error:', error)
  } finally {
    await pool.end()
    process.exit(0)
  }
}

testConnection()