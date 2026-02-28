# Design Document: Portfolio Website Migration to Next.js 15 + MongoDB

## Overview

This design document outlines the technical architecture and implementation strategy for migrating a portfolio website from Vite + React + Express + PostgreSQL to Next.js 15 (App Router) + MongoDB. The migration preserves all existing functionality while adding a comprehensive admin panel for content management and leveraging Next.js capabilities for improved performance, SEO, and developer experience.

### Migration Goals

1. **Preserve User Experience**: Maintain exact visual design, interactions, and animations
2. **Enhance Performance**: Leverage server-side rendering and optimizations
3. **Improve SEO**: Implement metadata and structured data
4. **Add Content Management**: Build comprehensive admin panel
5. **Modernize Stack**: Use Next.js 15 App Router and MongoDB
6. **Maintain Code Quality**: Keep TypeScript, testing, and best practices

### Technology Stack

**Frontend:**
- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Framer Motion
- React Hook Form + Zod

**Backend:**
- Next.js API Routes
- NextAuth.js for authentication
- Mongoose ODM

**Database:**
- MongoDB

**Additional Tools:**
- Cloudinary/AWS S3 for image storage
- TanStack Query for data fetching
- Lucide React + React Icons

## Architecture

### Application Structure


```
portfolio-nextjs/
├── app/
│   ├── (public)/              # Public-facing pages
│   │   ├── layout.tsx         # Root layout with theme provider
│   │   ├── page.tsx           # Home page (all sections)
│   │   ├── error.tsx          # Error boundary
│   │   └── loading.tsx        # Loading state
│   ├── admin/                 # Admin panel routes
│   │   ├── layout.tsx         # Admin layout with sidebar
│   │   ├── page.tsx           # Dashboard
│   │   ├── hero/page.tsx      # Hero section editor
│   │   ├── about/page.tsx     # About section editor
│   │   ├── projects/          # Projects CRUD
│   │   │   ├── page.tsx       # Projects list
│   │   │   ├── new/page.tsx   # Create project
│   │   │   └── [id]/page.tsx  # Edit project
│   │   ├── skills/            # Skills CRUD
│   │   ├── contact/page.tsx   # Contact editor
│   │   ├── footer/page.tsx    # Footer editor
│   │   ├── submissions/page.tsx # View submissions
│   │   └── subscriptions/page.tsx # View subscriptions
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # NextAuth config
│   │   ├── contact/route.ts   # Contact form handler
│   │   ├── newsletter/route.ts # Newsletter handler
│   │   └── admin/             # Admin API routes
│   │       ├── hero/route.ts
│   │       ├── about/route.ts
│   │   │   ├── projects/
│   │   │   │   ├── route.ts   # List/Create
│   │   │   │   └── [id]/route.ts # Update/Delete
│   │       ├── skills/
│   │       ├── contact/route.ts
│   │       ├── footer/route.ts
│   │       ├── upload/route.ts
│   │       ├── submissions/route.ts
│   │       └── subscriptions/route.ts
│   ├── login/page.tsx         # Admin login page
│   └── globals.css            # Global styles
├── components/
│   ├── public/                # Public site components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ColorPicker.tsx
│   ├── admin/                 # Admin panel components
│   │   ├── Sidebar.tsx
│   │   ├── DashboardStats.tsx
│   │   ├── RichTextEditor.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── DragDropList.tsx
│   │   └── PreviewModal.tsx
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── db/
│   │   ├── mongoose.ts        # MongoDB connection
│   │   └── models/            # Mongoose models
│   │       ├── User.ts
│   │       ├── Hero.ts
│   │       ├── About.ts
│   │       ├── Project.ts
│   │       ├── Skill.ts
│   │       ├── Contact.ts
│   │       ├── Footer.ts
│   │       ├── Submission.ts
│   │       └── Subscription.ts
│   ├── auth/
│   │   ├── config.ts          # NextAuth configuration
│   │   └── middleware.ts      # Auth middleware
│   ├── validations/           # Zod schemas
│   │   ├── contact.ts
│   │   ├── newsletter.ts
│   │   └── admin.ts
│   └── utils/
│       ├── theme.ts           # Theme utilities
│       ├── image.ts           # Image processing
│       └── api.ts             # API helpers
├── hooks/
│   ├── useTheme.ts
│   ├── useColorPicker.ts
│   └── useAdmin.ts
├── types/
│   └── index.ts               # TypeScript types
├── public/
│   └── images/
└── middleware.ts              # Next.js middleware for auth
```

### Routing Strategy

**Public Routes (Server Components by default):**
- `/` - Home page with all portfolio sections
- Server-rendered for optimal SEO and performance
- Client components only for interactive elements (theme toggle, forms, animations)

**Admin Routes (Protected):**
- `/admin/*` - All admin routes require authentication
- Middleware checks authentication before rendering
- Redirect to `/login` if not authenticated

**API Routes:**
- `/api/contact` - Public endpoint for contact form
- `/api/newsletter` - Public endpoint for newsletter
- `/api/admin/*` - Protected endpoints for admin operations
- All admin APIs verify authentication via NextAuth session



## Components and Interfaces

### Theme System Architecture

The theme system must work seamlessly with Next.js server-side rendering while maintaining client-side interactivity.

**ThemeProvider Component (Client Component):**
```typescript
'use client'

interface ThemeContextType {
  theme: 'light' | 'dark'
  hue: number
  setTheme: (theme: 'light' | 'dark') => void
  setHue: (hue: number) => void
}

// Provider wraps the entire application
// Reads from localStorage on mount
// Updates CSS custom properties on change
// Prevents hydration mismatch with useEffect
```

**Implementation Strategy:**
1. Server renders with default theme (light, hue 200)
2. Client hydrates and reads localStorage
3. useEffect updates CSS variables after hydration
4. Suppress hydration warnings with suppressHydrationWarning
5. Apply transitions only after initial render

**CSS Custom Properties:**
```css
:root {
  --theme-hue: 200;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: var(--theme-hue) 70% 50%;
  /* ... all other tokens */
}

[data-theme="dark"] {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}
```

### Public Site Components

**Header Component (Client Component):**
- Fixed positioning with backdrop blur
- Smooth scroll navigation using `scrollIntoView`
- Mobile menu with hamburger toggle
- Theme toggle and color picker
- Active section highlighting based on scroll position

**Hero Component (Server Component with Client Islands):**
- Server-rendered content from MongoDB
- Client-side Framer Motion animations
- Gradient background using CSS custom properties
- CTA buttons with hover effects

**About Component (Server Component):**
- Two-column responsive layout
- Education cards with timeline
- Highlights badges
- Profile image with Next.js Image optimization

**Projects Component (Server Component with Client Islands):**
- Grid layout with responsive columns
- Project cards with hover elevation
- Status badges (In Progress, Completed, etc.)
- Client-side filtering/sorting (optional)
- Images optimized with Next.js Image

**Skills Component (Server Component):**
- Categorized skill cards
- Research areas section
- Icon integration (Lucide React)

**Contact Component (Client Component):**
- React Hook Form with Zod validation
- API route submission
- Loading and success states
- Contact information display
- Social media links
- Availability status indicator

**Footer Component (Server Component with Client Islands):**
- Multi-column layout
- Newsletter form (Client Component)
- Social media links
- Copyright and links
- Server-rendered content from MongoDB



### Admin Panel Components

**AdminLayout Component:**
- Sidebar navigation with active state
- User profile dropdown
- Logout button
- Breadcrumb navigation
- Responsive mobile drawer

**DashboardStats Component:**
- Overview cards (total projects, skills, submissions, subscriptions)
- Recent activity feed
- Quick actions
- Analytics charts (optional)

**ContentEditor Components:**
- Form-based editors for each section
- Real-time preview
- Auto-save functionality
- Validation feedback
- Success/error notifications

**RichTextEditor Component:**
- TipTap or similar WYSIWYG editor
- Markdown support
- Image insertion
- Link management
- Character/word count

**ImageUploader Component:**
- Drag-and-drop zone
- File validation
- Image preview
- Crop/resize tools
- Alt text input
- Upload progress indicator
- Integration with Cloudinary/S3

**DragDropList Component:**
- Reorderable list using dnd-kit
- Visual drag handles
- Smooth animations
- Save order to database

**PreviewModal Component:**
- Full-screen preview of changes
- Side-by-side comparison (optional)
- Responsive preview modes
- Close and publish actions

### Authentication Flow

**NextAuth.js Configuration:**
```typescript
// lib/auth/config.ts
export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        // Verify credentials against MongoDB
        // Return user object or null
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to token
    },
    async session({ session, token }) {
      // Add token info to session
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60 // 7 days
  }
}
```

**Middleware Protection:**
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
```

**Login Page:**
- Email/password form
- Form validation with Zod
- Error handling
- Remember me option
- Password reset link (future)
- Rate limiting on API side



## Data Models

### MongoDB Schema Design

**User Model:**
```typescript
interface IUser {
  _id: ObjectId
  email: string          // unique, required
  password: string       // hashed with bcrypt
  name: string
  role: 'admin' | 'editor'
  createdAt: Date
  updatedAt: Date
  lastLogin: Date
  failedLoginAttempts: number
  lockedUntil?: Date
}
```

**Hero Model:**
```typescript
interface IHero {
  _id: ObjectId
  title: string
  subtitle: string
  description: string
  ctaPrimary: {
    text: string
    href: string
  }
  ctaSecondary: {
    text: string
    href: string
  }
  backgroundImage?: string
  isVisible: boolean
  updatedAt: Date
  updatedBy: ObjectId    // Reference to User
}
```

**About Model:**
```typescript
interface IAbout {
  _id: ObjectId
  bio: string            // Rich text/markdown
  profileImage: string
  education: Array<{
    degree: string
    institution: string
    year: string
    description?: string
  }>
  highlights: Array<{
    icon: string
    text: string
  }>
  isVisible: boolean
  updatedAt: Date
  updatedBy: ObjectId
}
```

**Project Model:**
```typescript
interface IProject {
  _id: ObjectId
  title: string
  description: string
  longDescription?: string  // Rich text
  image: string
  technologies: string[]
  status: 'In Progress' | 'Completed' | 'Archived'
  links: {
    github?: string
    live?: string
    demo?: string
  }
  order: number          // For custom ordering
  featured: boolean
  isVisible: boolean
  createdAt: Date
  updatedAt: Date
  updatedBy: ObjectId
}
```

**Skill Model:**
```typescript
interface ISkill {
  _id: ObjectId
  name: string
  category: string       // e.g., "Programming", "Tools", "Research"
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  icon?: string
  order: number
  isVisible: boolean
  createdAt: Date
  updatedAt: Date
  updatedBy: ObjectId
}
```

**Contact Model:**
```typescript
interface IContact {
  _id: ObjectId
  email: string
  phone: string
  location: string
  availability: {
    status: 'Available' | 'Busy' | 'Not Available'
    message: string
  }
  socialLinks: {
    linkedin?: string
    github?: string
    researchgate?: string
    orcid?: string
    twitter?: string
  }
  isVisible: boolean
  updatedAt: Date
  updatedBy: ObjectId
}
```

**Footer Model:**
```typescript
interface IFooter {
  _id: ObjectId
  columns: Array<{
    title: string
    links: Array<{
      text: string
      href: string
    }>
  }>
  copyright: string
  socialLinks: {
    linkedin?: string
    github?: string
    twitter?: string
  }
  isVisible: boolean
  updatedAt: Date
  updatedBy: ObjectId
}
```

**Submission Model (Contact Form):**
```typescript
interface ISubmission {
  _id: ObjectId
  name: string
  email: string
  subject?: string
  message: string
  status: 'New' | 'Read' | 'Replied' | 'Archived'
  ipAddress?: string
  userAgent?: string
  createdAt: Date
  readAt?: Date
  repliedAt?: Date
}
```

**Subscription Model (Newsletter):**
```typescript
interface ISubscription {
  _id: ObjectId
  email: string          // unique
  status: 'Active' | 'Unsubscribed'
  source: string         // e.g., "footer", "popup"
  ipAddress?: string
  subscribedAt: Date
  unsubscribedAt?: Date
}
```

**AuditLog Model:**
```typescript
interface IAuditLog {
  _id: ObjectId
  userId: ObjectId
  action: string         // e.g., "UPDATE_PROJECT", "DELETE_SKILL"
  resource: string       // e.g., "Project", "Skill"
  resourceId: ObjectId
  changes: object        // JSON of what changed
  ipAddress: string
  userAgent: string
  createdAt: Date
}
```

### Database Indexes

**Performance Optimization:**
- User: index on `email` (unique)
- Project: index on `order`, `featured`, `isVisible`
- Skill: index on `category`, `order`, `isVisible`
- Submission: index on `createdAt`, `status`
- Subscription: index on `email` (unique), `status`
- AuditLog: index on `userId`, `createdAt`, `resource`



## API Design

### Public API Routes

**POST /api/contact**
```typescript
// Request body
{
  name: string
  email: string
  subject?: string
  message: string
}

// Response (success)
{
  success: true
  message: "Message sent successfully"
}

// Response (error)
{
  success: false
  error: string
  details?: ValidationError[]
}
```

**POST /api/newsletter**
```typescript
// Request body
{
  email: string
}

// Response (success)
{
  success: true
  message: "Subscribed successfully"
}

// Response (error)
{
  success: false
  error: string
}
```

### Admin API Routes

All admin routes require authentication. Return 401 if not authenticated.

**GET /api/admin/hero**
```typescript
// Response
{
  success: true
  data: IHero
}
```

**PUT /api/admin/hero**
```typescript
// Request body
{
  title: string
  subtitle: string
  description: string
  ctaPrimary: { text: string, href: string }
  ctaSecondary: { text: string, href: string }
  isVisible: boolean
}

// Response
{
  success: true
  data: IHero
}
```

**GET /api/admin/projects**
```typescript
// Response
{
  success: true
  data: IProject[]
  total: number
}
```

**POST /api/admin/projects**
```typescript
// Request body
{
  title: string
  description: string
  image: string
  technologies: string[]
  status: string
  links: object
  featured: boolean
  isVisible: boolean
}

// Response
{
  success: true
  data: IProject
}
```

**PUT /api/admin/projects/[id]**
```typescript
// Request body (partial update)
{
  title?: string
  description?: string
  // ... other fields
}

// Response
{
  success: true
  data: IProject
}
```

**DELETE /api/admin/projects/[id]**
```typescript
// Response
{
  success: true
  message: "Project deleted"
}
```

**POST /api/admin/upload**
```typescript
// Request: multipart/form-data
// file: File
// alt?: string

// Response
{
  success: true
  url: string
  publicId: string
}
```

### API Error Handling

All API routes follow consistent error handling:

```typescript
try {
  // Validate request
  const validated = schema.parse(body)
  
  // Perform operation
  const result = await operation(validated)
  
  // Return success
  return NextResponse.json({ success: true, data: result })
  
} catch (error) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { success: false, error: "Validation failed", details: error.errors },
      { status: 400 }
    )
  }
  
  if (error instanceof MongoError) {
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    )
  }
  
  return NextResponse.json(
    { success: false, error: "Internal server error" },
    { status: 500 }
  )
}
```



## Migration Strategy

### Phase 1: Project Setup and Configuration

1. Initialize Next.js 15 project with App Router
2. Configure TypeScript with strict mode
3. Set up Tailwind CSS v4 with custom configuration
4. Install and configure shadcn/ui components
5. Set up MongoDB connection with Mongoose
6. Configure NextAuth.js for authentication
7. Set up environment variables

### Phase 2: Database Migration

1. Create Mongoose models for all collections
2. Write migration script to export PostgreSQL data
3. Transform data to MongoDB format
4. Import data into MongoDB
5. Verify data integrity
6. Create database indexes

### Phase 3: Core Components Migration

1. Migrate theme system (ThemeProvider, ThemeToggle, ColorPicker)
2. Migrate public components (Header, Hero, About, Projects, Skills, Contact, Footer)
3. Migrate shadcn/ui components
4. Migrate utility functions and hooks
5. Set up global styles and CSS custom properties

### Phase 4: Public API Routes

1. Implement /api/contact endpoint
2. Implement /api/newsletter endpoint
3. Add validation with Zod
4. Add error handling
5. Test API endpoints

### Phase 5: Admin Authentication

1. Configure NextAuth.js with credentials provider
2. Create login page
3. Implement middleware for route protection
4. Add session management
5. Test authentication flow

### Phase 6: Admin Panel UI

1. Create admin layout with sidebar
2. Build dashboard page
3. Create content editor pages for each section
4. Implement rich text editor
5. Implement image uploader
6. Add drag-and-drop reordering

### Phase 7: Admin API Routes

1. Implement CRUD endpoints for all content types
2. Add authentication checks
3. Add validation
4. Implement audit logging
5. Test all endpoints

### Phase 8: Image Optimization

1. Set up Cloudinary/S3 integration
2. Migrate existing images
3. Replace img tags with Next.js Image
4. Configure image sizes and formats
5. Test image loading and optimization

### Phase 9: SEO and Metadata

1. Add metadata to all pages
2. Implement structured data
3. Generate sitemap.xml
4. Generate robots.txt
5. Test SEO with Lighthouse

### Phase 10: Testing and QA

1. Write unit tests for utilities
2. Write integration tests for API routes
3. Write component tests
4. Perform accessibility testing
5. Perform cross-browser testing
6. Performance testing with Lighthouse

### Phase 11: Deployment

1. Configure production environment variables
2. Set up MongoDB Atlas (production)
3. Deploy to Vercel
4. Configure custom domain
5. Set up monitoring and error tracking

### Data Migration Script

```typescript
// scripts/migrate-data.ts

import { Pool } from 'pg'
import mongoose from 'mongoose'
import * as Models from '../lib/db/models'

async function migrateData() {
  // Connect to PostgreSQL
  const pgPool = new Pool({ connectionString: process.env.PG_URL })
  
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI)
  
  try {
    // Migrate users
    const users = await pgPool.query('SELECT * FROM users')
    for (const user of users.rows) {
      await Models.User.create({
        email: user.username, // Map username to email
        password: user.password, // Already hashed
        name: user.username,
        role: 'admin',
        createdAt: new Date()
      })
    }
    
    // Create default content for new collections
    await Models.Hero.create({
      title: "Default Title",
      subtitle: "Default Subtitle",
      description: "Default Description",
      ctaPrimary: { text: "Get Started", href: "#contact" },
      ctaSecondary: { text: "Learn More", href: "#about" },
      isVisible: true
    })
    
    // ... migrate other data
    
    console.log('Migration completed successfully')
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  } finally {
    await pgPool.end()
    await mongoose.disconnect()
  }
}

migrateData()
```



## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Theme System Properties

**Property 1: Theme toggle switches modes**
*For any* current theme state (light or dark), toggling the theme should switch to the opposite mode.
**Validates: Requirements 2.1**

**Property 2: Hue updates CSS variables**
*For any* hue value between 0 and 360, setting the hue should update the --theme-hue CSS custom property to that value.
**Validates: Requirements 2.3**

**Property 3: Theme persistence round-trip**
*For any* valid theme configuration (mode and hue), saving to localStorage and then loading should restore the exact same configuration.
**Validates: Requirements 2.4, 2.5**

**Property 4: No hydration mismatch**
*For any* theme state, the server-rendered HTML and client-rendered HTML should have the same initial theme class to prevent hydration errors.
**Validates: Requirements 2.10**

### Form Validation Properties

**Property 5: Contact form validation correctness**
*For any* contact form input, validation should accept all inputs with valid name, email, and message, and reject all inputs missing required fields or with invalid email format.
**Validates: Requirements 5.1**

**Property 6: Newsletter email validation**
*For any* email string, validation should accept all valid email formats and reject all invalid formats.
**Validates: Requirements 5.7**

**Property 7: Form submission round-trip**
*For any* valid contact form submission, submitting the data should result in the data being retrievable from the database with all fields preserved.
**Validates: Requirements 5.3, 7.3**

### API Validation Properties

**Property 8: API request validation**
*For any* API request body, validation should correctly identify valid requests (passing schema) and invalid requests (failing schema), returning appropriate status codes (200 for valid, 400 for invalid).
**Validates: Requirements 7.2, 7.4**

**Property 9: Duplicate subscription prevention**
*For any* email address, attempting to subscribe twice should result in the second subscription being rejected or returning the existing subscription.
**Validates: Requirements 7.8**

### Authentication Properties

**Property 10: Unauthenticated access denial**
*For any* request to /admin routes without a valid session, the system should redirect to /login or return 401 Unauthorized.
**Validates: Requirements 15.2, 15.3**

**Property 11: Password hashing security**
*For any* password string, the hashed version should never match the original string, and the same password should produce different hashes (due to salt).
**Validates: Requirements 16.3**

**Property 12: Session expiration**
*For any* session created at time T, accessing a protected route after T + 7 days should result in authentication failure.
**Validates: Requirements 16.5**

### Admin CRUD Properties

**Property 13: Project CRUD operations**
*For any* valid project data, creating a project should result in the project being retrievable by ID, updating should modify only specified fields, and deleting should make the project no longer retrievable.
**Validates: Requirements 15.8**

**Property 14: Content visibility toggle**
*For any* content item with isVisible flag, toggling the flag should change whether the content appears on the public site.
**Validates: Requirements 15.16**

**Property 15: Order preservation**
*For any* list of items with order values, reordering items and saving should result in the items being retrieved in the new order.
**Validates: Requirements 15.13**

### Image Upload Properties

**Property 16: Image validation**
*For any* uploaded file, the system should accept files with valid image MIME types (image/jpeg, image/png, image/webp) under 5MB and reject all other files.
**Validates: Requirements 19.2, 19.3**

**Property 17: Image upload round-trip**
*For any* valid image file, uploading should return a URL, and fetching that URL should return the image data.
**Validates: Requirements 19.1, 19.6**

### Data Migration Properties

**Property 18: Data transformation correctness**
*For any* record in PostgreSQL, the migration script should transform it to MongoDB format preserving all data values and relationships.
**Validates: Requirements 14.2, 14.5**

**Property 19: Migration idempotency**
*For any* dataset, running the migration script multiple times should produce the same final state (no duplicate records).
**Validates: Requirements 14.4**

### Navigation Properties

**Property 20: Smooth scroll navigation**
*For any* navigation link click, the page should scroll to the target section smoothly without jumping.
**Validates: Requirements 4.1**



## Error Handling

### Client-Side Error Handling

**Error Boundaries:**
```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

**Form Error Handling:**
- Display validation errors inline below fields
- Show general error message at top of form
- Provide retry mechanism for network errors
- Clear errors when user corrects input

**API Error Handling:**
- Catch network errors and display user-friendly messages
- Implement exponential backoff for retries
- Show loading states during requests
- Provide fallback UI for failed data fetches

### Server-Side Error Handling

**API Route Error Handling:**
```typescript
// Validation errors (400)
if (error instanceof ZodError) {
  return NextResponse.json({
    success: false,
    error: "Validation failed",
    details: error.errors
  }, { status: 400 })
}

// Authentication errors (401)
if (!session) {
  return NextResponse.json({
    success: false,
    error: "Unauthorized"
  }, { status: 401 })
}

// Not found errors (404)
if (!resource) {
  return NextResponse.json({
    success: false,
    error: "Resource not found"
  }, { status: 404 })
}

// Database errors (500)
if (error instanceof MongoError) {
  console.error('Database error:', error)
  return NextResponse.json({
    success: false,
    error: "Database error"
  }, { status: 500 })
}

// Generic errors (500)
console.error('Unexpected error:', error)
return NextResponse.json({
  success: false,
  error: "Internal server error"
}, { status: 500 })
```

**Database Error Handling:**
- Implement connection retry logic
- Handle duplicate key errors gracefully
- Validate data before database operations
- Log all database errors for monitoring

**Authentication Error Handling:**
- Rate limit login attempts
- Lock accounts after failed attempts
- Clear invalid sessions
- Redirect to login on auth failure

### Custom Error Pages

**404 Not Found:**
```typescript
// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <Link href="/">Go Home</Link>
    </div>
  )
}
```

**500 Server Error:**
```typescript
// app/global-error.tsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  )
}
```



## Testing Strategy

### Dual Testing Approach

The testing strategy combines unit tests for specific examples and edge cases with property-based tests for universal correctness guarantees. Both approaches are complementary and necessary for comprehensive coverage.

**Unit Tests:**
- Verify specific examples and edge cases
- Test integration points between components
- Test error conditions and boundary cases
- Focus on concrete scenarios

**Property-Based Tests:**
- Verify universal properties across all inputs
- Use randomized input generation
- Test invariants and round-trip properties
- Provide comprehensive input coverage

### Testing Tools

**Unit Testing:**
- Jest for test runner
- React Testing Library for component tests
- MSW (Mock Service Worker) for API mocking
- MongoDB Memory Server for database tests

**Property-Based Testing:**
- fast-check library for TypeScript
- Minimum 100 iterations per property test
- Custom generators for domain objects

**End-to-End Testing:**
- Playwright for E2E tests
- Test critical user flows
- Test across multiple browsers

### Unit Test Examples

**Theme System Tests:**
```typescript
describe('ThemeProvider', () => {
  it('should toggle between light and dark mode', () => {
    // Test specific toggle behavior
  })
  
  it('should persist theme to localStorage', () => {
    // Test localStorage integration
  })
  
  it('should handle invalid hue values', () => {
    // Test edge case: hue < 0 or hue > 360
  })
})
```

**Form Validation Tests:**
```typescript
describe('Contact Form Validation', () => {
  it('should accept valid email addresses', () => {
    // Test specific valid emails
  })
  
  it('should reject invalid email addresses', () => {
    // Test specific invalid emails
  })
  
  it('should require all mandatory fields', () => {
    // Test missing fields
  })
})
```

**API Route Tests:**
```typescript
describe('POST /api/contact', () => {
  it('should save valid submissions to database', async () => {
    // Test successful submission
  })
  
  it('should return 400 for invalid data', async () => {
    // Test validation error
  })
  
  it('should return 500 for database errors', async () => {
    // Test error handling
  })
})
```

### Property-Based Test Examples

**Property Test Configuration:**
Each property test runs 100 iterations with randomized inputs and includes a tag referencing the design document property.

**Theme System Property Tests:**
```typescript
import fc from 'fast-check'

describe('Theme System Properties', () => {
  it('Property 1: Theme toggle switches modes', () => {
    // Feature: portfolio-nextjs-migration, Property 1: Theme toggle switches modes
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        (currentTheme) => {
          const newTheme = toggleTheme(currentTheme)
          return newTheme !== currentTheme &&
                 (newTheme === 'light' || newTheme === 'dark')
        }
      ),
      { numRuns: 100 }
    )
  })
  
  it('Property 2: Hue updates CSS variables', () => {
    // Feature: portfolio-nextjs-migration, Property 2: Hue updates CSS variables
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 360 }),
        (hue) => {
          setHue(hue)
          const cssValue = getCSSVariable('--theme-hue')
          return parseInt(cssValue) === hue
        }
      ),
      { numRuns: 100 }
    )
  })
  
  it('Property 3: Theme persistence round-trip', () => {
    // Feature: portfolio-nextjs-migration, Property 3: Theme persistence round-trip
    fc.assert(
      fc.property(
        fc.record({
          mode: fc.constantFrom('light', 'dark'),
          hue: fc.integer({ min: 0, max: 360 })
        }),
        (theme) => {
          saveTheme(theme)
          const loaded = loadTheme()
          return loaded.mode === theme.mode && loaded.hue === theme.hue
        }
      ),
      { numRuns: 100 }
    )
  })
})
```

**Form Validation Property Tests:**
```typescript
describe('Form Validation Properties', () => {
  it('Property 5: Contact form validation correctness', () => {
    // Feature: portfolio-nextjs-migration, Property 5: Contact form validation correctness
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1 }),
          email: fc.emailAddress(),
          message: fc.string({ minLength: 1 })
        }),
        (validInput) => {
          const result = validateContactForm(validInput)
          return result.success === true
        }
      ),
      { numRuns: 100 }
    )
    
    // Test invalid inputs
    fc.assert(
      fc.property(
        fc.record({
          name: fc.option(fc.string()),
          email: fc.option(fc.string()),
          message: fc.option(fc.string())
        }),
        (invalidInput) => {
          // At least one field is missing or invalid
          if (!invalidInput.name || !invalidInput.email || !invalidInput.message) {
            const result = validateContactForm(invalidInput)
            return result.success === false
          }
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
```

**API Property Tests:**
```typescript
describe('API Properties', () => {
  it('Property 8: API request validation', () => {
    // Feature: portfolio-nextjs-migration, Property 8: API request validation
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1 }),
          email: fc.emailAddress(),
          message: fc.string({ minLength: 1 })
        }),
        async (validData) => {
          const response = await fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify(validData)
          })
          return response.status === 200
        }
      ),
      { numRuns: 100 }
    )
  })
})
```

**Authentication Property Tests:**
```typescript
describe('Authentication Properties', () => {
  it('Property 10: Unauthenticated access denial', () => {
    // Feature: portfolio-nextjs-migration, Property 10: Unauthenticated access denial
    fc.assert(
      fc.property(
        fc.constantFrom('/admin', '/admin/projects', '/admin/skills'),
        async (adminRoute) => {
          const response = await fetch(adminRoute)
          return response.status === 401 || response.redirected
        }
      ),
      { numRuns: 100 }
    )
  })
})
```

**CRUD Property Tests:**
```typescript
describe('Admin CRUD Properties', () => {
  it('Property 13: Project CRUD operations', () => {
    // Feature: portfolio-nextjs-migration, Property 13: Project CRUD operations
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string({ minLength: 1 }),
          description: fc.string(),
          technologies: fc.array(fc.string()),
          status: fc.constantFrom('In Progress', 'Completed', 'Archived')
        }),
        async (projectData) => {
          // Create
          const created = await createProject(projectData)
          const retrieved = await getProject(created.id)
          
          // Update
          const updated = await updateProject(created.id, { title: 'New Title' })
          
          // Delete
          await deleteProject(created.id)
          const deleted = await getProject(created.id)
          
          return retrieved.title === projectData.title &&
                 updated.title === 'New Title' &&
                 deleted === null
        }
      ),
      { numRuns: 100 }
    )
  })
})
```

### Integration Tests

**API Integration Tests:**
- Test complete request/response cycles
- Test authentication middleware
- Test database operations
- Test error handling

**Component Integration Tests:**
- Test form submission flows
- Test theme system integration
- Test navigation and routing
- Test data fetching and display

### Accessibility Tests

**Automated Accessibility Testing:**
- Use jest-axe for automated a11y tests
- Test keyboard navigation
- Test ARIA labels and roles
- Test color contrast ratios

### Performance Tests

**Lighthouse CI:**
- Run Lighthouse tests in CI/CD
- Enforce minimum scores (Performance > 90)
- Monitor Core Web Vitals
- Track bundle sizes

### Test Coverage Goals

- Minimum 80% code coverage for critical paths
- 100% coverage for validation logic
- 100% coverage for authentication logic
- All correctness properties implemented as property tests
- All edge cases covered by unit tests

