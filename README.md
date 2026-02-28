# Biotechnology Portfolio - Next.js Migration

A modern, fully-featured portfolio website for biotechnology research, built with Next.js 15, MongoDB, and a dynamic theme system.

## 🚀 Features

### ✅ Completed Features

- **Dynamic Theme System**
  - Light/Dark mode toggle with smooth transitions
  - HSL color picker (0-360°) with real-time updates
  - 8 preset colors
  - LocalStorage persistence
  - SSR-safe hydration

- **Public Site Components**
  - Fixed header with smooth scroll navigation
  - Hero section with Framer Motion animations
  - About section with education timeline
  - Projects showcase with status badges
  - Skills section with categorized expertise
  - Contact form with validation (React Hook Form + Zod)
  - Footer with newsletter subscription

- **UI/UX**
  - Custom elevation system (hover-elevate, active-elevate)
  - Responsive design (mobile, tablet, desktop)
  - Backdrop blur effects
  - Smooth scroll behavior
  - Toast notifications (Sonner)
  - shadcn/ui components

- **Database**
  - MongoDB connection with Mongoose
  - 10 data models (User, Hero, About, Project, Skill, Contact, Footer, Submission, Subscription, AuditLog)

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** JavaScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix UI)
- **Database:** MongoDB + Mongoose
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Icons:** Lucide React + React Icons
- **Theme:** next-themes + custom HSL system

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and other credentials

# Seed the database with initial data
npm run seed

# Create an admin user
npm run create-admin
# Follow the prompts to create your admin account

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

Admin login: [http://localhost:3000/login](http://localhost:3000/login)

## 🎨 Theme System

The theme system supports:
- Light/Dark mode toggle
- Dynamic color customization (HSL hue: 0-360°)
- Real-time CSS variable updates
- LocalStorage persistence
- Smooth 200ms transitions

Try the theme controls in the header!

## 📁 Project Structure

```
mern/
├── app/
│   ├── layout.js          # Root layout with ThemeProvider
│   ├── page.js            # Home page
│   └── globals.css        # Global styles + theme system
├── components/
│   ├── Header.js          # Fixed header with navigation
│   ├── Hero.js            # Hero section with animations
│   ├── About.js           # About section
│   ├── Projects.js        # Projects showcase
│   ├── Skills.js          # Skills section
│   ├── Contact.js         # Contact form
│   ├── Footer.js          # Footer with newsletter
│   ├── ThemeToggle.js     # Light/Dark toggle
│   ├── ColorPicker.js     # HSL color picker
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── theme-context.js   # Theme provider & hooks
│   ├── db/
│   │   ├── mongoose.js    # MongoDB connection
│   │   └── models/        # Mongoose models
│   └── validations/       # Zod schemas
└── .env.local             # Environment variables
```

## 🔜 Next Steps

### ✅ Recently Completed:
1. **API Routes**
   - ✅ POST /api/contact (contact form submission)
   - ✅ POST /api/newsletter (newsletter subscription)
   - ✅ Validation with Zod
   - ✅ Error handling
   - ✅ MongoDB integration

### To Be Implemented:
2. **Admin Panel**
   - Authentication with NextAuth.js
   - Content management dashboard
   - CRUD operations for all sections
   - Image upload system
   - Rich text editor

3. **Database Integration**
   - ✅ Fetch content from MongoDB
   - Data migration from PostgreSQL
   - ✅ Seed initial data

4. **SEO & Performance**
   - Metadata optimization
   - Image optimization with Next.js Image
   - Sitemap generation
   - Performance optimization

## 📝 Environment Variables

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/portfolio

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Image Storage (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🎯 Development Progress

- [x] Project setup & configuration
- [x] Theme system implementation
- [x] Public site components
- [x] Database models
- [x] API routes (contact & newsletter)
- [x] Form integration with API
- [x] Database seed script
- [x] Authentication system (NextAuth.js)
- [x] Login page
- [x] Admin dashboard (basic)
- [x] Route protection middleware
- [ ] Admin CRUD operations
- [ ] Image upload system
- [ ] Data migration
- [ ] SEO optimization
- [ ] Testing
- [ ] Deployment

## 📄 License

MIT

## 👤 Author

Nikhil Sode - Full Stack Developer Portfolio
