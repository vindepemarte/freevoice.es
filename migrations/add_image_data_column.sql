-- Add image_data column to testimonials table for base64 storage
-- This migration adds support for storing images directly in the database

-- Add the column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name='testimonials' AND column_name='image_data'
    ) THEN
        ALTER TABLE testimonials ADD COLUMN image_data TEXT;
    END IF;
END $$;

-- Optional: If you want to migrate existing filesystem images to base64
-- You'll need to do this manually or create a migration script

COMMENT ON COLUMN testimonials.image_data IS 'Base64 encoded image data (data:image/...;base64,...)';
