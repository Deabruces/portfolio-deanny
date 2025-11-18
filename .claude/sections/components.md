# Components Documentation

## Overview

This document catalogs all reusable and page-specific components in the portfolio. Components are organized by type: **reusable**, **page-specific**, and **interactive React components**.

---

## Component Reusability Rule

**CRITICAL**: Before creating a new component, always check if a similar reusable component exists. When creating new sections, build reusable components that can be used across multiple pages.

---

## Reusable Components

These components are designed for use across multiple pages and contexts.

### 1. Card.astro

**Purpose**: Display project/content cards with image, tags, title, and CTA

**Location**: `src/components/Card.astro`

**Props**:
```typescript
interface Props {
  link: string;           // Card link URL
  title: string;          // Card title
  image: ImageMetadata;   // Optimized image
  summary: string;        // Description (not displayed in current version)
  tags: string[];         // Technology/category tags
  date?: string;          // Optional date
  identifier?: string;    // Unique ID for view transitions
}
```

**Features**:
- Glassmorphic design with hover effects
- Image zoom on hover
- Technology icon tags (using Icon component)
- Gradient border on hover
- View transition animations
- Gradient CTA button with arrow
- Responsive image heights (280px desktop, 200px mobile)

**Usage Example**:
```astro
---
import Card from '@components/Card.astro';
import projectImage from '@images/project.png';
---

<Card
  title="Portfolio Website"
  image={projectImage}
  summary="A modern portfolio"
  tags={['astro', 'react', 'typescript']}
  link="/projects/portfolio"
  identifier="portfolio-card"
/>
```

**Styling**: Inline styles (373 lines)

---

### 2. ButtonCta.astro

**Purpose**: Animated gradient CTA button with rotating border effect

**Location**: `src/components/ButtonCta.astro`

**Props**:
```typescript
interface Props {
  href: string;  // Button link
}
```

**Features**:
- Rotating conic gradient border animation
- Blur effect on pseudo-element
- Cyan background (`var(--btn-cta)`)
- Supports slot content (icons + text)
- Uses `@property --angulo` for smooth rotation

**Usage Example**:
```astro
---
import ButtonCta from '@components/ButtonCta.astro';
---

<ButtonCta href="/contact">
  Contact Me
</ButtonCta>
```

**Animation**:
```css
@keyframes girar {
  0% { --angulo: 0deg; }
  100% { --angulo: 360deg; }
}
```

**Styling**: Inline styles (101 lines)

---

### 3. Icon.astro

**Purpose**: Display technology/service icons from SVG imports

**Location**: `src/components/Icon.astro`

**Props**:
```typescript
interface Props {
  name: string;  // Icon identifier
}
```

**Available Icons**:
- `html` - HTML5 logo
- `css` - CSS3 logo
- `javascript` - JavaScript logo
- `typescript` - TypeScript logo
- `astro` - Astro logo
- `angular` - Angular logo
- `react` - React logo
- `vue` - Vue logo
- `tailwind` - Tailwind CSS logo
- `wordpress` - WordPress logo
- `vite` - Vite logo

**Usage Example**:
```astro
---
import Icon from '@components/Icon.astro';
---

<Icon name="astro" />
<Icon name="react" />
<Icon name="typescript" />
```

**Adding New Icons**:
1. Add SVG to `src/assets/icons/`
2. Import in Icon.astro: `import NewIcon from "../assets/icons/new-icon.svg"`
3. Add to Iconos object: `newicon: NewIcon`

**File**: 33 lines

---

### 4. PageTitle.astro

**Purpose**: Consistent page title component with styling

**Location**: `src/components/PageTitle.astro`

**Usage**: Renders standardized page titles with consistent typography

---

### 5. SEOStructuredData.astro

**Purpose**: Generate JSON-LD structured data for SEO

**Location**: `src/components/SEOStructuredData.astro`

**Props**:
```typescript
interface Props {
  type?: 'website' | 'article' | 'blog' | 'portfolio';
  title: string;
  description: string;
  url: string;
  image: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}
```

**Output**: JSON-LD schema markup for search engines

**Usage Example**:
```astro
<SEOStructuredData
  type="article"
  title="Blog Post Title"
  description="Description"
  url={Astro.url.href}
  image={imageUrl}
  publishedTime="2025-01-15"
  author="Deanny Bruces"
/>
```

---

### 6. SocialIcons.astro

**Purpose**: Display social media icon links

**Location**: `src/components/SocialIcons.astro`

**Usage**: Renders clickable social media icons (LinkedIn, GitHub, Twitter, etc.)

**Used In**:
- Footer
- About page
- Contact page

---

### 7. WhatsAppButton.astro

**Purpose**: Floating WhatsApp contact button

**Location**: `src/components/WhatsAppButton.astro`

**Features**:
- Fixed position (bottom-right)
- WhatsApp green color
- Hover animations
- Pre-filled message link
- Mobile responsive

**Link Format**:
```
https://wa.me/56993068782?text=Hola%20Deanny,%20quiero%20información%20sobre%20tu%20servicio%20web
```

---

### 8. CardBlog.astro

**Purpose**: Blog post card component

**Location**: `src/components/CardBlog.astro`

**Features**:
- Similar to Card.astro but optimized for blog posts
- Category tags instead of tech tags
- Date display
- Summary excerpt

---

### 9. Formulario.astro

**Purpose**: Contact form component

**Location**: `src/components/Formulario.astro`

**Features**:
- Form validation
- FormSubmit.co integration
- Accessible form fields
- Success/error states

---

### 10. TechStack.astro

**Purpose**: Display technology stack with icons

**Location**: `src/components/TechStack.astro`

**Usage**: Grid of technology icons with labels

---

## Page-Specific Components

These components are designed for specific pages but could be adapted for reuse.

### 1. Hero.astro

**Purpose**: Traditional hero section

**Location**: `src/components/Hero.astro`

**Used In**: Various pages (legacy component)

---

### 2. NarrativeHeroWrapper.astro

**Purpose**: Wrapper for the React NarrativeHero component

**Location**: `src/components/NarrativeHeroWrapper.astro`

**Contains**: Client-side hydrated NarrativeHero React component

---

### 3. HeroCarousel.astro

**Purpose**: Hero section with Swiper carousel

**Location**: `src/components/HeroCarousel.astro`

**Features**:
- Swiper.js integration
- Auto-play slides
- Navigation arrows
- Pagination dots

---

### 4. About.astro

**Purpose**: About section with bio and image

**Location**: `src/components/About.astro`

**Used In**: `/sobre-mi` page

---

### 5. AboutMeHome.astro

**Purpose**: Condensed about section for homepage

**Location**: `src/components/AboutMeHome.astro`

**Used In**: `/` (homepage)

**Styling**: `src/assets/styles/AboutMeHome.css`

---

### 6. Services.astro

**Purpose**: Services showcase section

**Location**: `src/components/Services.astro`

**Features**:
- Service cards with icons
- Hover effects
- Grid layout

---

### 7. FeaturedProjects.astro

**Purpose**: Display featured/starred projects

**Location**: `src/components/FeaturedProjects.astro`

**Features**:
- Queries projects with `starred: true`
- Uses Card component for each project
- Grid layout

---

### 8. BlogHome.astro

**Purpose**: Recent blog posts section for homepage

**Location**: `src/components/BlogHome.astro`

**Features**:
- Fetches latest blog posts
- Uses CardBlog component
- Link to full blog

**Styling**: `src/assets/styles/BlogHome.css`

---

### 9. ToolsHome.astro

**Purpose**: Tools showcase section for homepage

**Location**: `src/components/ToolsHome.astro`

**Features**:
- Display featured tools
- Grid layout
- Tool cards with descriptions

**Styling**: `src/assets/styles/ToolsHome.css`

---

### 10. FeaturesCards.astro

**Purpose**: Feature highlights section

**Location**: `src/components/FeaturesCards.astro`

**Features**:
- Icon-based feature cards
- Benefits/value propositions
- Grid layout

**Styling**: `src/assets/styles/FeaturesCards.css`

---

### 11. Process.astro

**Purpose**: Work process/methodology section

**Location**: `src/components/Process.astro`

**Features**:
- Step-by-step workflow
- Numbered steps
- Icons for each phase

---

### 12. CtaFinal.astro

**Purpose**: Final call-to-action section

**Location**: `src/components/CtaFinal.astro`

**Features**:
- Prominent CTA button
- Motivational copy
- Contact encouragement

**Styling**: `src/assets/styles/CtaFinal.css`

---

### 13. AutomationShowcase.astro

**Purpose**: Showcase automation services/tools

**Location**: `src/components/AutomationShowcase.astro`

**Features**:
- Automation examples
- Interactive demonstrations
- Service highlights

---

### 14. Hora.astro

**Purpose**: Display current time (utility component)

**Location**: `src/components/Hora.astro`

**Features**:
- Real-time clock
- Timezone support

---

## Interactive React Components

These components use React for client-side interactivity.

### 1. NarrativeHero.jsx

**Purpose**: Interactive hero section with theme awareness

**Location**: `src/components/NarrativeHero.jsx`

**Features**:
- Theme detection and sync with global system
- MutationObserver for theme changes
- Lucide React icons (Rocket, Sparkles, Code, Palette)
- Animated blobs background
- Dual CTA buttons
- Responsive badge
- Dark/light mode classes

**Props**: None (self-contained)

**State**:
```javascript
const [isDark, setIsDark] = useState(true);
```

**Theme Detection**:
```javascript
useEffect(() => {
  // Detect theme from data-theme attribute or localStorage
  // Listen for theme changes via MutationObserver
  // Update state accordingly
}, []);
```

**Usage**:
```astro
---
import NarrativeHero from '@components/NarrativeHero.jsx';
---

<NarrativeHero client:load />
```

**Styling**: `src/components/NarrativeHero.css` (external CSS file)

**Dependencies**: lucide-react (Rocket icon)

---

### 2. ServicesChatbot.jsx

**Purpose**: Floating AI chatbot for service inquiries

**Location**: `src/components/ServicesChatbot.jsx`

**Features**:
- Floating chat widget
- AI-powered responses
- Integration with Anthropic API
- Conversation history
- Open/close toggle
- Message input with send button

**API Endpoint**: `/api/chatbot.ts`

**Usage**:
```astro
<ServicesChatbot client:load />
```

**State Management**:
- `messages` - Chat history
- `isOpen` - Widget visibility
- `inputValue` - Current input

---

### 3. AccessibilityChecker.jsx

**Purpose**: WCAG accessibility compliance checker

**Location**: `src/components/AccessibilityChecker.jsx`

**Features**:
- URL input for scanning
- WCAG guideline checks
- Color contrast validation
- Accessibility report generation
- Integration with backend scanner

**API Endpoint**: `/api/accessibility-scan.ts`

**Dependencies**:
- tinycolor2 (color manipulation)
- Custom utils: `contrast-checker.ts`, `wcag-scanner.ts`

**Usage**:
```astro
<AccessibilityChecker client:load />
```

---

## Component Organization Patterns

### Naming Conventions

**Astro Components**:
- PascalCase filenames: `ComponentName.astro`
- Semantic names describing purpose
- Suffix for specificity: `AboutMeHome.astro`, `BlogHome.astro`

**React Components**:
- PascalCase filenames: `ComponentName.jsx`
- Hook-based functional components
- External CSS files when needed

### File Structure

```
src/components/
├── Reusable/               (conceptual grouping)
│   ├── Card.astro
│   ├── ButtonCta.astro
│   ├── Icon.astro
│   └── ...
├── Page-Specific/          (conceptual grouping)
│   ├── Hero.astro
│   ├── About.astro
│   └── ...
├── Interactive/            (conceptual grouping)
│   ├── NarrativeHero.jsx
│   ├── ServicesChatbot.jsx
│   └── AccessibilityChecker.jsx
└── Layout/                 (conceptual grouping)
    ├── Header.astro
    ├── Footer.astro
    ├── Navigation.astro
    └── BurgerMenu.astro
```

---

## Component Styling Patterns

### Inline Styles (Astro)

Most Astro components use inline `<style>` tags:

```astro
---
// Component logic
---

<div class="component">
  <!-- HTML -->
</div>

<style>
  .component {
    /* Scoped styles */
  }
</style>
```

**Benefits**:
- Scoped to component (no conflicts)
- Bundled only when component is used
- Smaller CSS bundles

### External Stylesheets

Some components use external CSS files:

```astro
---
import '../assets/styles/ComponentName.css';
---
```

**Used For**:
- Large components (>300 lines of CSS)
- Shared component styles
- React components (NarrativeHero.css)

**Location**: `src/assets/styles/`

---

## Best Practices

### 1. Check Before Creating

**Before creating a new component**:
1. Review this document
2. Check `src/components/` directory
3. Look for similar functionality
4. Adapt existing components if possible

### 2. Design for Reusability

**When creating new components**:
- Use props for configuration
- Avoid hardcoded values
- Support slots for flexible content
- Include TypeScript interfaces
- Add ARIA labels
- Support light/dark themes

### 3. Maintain Consistency

**Follow existing patterns**:
- Use CSS variables from `global.css`
- Apply brand colors consistently
- Match existing animation styles
- Use established breakpoints
- Include accessibility features

### 4. Documentation

**When adding a component**:
- Document props and their types
- Provide usage examples
- Note dependencies
- List known limitations
- Add to this documentation

---

## Component Dependencies

### External Libraries

**Icons**:
- lucide-react (React components)
- Custom SVG imports (Astro components)

**Interactivity**:
- Swiper (HeroCarousel)
- AOS (scroll animations - if used)

**Utilities**:
- tinycolor2 (color manipulation)
- qrcode (QR generation - if used)

### Internal Dependencies

**Common Imports**:
```astro
---
import { Image } from 'astro:assets';
import Layout from '@layouts/Layout.astro';
import Icon from '@components/Icon.astro';
---
```

---

## Client Directives

React components use Astro's client directives:

```astro
<NarrativeHero client:load />         <!-- Load on page load -->
<ServicesChatbot client:load />       <!-- Load on page load -->
<AccessibilityChecker client:visible /> <!-- Load when visible -->
```

**Available Directives**:
- `client:load` - Hydrate immediately
- `client:idle` - Hydrate when browser idle
- `client:visible` - Hydrate when in viewport
- `client:media` - Hydrate at breakpoint
- `client:only` - Only render on client

---

## Testing Components

### Visual Testing Checklist

- [ ] Component renders correctly on all breakpoints
- [ ] Light/dark mode support works
- [ ] Hover states are visible
- [ ] Focus states meet WCAG standards
- [ ] Animations run smoothly
- [ ] Images are optimized and load properly
- [ ] Icons display correctly
- [ ] Text is readable (contrast ratios)

### Accessibility Testing

- [ ] Semantic HTML elements used
- [ ] ARIA labels present where needed
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Reduced motion preference respected

### Functional Testing

- [ ] Links navigate correctly
- [ ] Forms submit properly
- [ ] Interactive elements respond
- [ ] Props work as expected
- [ ] No console errors
- [ ] No TypeScript errors

---

## Related Documentation

- [Header & Navigation](.claude/sections/header.md)
- [Footer](.claude/sections/footer.md)
- [Styling System](.claude/sections/styling.md)
- [Pages & Routing](.claude/sections/pages.md)

---

## Quick Reference

### Most Commonly Used Components

1. **Card** - For project/content cards
2. **ButtonCta** - For primary CTAs
3. **Icon** - For technology logos
4. **Layout** - For page wrapper
5. **Navigation** - For header nav
6. **Footer** - For site footer
7. **SEOStructuredData** - For SEO metadata

### When to Create a New Component

✅ **Create New Component When**:
- Logic is reused 2+ times
- Component is self-contained
- Functionality is distinct
- Code exceeds ~100 lines

❌ **Don't Create Component When**:
- Used only once
- Tightly coupled to specific page
- Very simple markup (<20 lines)
- Already exists with slight variation
