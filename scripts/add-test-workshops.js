/**
 * Script to add test workshops with different dates to demonstrate dynamic date functionality
 */

const { Pool } = require('pg')

// Get database config similar to database.ts
function getDatabaseConfig() {
  let connectionString = process.env.DATABASE_URL || 'postgres://freevoice:TK3eq3JUz41RW1UZKTaBrKiHAcBDS1YNapZ3iRLdKBH7OqVPMIpxp1KH8zpkIKC3@38.242.151.194:8888/freevoice-es?sslmode=disable'
  
  if (!connectionString.includes('sslmode=disable')) {
    connectionString += connectionString.includes('?') ? '&sslmode=disable' : '?sslmode=disable'
  }
  
  return {
    connectionString,
    ssl: false
  }
}

const dbConfig = getDatabaseConfig()
const pool = new Pool({
  connectionString: dbConfig.connectionString,
  ssl: dbConfig.ssl
})

async function addTestWorkshops() {
  console.log('Adding test workshops to database...')
  
  const client = await pool.connect()
  
  // Current date for reference
  const today = new Date()
  console.log('Today:', today.toISOString().split('T')[0])
  
  // Add a workshop for next month (November 2024)
  const november2024 = new Date('2024-11-19')
  
  // Add a workshop for next year (March 2025)  
  const march2025 = new Date('2025-03-15')
  
  // Add a workshop for December 2024
  const december2024 = new Date('2024-12-14')
  
  try {
    // First, let's see what workshops currently exist
    console.log('\nCurrent workshops:')
    const existingWorkshops = await client.query('SELECT id, title_es, date, is_active FROM workshops ORDER BY date')
    existingWorkshops.rows.forEach(w => {
      console.log(`- ID: ${w.id}, Title: ${w.title_es}, Date: ${w.date}, Active: ${w.is_active}`)
    })
    
    // Insert November 2024 workshop
    console.log('\nAdding November 2024 workshop...')
    await client.query(`
      INSERT INTO workshops (
        title_it, title_es, description_it, description_es,
        price, date, location, instructors, is_active, is_popular,
        itinerary_it, itinerary_es,
        overview_title_it, overview_title_es, overview_description_it, overview_description_es
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    `, [
      'Workshop di 1 Giorno - Novembre',
      'Taller de 1 Día - Noviembre', 
      'Esperienza immersiva di 8 ore per scoprire la tua voce autentica attraverso tecniche vocali, lavoro corporeo e respirazione.',
      'Experiencia inmersiva de 8 horas para descubrir tu voz auténtica a través de técnicas vocales, trabajo corporal y respiración.',
      90.00,
      november2024.toISOString().split('T')[0],
      'Healing Garden, Guía de Isora',
      'Jenny Rospo & Marian Giral Vega',
      true,
      false,
      '9:30 - Arrivo e registrazione\n10:00 - Cerchio di apertura e presentazioni\n10:30 - Riscaldamento vocale e respirazione\n11:30 - Pausa\n12:00 - Tecnica vocale e improvvisazione\n13:30 - Pausa pranzo\n14:30 - Lavoro corporeo e movimento\n15:30 - Connessione voce-corpo\n16:30 - Pausa\n17:00 - Performance individuale\n18:00 - Cerchio di chiusura\n18:30 - Saluti finali',
      '9:30 - Llegada y registro\n10:00 - Círculo de apertura y presentaciones\n10:30 - Calentamiento vocal y respiración\n11:30 - Descanso\n12:00 - Técnica vocal e improvisación\n13:30 - Pausa para almorzar\n14:30 - Trabajo corporal y movimiento\n15:30 - Conexión voz-cuerpo\n16:30 - Descanso\n17:00 - Performance individual\n18:00 - Círculo de cierre\n18:30 - Despedidas finales',
      '🎶 Canta per ritrovarti, cresci per risuonare con la tua anima autentica',
      '🎶 Canta para reencontrarte, crece para resonar con tu alma auténtica',
      'Una giornata speciale per ritrovare la tua voce... e qualcosa di più profondo. Un\'esperienza dedicata a chi canta, a chi parla, a chi crea con la voce – e a chi desidera riconnettersi con la propria essenza attraverso il suono, il respiro, il corpo e il silenzio.',
      'Un día especial para redescubrir tu voz... y algo más profundo. Una experiencia dedicada a quienes cantan, hablan, crean con la voz - y a quienes desean reconectarse con su esencia a través del sonido, la respiración, el cuerpo y el silencio.'
    ])

    // Insert December 2024 workshop
    console.log('Adding December 2024 workshop...')
    await client.query(`
      INSERT INTO workshops (
        title_it, title_es, description_it, description_es,
        price, date, location, instructors, is_active, is_popular,
        itinerary_it, itinerary_es,
        overview_title_it, overview_title_es, overview_description_it, overview_description_es
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    `, [
      'Workshop di 1 Giorno - Dicembre',
      'Taller de 1 Día - Diciembre',
      'Esperienza immersiva di 8 ore per scoprire la tua voce autentica attraverso tecniche vocali, lavoro corporeo e respirazione.',
      'Experiencia inmersiva de 8 horas para descubrir tu voz auténtica a través de técnicas vocales, trabajo corporal y respiración.',
      90.00,
      december2024.toISOString().split('T')[0],
      'Healing Garden, Guía de Isora',
      'Jenny Rospo & Marian Giral Vega',
      true,
      true, // This one will be popular
      '9:30 - Arrivo e registrazione\n10:00 - Cerchio di apertura e presentazioni\n10:30 - Riscaldamento vocale e respirazione\n11:30 - Pausa\n12:00 - Tecnica vocale e improvvisazione\n13:30 - Pausa pranzo\n14:30 - Lavoro corporeo e movimento\n15:30 - Connessione voce-corpo\n16:30 - Pausa\n17:00 - Performance individuale\n18:00 - Cerchio di chiusura\n18:30 - Saluti finali',
      '9:30 - Llegada y registro\n10:00 - Círculo de apertura y presentaciones\n10:30 - Calentamiento vocal y respiración\n11:30 - Descanso\n12:00 - Técnica vocal e improvisación\n13:30 - Pausa para almorzar\n14:30 - Trabajo corporal y movimiento\n15:30 - Conexión voz-cuerpo\n16:30 - Descanso\n17:00 - Performance individual\n18:00 - Círculo de cierre\n18:30 - Despedidas finales',
      '🎶 Canta per ritrovarti, cresci per risuonare con la tua anima autentica',
      '🎶 Canta para reencontrarte, crece para resonar con tu alma auténtica',
      'Una giornata speciale per ritrovare la tua voce... e qualcosa di più profondo. Un\'esperienza dedicata a chi canta, a chi parla, a chi crea con la voce – e a chi desidera riconnettersi con la propria essenza attraverso il suono, il respiro, il corpo e il silenzio.',
      'Un día especial para redescubrir tu voz... y algo más profundo. Una experiencia dedicada a quienes cantan, hablan, crean con la voz - y a quienes desean reconectarse con su esencia a través del sonido, la respiración, el cuerpo y el silencio.'
    ])

    // Insert March 2025 workshop
    console.log('Adding March 2025 workshop...')
    await client.query(`
      INSERT INTO workshops (
        title_it, title_es, description_it, description_es,
        price, date, location, instructors, is_active, is_popular,
        itinerary_it, itinerary_es,
        overview_title_it, overview_title_es, overview_description_it, overview_description_es
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    `, [
      'Workshop di 1 Giorno - Marzo',
      'Taller de 1 Día - Marzo',
      'Esperienza immersiva di 8 ore per scoprire la tua voce autentica attraverso tecniche vocali, lavoro corporeo e respirazione.',
      'Experiencia inmersiva de 8 horas para descubrir tu voz auténtica a través de técnicas vocales, trabajo corporal y respiración.',
      95.00,
      march2025.toISOString().split('T')[0],
      'Healing Garden, Guía de Isora',
      'Jenny Rospo & Marian Giral Vega',
      true,
      false,
      '9:30 - Arrivo e registrazione\n10:00 - Cerchio di apertura e presentazioni\n10:30 - Riscaldamento vocale e respirazione\n11:30 - Pausa\n12:00 - Tecnica vocale e improvvisazione\n13:30 - Pausa pranzo\n14:30 - Lavoro corporeo e movimento\n15:30 - Connessione voce-corpo\n16:30 - Pausa\n17:00 - Performance individuale\n18:00 - Cerchio di chiusura\n18:30 - Saluti finali',
      '9:30 - Llegada y registro\n10:00 - Círculo de apertura y presentaciones\n10:30 - Calentamiento vocal y respiración\n11:30 - Descanso\n12:00 - Técnica vocal e improvisación\n13:30 - Pausa para almorzar\n14:30 - Trabajo corporal y movimiento\n15:30 - Conexión voz-cuerpo\n16:30 - Descanso\n17:00 - Performance individual\n18:00 - Círculo de cierre\n18:30 - Despedidas finales',
      '🎶 Canta per ritrovarti, cresci per risuonare con la tua anima autentica',
      '🎶 Canta para reencontrarte, crece para resonar con tu alma auténtica',
      'Una giornata speciale per ritrovare la tua voce... e qualcosa di più profondo. Un\'esperienza dedicata a chi canta, a chi parla, a chi crea con la voce – e a chi desidera riconnettersi con la propria essenza attraverso il suono, il respiro, il corpo e il silenzio.',
      'Un día especial para redescubrir tu voz... y algo más profundo. Una experiencia dedicada a quienes cantan, hablan, crean con la voz - y a quienes desean reconectarse con su esencia a través del sonido, la respiración, el cuerpo y el silencio.'
    ])

    console.log('\nUpdated workshops:')
    const updatedWorkshops = await client.query('SELECT id, title_es, date, is_active FROM workshops ORDER BY date')
    updatedWorkshops.rows.forEach(w => {
      console.log(`- ID: ${w.id}, Title: ${w.title_es}, Date: ${w.date}, Active: ${w.is_active}`)
    })

    client.release()
    await pool.end()
    console.log('\n✅ Test workshops added successfully!')
    console.log('\nNow the website should show dynamic dates based on the next upcoming workshop.')
    
  } catch (error) {
    console.error('❌ Error adding test workshops:', error)
    client.release()
    await pool.end()
  }
}

// Run the script
addTestWorkshops()