import { NextRequest, NextResponse } from 'next/server'
import { validateAdminSession } from '@/lib/auth'
import { pool } from '@/lib/database'

export async function GET() {
  try {
    console.log('Admin workshops API called')
    const user = await validateAdminSession()
    console.log('Admin session validation result:', user ? 'SUCCESS' : 'FAILED')
    
    if (!user) {
      console.log('Unauthorized access to admin workshops API')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await pool.connect()
    try {
      const result = await client.query(`
        SELECT * FROM workshops 
        ORDER BY created_at DESC
      `)
      
      // Fix timezone issue for date display - format date without timezone conversion
      const workshops = result.rows.map(workshop => ({
        ...workshop,
        date: workshop.date ? `${workshop.date.getFullYear()}-${String(workshop.date.getMonth() + 1).padStart(2, '0')}-${String(workshop.date.getDate()).padStart(2, '0')}` : null
      }))
      
      return NextResponse.json({ workshops })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching workshops:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await validateAdminSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title_it,
      title_es,
      description_it,
      description_es,
      price,
      date,
      location,
      instructors,
      max_participants,
      is_active,
      is_popular,
      itinerary_it,
      itinerary_es,
      overview_title_it,
      overview_title_es,
      overview_description_it,
      overview_description_es,
      overview_expectations_it,
      overview_expectations_es,
      overview_target_audience_it,
      overview_target_audience_es,
      details_what_to_bring_it,
      details_what_to_bring_es,
      details_phone_policy_it,
      details_phone_policy_es,
      details_facilitators_it,
      details_facilitators_es,
    } = body

    // Fix timezone issue: ensure date is stored as selected without timezone conversion
    const processedDate = date ? date.split('T')[0] : null
    
    console.log('POST Workshop - Original date:', date)
    console.log('POST Workshop - Processed date:', processedDate)

    const client = await pool.connect()
    try {
      const result = await client.query(`
        INSERT INTO workshops (
          title_it, title_es, description_it, description_es,
          price, date, location, instructors, max_participants,
          is_active, is_popular, itinerary_it, itinerary_es,
          overview_title_it, overview_title_es,
          overview_description_it, overview_description_es,
          overview_expectations_it, overview_expectations_es,
          overview_target_audience_it, overview_target_audience_es,
          details_what_to_bring_it, details_what_to_bring_es,
          details_phone_policy_it, details_phone_policy_es,
          details_facilitators_it, details_facilitators_es
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)
        RETURNING *
      `, [
        title_it, title_es, description_it, description_es,
        price, processedDate, location, instructors, max_participants,
        is_active, is_popular, itinerary_it, itinerary_es,
        overview_title_it, overview_title_es,
        overview_description_it, overview_description_es,
        overview_expectations_it, overview_expectations_es,
        overview_target_audience_it, overview_target_audience_es,
        details_what_to_bring_it, details_what_to_bring_es,
        details_phone_policy_it, details_phone_policy_es,
        details_facilitators_it, details_facilitators_es
      ])

      return NextResponse.json({ workshop: result.rows[0] })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error creating workshop:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await validateAdminSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      id,
      title_it,
      title_es,
      description_it,
      description_es,
      price,
      date,
      location,
      instructors,
      max_participants,
      is_active,
      is_popular,
      itinerary_it,
      itinerary_es,
      overview_title_it,
      overview_title_es,
      overview_description_it,
      overview_description_es,
      overview_expectations_it,
      overview_expectations_es,
      overview_target_audience_it,
      overview_target_audience_es,
      details_what_to_bring_it,
      details_what_to_bring_es,
      details_phone_policy_it,
      details_phone_policy_es,
      details_facilitators_it,
      details_facilitators_es,
    } = body

    // Fix timezone issue: ensure date is stored as selected without timezone conversion
    const processedDate = date ? date.split('T')[0] : null
    
    console.log('PUT Workshop - Original date:', date)
    console.log('PUT Workshop - Processed date:', processedDate)
    console.log('PUT Workshop - ID:', id)

    const client = await pool.connect()
    try {
      const result = await client.query(`
        UPDATE workshops SET 
          title_it = $2, title_es = $3, description_it = $4, description_es = $5,
          price = $6, date = $7, location = $8, instructors = $9,
          max_participants = $10, is_active = $11, is_popular = $12,
          itinerary_it = $13, itinerary_es = $14,
          overview_title_it = $15, overview_title_es = $16,
          overview_description_it = $17, overview_description_es = $18,
          overview_expectations_it = $19, overview_expectations_es = $20,
          overview_target_audience_it = $21, overview_target_audience_es = $22,
          details_what_to_bring_it = $23, details_what_to_bring_es = $24,
          details_phone_policy_it = $25, details_phone_policy_es = $26,
          details_facilitators_it = $27, details_facilitators_es = $28,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *
      `, [
        id, title_it, title_es, description_it, description_es,
        price, processedDate, location, instructors, max_participants,
        is_active, is_popular, itinerary_it, itinerary_es,
        overview_title_it, overview_title_es,
        overview_description_it, overview_description_es,
        overview_expectations_it, overview_expectations_es,
        overview_target_audience_it, overview_target_audience_es,
        details_what_to_bring_it, details_what_to_bring_es,
        details_phone_policy_it, details_phone_policy_es,
        details_facilitators_it, details_facilitators_es
      ])

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Workshop not found' }, { status: 404 })
      }

      return NextResponse.json({ workshop: result.rows[0] })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error updating workshop:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await validateAdminSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Workshop ID required' }, { status: 400 })
    }

    const client = await pool.connect()
    try {
      const result = await client.query('DELETE FROM workshops WHERE id = $1 RETURNING id', [id])
      
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Workshop not found' }, { status: 404 })
      }

      return NextResponse.json({ success: true })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error deleting workshop:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}