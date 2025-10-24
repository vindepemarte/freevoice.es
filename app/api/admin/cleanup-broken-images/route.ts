import { NextRequest, NextResponse } from 'next/server'
import { validateAdminSession } from '@/lib/auth'
import { pool } from '@/lib/database'

/**
 * Cleanup endpoint to fix or remove testimonials with broken filesystem images
 * Access: /api/admin/cleanup-broken-images
 */
export async function POST(request: NextRequest) {
  try {
    const user = await validateAdminSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await pool.connect()
    
    try {
      // Find testimonials with filesystem image paths (not base64)
      const brokenImages = await client.query(`
        SELECT id, name, image_url, video_url
        FROM testimonials 
        WHERE (image_url IS NOT NULL AND image_url NOT LIKE 'data:%')
           OR (video_url IS NOT NULL AND video_url NOT LIKE 'data:%')
      `)
      
      const affectedIds = brokenImages.rows.map(row => row.id)
      
      if (affectedIds.length === 0) {
        return NextResponse.json({
          success: true,
          message: 'No broken images found',
          cleaned: 0
        })
      }
      
      // Option 1: Clear the broken URLs (set to NULL)
      await client.query(`
        UPDATE testimonials 
        SET 
          image_url = CASE 
            WHEN image_url NOT LIKE 'data:%' THEN NULL 
            ELSE image_url 
          END,
          video_url = CASE 
            WHEN video_url NOT LIKE 'data:%' THEN NULL 
            ELSE video_url 
          END
        WHERE id = ANY($1)
      `, [affectedIds])
      
      return NextResponse.json({
        success: true,
        message: 'Broken filesystem URLs cleared',
        cleaned: affectedIds.length,
        affected_ids: affectedIds,
        testimonials: brokenImages.rows
      })
      
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Cleanup error:', error)
    return NextResponse.json(
      { 
        error: 'Cleanup failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check what needs cleanup
export async function GET(request: NextRequest) {
  try {
    const user = await validateAdminSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await pool.connect()
    
    try {
      // Find testimonials with filesystem image paths
      const brokenImages = await client.query(`
        SELECT id, name, image_url, video_url, image_data, video_data
        FROM testimonials 
        WHERE (image_url IS NOT NULL AND image_url NOT LIKE 'data:%')
           OR (video_url IS NOT NULL AND video_url NOT LIKE 'data:%')
      `)
      
      const totalTestimonials = await client.query('SELECT COUNT(*) FROM testimonials')
      
      return NextResponse.json({
        total_testimonials: totalTestimonials.rows[0].count,
        testimonials_with_broken_urls: brokenImages.rows.length,
        broken_testimonials: brokenImages.rows.map(row => ({
          id: row.id,
          name: row.name,
          has_broken_image: row.image_url && !row.image_url.startsWith('data:'),
          has_broken_video: row.video_url && !row.video_url.startsWith('data:'),
          has_base64_image: !!row.image_data,
          has_base64_video: !!row.video_data
        }))
      })
      
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { 
        error: 'Status check failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
