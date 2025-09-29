#!/bin/bash

# FreeVoice.es Production Deployment Script
# This script sets up the production environment

set -e

echo "🚀 Starting FreeVoice.es deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d. -f1 | sed 's/v//')
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating from template..."
    cp .env.example .env.local
    echo "📝 Please edit .env.local with your production configuration"
    echo "   - Set NODE_ENV=production"
    echo "   - Configure your database URL"
    echo "   - Set secure admin credentials"
    echo "   - Configure other production settings"
    read -p "Press Enter after configuring .env.local..."
fi

# Build the application
echo "🏗️  Building application..."
npm run build

# Initialize database (if needed)
echo "🗄️  Setting up database..."
if command -v node &> /dev/null; then
    node scripts/setup-db.js
else
    echo "⚠️  Please run database setup manually: node scripts/setup-db.js"
fi

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p public/uploads/videos/testimonial
mkdir -p public/uploads/videos/workshop
mkdir -p public/uploads/videos/general

# Set proper permissions
chmod 755 public/uploads
chmod 755 public/uploads/videos
chmod 755 public/uploads/videos/*

echo "✅ Deployment complete!"
echo ""
echo "🌐 Next steps:"
echo "   1. Start the production server: npm start"
echo "   2. Access the site at: http://localhost:3000"
echo "   3. Admin dashboard: http://localhost:3000/admin"
echo "   4. Default admin: xk7m9p@freevoice.es / K9mR7nQ2vX8pL5wY"
echo ""
echo "🔒 Security reminders:"
echo "   - Change default admin credentials"
echo "   - Set secure environment variables"
echo "   - Configure HTTPS in production"
echo "   - Set up regular database backups"
echo ""
echo "📱 Contact: info@freevoice.es | WhatsApp: +34 697 798 991"