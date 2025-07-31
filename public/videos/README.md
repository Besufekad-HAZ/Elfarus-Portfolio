# Service Video Overlays

This directory contains video files for the service cards in the portfolio website.

## Current Video Files

The following video files are referenced in the ServiceSlider component:

- `news-sample.mp4` - News coverage videos
- `events-sample.mp4` - Event videography samples
- `documentaries-sample.mp4` - Documentary filmmaking
- `promotional-sample.mp4` - Promotional reels and social media content
- `corporate-sample.mp4` - Corporate video samples
- `billboards-sample.mp4` - Digital billboard advertisements
- `entertainment-sample.mp4` - Entertainment content

## How to Add Your Own Videos

1. **Replace the sample videos** with your actual video files
2. **Use compressed MP4 format** for optimal web performance
3. **Recommended video specs:**
   - Resolution: 1280x720 or 1920x1080
   - Format: MP4 (H.264 codec)
   - Duration: 10-30 seconds (looping)
   - File size: Under 5MB per video
   - Frame rate: 24-30 fps

## Video Requirements

- **Auto-play**: Videos will autoplay on hover
- **Muted**: Videos are muted for better user experience
- **Loop**: Videos loop continuously
- **Mobile-friendly**: Videos work on mobile devices

## File Naming Convention

Keep the same filenames as listed above, or update the video URLs in `components/ServiceSlider.js` to match your new filenames.

## Performance Tips

- Compress videos to reduce file size
- Use CDN hosting for better loading speeds
- Consider using WebM format as fallback for better compression
- Test on various devices and connection speeds
