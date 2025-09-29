import { Pool } from 'pg'

// Simple database configuration for SSL-disabled setup
function getDatabaseConfig() {
  let connectionString = process.env.DATABASE_URL || 'postgres://freevoice:YA3T2bXVkSHnvClYY0CqTWKJVmrzPHE7KzFzA1scDkT2dRxOg8dCQBS2g0lfGc5p@38.242.151.194:8888/freevoice-es'
  
  console.log('🔗 Database connection setup (SSL disabled):')
  console.log('   NODE_ENV:', process.env.NODE_ENV)
  console.log('   Connection string length:', connectionString.length)
  
  // Skip SSL during build with dummy URL
  if (connectionString.includes('dummy')) {
    console.log('   Using dummy URL for build')
    return {
      connectionString,
      ssl: false
    }
  }
  
  // Ensure sslmode=disable is in the connection string
  if (!connectionString.includes('sslmode=disable')) {
    console.log('   Adding sslmode=disable to connection string')
    connectionString += connectionString.includes('?') ? '&sslmode=disable' : '?sslmode=disable'
  }
  
  // Remove any SSL-related parameters that might conflict
  connectionString = connectionString.replace(/[&?]ssl=true/g, '')
  connectionString = connectionString.replace(/[&?]sslmode=require/g, '')
  connectionString = connectionString.replace(/[&?]sslmode=prefer/g, '')
  
  console.log('   SSL explicitly disabled in connection string')
  
  return {
    connectionString,
    ssl: false // Explicitly disable SSL
  }
}

const dbConfig = getDatabaseConfig()
const pool = new Pool({
  ...dbConfig,
  // Connection pool settings optimized for non-SSL connections
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection could not be established
  statement_timeout: 60000, // 60 second statement timeout
  query_timeout: 60000, // 60 second query timeout
})

export { pool }

export async function initializeDatabase() {
  const client = await pool.connect()
  try {
    // Create workshops table
    await client.query(`
      CREATE TABLE IF NOT EXISTS workshops (
        id SERIAL PRIMARY KEY,
        title_it TEXT NOT NULL,
        title_es TEXT NOT NULL,
        description_it TEXT,
        description_es TEXT,
        price DECIMAL(10,2) NOT NULL,
        date DATE,
        location TEXT,
        instructors TEXT,
        max_participants INTEGER DEFAULT 20,
        is_active BOOLEAN DEFAULT true,
        is_popular BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create pricing_modals table
    await client.query(`
      CREATE TABLE IF NOT EXISTS pricing_modals (
        id SERIAL PRIMARY KEY,
        workshop_id INTEGER REFERENCES workshops(id) ON DELETE CASCADE,
        features_it JSONB,
        features_es JSONB,
        full_details_it TEXT,
        full_details_es TEXT,
        button_text_it TEXT DEFAULT 'Prenota Ora',
        button_text_es TEXT DEFAULT 'Reservar Ahora',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create testimonials table
    await client.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT,
        content_it TEXT,
        content_es TEXT,
        video_url TEXT,
        image_url TEXT,
        is_approved BOOLEAN DEFAULT false,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create coaches table
    await client.query(`
      CREATE TABLE IF NOT EXISTS coaches (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        title TEXT,
        bio_it TEXT,
        bio_es TEXT,
        image_url TEXT,
        specialties TEXT[],
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create site_content table
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        id SERIAL PRIMARY KEY,
        section TEXT NOT NULL,
        content_key TEXT NOT NULL,
        content_it TEXT,
        content_es TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(section, content_key)
      )
    `)

    // Create admin_users table for authentication
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create sessions table for authentication
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        id TEXT PRIMARY KEY,
        user_id INTEGER REFERENCES admin_users(id) ON DELETE CASCADE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log('Database tables created successfully')
  } catch (error) {
    console.error('Error creating database tables:', error)
    throw error
  } finally {
    client.release()
  }
}

export async function seedInitialData() {
  const client = await pool.connect()
  try {
    // Insert default admin user
    const hashedPassword = await require('bcryptjs').hash('K9mR7nQ2vX8pL5wY', 12)
    await client.query(`
      INSERT INTO admin_users (email, password_hash) 
      VALUES ($1, $2) 
      ON CONFLICT (email) DO NOTHING
    `, ['xk7m9p@freevoice.es', hashedPassword])

    // Insert default workshop data based on new pricing structure
    await client.query(`
      INSERT INTO workshops (title_it, title_es, description_it, description_es, price, date, location, instructors, is_popular) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      ON CONFLICT DO NOTHING
    `, [
      'Workshop di 1 Giorno - Ottobre',
      'Taller de 1 Día - Octubre', 
      'Esperienza immersiva di 8 ore per scoprire la tua voce autentica attraverso tecniche vocali, lavoro corporeo e respirazione.',
      'Experiencia inmersiva de 8 horas para descubrir tu voz auténtica a través de técnicas vocales, trabajo corporal y respiración.',
      90.00,
      '2025-10-12',
      'Healing Garden, Guía de Isora',
      'Jenny Rospo & Marian Giral Vega',
      true
    ])

    console.log('Initial data seeded successfully')
  } catch (error) {
    console.error('Error seeding initial data:', error)
    throw error
  } finally {
    client.release()
  }
}