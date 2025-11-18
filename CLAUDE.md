# Portfolio Deanny Bruces - Project Documentation

## Project Overview

**Portfolio Deanny Bruces** is a modern, high-performance portfolio website built for Deanny Bruces, a frontend developer and UX/UI specialist. The site showcases services, projects, blog content, and interactive tools while prioritizing performance, accessibility, and user experience.

**Live Site**: https://www.deannybruces.com
**Language**: Spanish (es)
**Framework**: Astro 5.13.9
**Rendering**: Server-Side Rendering (SSR) via Vercel

---

## Quick Reference

This documentation is split into modular sections for easier navigation:

- **[Header & Navigation](.claude/sections/header.md)** - Header, navigation components, and mobile menu
- **[Footer](.claude/sections/footer.md)** - Footer structure and social links
- **[Components](.claude/sections/components.md)** - Reusable components inventory and patterns
- **[Content & Collections](.claude/sections/content.md)** - Content structure, schemas, and management
- **[Styling System](.claude/sections/styling.md)** - Design tokens, CSS architecture, and theming
- **[Pages & Routing](.claude/sections/pages.md)** - Page structure, dynamic routes, and API endpoints

---

## Technology Stack

### Core Framework
- **Astro 5.13.9** - Static site generator with islands architecture
- **React 19.2.0** - For interactive components
- **TypeScript** - Type safety and better DX

### Integrations
- **@astrojs/react** - React integration for Astro
- **@astrojs/mdx** - MDX support for content
- **@astrojs/sitemap** - Automatic sitemap generation
- **@astrojs/vercel** - Vercel SSR adapter

### UI Libraries
- **lucide-react** - Icon library
- **swiper** - Carousel/slider functionality
- **aos** - Scroll animations
- **highlight.js** - Code syntax highlighting
- **qrcode** - QR code generation
- **tinycolor2** - Color manipulation utilities

### Development Tools
- **ESLint** - Code linting with Astro plugin
- **Prettier** - Code formatting with Astro plugin
- **Stylelint** - CSS linting
- **TypeScript ESLint** - TypeScript linting

---

## Project Structure

```
portfolio-deanny/
├── .claude/                    # Claude AI documentation
│   └── sections/               # Modular documentation files
├── public/                     # Static assets
│   └── templates/              # Template files
├── src/
│   ├── assets/
│   │   ├── icons/              # SVG icons (70+ icons)
│   │   ├── images/             # Image assets
│   │   └── styles/             # Global CSS files
│   │       ├── global.css      # CSS variables & base styles
│   │       ├── reset.css       # CSS reset
│   │       ├── grid.css        # Grid system
│   │       ├── md.css          # Markdown styles
│   │       ├── Header.css      # Header-specific styles
│   │       ├── Footer.css      # Footer-specific styles
│   │       └── *.css           # Component-specific styles
│   ├── components/             # Astro & React components
│   │   ├── *.astro             # Astro components (28 files)
│   │   └── *.jsx               # React components (3 files)
│   ├── content/                # Content collections
│   │   ├── categories.json     # Blog categories
│   │   ├── posts/              # Blog posts (MD)
│   │   ├── projects/           # Project showcase (MD)
│   │   └── tools/              # Tool pages (MD/MDX)
│   ├── layouts/
│   │   └── Layout.astro        # Main layout wrapper
│   ├── pages/                  # Routes and pages
│   │   ├── api/                # API endpoints
│   │   ├── blog/               # Blog pages
│   │   ├── projects/           # Project pages
│   │   ├── tools/              # Tools pages
│   │   └── *.astro             # Static pages
│   ├── utils/                  # Utility functions
│   │   ├── contrast-checker.ts # WCAG contrast validation
│   │   └── wcag-scanner.ts     # Accessibility scanner
│   └── content.config.ts       # Content collections config
├── astro.config.mjs            # Astro configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
└── .env.example                # Environment variables template
```

---

## Core Principles & Patterns

### 1. Component Reusability Rule

**IMPORTANT**: When creating new sections or features, always check if a reusable component already exists before creating a new one. If no component exists, create reusable components that can be used across multiple pages.

**Existing Reusable Components**:
- `Card.astro` - Project/content cards with image, tags, and CTA
- `ButtonCta.astro` - Primary call-to-action buttons
- `Icon.astro` - Technology/service icons
- `PageTitle.astro` - Consistent page titles
- `SEOStructuredData.astro` - Structured data for SEO
- `SocialIcons.astro` - Social media icon links
- `WhatsAppButton.astro` - Floating WhatsApp contact button

### 2. Design System

**Brand Colors** (defined in `global.css`):
```css
--deanny-purpura: #8e44ad  /* Primary purple */
--deanny-lila: #c38cf6     /* Light purple/lilac */
--deanny-cian: #4bc0c8     /* Accent cyan */
--deanny-cian-hover: #84eef6  /* Cyan hover state */
```

**Color Usage Pattern**:
- Use `light-dark()` function for theme-aware colors
- Primary purple for borders and primary elements
- Cyan for accents, hover states, and CTAs
- Gradient combinations: purple → cyan, purple → pink

### 3. Naming Conventions

**CSS Classes**:
```
.component-name              /* Main component wrapper */
.component-name-container   /* Layout container */
.component-name-item        /* Individual items */
.component-name-title       /* Titles/headings */
.component-name-cta         /* Call-to-action elements */
```

**State Classes**:
- `.active` - Active/current state
- `.scrolled` - Scroll-triggered state
- `.visible` - Visibility toggle
- `.open` - Open/expanded state

### 4. Responsive Breakpoints

```css
Mobile-first approach:
- Base: < 767px
- Tablet: >= 768px
- Desktop: >= 1024px
- Large: >= 1400px
```

### 5. Accessibility Standards

- **ARIA labels** on all interactive elements
- **Semantic HTML** (nav, main, article, section)
- **Focus-visible** states with 3px outlines
- **Reduced motion** support via media query
- **Skip navigation** link for keyboard users
- **Alt text** on all images
- **WCAG AA** contrast ratios (4.5:1 for text)

### 6. Performance Patterns

- **Islands Architecture** - Only hydrate interactive components
- **View Transitions API** - Smooth page transitions
- **Image Optimization** - Astro's built-in image optimization
- **CSS-in-component** - Scoped styles to reduce bundle size
- **Lazy Loading** - Client directives (`client:load`, `client:visible`)

---

## Content Management

### Content Collections

The project uses Astro's Content Collections for type-safe content management:

1. **Posts** (`src/content/posts/`) - Blog articles
2. **Projects** (`src/content/projects/`) - Portfolio projects
3. **Tools** (`src/content/tools/`) - Interactive tools/utilities
4. **Categories** (`src/content/categories.json`) - Blog categories

See **[Content & Collections](.claude/sections/content.md)** for schemas and usage.

---

## Environment Variables

```bash
# Required for AI features
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here

# MCP Server (optional)
MCP_SERVER_URL=http://localhost:3001
MCP_SERVER_ENABLED=true

# Environment
NODE_ENV=development
```

---

## Development Workflow

### Available Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Lint JS/TS/Astro files
npm run format     # Format with Prettier
npm run stylelint  # Lint CSS files
```

### Path Aliases

```typescript
@components/*  → src/components/*
@layouts/*     → src/layouts/*
@styles/*      → src/assets/styles/*
@images/*      → src/assets/images/*
@scripts/*     → src/scripts/*
```

---

## Key Features

### 1. AI-Powered Tools
- **Chatbot** (`/api/chatbot.ts`) - Service consultation chatbot
- **Accessibility Checker** (`AccessibilityChecker.jsx`) - WCAG compliance checker
- **Contrast Scanner** (`/utils/contrast-checker.ts`) - Color contrast validation

### 2. Interactive Components
- **NarrativeHero** (React) - Hero section with theme-aware animations
- **HeroCarousel** - Swiper-based carousel
- **ServicesChatbot** (React) - Floating chat widget
- **AutomationShowcase** - Service demonstration

### 3. SEO & Analytics
- **Google Tag Manager** integration
- **Structured Data** (JSON-LD) for rich snippets
- **Auto-generated sitemap** via `@astrojs/sitemap`
- **Open Graph** and **Twitter Card** meta tags
- **Canonical URLs** and proper meta descriptions

### 4. Dark Mode
- **Auto-detection** via `prefers-color-scheme`
- **Manual toggle** capability
- **Smooth transitions** with CSS `light-dark()` function
- **Persistent storage** in localStorage

---

## Git Workflow

**Current Branch**: `feat/whatsapp-tool`
**Main Branch**: Not specified (likely `main` or `master`)

**Recent Changes**:
- Header and navigation refactored
- Services and tools sections updated
- New features: accessibility checker, automation showcase, AI chatbot
- Multiple styling improvements

---

## Important Notes for AI Assistants

### When Making Changes

1. **Check for existing components** before creating new ones
2. **Follow the naming conventions** for CSS classes
3. **Use CSS variables** from `global.css` instead of hardcoding colors
4. **Maintain accessibility** - add ARIA labels, focus states, semantic HTML
5. **Test responsiveness** at all breakpoints (767px, 1024px, 1400px)
6. **Keep light/dark mode** support using `light-dark()` function
7. **Add animations carefully** - include `prefers-reduced-motion` support

### Common Patterns

**Creating a new page**:
```astro
---
import Layout from '@layouts/Layout.astro';
---

<Layout
  title="Page Title"
  description="Page description for SEO"
>
  <!-- Content here -->
</Layout>
```

**Using reusable components**:
```astro
---
import Card from '@components/Card.astro';
import ButtonCta from '@components/ButtonCta.astro';
import Icon from '@components/Icon.astro';
---

<Card
  title="Title"
  image={imageImport}
  tags={['astro', 'react', 'typescript']}
  link="/projects/example"
/>

<ButtonCta href="/contact">Contact Me</ButtonCta>

<Icon name="astro" />
```

**Adding new icons**:
1. Add SVG to `src/assets/icons/`
2. Import in `Icon.astro` component
3. Add to `Iconos` object with a key name

---

## Contact & Support

**Developer**: Deanny Bruces
**Email**: deannybruces@gmail.com
**WhatsApp**: +56993068782
**Calendar**: https://calendar.app.google/7zL3cZ713aYB9tCW6

---

## License

© 2025 Deanny Bruces. All rights reserved.
