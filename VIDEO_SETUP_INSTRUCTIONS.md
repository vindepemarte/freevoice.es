# Video Setup Instructions

## Adding Real Videos to the Jenny Intro Section

The Jenny intro section has been updated to support real video playback. To add actual videos:

### 1. Video File Requirements

Place your video files in the `/public` directory with these names:
- `jenny-intro-video.mp4` (H.264 encoded, recommended)
- `jenny-intro-video.webm` (VP9 encoded, for better browser compatibility)

### 2. Recommended Video Specifications

- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Aspect Ratio**: 16:9 (maintained by CSS)
- **Duration**: 3-5 minutes (optimal for intro content)
- **Audio**: Include high-quality audio with clear speech
- **Bitrate**: 
  - Video: 2-5 Mbps for 1080p, 1-3 Mbps for 720p
  - Audio: 128-192 kbps AAC

### 3. Video Encoding Tips

For optimal web delivery:
```bash
# MP4 (H.264)
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k jenny-intro-video.mp4

# WebM (VP9)
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k jenny-intro-video.webm
```

### 4. Features Implemented

- ✅ Video thumbnail with custom play button
- ✅ Native browser video controls
- ✅ Autoplay on click
- ✅ Fallback to poster image if video fails
- ✅ Responsive design
- ✅ Proper aspect ratio maintenance
- ✅ Multiple format support (MP4/WebM)

### 5. Customization Options

You can customize the video player by modifying `/components/jenny-intro-section.tsx`:

- Change video sources in the `<source>` tags
- Modify the poster image
- Adjust the play button styling
- Add custom video controls overlay

### 6. Testing

After adding your video files:
1. Clear browser cache
2. Test on different devices and browsers
3. Verify audio playback works
4. Check loading performance
5. Test fallback behavior

The component will gracefully handle missing video files by showing the poster image.