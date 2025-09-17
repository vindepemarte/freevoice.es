# Testimonial Videos Setup Guide

## Directory Structure

To add testimonial videos to your FreeVoice.es website, place your video files in the following directory:

```
/public/testimonials/
```

## Required Video Files

Based on the current testimonials data, you need to add these video files:

1. **María Rodríguez (Spanish Singer)**
   - File: `/public/testimonials/maria-rodriguez-testimonial.mp4`
   - Duration: 2:34
   - Workshop: 3-day program

2. **Alessandro Bianchi (Italian Actor)**
   - File: `/public/testimonials/alessandro-bianchi-testimonial.mp4`
   - Duration: 3:12
   - Workshop: 3-day program

3. **Carmen Gutiérrez (Spanish Music Teacher)**
   - File: `/public/testimonials/carmen-gutierrez-testimonial.mp4`
   - Duration: 2:58
   - Workshop: 1-day program

## Video Specifications

### Recommended Format
- **Primary Format**: MP4 (H.264 codec)
- **Secondary Format**: WebM (VP9 codec) - optional but recommended for better browser compatibility
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Aspect Ratio**: 16:9 (automatically handled by CSS)
- **Audio**: AAC codec, 128-192 kbps
- **Video Bitrate**: 2-5 Mbps for 1080p, 1-3 Mbps for 720p

### File Naming Convention
Follow this pattern: `[first-name]-[last-name]-testimonial.mp4`

Examples:
- `maria-rodriguez-testimonial.mp4`
- `alessandro-bianchi-testimonial.mp4`
- `carmen-gutierrez-testimonial.mp4`

## Adding New Testimonials

To add a new testimonial:

1. **Add the video file** to `/public/testimonials/`
2. **Update the testimonials array** in `/components/testimonials-section.tsx`
3. **Add the video thumbnail** to `/public/` (if you have one)

Example testimonial object:
```javascript
{
  name: "New Person Name",
  location: "City, Country",
  role: {
    es: "Role in Spanish",
    it: "Role in Italian",
  },
  image: "/person-headshot.jpg",
  videoThumbnail: "/person-testimonial-thumbnail.jpg",
  videoSrc: "/testimonials/person-name-testimonial.mp4",
  content: {
    es: "Testimonial text in Spanish",
    it: "Testimonial text in Italian",
  },
  beforeAfter: {
    es: "Before → After in Spanish",
    it: "Before → After in Italian"
  },
  rating: 5,
  videoDuration: "2:45",
  workshopType: "3day" // or "1day"
}
```

## Video Optimization Tips

### For Web Delivery
Use FFmpeg to optimize your videos:

```bash
# MP4 (H.264) - Primary format
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k maria-rodriguez-testimonial.mp4

# WebM (VP9) - Secondary format (optional)
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k maria-rodriguez-testimonial.webm
```

### File Size Guidelines
- **Target file size**: 10-30 MB per video (2-3 minutes)
- **Maximum recommended**: 50 MB per video
- **Mobile optimization**: Consider creating smaller versions for mobile devices

## Features Implemented

✅ **Responsive Video Player**
- Automatic aspect ratio maintenance (16:9)
- Mobile-friendly controls
- Smooth transitions

✅ **Multiple Format Support**
- Primary: MP4 (H.264)
- Fallback: WebM (VP9)
- Graceful degradation to thumbnail if video fails

✅ **User Experience**
- Click to play/pause
- Native browser controls
- Smooth hover effects
- Auto-return to thumbnail when video ends

✅ **Performance Optimized**
- Lazy loading (videos only load when played)
- Compressed thumbnails for fast initial load
- Hardware accelerated playback

## Directory Setup Commands

Create the testimonials directory:

```bash
# Navigate to your project
cd /Users/vdpm/Documents/Websites/freevoice.es

# Create the testimonials directory
mkdir -p public/testimonials

# Verify the directory was created
ls -la public/testimonials
```

## Testing Checklist

After adding your videos:

1. ✅ Check video files are in correct directory
2. ✅ Verify file names match the testimonials data
3. ✅ Test video playback on desktop
4. ✅ Test video playback on mobile
5. ✅ Verify audio is working
6. ✅ Check loading performance
7. ✅ Test fallback behavior (what happens if video doesn't load)

## Troubleshooting

### Video Not Playing
- Check file path is correct
- Verify video codec is supported (H.264 recommended)
- Ensure file size isn't too large (max 50MB recommended)

### Poor Performance
- Compress videos using FFmpeg
- Consider creating separate mobile-optimized versions
- Ensure your server supports Range requests for video streaming

### Audio Issues
- Check audio codec (AAC recommended)
- Verify audio levels are consistent across all videos
- Test with different devices and browsers

The video player will gracefully handle missing files by showing the thumbnail image instead.