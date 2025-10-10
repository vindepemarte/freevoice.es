# Testimonial Submission & Upload Features

## Overview
This document describes the new testimonial submission and media upload features implemented for the Free Voice Academy website.

## Features Implemented

### 1. Public Testimonial Submission (No Registration Required)
Users can now submit written testimonials with an optional photo directly from the website without needing to register or log in.

#### User Flow:
1. Users click the **"Invia Testimonianza" / "Enviar Testimonio"** button in the testimonials section
2. A modal form opens where they can:
   - Enter their name (required)
   - Enter their profession/role (optional)
   - Write their testimonial in Italian (required)
   - Write their testimonial in Spanish (required)
   - Upload a photo (optional, max 5MB)
3. Submit the form
4. Testimonial is saved to the database with `is_approved = false` (pending approval)
5. Admin must approve it before it appears on the public website

#### Technical Details:
- **Component**: `/components/testimonial-submission-form.tsx`
- **API Endpoint**: `/app/api/public/testimonials/submit/route.ts`
- **Database**: Testimonials are stored in the `testimonials` table with bilingual content

### 2. Admin Upload Functionality
The admin dashboard now features file upload capabilities instead of requiring manual URL entry.

#### For Testimonials:
- **Image Upload**: Click to upload testimonial images (JPEG, PNG, WebP, GIF - max 5MB)
- **Video Upload**: Click to upload testimonial videos (MP4, WebM, MOV, AVI - max 50MB)
- Files are automatically saved to `/public/uploads/images/testimonial/` or `/public/uploads/videos/testimonial/`
- URLs are automatically populated in the database

#### For Coaches:
- **Image Upload**: Click to upload coach profile images (JPEG, PNG, WebP, GIF - max 5MB)
- Files are saved to `/public/uploads/images/coach/`
- Preview shown immediately after upload

#### Technical Details:
- **Image Upload API**: `/app/api/upload/image/route.ts`
- **Video Upload API**: `/app/api/upload/video/route.ts` (already existed)
- **Updated Components**: 
  - `TestimonialForm` in `/components/admin/dashboard.tsx`
  - `CoachForm` in `/components/admin/dashboard.tsx`

### 3. Enhanced Admin Testimonial Management

#### Approval Workflow:
- **Pending testimonials** are highlighted with yellow background and "In attesa di approvazione" badge
- Pending testimonials appear **first** in the list (sorted to top)
- Counter badges show:
  - Number of pending testimonials (yellow)
  - Number of approved testimonials (green)
- Admin can quickly approve/reject by toggling the "Approvato" switch while editing

#### Visual Indicators:
- ✅ **Green badge**: Approved testimonials
- ⏳ **Yellow badge (pulsing)**: Pending approval
- Approved testimonials have normal gray background
- Pending testimonials have yellow/amber background

## File Structure

```
/app/api/
  /upload/
    /image/route.ts          # Image upload endpoint (NEW)
    /video/route.ts          # Video upload endpoint (existing)
  /public/
    /testimonials/
      /submit/route.ts       # Public testimonial submission (NEW)

/components/
  testimonial-submission-form.tsx   # Public submission form (NEW)
  testimonials-section.tsx          # Updated with submission button
  /admin/
    dashboard.tsx                   # Updated with upload functionality

/public/uploads/
  /images/
    /testimonial/            # Testimonial images
    /coach/                  # Coach profile images
  /videos/
    /testimonial/            # Testimonial videos
```

## Usage Instructions

### For Website Visitors:
1. Navigate to the testimonials section on the website
2. Click **"Invia Testimonianza"** (IT) or **"Enviar Testimonio"** (ES)
3. Fill out the bilingual form
4. Optionally upload a photo
5. Submit and wait for admin approval

### For Administrators:

#### Reviewing Submitted Testimonials:
1. Log in to admin dashboard at `/admin`
2. Navigate to **"Testimonianze"** tab
3. Pending testimonials appear **at the top** with yellow background
4. Click **Edit** on a pending testimonial
5. Review content in both languages
6. Toggle **"Approvato"** switch to approve
7. Adjust display order if needed
8. Click **"Salva"** to save

#### Creating New Testimonials:
1. Click **"Aggiungi Testimonianza"**
2. Fill in name, role, and content (IT & ES)
3. **Upload Image**: Click file input to select image (automatic upload)
4. **Upload Video**: Click file input to select video (automatic upload)
5. Set approval status and display order
6. Save

#### Creating/Editing Coaches:
1. Navigate to **"Coach"** tab
2. Click **"Aggiungi Coach"** or edit existing
3. **Upload Image**: Click file input to upload profile photo
4. Fill in bilingual titles, bios, and specialties
5. Save

## Security & Validation

### File Upload Restrictions:
- **Images**: JPEG, PNG, WebP, GIF only - Max 5MB
- **Videos**: MP4, WebM, MOV, AVI only - Max 50MB
- Files saved with unique timestamp-based names to prevent conflicts
- Server-side validation on file types and sizes

### Public Submissions:
- No authentication required (by design)
- All submissions require admin approval before appearing publicly
- XSS protection through proper sanitization
- Rate limiting recommended for production (not implemented yet)

## Database Schema

The `testimonials` table includes:
```sql
- id (serial primary key)
- name (text, required)
- role (text, optional)
- content_it (text, Italian content)
- content_es (text, Spanish content)
- video_url (text, optional)
- image_url (text, optional)
- is_approved (boolean, default: false)
- display_order (integer, default: 0)
- created_at (timestamp)
- updated_at (timestamp)
```

## Future Enhancements (Optional)

1. **Email notifications** when new testimonials are submitted
2. **Rate limiting** on public submission endpoint
3. **Image optimization** (automatic resize/compress on upload)
4. **Video transcoding** (convert to web-optimized formats)
5. **Bulk approval** feature for admins
6. **Testimonial moderation queue** with reject/edit capabilities
7. **Public testimonial editing** (allow users to edit before approval)

## Testing Checklist

- [ ] Submit testimonial from public website
- [ ] Verify it appears in admin with "pending" status
- [ ] Upload image via admin testimonial form
- [ ] Upload video via admin testimonial form
- [ ] Upload image via admin coach form
- [ ] Approve a pending testimonial
- [ ] Verify approved testimonial appears on public website
- [ ] Verify bilingual content displays correctly
- [ ] Test file size validation (try uploading >5MB image)
- [ ] Test file type validation (try uploading .pdf or .exe)

## Support

For issues or questions, contact the development team or refer to the main README.md
