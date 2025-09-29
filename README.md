# FreeVoice.es - Bilingual Landing Page with Admin Dashboard

A modern, conversion-optimized landing page for FreeVoice Academy with comprehensive admin dashboard for content management.

## 🌟 Features

### Frontend Landing Page
- **Bilingual Support**: Full Italian/Spanish language switching
- **Single Workshop Model**: Updated €90 pricing structure as per design requirements
- **Responsive Design**: Optimized for all devices starting from 320px width
- **Video Integration**: Support for testimonial videos and workshop content
- **Performance Optimized**: Static site generation with Next.js 14
- **Accessibility Compliant**: WCAG guidelines compliance

### Admin Dashboard
- **Secure Authentication**: Session-based admin login system
- **Workshop Management**: CRUD operations for workshops, pricing, and schedules
- **Content Management**: Bilingual content editing for all website sections
- **Testimonial Management**: Video and text testimonial approval system
- **Media Upload**: Video upload system for testimonials and workshop content
- **Database Integration**: PostgreSQL backend for dynamic content

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or a compatible runtime
- PostgreSQL database access
- Modern web browser

### Installation

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd freevoice.es
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Database Setup**
   ```bash
   # Initialize database tables and seed data
   node scripts/setup-db.js
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Landing Page: `http://localhost:3000`
   - Admin Dashboard: `http://localhost:3000/admin`

## 🔧 Configuration

### Database Connection
The application uses PostgreSQL with the following connection string format:
```
postgres://username:password@host:port/database
```

### Admin Access
Default admin credentials (change in production):
- Email: `xk7m9p@freevoice.es`  
- Password: `K9mR7nQ2vX8pL5wY`

### WhatsApp Integration
Configure the WhatsApp number for booking inquiries:
```env
WHATSAPP_NUMBER=+34697798991
```

## 📱 Responsive Design

The application follows a mobile-first approach with these breakpoints:
- **Extra Small**: 320px - 479px (Mobile phones)
- **Small**: 480px - 767px (Large phones)
- **Medium**: 768px - 1023px (Tablets)
- **Large**: 1024px - 1279px (Small desktops)
- **Extra Large**: 1280px+ (Large desktops)

## 🎨 Brand Colors

The design follows the FreeVoice brand color palette:
- **Dark Purple** (#3C318D): Primary text and main elements (40%)
- **Vibrant Red** (#F02A30): CTA buttons and accents (24%)
- **Purple** (#9852A7): Secondary elements and gradients (20%)
- **Shadow Purple** (#2B2363): Depth and shadow effects (14%)
- **White** (#FFFFFF): Minimal white space (2%)

## 🎯 Workshop Pricing Structure

Updated to single workshop model:
- **Workshop di 1 Giorno / Taller de 1 Día**
- **Price**: €90 (updated from previous €50)
- **Duration**: 8 hours (10:00 - 18:00)
- **Date**: October 12, 2025
- **Location**: Healing Garden, Guía de Isora
- **Instructors**: Jenny Rospo & Marian Giral Vega

## 📊 Admin Dashboard Features

### Workshop Management
- Create, edit, and delete workshops
- Bilingual content editing (Italian/Spanish)
- Date and location management
- Instructor assignment
- Capacity and pricing control

### Content Management
- Hero section editing
- Footer content management
- Coach profile management
- FAQ management
- Testimonial moderation

### Media Management
- Video upload for testimonials
- Image management for coaches and testimonials
- File size validation and optimization

## 🔒 Security Features

- Session-based authentication
- Protected API routes
- Input validation and sanitization
- File upload security
- SQL injection prevention
- XSS protection

## 🌐 API Routes

### Public APIs
- `GET /api/public/workshops` - Fetch active workshops
- `GET /api/public/testimonials` - Fetch approved testimonials
- `GET /api/public/content` - Fetch site content

### Admin APIs (Protected)
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/logout` - Session termination
- `GET/POST/PUT/DELETE /api/admin/workshops` - Workshop CRUD
- `GET/POST/PUT/DELETE /api/admin/testimonials` - Testimonial CRUD
- `GET/POST/PUT/DELETE /api/admin/content` - Content CRUD
- `POST /api/upload/video` - Video upload

## 🎬 Video Integration

The application supports video testimonials with the following features:
- Multiple video formats (MP4, WebM, MOV, AVI)
- Maximum file size: 50MB
- Responsive video player with custom controls
- Video compression and optimization
- Thumbnail generation

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Docker
```bash
docker-compose up -d
```

### Manual Deployment
```bash
npm run build
npm start
```

## 📈 Performance Optimizations

- Static site generation with Next.js
- Image optimization with Next.js Image component
- CSS minification and bundling
- JavaScript code splitting
- Database connection pooling
- Responsive images with WebP support

## 🌍 Internationalization

The application supports:
- Italian (it)
- Spanish (es)

Language switching is seamless without page reloads, and all content including:
- Navigation menus
- Workshop descriptions
- Testimonials
- FAQ sections
- Contact information

## 🛠️ Development

### Project Structure
```
├── app/                    # Next.js 14 app directory
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── page.tsx           # Main landing page
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configs
├── public/               # Static assets
├── scripts/              # Database setup scripts
└── styles/               # Global styles
```

### Key Components
- `PricingSection`: Updated single workshop pricing
- `TestimonialsSection`: Dynamic testimonials with video support
- `AdminDashboard`: Complete admin interface
- `VideoUpload`: File upload with validation
- `ResponsiveVideoPlayer`: Custom video player

### Database Schema
- `workshops`: Workshop information and pricing
- `testimonials`: Customer testimonials and videos
- `site_content`: Dynamic website content
- `admin_users`: Admin authentication
- `admin_sessions`: Session management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary to FreeVoice Academy.

## 📞 Support

For technical support or questions:
- Email: info@freevoice.es
- WhatsApp: +34 697 798 991

---

**Built with ❤️ for FreeVoice Academy** 🎵