# Design Guidelines: Biotech Student Portfolio

## Design Approach
**Reference-Based**: Drawing from Linear's clean typography and Notion's information hierarchy, combined with scientific aesthetics. Professional yet approachable, emphasizing clarity and modern design patterns suitable for academic/scientific portfolios.

## Core Design Principles
- **Scientific Precision**: Clean lines, structured layouts, data-driven presentation
- **Modern Academic**: Professional without being sterile, accessible without being casual
- **Dynamic Adaptability**: Seamless theme color transitions that maintain readability in both light and dark modes

## Layout System
**Spacing**: Use Tailwind units of 4, 6, 8, 12, 16, 20, and 24 for consistent rhythm
- Section padding: py-20 (desktop), py-12 (mobile)
- Component spacing: gap-8 for grids, gap-4 for cards
- Container: max-w-6xl for content sections

## Typography Hierarchy
**Font Stack**: 
- Primary: Inter (headings and UI elements) - clean, scientific feel
- Secondary: Source Sans Pro (body text) - excellent readability

**Scale**:
- Hero headline: text-5xl md:text-6xl font-bold
- Section headers: text-3xl md:text-4xl font-semibold
- Subsection headers: text-xl md:text-2xl font-medium
- Body text: text-base md:text-lg leading-relaxed
- Small text/captions: text-sm

## Component Library

### Navigation
Fixed header with logo, navigation links (About, Projects, Skills, Contact), theme toggle (sun/moon icon), and theme color picker icon
- Height: h-16
- Backdrop blur effect with semi-transparent background
- Sticky positioning for scroll persistence

### Hero Section
Full-width hero with large background image (laboratory/research setting)
- Height: min-h-screen with centered content
- Overlay gradient for text readability
- Headline + subtitle + CTA button with blurred background
- Scroll indicator at bottom

### About Section
Two-column layout (lg:grid-cols-2)
- Left: Professional headshot/portrait image (rounded-lg)
- Right: Bio text with education timeline
- Cards with subtle borders highlighting key achievements

### Projects Showcase
Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Project cards with image thumbnails at top
- Title, brief description, technologies used (pill badges)
- Hover state: subtle elevation increase
- Each card links to detailed project view

### Skills Section
Multi-category skill display:
- Laboratory Techniques (grid of icon cards)
- Software & Tools (horizontal pill layout)
- Research Areas (card grid with icons)
- Use 2-column on tablet, 3-column on desktop

### Theme Color Picker Component
Floating panel or modal triggered by icon in header:
- HSL slider for hue selection (0-360 degrees)
- Real-time preview showing how accent color appears in light/dark modes
- Preset color swatches for quick selection
- Apply/reset buttons

### Contact Section
Centered layout with contact form on left, contact information on right (lg:grid-cols-2)
- Form fields: name, email, subject, message
- Social links with icons (LinkedIn, GitHub, ResearchGate, email)
- Response time indicator

### Footer
Multi-column footer (sm:grid-cols-2 lg:grid-cols-4)
- Quick links, social media, newsletter signup, copyright
- Minimalist design with subtle dividers

## Dynamic Theme System Specifications

### Theme Color Application
- **Accent Elements**: Buttons, links, active states, progress indicators, icon highlights
- **Preservation**: Backgrounds remain neutral (whites/grays in light, darks in dark mode)
- **Contrast Maintenance**: Selected hue automatically adjusts lightness/saturation for accessibility in each mode
- **Smooth Transitions**: 200ms ease-in-out for all color changes

### Color Distribution
- Primary CTA buttons: Full accent color
- Secondary buttons: Accent color with opacity
- Link hover states: Accent color
- Active navigation items: Accent color underline/highlight
- Skill badges: Accent color borders
- Section dividers: Subtle accent tint

## Images

### Hero Image
Large, high-quality laboratory or research environment image
- Modern biotech lab setting with equipment
- Bright, well-lit, professional photography
- Position: background cover with gradient overlay
- Overlay: Dark gradient (bottom-to-top) for text legibility

### About Section Portrait
Professional headshot or candid research photo
- Dimensions: Square or 3:4 portrait ratio
- Treatment: Subtle rounded corners (rounded-lg)
- Position: Left column on desktop, top on mobile

### Project Thumbnails
Research/project images for each portfolio item
- Dimensions: 16:9 landscape ratio
- Content: Lab work, data visualizations, research outcomes
- Treatment: Consistent styling across all thumbnails

### Skills Section Icons
Use Heroicons via CDN for all skill category icons
- Microscope, beaker, DNA helix concepts for lab techniques
- Computer, chart, database for software skills
- Consistent sizing: w-8 h-8 or w-10 h-10

## Animations
**Minimal and purposeful**:
- Smooth scroll behavior
- Fade-in-up for sections on scroll (subtle, one-time)
- Theme color transition: 200ms
- Card hover elevations: 150ms
- Navigation state changes: 100ms

## Accessibility
- WCAG AA contrast ratios maintained across all theme colors
- Focus states clearly visible with accent color outline
- Semantic HTML throughout
- Form labels and ARIA attributes
- Keyboard navigation support for theme picker