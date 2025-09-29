#!/usr/bin/env node

import { initializeDatabase, seedInitialData } from '../lib/database.js'

async function setup() {
  try {
    console.log('Initializing database...')
    await initializeDatabase()
    console.log('Seeding initial data...')
    await seedInitialData()
    console.log('Database setup completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Database setup failed:', error)
    process.exit(1)
  }
}

setup()