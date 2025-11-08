#!/usr/bin/env node

/**
 * Script to run the video URLs migration
 * Adds intro_video_url_it, intro_video_url_es, testimonials_video_url_it, testimonials_video_url_es
 * columns to the site_content table
 */

const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

async function runMigration() {
  console.log('🔄 Starting video URLs migration...\n')

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    console.error('❌ DATABASE_URL not found in environment variables')
    process.exit(1)
  }

  const pool = new Pool({
    connectionString,
    ssl: false
  })

  try {
    // Read migration file
    const migrationPath = path.join(__dirname, '..', 'migrations', 'add_video_urls.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8')

    console.log('📄 Migration SQL:')
    console.log(migrationSQL)
    console.log('\n')

    // Execute migration
    const client = await pool.connect()
    try {
      await client.query(migrationSQL)
      console.log('✅ Migration completed successfully!')
      console.log('\nAdded columns:')
      console.log('  - intro_video_url_it')
      console.log('  - intro_video_url_es')
      console.log('  - testimonials_video_url_it')
      console.log('  - testimonials_video_url_es')
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    console.error(error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

runMigration()
