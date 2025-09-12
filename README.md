# Free Voice Academy - Landing Page

A professional "Work in Progress" landing page for the Free Voice Academy by Iacovici.it, featuring voice improvement workshops in Tenerife.

## 🎯 Project Overview

This landing page serves as a coming soon page for the Free Voice Academy, showcasing the brand's mission to provide professional voice improvement training through workshops in Tenerife, Canary Islands.

## ✨ Features

### Visual Design
- **Modern Gradient Design**: Purple and red gradient color scheme inspired by the Free Voice branding
- **Minimalist Aesthetic**: Clean layout with ample white space for optimal readability
- **Responsive Design**: Fully optimized for all device sizes (mobile, tablet, desktop)
- **Glass Morphism Effects**: Modern backdrop blur effects and translucent elements

### Interactive Elements
- **Smooth Animations**: Performance-optimized CSS animations that enhance user engagement
- **Contact Form**: Functional signup form with real-time validation
- **Floating Elements**: Subtle animated background elements
- **Scroll Effects**: Dynamic header behavior and scroll-triggered animations

### Technical Implementation
- **Semantic HTML5**: Proper document structure for SEO and accessibility
- **Modern CSS3**: Advanced styling with custom properties and animations
- **Vanilla JavaScript**: Lightweight, dependency-free interactivity
- **Performance Optimized**: Fast loading times and smooth animations
- **Accessibility Compliant**: WCAG guidelines implementation

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd freevoice.es
   ```

2. **Open the project**
   - Simply open `index.html` in your web browser
   - Or serve with a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **View the site**
   - Open your browser and navigate to `http://localhost:8000` (if using a server)
   - Or directly open the `index.html` file

## 📁 Project Structure

```
freevoice.es/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
├── logo.png           # Free Voice Academy logo
├── .gitignore         # Git ignore rules
└── README.md          # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary Gradient**: `#667eea` to `#764ba2`
- **Secondary Gradient**: `#ff6b6b` to `#ee5a24`
- **Accent Gradient**: `#f093fb` (highlights)
- **Text Colors**: `#2d3748` (dark), `rgba(255,255,255,0.9)` (light)
- **Background**: Dynamic gradient overlay

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300 (Light), 400 (Regular), 600 (Semi-bold), 700 (Bold)
- **Responsive Scaling**: `clamp()` functions for fluid typography

### Animations
- **Duration**: 0.3s to 8s depending on element
- **Easing**: `ease`, `ease-in-out`, `ease-out`
- **Performance**: GPU-accelerated transforms
- **Accessibility**: Respects `prefers-reduced-motion`

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: 480px to 767px
- **Small Mobile**: Below 480px

## 🔧 Customization

### Updating Content
1. **Hero Section**: Edit the title and description in `index.html`
2. **Contact Information**: Update email and location in the contact section
3. **Branding**: Replace `logo.png` with your own logo

### Styling Changes
1. **Colors**: Modify CSS custom properties in `styles.css`
2. **Fonts**: Update Google Fonts link and font-family declarations
3. **Animations**: Adjust animation durations and easing functions

### Adding Features
1. **Form Backend**: Integrate with your preferred form handling service
2. **Analytics**: Add Google Analytics or other tracking codes
3. **SEO**: Update meta tags and add structured data

## 🚀 Future Backend Integration

The project is structured to easily integrate with a Python/PostgreSQL backend:

### Recommended Stack
- **Backend**: FastAPI or Django
- **Database**: PostgreSQL
- **Deployment**: Docker containers
- **Hosting**: Vercel, Netlify, or AWS

### Integration Points
1. **Contact Form**: Replace JavaScript simulation with actual API calls
2. **Email Notifications**: Implement email service integration
3. **Database Storage**: Store subscriber information
4. **Admin Panel**: Create management interface for content updates

## 🔒 Security Considerations

- **Form Validation**: Client-side and server-side validation
- **CSRF Protection**: Implement when adding backend
- **Rate Limiting**: Prevent form spam
- **Data Privacy**: GDPR compliance for email collection

## 📈 Performance Optimization

### Current Optimizations
- **Minimal Dependencies**: No external JavaScript libraries
- **Optimized Images**: Responsive image loading
- **CSS Animations**: GPU-accelerated transforms
- **Lazy Loading**: Intersection Observer for performance

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Motion Preferences**: Respects `prefers-reduced-motion`
- **Focus Management**: Visible focus indicators

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

## 📝 License

This project is created for Free Voice Academy by Iacovici.it. All rights reserved.

## 🤝 Contributing

For contributions or suggestions, please contact:
- **Email**: info@iacovici.it
- **Website**: [iacovici.it](https://iacovici.it)

## 📞 Support

For technical support or questions about the Free Voice Academy:
- **Email**: info@iacovici.it
- **Location**: Tenerife, Canary Islands

---

**Free Voice Academy** - *Empowering voices, transforming lives*

Built with ❤️ for voice improvement enthusiasts in Tenerife