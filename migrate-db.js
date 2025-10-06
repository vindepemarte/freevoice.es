// Import pg directly to run the migration
const { Pool } = require('pg');

// Database configuration
let connectionString = process.env.DATABASE_URL || 'postgres://freevoice:YA3T2bXVkSHnvClYY0CqTWKJVmrzPHE7KzFzA1scDkT2dRxOg8dCQBS2g0lfGc5p@38.242.151.194:8888/freevoice-es'

// Ensure sslmode=disable is in the connection string
if (!connectionString.includes('sslmode=disable')) {
  connectionString += connectionString.includes('?') ? '&sslmode=disable' : '?sslmode=disable'
}

const pool = new Pool({
  connectionString,
  ssl: false
});

async function runMigration() {
  const client = await pool.connect();
  try {
    console.log('Starting database migration...');
    
    // Apply the overview and details columns migration
    await client.query(`
      DO $$ 
      BEGIN
        -- Add overview content columns to workshops table if they don't exist
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='overview_title_it') THEN
          ALTER TABLE workshops ADD COLUMN overview_title_it TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='overview_title_es') THEN
          ALTER TABLE workshops ADD COLUMN overview_title_es TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='overview_description_it') THEN
          ALTER TABLE workshops ADD COLUMN overview_description_it TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='overview_description_es') THEN
          ALTER TABLE workshops ADD COLUMN overview_description_es TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='overview_expectations_it') THEN
          ALTER TABLE workshops ADD COLUMN overview_expectations_it TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='overview_expectations_es') THEN
          ALTER TABLE workshops ADD COLUMN overview_expectations_es TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='overview_target_audience_it') THEN
          ALTER TABLE workshops ADD COLUMN overview_target_audience_it TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='overview_target_audience_es') THEN
          ALTER TABLE workshops ADD COLUMN overview_target_audience_es TEXT;
        END IF;
        
        -- Add details content columns to workshops table if they don't exist
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='details_what_to_bring_it') THEN
          ALTER TABLE workshops ADD COLUMN details_what_to_bring_it TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='details_what_to_bring_es') THEN
          ALTER TABLE workshops ADD COLUMN details_what_to_bring_es TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='details_phone_policy_it') THEN
          ALTER TABLE workshops ADD COLUMN details_phone_policy_it TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='details_phone_policy_es') THEN
          ALTER TABLE workshops ADD COLUMN details_phone_policy_es TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='details_facilitators_it') THEN
          ALTER TABLE workshops ADD COLUMN details_facilitators_it TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='details_facilitators_es') THEN
          ALTER TABLE workshops ADD COLUMN details_facilitators_es TEXT;
        END IF;
      END $$;
    `);

    console.log('Database migration completed successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();