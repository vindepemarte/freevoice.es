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
        title_it TEXT,
        title_es TEXT,
        bio_it TEXT,
        bio_es TEXT,
        image_url TEXT,
        specialties_it TEXT[],
        specialties_es TEXT[],
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Add missing columns if they don't exist (for existing databases)
    await client.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='coaches' AND column_name='title_it') THEN
          ALTER TABLE coaches ADD COLUMN title_it TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='coaches' AND column_name='title_es') THEN
          ALTER TABLE coaches ADD COLUMN title_es TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='coaches' AND column_name='specialties_it') THEN
          ALTER TABLE coaches ADD COLUMN specialties_it TEXT[];
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='coaches' AND column_name='specialties_es') THEN
          ALTER TABLE coaches ADD COLUMN specialties_es TEXT[];
        END IF;
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='coaches' AND column_name='title') THEN
          UPDATE coaches SET title_it = title, title_es = title WHERE title_it IS NULL;
          ALTER TABLE coaches DROP COLUMN title;
        END IF;
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='coaches' AND column_name='specialties') THEN
          UPDATE coaches SET specialties_it = specialties, specialties_es = specialties WHERE specialties_it IS NULL;
          ALTER TABLE coaches DROP COLUMN specialties;
        END IF;
        
        -- Add itinerary columns to workshops table if they don't exist
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='itinerary_it') THEN
          ALTER TABLE workshops ADD COLUMN itinerary_it TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workshops' AND column_name='itinerary_es') THEN
          ALTER TABLE workshops ADD COLUMN itinerary_es TEXT;
        END IF;
      END $$;
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
      INSERT INTO workshops (title_it, title_es, description_it, description_es, price, date, location, instructors, is_popular, itinerary_it, itinerary_es) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
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
      true,
      '9:30 - Arrivo e registrazione\n10:00 - Cerchio di apertura e presentazioni\n10:30 - Riscaldamento vocale e respirazione\n11:30 - Pausa\n12:00 - Tecnica vocale e improvvisazione\n13:30 - Pausa pranzo\n14:30 - Lavoro corporeo e movimento\n15:30 - Connessione voce-corpo\n16:30 - Pausa\n17:00 - Performance individuale\n18:00 - Cerchio di chiusura\n18:30 - Saluti finali',
      '9:30 - Llegada y registro\n10:00 - Círculo de apertura y presentaciones\n10:30 - Calentamiento vocal y respiración\n11:30 - Descanso\n12:00 - Técnica vocal e improvisación\n13:30 - Pausa para almorzar\n14:30 - Trabajo corporal y movimiento\n15:30 - Conexión voz-cuerpo\n16:30 - Descanso\n17:00 - Performance individual\n18:00 - Círculo de cierre\n18:30 - Despedidas finales'
    ])

    // Insert default coaches
    const coaches = [
      {
        name: 'David Cardano',
        title_it: 'Dott. in Scienze della Motricità, Psicologo, Psicoterapeuta',
        title_es: 'Dr. en Ciencias de la Motricidad, Psicólogo, Psicoterapeuta',
        bio_it: 'Specialista in psicologia della performance e sviluppo personale attraverso il movimento.',
        bio_es: 'Especialista en psicología del rendimiento y desarrollo personal a través del movimiento.',
        image_url: '/professional-male-coach-with-glasses.jpg',
        specialties_it: ['Psicologia', 'Motricità', 'Terapia'],
        specialties_es: ['Psicología', 'Motricidad', 'Terapia'],
        display_order: 1
      },
      {
        name: 'Laura Monza',
        title_it: 'Mental Trainer, Coach Spirituale di Vita, Psicologa',
        title_es: 'Entrenadora Mental, Coach Spiritual de Vida, Psicóloga',
        bio_it: 'Esperta in trasformazione personale e coaching spirituale per artisti e performer.',
        bio_es: 'Experta en transformación personal y coaching espiritual para artistas y performers.',
        image_url: '/professional-female-spiritual-coach.jpg',
        specialties_it: ['Coaching Mentale', 'Spiritualità', 'Sviluppo Personale'],
        specialties_es: ['Coaching Mental', 'Espiritualidad', 'Desarrollo Personal'],
        display_order: 2
      },
      {
        name: 'Jenny Rospo',
        title_it: 'Cantante, Vocal Coach',
        title_es: 'Cantante, Vocal Coach',
        bio_it: 'Cantante professionale e vocal coach specializzata nella liberazione della voce autentica.',
        bio_es: 'Cantante profesional y coach vocal especializada en liberación de la voz auténtica.',
        image_url: '/professional-female-vocal-coach-singing.jpg',
        specialties_it: ['Tecnica Vocale', 'Interpretazione', 'Performance'],
        specialties_es: ['Técnica Vocal', 'Interpretación', 'Performance'],
        display_order: 3
      },
      {
        name: 'Marian Giral Vega',
        title_it: 'Ballerina, Istruttrice di Corpo e Cuore',
        title_es: 'Bailarina, Instructora de Cuerpo y Corazón',
        bio_it: 'Ballerina professionale specializzata nella connessione tra corpo, cuore ed espressione artistica.',
        bio_es: 'Bailarina profesional especializada en la conexión entre cuerpo, corazón y expresión artística.',
        image_url: '/professional-female-dance-instructor.jpg',
        specialties_it: ['Danza', 'Espressione Corporea', 'Connessione Emotiva'],
        specialties_es: ['Danza', 'Expresión Corporal', 'Conexión Emocional'],
        display_order: 4
      }
    ]

    for (const coach of coaches) {
      await client.query(`
        INSERT INTO coaches (name, title_it, title_es, bio_it, bio_es, image_url, specialties_it, specialties_es, display_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT DO NOTHING
      `, [
        coach.name, coach.title_it, coach.title_es, coach.bio_it, coach.bio_es,
        coach.image_url, coach.specialties_it, coach.specialties_es, coach.display_order
      ])
    }

    // Insert default testimonials
    const testimonials = [
      {
        name: 'María Rodríguez',
        role: 'Ex Estudiante',
        content_it: 'Il workshop ha cambiato la mia vita! Ho scoperto una voce che non sapevo di avere.',
        content_es: 'El workshop cambió mi vida! Descubrí una voz que no sabía que tenía.',
        image_url: '/happy-female-singer-headshot.jpg',
        video_url: '/testimonials/maria-rodriguez-testimonial.mp4',
        is_approved: true,
        display_order: 1
      },
      {
        name: 'Alessandro Bianchi',
        role: 'Attore Teatrale',
        content_it: 'Jenny e il suo team sono incredibili. Il lavoro corporeo + vocale ha cambiato la mia recitazione per sempre.',
        content_es: 'Jenny y su equipo son increíbles. El trabajo corporal + vocal cambio mi actuación para siempre.',
        image_url: '/confident-male-actor-headshot.jpg',
        video_url: '/testimonials/alessandro-bianchi-testimonial.mp4',
        is_approved: true,
        display_order: 2
      },
      {
        name: 'Carmen Gutiérrez',
        role: 'Insegnante di Musica',
        content_it: 'Ero scettica all\'inizio. Ma questo workshop supera ogni aspettativa. Ora insegno questi principi ai miei studenti.',
        content_es: 'Era escéptica al principio. Pero este workshop supera toda expectativa. Ahora enseño estos principios a mis estudiantes.',
        image_url: '/professional-female-music-teacher.jpg',
        video_url: '/testimonials/carmen-gutierrez-testimonial.mp4',
        is_approved: true,
        display_order: 3
      }
    ]

    for (const testimonial of testimonials) {
      await client.query(`
        INSERT INTO testimonials (name, role, content_it, content_es, image_url, video_url, is_approved, display_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT DO NOTHING
      `, [
        testimonial.name, testimonial.role, testimonial.content_it, testimonial.content_es,
        testimonial.image_url, testimonial.video_url, testimonial.is_approved, testimonial.display_order
      ])
    }

    console.log('Initial data seeded successfully')
  } catch (error) {
    console.error('Error seeding initial data:', error)
    throw error
  } finally {
    client.release()
  }
}