# Implementation Plan: Portfolio Website Migration to Next.js 15 + MongoDB

## Overview

This implementation plan breaks down the migration from Vite + React + Express + PostgreSQL to Next.js 15 (App Router) + MongoDB into discrete, actionable tasks. Each task builds incrementally on previous work, ensuring the application remains functional throughout the migration process.

## Tasks

- [ ] 1. Project initialization and configuration
  - [x] 1.1 Initialize Next.js 15 project with App Router and TypeScript
    - Run `npx create-next-app@latest` with TypeScript, Tailwind CSS, App Router options
    - Configure tsconfig.json with strict mode and path aliases
    - _Requirements: 1.1, 1.5, 13.1_
  
  - [x] 1.2 Configure Tailwind CSS v4 with custom design system
    - Copy existing Tailwind config (colors, fonts, border radius, elevation utilities)
    - Set up CSS custom properties in globals.css
    - Configure font families (Inter, Source Sans Pro, Georgia, Menlo)
    - _Requirements: 1.7, 3.3, 3.4, 3.5_
  
  - [x] 1.3 Install and configure shadcn/ui components
    - Initialize shadcn/ui with `npx shadcn-ui@latest init`
    - Install required components (Button, Input, Form, Card, etc.)
    - Verify components match existing design system
    - _Requirements: 1.8_
  
  - [x] 1.4 Set up environment variables and configuration
    - Create .env.local with MongoDB URI, NextAuth secret, image storage credentials
    - Create .env.example template
    - Configure next.config.js for image domains
    - _Requirements: 13.4, 13.5, 13.9_

- [ ] 2. Database setup and models
  - [x] 2.1 Set up MongoDB connection with Mongoose
    - Create lib/db/mongoose.ts with connection logic and caching
    - Implement connection error handling and retry logic
    - Test connection in development
    - _Requirements: 6.1, 6.2, 6.10_
  
  - [x] 2.2 Create Mongoose models for all collections
    - Create models: User, Hero, About, Project, Skill, Contact, Footer, Submission, Subscription, AuditLog
    - Define schemas with validation rules
    - Add indexes for performance optimization
    - _Requirements: 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9_
  
  - [ ] 2.3 Write unit tests for Mongoose models
    - Test schema validation rules
    - Test required fields and constraints
    - Test default values
    - _Requirements: 20.6_
  
  - [ ] 2.4 Create data migration script from PostgreSQL to MongoDB
    - Write script to export PostgreSQL data to JSON
    - Transform data to MongoDB schema format
    - Import data into MongoDB collections
    - Verify data integrity after migration
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.9_
  
  - [ ] 2.5 Write property test for data migration
    - **Property 18: Data transformation correctness**
    - **Validates: Requirements 14.2, 14.5**

- [ ] 3. Theme system implementation
  - [x] 3.1 Create ThemeProvider with localStorage persistence
    - Implement context for theme state (mode: light/dark, hue: 0-360)
    - Add localStorage save/load with SSR-safe hydration
    - Implement CSS custom property updates
    - Add suppressHydrationWarning to prevent mismatch
    - _Requirements: 2.1, 2.4, 2.5, 2.6, 2.7, 2.8, 2.10_
  
  - [x] 3.2 Create ThemeToggle component
    - Build toggle button with sun/moon icons (Lucide React)
    - Implement smooth transitions (200ms)
    - Add keyboard accessibility
    - _Requirements: 2.1, 2.6_
  
  - [x] 3.3 Create ColorPicker component with HSL slider
    - Build popover with hue slider (0-360)
    - Add preset color buttons
    - Implement real-time CSS variable updates
    - Add visual feedback and transitions
    - _Requirements: 2.2, 2.3, 2.9_
  
  - [ ] 3.4 Write property tests for theme system
    - **Property 1: Theme toggle switches modes**
    - **Validates: Requirements 2.1**
  
  - [ ] 3.5 Write property test for hue updates
    - **Property 2: Hue updates CSS variables**
    - **Validates: Requirements 2.3**
  
  - [ ] 3.6 Write property test for theme persistence
    - **Property 3: Theme persistence round-trip**
    - **Validates: Requirements 2.4, 2.5**
  
  - [ ] 3.7 Write property test for hydration
    - **Property 4: No hydration mismatch**
    - **Validates: Requirements 2.10**

- [ ] 4. Checkpoint - Verify theme system
  - Ensure all tests pass, ask the user if questions arise.



- [ ] 5. Public site components - Layout and Header
  - [ ] 5.1 Create root layout with ThemeProvider
    - Set up app/(public)/layout.tsx with metadata
    - Wrap children with ThemeProvider
    - Add global styles and fonts
    - Configure viewport and metadata
    - _Requirements: 1.2, 9.1, 9.2_
  
  - [x] 5.2 Create Header component with navigation
    - Build fixed header with backdrop blur
    - Implement smooth scroll navigation links
    - Add mobile menu with hamburger toggle
    - Integrate ThemeToggle and ColorPicker
    - Add active section highlighting
    - _Requirements: 4.1, 4.2, 4.3, 3.6, 3.7_
  
  - [ ] 5.3 Write property test for smooth scroll navigation
    - **Property 20: Smooth scroll navigation**
    - **Validates: Requirements 4.1**
  
  - [ ] 5.4 Write unit tests for Header component
    - Test mobile menu toggle
    - Test navigation link rendering
    - Test active section highlighting
    - _Requirements: 20.3_

- [ ] 6. Public site components - Hero section
  - [ ] 6.1 Fetch Hero content from MongoDB
    - Create server action to fetch Hero data
    - Handle loading and error states
    - Implement fallback content
    - _Requirements: 4.4_
  
  - [x] 6.2 Create Hero component with animations
    - Build full-screen hero layout
    - Add gradient background using CSS custom properties
    - Integrate Framer Motion animations
    - Add CTA buttons with hover effects
    - Optimize images with Next.js Image
    - _Requirements: 4.4, 4.11, 8.1, 8.2_
  
  - [ ] 6.3 Write unit tests for Hero component
    - Test content rendering
    - Test CTA button links
    - Test responsive layout
    - _Requirements: 20.3_

- [ ] 7. Public site components - About section
  - [ ] 7.1 Fetch About content from MongoDB
    - Create server action to fetch About data
    - Handle loading and error states
    - _Requirements: 4.5_
  
  - [x] 7.2 Create About component
    - Build two-column responsive layout
    - Create education cards with timeline
    - Add highlights badges
    - Optimize profile image with Next.js Image
    - _Requirements: 4.5, 8.1_
  
  - [ ] 7.3 Write unit tests for About component
    - Test education cards rendering
    - Test highlights display
    - Test responsive layout
    - _Requirements: 20.3_

- [ ] 8. Public site components - Projects section
  - [ ] 8.1 Fetch Projects from MongoDB
    - Create server action to fetch visible projects ordered by order field
    - Handle loading and error states
    - _Requirements: 4.6_
  
  - [x] 8.2 Create Projects component with grid layout
    - Build responsive grid layout
    - Create project cards with hover elevation effects
    - Add status badges (In Progress, Completed, etc.)
    - Add technology tags
    - Optimize project images with Next.js Image
    - Add links to GitHub/live demos
    - _Requirements: 4.6, 3.2, 8.1_
  
  - [ ] 8.3 Write unit tests for Projects component
    - Test project card rendering
    - Test status badge display
    - Test technology tags
    - _Requirements: 20.3_

- [ ] 9. Public site components - Skills section
  - [ ] 9.1 Fetch Skills from MongoDB
    - Create server action to fetch visible skills grouped by category
    - Handle loading and error states
    - _Requirements: 4.7_
  
  - [x] 9.2 Create Skills component
    - Build categorized skill cards layout
    - Add research areas section
    - Integrate Lucide React icons
    - Add proficiency indicators
    - _Requirements: 4.7, 4.11_
  
  - [ ] 9.3 Write unit tests for Skills component
    - Test skill categorization
    - Test proficiency display
    - Test icon rendering
    - _Requirements: 20.3_

- [ ] 10. Public site components - Contact section
  - [ ] 10.1 Create Zod validation schemas for contact form
    - Define schema with name, email, subject, message fields
    - Add email format validation
    - Add required field validation
    - _Requirements: 5.1_
  
  - [x] 10.2 Create Contact form component with React Hook Form
    - Build form with validation
    - Add inline error messages
    - Implement loading state during submission
    - Add success/error notifications
    - Integrate with /api/contact endpoint
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_
  
  - [ ] 10.3 Fetch Contact info from MongoDB
    - Create server action to fetch contact data
    - Display email, phone, location, availability status
    - Display social media links
    - _Requirements: 4.8_
  
  - [ ] 10.4 Write property test for contact form validation
    - **Property 5: Contact form validation correctness**
    - **Validates: Requirements 5.1**
  
  - [ ] 10.5 Write unit tests for Contact component
    - Test form submission flow
    - Test error handling
    - Test success message display
    - _Requirements: 20.3_

- [ ] 11. Public site components - Footer section
  - [ ] 11.1 Fetch Footer content from MongoDB
    - Create server action to fetch footer data
    - Handle loading and error states
    - _Requirements: 4.9_
  
  - [ ] 11.2 Create Newsletter form component
    - Build email input with validation
    - Add loading and success states
    - Integrate with /api/newsletter endpoint
    - _Requirements: 5.7, 5.8, 5.9, 5.10, 5.11_
  
  - [x] 11.3 Create Footer component
    - Build multi-column layout
    - Add navigation links
    - Integrate Newsletter form
    - Add social media links
    - Add copyright text
    - _Requirements: 4.9, 4.11_
  
  - [ ] 11.4 Write property test for newsletter validation
    - **Property 6: Newsletter email validation**
    - **Validates: Requirements 5.7**
  
  - [ ] 11.5 Write unit tests for Footer component
    - Test newsletter subscription
    - Test link rendering
    - Test responsive layout
    - _Requirements: 20.3_

- [ ] 12. Checkpoint - Verify public site components
  - Ensure all tests pass, ask the user if questions arise.



- [ ] 13. Public API routes implementation
  - [x] 13.1 Create POST /api/contact endpoint
    - Implement request validation with Zod
    - Save submission to MongoDB Submission collection
    - Return appropriate status codes (200, 400, 500)
    - Add error handling for database operations
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.9, 7.10_
  
  - [x] 13.2 Create POST /api/newsletter endpoint
    - Implement email validation with Zod
    - Check for duplicate subscriptions
    - Save subscription to MongoDB Subscription collection
    - Return appropriate status codes
    - Add error handling
    - _Requirements: 7.5, 7.6, 7.7, 7.8, 7.9, 7.10_
  
  - [ ] 13.3 Write property test for API validation
    - **Property 8: API request validation**
    - **Validates: Requirements 7.2, 7.4**
  
  - [ ] 13.4 Write property test for form submission round-trip
    - **Property 7: Form submission round-trip**
    - **Validates: Requirements 5.3, 7.3**
  
  - [ ] 13.5 Write property test for duplicate subscription prevention
    - **Property 9: Duplicate subscription prevention**
    - **Validates: Requirements 7.8**
  
  - [ ] 13.6 Write integration tests for API routes
    - Test successful submissions
    - Test validation errors
    - Test database errors
    - Test duplicate handling
    - _Requirements: 20.2_

- [ ] 14. Authentication system setup
  - [x] 14.1 Install and configure NextAuth.js
    - Install next-auth and bcryptjs
    - Create lib/auth/config.ts with credentials provider
    - Configure session strategy (JWT)
    - Set session expiration to 7 days
    - _Requirements: 16.1, 16.2, 16.4, 16.5_
  
  - [x] 14.2 Create API route for NextAuth
    - Create app/api/auth/[...nextauth]/route.ts
    - Configure authentication callbacks
    - Add error handling
    - _Requirements: 16.1_
  
  - [x] 14.3 Implement password hashing utilities
    - Create hash function using bcrypt with 10 salt rounds
    - Create compare function for password verification
    - _Requirements: 16.3_
  
  - [x] 14.4 Create middleware for route protection
    - Create middleware.ts to protect /admin routes
    - Redirect unauthenticated users to /login
    - Add CSRF protection
    - _Requirements: 15.2, 15.3, 16.6_
  
  - [x] 14.5 Create login page
    - Build login form with email/password fields
    - Add form validation with Zod
    - Implement rate limiting logic
    - Add error handling for failed login attempts
    - Add account lockout after 5 failed attempts
    - _Requirements: 16.7, 16.8, 16.12_
  
  - [ ] 14.6 Write property test for unauthenticated access denial
    - **Property 10: Unauthenticated access denial**
    - **Validates: Requirements 15.2, 15.3**
  
  - [ ] 14.7 Write property test for password hashing
    - **Property 11: Password hashing security**
    - **Validates: Requirements 16.3**
  
  - [ ] 14.8 Write property test for session expiration
    - **Property 12: Session expiration**
    - **Validates: Requirements 16.5**
  
  - [ ] 14.9 Write unit tests for authentication
    - Test login flow
    - Test logout flow
    - Test session management
    - Test rate limiting
    - _Requirements: 20.11_

- [ ] 15. Admin panel layout and navigation
  - [ ] 15.1 Create admin layout with sidebar
    - Build app/admin/layout.tsx with sidebar navigation
    - Add navigation links for all admin sections
    - Add user profile dropdown with logout
    - Add breadcrumb navigation
    - Make responsive with mobile drawer
    - _Requirements: 17.1, 17.2, 17.3_
  
  - [ ] 15.2 Create admin dashboard page
    - Build app/admin/page.tsx with overview statistics
    - Display counts: total projects, skills, submissions, subscriptions
    - Add recent activity feed
    - Add quick action buttons
    - _Requirements: 15.4_
  
  - [ ] 15.3 Write unit tests for admin layout
    - Test navigation rendering
    - Test mobile drawer toggle
    - Test logout functionality
    - _Requirements: 20.3_

- [ ] 16. Admin API routes - Content management
  - [ ] 16.1 Create GET/PUT /api/admin/hero endpoints
    - Implement authentication check
    - Add Zod validation for PUT requests
    - Implement get and update operations
    - Add audit logging
    - _Requirements: 18.1, 18.10, 18.11, 18.12, 18.14_
  
  - [ ] 16.2 Create GET/PUT /api/admin/about endpoints
    - Implement authentication check
    - Add validation
    - Implement get and update operations
    - Add audit logging
    - _Requirements: 18.2, 18.10, 18.11, 18.12, 18.14_
  
  - [ ] 16.3 Create CRUD endpoints for /api/admin/projects
    - Implement GET (list), POST (create), PUT (update), DELETE (delete)
    - Add authentication checks for all operations
    - Add validation with Zod schemas
    - Implement ordering and visibility toggle
    - Add audit logging
    - _Requirements: 18.3, 18.10, 18.11, 18.12, 18.14_
  
  - [ ] 16.4 Create CRUD endpoints for /api/admin/skills
    - Implement GET, POST, PUT, DELETE operations
    - Add authentication and validation
    - Implement category filtering and ordering
    - Add audit logging
    - _Requirements: 18.4, 18.10, 18.11, 18.12, 18.14_
  
  - [ ] 16.5 Create GET/PUT /api/admin/contact endpoints
    - Implement authentication check
    - Add validation
    - Implement get and update operations
    - Add audit logging
    - _Requirements: 18.5, 18.10, 18.11, 18.12, 18.14_
  
  - [ ] 16.6 Create GET/PUT /api/admin/footer endpoints
    - Implement authentication check
    - Add validation
    - Implement get and update operations
    - Add audit logging
    - _Requirements: 18.6, 18.10, 18.11, 18.12, 18.14_
  
  - [ ] 16.7 Create GET /api/admin/submissions endpoint
    - Implement authentication check
    - Fetch all contact form submissions
    - Add pagination and filtering
    - Add status update capability
    - _Requirements: 18.8, 18.10_
  
  - [ ] 16.8 Create GET /api/admin/subscriptions endpoint
    - Implement authentication check
    - Fetch all newsletter subscriptions
    - Add pagination and filtering
    - _Requirements: 18.9, 18.10_
  
  - [ ] 16.9 Write property test for admin CRUD operations
    - **Property 13: Project CRUD operations**
    - **Validates: Requirements 15.8**
  
  - [ ] 16.10 Write property test for visibility toggle
    - **Property 14: Content visibility toggle**
    - **Validates: Requirements 15.16**
  
  - [ ] 16.11 Write property test for order preservation
    - **Property 15: Order preservation**
    - **Validates: Requirements 15.13**
  
  - [ ] 16.12 Write integration tests for admin APIs
    - Test all CRUD operations
    - Test authentication requirements
    - Test validation
    - Test error handling
    - _Requirements: 20.2, 20.12_

- [ ] 17. Checkpoint - Verify admin API routes
  - Ensure all tests pass, ask the user if questions arise.



- [ ] 18. Admin panel - Content editor pages
  - [ ] 18.1 Create Hero section editor page
    - Build app/admin/hero/page.tsx with form
    - Add fields: title, subtitle, description, CTA buttons
    - Implement auto-save every 30 seconds
    - Add preview functionality
    - Add visibility toggle
    - Show success/error notifications
    - _Requirements: 15.5, 17.14, 15.15, 15.16, 15.20_
  
  - [ ] 18.2 Create About section editor page
    - Build app/admin/about/page.tsx with form
    - Add rich text editor for bio
    - Add education cards manager (add/edit/delete/reorder)
    - Add highlights manager
    - Add image upload for profile picture
    - Implement auto-save and preview
    - _Requirements: 15.6, 17.14, 15.15_
  
  - [ ] 18.3 Create Projects list page
    - Build app/admin/projects/page.tsx
    - Display projects in table/grid with edit/delete actions
    - Add search and filter functionality
    - Add drag-and-drop reordering
    - Add "Create New" button
    - _Requirements: 15.8, 15.13, 17.5_
  
  - [ ] 18.4 Create Project create/edit pages
    - Build app/admin/projects/new/page.tsx for creation
    - Build app/admin/projects/[id]/page.tsx for editing
    - Add form with all project fields
    - Add rich text editor for long description
    - Add image upload for project thumbnail
    - Add technology tags input
    - Add status and visibility toggles
    - Implement auto-save and preview
    - _Requirements: 15.8, 17.14, 15.15, 15.16_
  
  - [ ] 18.5 Create Skills list and editor pages
    - Build app/admin/skills/page.tsx with list view
    - Add create/edit forms
    - Add category management
    - Add drag-and-drop reordering within categories
    - Add proficiency level selector
    - Add icon picker
    - _Requirements: 15.9, 15.13_
  
  - [ ] 18.6 Create Contact section editor page
    - Build app/admin/contact/page.tsx with form
    - Add fields: email, phone, location, availability status
    - Add social media links manager
    - Implement auto-save
    - _Requirements: 15.10_
  
  - [ ] 18.7 Create Footer section editor page
    - Build app/admin/footer/page.tsx with form
    - Add columns manager (add/edit/delete columns and links)
    - Add social media links manager
    - Add copyright text editor
    - Implement auto-save
    - _Requirements: 15.11_
  
  - [ ] 18.8 Create Submissions viewer page
    - Build app/admin/submissions/page.tsx
    - Display contact form submissions in table
    - Add filtering by status (New, Read, Replied, Archived)
    - Add search functionality
    - Add status update actions
    - Add pagination
    - _Requirements: 15.17_
  
  - [ ] 18.9 Create Subscriptions viewer page
    - Build app/admin/subscriptions/page.tsx
    - Display newsletter subscriptions in table
    - Add filtering by status (Active, Unsubscribed)
    - Add search functionality
    - Add export to CSV functionality
    - Add pagination
    - _Requirements: 15.18_
  
  - [ ] 18.10 Write unit tests for admin pages
    - Test form rendering
    - Test validation
    - Test auto-save functionality
    - Test preview functionality
    - _Requirements: 20.3_

- [ ] 19. Admin panel - Shared components
  - [ ] 19.1 Create RichTextEditor component
    - Integrate TipTap or similar WYSIWYG editor
    - Add formatting toolbar (bold, italic, headings, lists, links)
    - Add image insertion capability
    - Add character/word count display
    - Add markdown support
    - _Requirements: 15.14, 17.11_
  
  - [ ] 19.2 Create ImageUploader component
    - Build drag-and-drop upload zone
    - Add file validation (type, size)
    - Show upload progress indicator
    - Add image preview
    - Add crop/resize tools
    - Add alt text input field
    - Integrate with /api/admin/upload endpoint
    - _Requirements: 15.12, 19.1, 19.2, 19.3, 19.7, 19.8, 19.9_
  
  - [ ] 19.3 Create DragDropList component
    - Implement using dnd-kit library
    - Add visual drag handles
    - Add smooth animations
    - Save new order to database on drop
    - _Requirements: 15.13_
  
  - [ ] 19.4 Create PreviewModal component
    - Build full-screen modal
    - Render content preview using public site components
    - Add responsive preview modes (desktop, tablet, mobile)
    - Add close and publish actions
    - _Requirements: 15.15_
  
  - [ ] 19.5 Write unit tests for shared admin components
    - Test ImageUploader validation
    - Test DragDropList reordering
    - Test RichTextEditor formatting
    - _Requirements: 20.3_

- [ ] 20. Image management system
  - [ ] 20.1 Set up Cloudinary or AWS S3 integration
    - Configure API credentials
    - Create upload utility functions
    - Implement image optimization settings
    - Configure responsive image sizes
    - _Requirements: 19.6, 19.4, 19.5_
  
  - [ ] 20.2 Create POST /api/admin/upload endpoint
    - Implement file validation (type, size limit 5MB)
    - Upload to cloud storage
    - Generate multiple sizes for responsive images
    - Return image URL and metadata
    - Add error handling
    - _Requirements: 18.7, 19.2, 19.3, 19.4, 19.5_
  
  - [ ] 20.3 Migrate existing images to cloud storage
    - Write script to upload all existing images
    - Update database references to new URLs
    - Verify all images are accessible
    - _Requirements: 8.1, 8.2_
  
  - [ ] 20.4 Write property test for image validation
    - **Property 16: Image validation**
    - **Validates: Requirements 19.2, 19.3**
  
  - [ ] 20.5 Write property test for image upload round-trip
    - **Property 17: Image upload round-trip**
    - **Validates: Requirements 19.1, 19.6**
  
  - [ ] 20.6 Write unit tests for image upload
    - Test file validation
    - Test upload success
    - Test upload errors
    - Test size limits
    - _Requirements: 20.13_

- [ ] 21. SEO and metadata optimization
  - [ ] 21.1 Add metadata to all pages
    - Define metadata in layout.tsx and page.tsx files
    - Add title, description, keywords
    - Add Open Graph tags
    - Add Twitter Card tags
    - Add canonical URLs
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  
  - [ ] 21.2 Implement structured data (JSON-LD)
    - Add Person schema for portfolio owner
    - Add WebSite schema
    - Add Organization schema (if applicable)
    - _Requirements: 9.8_
  
  - [ ] 21.3 Generate sitemap.xml
    - Create app/sitemap.ts to generate dynamic sitemap
    - Include all public pages
    - Add lastModified dates
    - _Requirements: 9.6_
  
  - [ ] 21.4 Generate robots.txt
    - Create app/robots.ts
    - Allow all crawlers
    - Reference sitemap
    - _Requirements: 9.7_
  
  - [ ] 21.5 Write unit tests for metadata
    - Test metadata presence on all pages
    - Test structured data validity
    - Test sitemap generation
    - _Requirements: 20.3_

- [ ] 22. Checkpoint - Verify admin panel and SEO
  - Ensure all tests pass, ask the user if questions arise.



- [ ] 23. Performance optimization
  - [ ] 23.1 Optimize images with Next.js Image component
    - Replace all img tags with next/image
    - Configure image sizes and breakpoints
    - Add blur placeholders
    - Implement lazy loading
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [ ] 23.2 Implement code splitting and lazy loading
    - Use dynamic imports for heavy components
    - Lazy load admin panel components
    - Optimize bundle sizes
    - _Requirements: 10.2, 10.3_
  
  - [ ] 23.3 Optimize font loading
    - Use next/font for font optimization
    - Configure font-display: swap
    - Preload critical fonts
    - _Requirements: 10.9_
  
  - [ ] 23.4 Implement caching strategies
    - Configure cache headers for static assets
    - Implement ISR (Incremental Static Regeneration) where appropriate
    - Add SWR for client-side data fetching
    - _Requirements: 10.4_
  
  - [ ] 23.5 Run Lighthouse performance tests
    - Test performance score (target > 90)
    - Test Core Web Vitals (FCP, LCP, CLS, TTI)
    - Identify and fix performance bottlenecks
    - _Requirements: 10.1, 10.5, 10.6, 10.7_

- [ ] 24. Accessibility improvements
  - [ ] 24.1 Add ARIA labels and roles
    - Add aria-label to interactive elements
    - Add role attributes where needed
    - Add aria-live regions for dynamic content
    - _Requirements: 11.3, 11.9_
  
  - [ ] 24.2 Implement keyboard navigation
    - Ensure all interactive elements are keyboard accessible
    - Add skip-to-content link
    - Test tab order
    - Add keyboard shortcuts for admin panel
    - _Requirements: 11.2, 11.8, 17.6_
  
  - [ ] 24.3 Verify color contrast ratios
    - Test all text against backgrounds (4.5:1 minimum)
    - Adjust colors if needed
    - Test in both light and dark modes
    - _Requirements: 11.5_
  
  - [ ] 24.4 Add alt text to all images
    - Ensure all images have descriptive alt text
    - Add empty alt for decorative images
    - _Requirements: 11.6_
  
  - [ ] 24.5 Run accessibility tests
    - Use jest-axe for automated testing
    - Test with screen readers
    - Test keyboard navigation
    - Verify WCAG 2.1 Level AA compliance
    - _Requirements: 11.1, 20.8_

- [ ] 25. Error handling and loading states
  - [ ] 25.1 Create error boundaries
    - Create app/error.tsx for client errors
    - Create app/global-error.tsx for global errors
    - Add error logging
    - _Requirements: 12.3_
  
  - [ ] 25.2 Create custom error pages
    - Create app/not-found.tsx for 404 errors
    - Style error pages to match site design
    - Add helpful navigation links
    - _Requirements: 12.4_
  
  - [ ] 25.3 Add loading states to all pages
    - Create app/loading.tsx for page loading
    - Add loading skeletons for content areas
    - Add loading spinners for forms
    - _Requirements: 12.1, 12.12_
  
  - [ ] 25.4 Implement error handling in API routes
    - Add try-catch blocks to all routes
    - Return appropriate error messages
    - Log errors for monitoring
    - _Requirements: 12.2, 12.5, 12.6, 12.8_
  
  - [ ] 25.5 Write unit tests for error handling
    - Test error boundaries
    - Test error pages
    - Test API error responses
    - _Requirements: 20.3_

- [ ] 26. Testing suite implementation
  - [ ] 26.1 Set up Jest and React Testing Library
    - Install testing dependencies
    - Configure jest.config.js
    - Set up test utilities and mocks
    - _Requirements: 20.1, 20.3_
  
  - [ ] 26.2 Set up fast-check for property-based testing
    - Install fast-check
    - Create custom generators for domain objects
    - Configure test runners
    - _Requirements: 20.1_
  
  - [ ] 26.3 Set up MongoDB Memory Server for tests
    - Install mongodb-memory-server
    - Configure test database setup/teardown
    - Create test data factories
    - _Requirements: 20.6_
  
  - [ ] 26.4 Set up MSW for API mocking
    - Install msw
    - Create API mocks for tests
    - Configure handlers
    - _Requirements: 20.2_
  
  - [ ] 26.5 Set up Playwright for E2E tests
    - Install Playwright
    - Configure playwright.config.ts
    - Write E2E tests for critical user flows
    - _Requirements: 20.8_
  
  - [ ] 26.6 Run full test suite
    - Run all unit tests
    - Run all property tests
    - Run all integration tests
    - Run E2E tests
    - Verify 80% code coverage
    - _Requirements: 20.7_

- [ ] 27. Admin panel enhancements
  - [ ] 27.1 Implement auto-save functionality
    - Add debounced auto-save to all editor forms
    - Show "Saving..." and "Saved" indicators
    - Handle auto-save errors gracefully
    - _Requirements: 15.21, 17.14_
  
  - [ ] 27.2 Implement unsaved changes warning
    - Detect unsaved changes in forms
    - Show warning before navigation
    - Add "Save" and "Discard" options
    - _Requirements: 17.15_
  
  - [ ] 27.3 Add audit logging
    - Log all content changes to AuditLog collection
    - Include user, action, resource, changes, timestamp
    - Display audit log in admin dashboard
    - _Requirements: 15.22_
  
  - [ ] 27.4 Add bulk actions
    - Add bulk delete for projects/skills
    - Add bulk visibility toggle
    - Add bulk status update
    - _Requirements: 17.9_
  
  - [ ] 27.5 Add undo/redo functionality
    - Implement undo/redo for content editors
    - Add keyboard shortcuts (Ctrl+Z, Ctrl+Y)
    - Show undo/redo buttons in toolbar
    - _Requirements: 17.10_
  
  - [ ] 27.6 Write unit tests for admin enhancements
    - Test auto-save
    - Test unsaved changes warning
    - Test audit logging
    - Test bulk actions
    - _Requirements: 20.3_

- [ ] 28. Deployment preparation
  - [ ] 28.1 Configure production environment variables
    - Set up MongoDB Atlas connection string
    - Configure NextAuth secret
    - Configure image storage credentials
    - Set up error tracking (Sentry, etc.)
    - _Requirements: 13.4, 13.5_
  
  - [ ] 28.2 Optimize production build
    - Run `npm run build`
    - Analyze bundle sizes
    - Optimize large bundles
    - Test production build locally
    - _Requirements: 13.3_
  
  - [ ] 28.3 Set up deployment to Vercel
    - Connect GitHub repository to Vercel
    - Configure environment variables in Vercel
    - Set up custom domain
    - Configure deployment settings
    - _Requirements: 13.8_
  
  - [ ] 28.4 Set up monitoring and error tracking
    - Configure Sentry or similar service
    - Set up performance monitoring
    - Configure alerts for errors
    - _Requirements: 12.5_
  
  - [ ] 28.5 Perform final testing
    - Test all features in production environment
    - Test on multiple devices and browsers
    - Verify all environment variables
    - Test database connections
    - _Requirements: 20.9, 20.10_

- [ ] 29. Documentation and handoff
  - [ ] 29.1 Create README.md
    - Document project setup instructions
    - List all environment variables
    - Add development and build commands
    - Include deployment instructions
    - _Requirements: 13.10_
  
  - [ ] 29.2 Document admin panel usage
    - Create user guide for admin panel
    - Document all features and workflows
    - Add screenshots and examples
    - _Requirements: 15.23_
  
  - [ ] 29.3 Create migration guide
    - Document the migration process
    - List all changes from old to new system
    - Provide troubleshooting tips
    - _Requirements: 14.8_
  
  - [ ] 29.4 Create API documentation
    - Document all API endpoints
    - Include request/response examples
    - Document authentication requirements
    - _Requirements: 18.15_

- [ ] 30. Final checkpoint - Production ready
  - Ensure all tests pass, verify deployment is successful, ask the user if questions arise.

## Notes

- All tasks are required for a comprehensive, production-ready migration
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties with 100 iterations each
- Unit tests validate specific examples, edge cases, and integration points
- The migration preserves all existing functionality while adding new admin capabilities
- All components maintain the exact same visual design and user experience
- TypeScript is used throughout for type safety
- Next.js 15 App Router provides improved performance and SEO
