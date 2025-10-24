#!/usr/bin/env node

/**
 * Database Migration Script
 * Adds image_data column to testimonials table
 * Run with: node scripts/add-image-data-column.js
 */

const { Pool } = require('pg')

// Database configuration - copied from lib/database.ts for Node.js compatibility
function getDatabaseConfig() {
  let connectionString = process.env.DATABASE_URL || 'postgres://freevoice:YA3T2bXVkSHnvClYY0CqTWKJVmrzPHE7KzFzA1scDkT2dRxOg8dCQBS2g0lfGc5p@38.242.151.194:8888/freevoice-es'
  
  if (connectionString.includes('dummy')) {
    return {
      connectionString,
      ssl: false
    }
  }
  
  if (!connectionString.includes('sslmode=disable')) {
    connectionString += connectionString.includes('?') ? '&sslmode=disable' : '?sslmode=disable'
  }
  
  connectionString = connectionString.replace(/[&?]ssl=true/g, '')
  connectionString = connectionString.replace(/[&?]sslmode=require/g, '')
  connectionString = connectionString.replace(/[&?]sslmode=prefer/g, '')
  
  return {
    connectionString,
    ssl: false
  }
}

const dbConfig = getDatabaseConfig()
const url = new URL(dbConfig.connectionString)
const poolConfig = {
  user: url.username,
  password: url.password,
  host: url.hostname,
  port: parseInt(url.port) || 5432,
  database: url.pathname.slice(1),
  ssl: false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
}

const pool = new Pool(poolConfig)

async function addImageDataColumn() {
  console.log('🔄 Starting database migration...')
  
  const client = await pool.connect()
  
  try {
    // Add image_data column if it doesn't exist
    await client.query(`
      DO $$ 
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns 
              WHERE table_name='testimonials' AND column_name='image_data'
          ) THEN
              ALTER TABLE testimonials ADD COLUMN image_data TEXT;
              RAISE NOTICE 'Column image_data added successfully';
          ELSE
              RAISE NOTICE 'Column image_data already exists';
          END IF;
      END $$;
    `)
    
    // Verify the column was added
    const result = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'testimonials' 
        AND column_name = 'image_data'
    `)
    
    if (result.rows.length > 0) {
      console.log('✅ Migration successful!')
      console.log('   Column: image_data')
      console.log('   Type:', result.rows[0].data_type)
    } else {
      console.error('❌ Migration failed - column not found')
      process.exit(1)
    }
    
    // Show current testimonials
    const countResult = await client.query('SELECT COUNT(*) FROM testimonials')
    console.log(`📊 Total testimonials in database: ${countResult.rows[0].count}`)
    
    const withImages = await client.query('SELECT COUNT(*) FROM testimonials WHERE image_data IS NOT NULL')
    console.log(`🖼️  Testimonials with base64 images: ${withImages.rows[0].count}`)
    
  } catch (error) {
    console.error('❌ Migration error:', error)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

// Run migration
addImageDataColumn()
  .then(() => {
    console.log('✨ Migration complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error)
    process.exit(1)
  })
