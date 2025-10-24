import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/database'

/**
 * Temporary migration endpoint to add image_data and video_data columns
 * Access: /api/admin/migrate-image-data
 * This should be called once after deployment, then can be removed
 */
export async function POST(request: NextRequest) {
  try {
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
      
      // Add video_data column if it doesn't exist
      await client.query(`
        DO $$ 
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns 
                WHERE table_name='testimonials' AND column_name='video_data'
            ) THEN
                ALTER TABLE testimonials ADD COLUMN video_data TEXT;
                RAISE NOTICE 'Column video_data added successfully';
            ELSE
                RAISE NOTICE 'Column video_data already exists';
            END IF;
        END $$;
      `)
      
      // Verify both columns were added
      const result = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'testimonials' 
          AND column_name IN ('image_data', 'video_data')
        ORDER BY column_name
      `)
      
      if (result.rows.length > 0) {
        // Get statistics
        const countResult = await client.query('SELECT COUNT(*) FROM testimonials')
        const withImages = await client.query('SELECT COUNT(*) FROM testimonials WHERE image_data IS NOT NULL')
        const withVideos = await client.query('SELECT COUNT(*) FROM testimonials WHERE video_data IS NOT NULL')
        
        return NextResponse.json({
          success: true,
          message: 'Migration completed successfully',
          columns: result.rows,
          statistics: {
            total_testimonials: countResult.rows[0].count,
            with_base64_images: withImages.rows[0].count,
            with_base64_videos: withVideos.rows[0].count
          }
        })
      } else {
        return NextResponse.json(
          { error: 'Migration failed - column not found after creation' },
          { status: 500 }
        )
      }
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { 
        error: 'Migration failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check current status
export async function GET(request: NextRequest) {
  try {
    const client = await pool.connect()
    
    try {
      // Check if columns exist
      const columnCheck = await client.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = 'testimonials' 
          AND column_name IN ('image_data', 'video_data')
        ORDER BY column_name
      `)
      
      const imageExists = columnCheck.rows.some(row => row.column_name === 'image_data')
      const videoExists = columnCheck.rows.some(row => row.column_name === 'video_data')
      
      if (imageExists || videoExists) {
        const countResult = await client.query('SELECT COUNT(*) FROM testimonials')
        const withImages = await client.query('SELECT COUNT(*) FROM testimonials WHERE image_data IS NOT NULL')
        const withVideos = await client.query('SELECT COUNT(*) FROM testimonials WHERE video_data IS NOT NULL')
        
        return NextResponse.json({
          columns_exist: {
            image_data: imageExists,
            video_data: videoExists
          },
          column_info: columnCheck.rows,
          statistics: {
            total_testimonials: countResult.rows[0].count,
            with_base64_images: withImages.rows[0].count,
            with_base64_videos: withVideos.rows[0].count
          }
        })
      } else {
        return NextResponse.json({
          columns_exist: {
            image_data: false,
            video_data: false
          },
          message: 'Columns image_data and video_data do not exist. Call POST /api/admin/migrate-image-data to create them.'
        })
      }
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
