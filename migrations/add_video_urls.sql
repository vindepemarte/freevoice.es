-- Add video URL columns to site_content table
ALTER TABLE site_content 
ADD COLUMN IF NOT EXISTS intro_video_url_it VARCHAR(255) DEFAULT 'https://www.youtube.com/embed/wz9EIsW0VRU',
ADD COLUMN IF NOT EXISTS intro_video_url_es VARCHAR(255) DEFAULT 'https://www.youtube.com/embed/aTEZkprxE9A',
ADD COLUMN IF NOT EXISTS testimonials_video_url_it VARCHAR(255) DEFAULT 'https://www.youtube.com/embed/bnT4iavyXTw',
ADD COLUMN IF NOT EXISTS testimonials_video_url_es VARCHAR(255) DEFAULT 'https://www.youtube.com/embed/5gA6ewP0nQk';
