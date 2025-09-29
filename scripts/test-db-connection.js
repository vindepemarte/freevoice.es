#!/usr/bin/env node

import { pool } from '../lib/database.js'

async function testConnection() {
  console.log('Testing database connection (SSL disabled setup)...')
  console.log('NODE_ENV:', process.env.NODE_ENV)
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET')
  
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('sslmode=disable')) {
    console.log('⚠️  WARNING: DATABASE_URL does not include sslmode=disable')
    console.log('   Consider adding ?sslmode=disable to your connection string')
  }
  
  try {
    console.log('\n🔗 Attempting database connection...')
    const client = await pool.connect()
    console.log('✅ Database connection successful!')
    
    // Test a simple query
    console.log('\n🔍 Testing basic query...')
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version')
    console.log('✅ Query test successful:')
    console.log('   Current time:', result.rows[0].current_time)
    console.log('   PostgreSQL version:', result.rows[0].pg_version.split(' ')[0])
    
    // Test admin_users table
    console.log('\n👤 Testing admin_users table...')
    const adminResult = await client.query('SELECT COUNT(*) as count FROM admin_users')
    console.log('✅ Admin users table accessible, count:', adminResult.rows[0].count)
    
    // Test connection info
    console.log('\n📊 Connection details:')
    const connInfo = await client.query(`
      SELECT 
        inet_server_addr() as server_ip,
        inet_server_port() as server_port,
        current_database() as database_name,
        current_user as username
    `)
    console.log('   Server IP:', connInfo.rows[0].server_ip || 'localhost')
    console.log('   Server Port:', connInfo.rows[0].server_port)
    console.log('   Database:', connInfo.rows[0].database_name)
    console.log('   User:', connInfo.rows[0].username)
    
    client.release()
    console.log('\n✅ Connection released successfully')
    console.log('\n🎉 All database tests passed! Your SSL-disabled setup is working correctly.')
    
  } catch (error) {
    console.error('\n❌ Database connection failed:')
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    
    if (error.message.includes('SSL')) {
      console.error('\n💡 SSL-related error detected:')
      console.error('   - Ensure your database server allows non-SSL connections')
      console.error('   - Add ?sslmode=disable to your DATABASE_URL')
      console.error('   - Check if your hosting provider requires SSL')
    }
    
    console.error('\nFull error:', error)
  } finally {
    await pool.end()
    process.exit(0)
  }
}

testConnection()