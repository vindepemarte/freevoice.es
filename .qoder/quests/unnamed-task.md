# FreeVoice.es Website Updates and Admin Dashboard Design

## Overview

This design document outlines the comprehensive updates required for the FreeVoice.es bilingual landing page (Italian/Spanish) and the implementation of a full-featured admin dashboard. The project encompasses pricing structure updates, content management capabilities, database integration, and responsive design optimization across all devices.

### Core Objectives

- Update workshop pricing from two-tier to single workshop offering
- Implement comprehensive admin dashboard with PostgreSQL integration
- Ensure full bilingual support (Italian/Spanish) throughout the website
- Enable client-managed content editing for all website elements
- Maintain conversion-optimized design principles per landing page rules
- Ensure responsive design compatibility starting from 320px screen width

## Technology Stack & Dependencies

### Frontend Framework
- **Next.js 14.2.16** with TypeScript for static site generation and performance optimization
- **React 18** with hooks for component state management
- **Tailwind CSS 4.1.9** for responsive utility-first styling
- **Radix UI components** for accessible, composable interface elements

### Database & Backend
- **PostgreSQL** database hosted at provided connection string
- **Next.js API routes** for serverless backend functionality
- **Authentication system** for admin access protection

### Key Dependencies
- Form handling via react-hook-form with zod validation
- Image optimization through Next.js Image component
- Multi-language support through custom translations system
- WhatsApp integration for direct customer communication

## Architecture

### Component Architecture

The application follows a modular component structure with clear separation of concerns:

```
components/
├── ui/ (Reusable UI primitives)
├── header.tsx (Navigation with responsive logo)
├── hero-section.tsx (Landing page hero)
├── pricing-section.tsx (Updated single workshop)
├── testimonials-section.tsx (Video testimonials)
├── coaches-section.tsx (Team presentation)
├── footer.tsx (Contact and links)
├── booking-form.tsx (Workshop registration)
└── language-switcher.tsx (IT/ES toggle)
```

### State Management Architecture

- **Language Context**: Global state for Italian/Spanish language switching
- **Form State**: React Hook Form for booking and admin forms
- **Admin State**: Local component state for dashboard management
- **Database State**: Direct API calls for content management

### Routing Structure

```
/                    # Main landing page (bilingual)
/admin              # Admin dashboard (Italian only)
/privacy-policy     # Privacy policy (bilingual)
/terms-conditions   # Terms of service (bilingual)
```

## Updated Pricing Structure

### Workshop Configuration Changes

**Previous Structure**: Two workshops (1-day and 3-day options)

**New Structure**: Single workshop offering

#### Workshop di 1 Giorno - Ottobre (Italian)
- **Price**: €90 (updated from €50)
- **Duration**: 10:00 - 18:00
- **Date**: 12 ottobre 2025
- **Location**: Healing Garden, Guía de Isora
- **Instructors**: Jenny Rospo & Marian Giral Vega

#### Taller de 1 Día - Octubre (Spanish)
- **Price**: €90 (updated from €50)  
- **Duration**: 10:00 - 18:00
- **Date**: 12 de octubre 2025
- **Location**: Healing Garden, Guía de Isora
- **Instructors**: Jenny Rospo & Marian Giral Vega

### Workshop Details Modal System

Each pricing card includes a "View Full Details" button that opens a comprehensive modal containing:

#### Detailed Workshop Information
- **Duration**: 8-hour immersive experience (09:30 - 18:30)
- **Activities**: Voice work, body movement, breathwork, nature connection
- **What to Bring**: Comfortable clothes, notebook, water/herbal tea
- **Lunch**: Participants bring light, healthy meal
- **Phone Policy**: Silent mode during activities for presence
- **Limited Spots**: Reservation recommended

#### Program Schedule
- 09:30 - Arrival and welcome
- 10:00 - Activity begins
- 13:00 - 14:00 - Lunch break
- 18:30 - Closing circle

#### Target Audience
- Passionate singers (hobby or professional)
- Voice professionals (teachers, actors, therapists, speakers)
- Anyone seeking authentic voice expression
- Those interested in voice as emotional and creative tool

## Admin Dashboard Implementation

### Authentication System

#### Login Credentials
- **Email**: xk7m9p@freevoice.es
- **Password**: K9mR7nQ2vX8pL5wY
- **Access URL**: freevoice.es/admin

#### Security Features
- Session-based authentication
- Protected API routes
- Admin-only access validation
- Secure credential storage

### Database Schema Design

#### Core Tables Structure

**workshops**
- id (PRIMARY KEY)
- title_it, title_es (Workshop titles)
- description_it, description_es (Descriptions)
- price (Decimal price)
- date (Workshop date)
- location (Venue location)
- instructors (Instructor names)
- max_participants (Capacity limit)
- is_active (Enable/disable)
- is_popular (Most popular badge)
- created_at, updated_at

**pricing_modals**
- id (PRIMARY KEY)
- workshop_id (Foreign key)
- features_it, features_es (JSON array of features)
- full_details_it, full_details_es (Complete descriptions)
- button_text_it, button_text_es (CTA button text)

**testimonials**
- id (PRIMARY KEY)
- name, role (Testimonial author)
- content_it, content_es (Testimonial text)
- video_url (Video file path)
- image_url (Profile image)
- is_approved (Moderation status)
- display_order (Sorting)

**coaches**
- id (PRIMARY KEY)
- name, title (Coach information)
- bio_it, bio_es (Biography)
- image_url (Profile photo)
- specialties (Areas of expertise)
- display_order (Team ordering)

**site_content**
- id (PRIMARY KEY)
- section (hero, footer, etc.)
- content_key (Specific field)
- content_it, content_es (Translated content)

### Admin Dashboard Features

#### Workshop Management Panel
- Create, edit, delete workshops
- Bilingual content editing (Italian/Spanish toggle)
- Date and location management
- Instructor assignment
- Capacity and pricing control
- Workshop status toggle (active/inactive)

#### Pricing Modal System
- Multiple pricing tiers support
- Feature list management (add/remove/edit)
- "Most Popular" badge assignment (single selection)
- Full workshop details editing
- Bilingual description management

#### Content Management System
- **Hero Section**: Title, subtitle, call-to-action buttons
- **Footer Content**: Contact information, social links, legal pages
- **Coach Profiles**: Photos, biographies, specialties
- **Testimonials**: Video uploads, text reviews, approval workflow
- **FAQ Section**: Question/answer pairs with language variants

#### Media Management
- **Image Upload**: Coach photos, testimonial images, general graphics
- **Video Upload**: Testimonial videos, workshop previews
- **Logo Management**: Maintain logo at optimal size (250x250px max)

#### Analytics Dashboard
- Booking statistics and trends
- Workshop attendance tracking
- Revenue reporting by period
- Testimonial approval queue
- Content modification history

## Responsive Design Requirements

### Mobile-First Approach

#### Screen Size Breakpoints
- **Extra Small**: 320px - 479px (Mobile phones)
- **Small**: 480px - 767px (Large phones)
- **Medium**: 768px - 1023px (Tablets)
- **Large**: 1024px - 1279px (Small desktops)
- **Extra Large**: 1280px+ (Large desktops)

#### Component Responsiveness

**Header Navigation**
- Logo scaling from 200x200px (mobile) to 300x300px (desktop)
- Collapsible navigation menu on mobile devices
- Language switcher accessible on all screen sizes

**Pricing Section**
- Single column layout on mobile (320px-767px)
- Two-column layout on tablets and above
- Responsive typography scaling
- Touch-friendly button sizing (minimum 44px)

**Admin Dashboard**
- Mobile-optimized admin interface
- Responsive data tables with horizontal scroll
- Touch-friendly form controls
- Collapsible sidebar navigation

### Performance Optimization

#### Image Handling
- Next.js Image component for automatic optimization
- WebP format support with fallbacks
- Responsive image sizing
- Lazy loading implementation

#### Loading Performance
- Static site generation for main pages
- API route optimization for admin functions
- CSS minification and bundling
- JavaScript code splitting

## Bilingual Content Management

### Translation System Architecture

#### Language Detection and Switching
- URL-based language persistence
- Browser language detection
- Manual language toggle component
- Seamless content switching without page reload

#### Content Structure
- Centralized translation object management
- Nested key structure for organized content
- Fallback system for missing translations
- Dynamic content loading from database

#### Admin Language Management
- Side-by-side editing for Italian and Spanish content
- Real-time preview for both languages
- Translation completeness validation
- Bulk language operations

## Integration Points

### WhatsApp Communication System

#### Booking Integration
- Pre-filled workshop booking messages
- Dynamic message templates based on selected workshop
- Contact information auto-population
- Direct link generation to WhatsApp chat

#### Contact Forms
- Workshop inquiry messages
- General information requests
- Support and question handling

### Database Integration Pattern

#### API Route Structure
```
/api/admin/workshops    # Workshop CRUD operations
/api/admin/testimonials # Testimonial management
/api/admin/coaches      # Coach profile management
/api/admin/content      # General content management
/api/admin/auth         # Authentication handling
```

#### Data Validation
- Zod schema validation for all forms
- Input sanitization and security
- File upload validation and processing
- Database constraint enforcement

## Content Migration Strategy

### Current Content Preservation
- Export existing translations and content
- Maintain current pricing structure during transition
- Preserve testimonial and coach information
- Backup current media assets

### New Content Implementation
- Updated workshop details integration
- New pricing structure deployment
- Enhanced admin functionality rollout
- Comprehensive testing across languages

## Video Integration System

### Workshop Presentation Video
- Strategically placed video section showing workshop experience
- Responsive video player with mobile optimization
- Auto-play controls with accessibility considerations
- Integration with existing site design language

### Testimonial Video Management
- Admin upload interface for video testimonials
- Video compression and optimization
- Thumbnail generation and management
- Responsive video display across devices

## Security and Compliance

### Data Protection
- GDPR compliance for user data handling
- Secure admin authentication system
- Database connection security measures
- File upload security validation

### Performance Monitoring
- Page load time optimization
- Mobile performance testing
- Cross-browser compatibility validation
- Accessibility compliance (WCAG guidelines)

## Implementation Phases

### Phase 1: Database Setup and Migration
- PostgreSQL database schema implementation
- Content migration from existing translations
- Basic admin authentication system

### Phase 2: Admin Dashboard Core Features
- Workshop management interface
- Basic content editing capabilities
- Testimonial management system

### Phase 3: Enhanced Features and Integration
- Advanced pricing modal system
- Video upload and management
- Full responsive optimization

### Phase 4: Testing and Optimization
- Cross-device testing (320px+ compatibility)
- Performance optimization
- Security audit and compliance verification