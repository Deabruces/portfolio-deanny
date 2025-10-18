# Styling System Documentation

## Overview

The styling system uses a combination of global CSS variables, component-scoped styles, and modern CSS features including `light-dark()` for theming and View Transitions API for smooth page navigation.

---

## CSS Architecture

### File Structure

```
src/assets/styles/
├── reset.css           # CSS reset/normalize
├── global.css          # CSS variables + base styles (286 lines)
├── grid.css            # Grid system
├── md.css              # Markdown content styles
├── Header.css          # Header component styles (375 lines)
├── Footer.css          # Footer component styles (inline in Footer.astro)
├── AboutMeHome.css     # About section styles
├── BlogHome.css        # Blog section styles
├── FeaturesCards.css   # Features section styles
├── CtaFinal.css        # CTA section styles
└── ToolsHome.css       # Tools section styles
```

### Import Order (Layout.astro:5-7)

```astro
---
import "../assets/styles/reset.css";   // 1. Reset first
import "../assets/styles/grid.css";    // 2. Grid system
import "../assets/styles/global.css";  // 3. Global styles & variables
---
```

---

## Design Tokens (global.css)

### Brand Colors

```css
:root {
  /* Primary Brand Colors */
  --deanny-purpura: #8e44ad;       /* Purple - Primary */
  --deanny-lila: #c38cf6;          /* Lilac - Light Purple */
  --deanny-cian: #4bc0c8;          /* Cyan - Accent */
  --deanny-cian-hover: #84eef6;    /* Cyan Hover */
}
```

**Usage Pattern**:
- **Purple** (`--deanny-purpura`): Primary color, borders, headings
- **Lilac** (`--deanny-lila`): Secondary elements, hover states
- **Cyan** (`--deanny-cian`): Accents, CTAs, active states
- **Cyan Hover** (`--deanny-cian-hover`): Hover interactions

### Theme-Aware Colors

Using `light-dark()` function for automatic theme switching:

```css
:root {
  /* Text Colors */
  --deanny-text-color: light-dark(#333, #fff);

  /* Background Colors */
  --deanny-bg-color: light-dark(#fff, #1a1a1a);

  /* Button Colors */
  --deanny-bg-btn-cta: light-dark(var(--deanny-cian), var(--deanny-cian));

  /* Border Colors */
  --deanny-border-color: light-dark(var(--deanny-lila), var(--deanny-lila));

  /* Heading Colors */
  --deanny-encabezados-text-color: light-dark(
    var(--deanny-purpura),
    var(--deanny-lila)
  );
}
```

### Legacy Color Variables

Transitioning from old to new naming:

```css
/* Old (still used in some components) */
--primary-color: light-dark(#f5f5f5, #2d0c4b);
--secondary-color: #c38cf6;
--background-color: light-dark(#fff, #1a1a1a);
--text-color: light-dark(#333, #fff);
--btn-cta: #4bc0c8;

/* New (preferred) */
Use --deanny-* variables
```

### Hero Background Gradients

```css
--color-1: light-dark(#fefcff, #8e44ad);
--color-2: light-dark(#f2e9f2, #1a1a1a);
--color-3: light-dark(#e7f6ff, #1a1a1a);
```

### Section Backgrounds

```css
--section-light: light-dark(#f2e9f2, #1a1a2e);
--section-dark: light-dark(#f4eef5, #1a0629);
```

### Typography Colors

```css
--h1-h2-color: light-dark(#6e6b6b, #e6e0e7);
--h3-color: light-dark(#dda0dd, #a29bfe);
```

### UI Element Colors

```css
--acento-btn: light-dark(#dda0dd, #8e44ad);
--acento-btn-hover: light-dark(#b157da, #c38cf6);
--bg-color: light-dark(#f2e9f2, #26122b);
--bg-color-tools: light-dark(#eee5ee, #713a7e);
```

### Category Colors

```css
/* Blog Categories */
--seo-marketing-digital: #8e44ad;
--programacion-y-mejores-practicas: #c38cf6;
--accesibilidad-y-usabilidad: #a2d5f2;
--experiencia-de-usuario-ux-ui: #dda0dd;
--rendimiento-web-y-optimizacion: #5c2e91;
--negocios-y-estrategias: #6fb1d2;
```

### Status Colors

```css
--success-color: light-dark(#059669, #10b981);
--error-color: light-dark(#dc2626, #f87171);
--warning-color: light-dark(#d97706, #fbbf24);
--info-color: light-dark(#2563eb, #60a5fa);
```

### Contrast Levels

```css
--high-contrast-text: light-dark(#1f2937, #f9fafb);
--medium-contrast-text: light-dark(#4b5563, #d1d5db);
--low-contrast-text: light-dark(#9ca3af, #6b7280);
```

---

## Typography System

### Font Families

```css
body {
  font-family: Lato, sans-serif;  /* Body text */
}

h1, h2, h3, h4, h5, h6 {
  font-family: Poppins, sans-serif;  /* Headings */
}
```

**Font Loading** (Layout.astro:67-72):
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
```

### Heading Scales

Using `clamp()` for responsive typography:

```css
h1 {
  font-size: clamp(3.5rem, 6vw, 6rem);    /* 56px - 96px */
  font-weight: 900;
  line-height: 1.1;
  color: var(--h1-h2-color);
}

h2 {
  font-size: clamp(2.5rem, 4vw, 3.5rem);  /* 40px - 56px */
  font-weight: 700;
  line-height: 1.2;
  color: var(--h1-h2-color);
}

h3 {
  font-size: clamp(1.5rem, 2vw, 2rem);    /* 24px - 32px */
  font-weight: 600;
  line-height: 1.3;
  color: var(--h3-color);
}

h4 {
  font-size: clamp(1.125rem, 1.25vw, 1.5rem);  /* 18px - 24px */
  font-weight: 600;
  line-height: 1.3;
}

h5 {
  font-size: clamp(1rem, 1.125vw, 1.25rem);    /* 16px - 20px */
  font-weight: 500;
  line-height: 1.3;
}
```

### Body Text

```css
p {
  font-size: clamp(1rem, 1.2vw, 1.125rem);  /* 16px - 18px */
  font-weight: 400;
  line-height: 1.7;
  color: var(--text-color);
}

a {
  font-size: clamp(0.875rem, 0.9375vw, 1rem);  /* 14px - 16px */
  font-weight: 600;
  line-height: 1.4;
  color: var(--deanny-purpura);
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

a:hover {
  color: var(--deanny-cian);
}

ul, ol {
  font-size: clamp(1.4rem, 1.5vw, 1.6rem);  /* 22.4px - 25.6px */
  font-weight: 500;
  line-height: 1.8;
  color: var(--text-color);
}
```

### Labels & Forms

```css
label {
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--text-color);
}

input, textarea, select {
  color: var(--text-color);
  background-color: var(--bg-color);
}

::placeholder {
  color: var(--text-placeholder);
}
```

---

## Theme System

### Color Scheme Configuration

```css
:root {
  font-size: 16px;
  color-scheme: light dark;  /* Supports both */
  transition: color-scheme 0.3s ease,
              background-color 0.3s ease,
              color 0.3s ease;
}

/* User preference overrides */
:root:has(input[name="color-scheme"][value="light dark"]:checked) {
  color-scheme: light dark;  /* Auto */
}

:root:has(input[name="color-scheme"][value="light"]:checked) {
  color-scheme: only light;  /* Force light */
}

:root:has(input[name="color-scheme"][value="dark"]:checked) {
  color-scheme: only dark;   /* Force dark */
}
```

### Theme Transitions

```css
/* Apply transitions to all elements */
*,
*::before,
*::after {
  transition: background-color 0.3s ease,
              border-color 0.3s ease,
              color 0.3s ease,
              fill 0.3s ease,
              stroke 0.3s ease,
              box-shadow 0.3s ease;
}

/* Enhanced transitions for interactive elements */
a, button, input, textarea, select {
  transition: background-color 0.3s ease,
              border-color 0.3s ease,
              color 0.3s ease,
              transform 0.3s ease,
              box-shadow 0.3s ease,
              opacity 0.3s ease;
}

/* Theme change animation */
.theme-transitioning * {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
  transition-duration: 0.5s !important;
}

.theme-transitioning {
  animation: theme-change 0.5s ease-out;
}

@keyframes theme-change {
  0% { filter: brightness(1); }
  50% { filter: brightness(1.05); }
  100% { filter: brightness(1); }
}
```

---

## View Transitions

### Global Navigation Transitions

```css
@view-transition {
  navigation: auto;  /* Enable for all navigations */
}
```

**Usage in Components**:
```css
.card-image {
  view-transition-name: var(--img-animation-name);
}

.card-title {
  view-transition-name: var(--title-animation-name);
}
```

---

## Scrollbar Styling

### Webkit Browsers (Chrome, Safari, Edge)

```css
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background: light-dark(#f2e9f2, #1a0629);
}

::-webkit-scrollbar-thumb {
  border: 2px solid light-dark(#f2e9f2, #1a0629);
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    var(--deanny-purpura),
    var(--deanny-cian)
  );
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    180deg,
    var(--deanny-lila),
    var(--deanny-cian-hover)
  );
}

::-webkit-scrollbar-thumb:active {
  background: var(--deanny-cian);
}
```

### Firefox

```css
* {
  scrollbar-color: var(--deanny-purpura) light-dark(#f2e9f2, #1a0629);
  scrollbar-width: thin;
}
```

---

## Responsive Breakpoints

### Standard Breakpoints

```css
/* Mobile-first approach */

/* Small Mobile (default) */
/* < 767px */

/* Tablet */
@media (width >= 768px) {
  /* Styles for tablets and up */
}

/* Desktop */
@media (width >= 1024px) {
  /* Styles for desktop and up */
}

/* Large Desktop */
@media (width >= 1400px) {
  /* Styles for large screens */
}

/* Mobile-specific */
@media (width <= 767px) {
  /* Mobile-only overrides */
}
```

### Common Patterns

```css
/* Progressive enhancement */
.component {
  /* Base mobile styles */
  padding: 1rem;
}

@media (width >= 768px) {
  .component {
    padding: 2rem;  /* Tablet */
  }
}

@media (width >= 1024px) {
  .component {
    padding: 3rem;  /* Desktop */
  }
}
```

---

## Common CSS Patterns

### Glassmorphism

```css
.glass {
  background: light-dark(rgb(255 255 255 / 85%), rgb(30 27 75 / 85%));
  backdrop-filter: blur(20px);
  border: 1px solid light-dark(rgb(168 85 247 / 15%), rgb(168 85 247 / 25%));
}
```

### Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, #a855f7, #06b6d4);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Gradient Backgrounds

```css
.gradient-bg {
  background: linear-gradient(
    135deg,
    var(--deanny-purpura),
    var(--deanny-cian)
  );
}

/* Multi-stop gradient */
.complex-gradient {
  background: linear-gradient(
    135deg,
    light-dark(rgb(168 85 247 / 8%), rgb(30 27 75 / 95%)),
    light-dark(rgb(6 182 212 / 8%), rgb(17 17 17 / 98%))
  );
}
```

### Button Hover Effects

```css
.btn {
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Shine effect */
.btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgb(255 255 255 / 30%),
    transparent
  );
  transition: left 0.6s ease;
}

.btn:hover::before {
  left: 100%;
}
```

### Animated Underlines

```css
.link {
  position: relative;
}

.link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #a855f7, #06b6d4);
  transition: width 0.3s ease;
}

.link:hover::after {
  width: 100%;
}
```

### Card Hover Glow

```css
.card {
  position: relative;
}

.card::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: -20px;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(
    circle at center,
    rgb(168 85 247 / 30%),
    transparent 70%
  );
  filter: blur(30px);
  transition: opacity 0.5s ease;
}

.card:hover::before {
  opacity: 1;
}
```

---

## Accessibility Styles

### Focus States

```css
/* Global focus styles (Layout.astro) */
*:focus {
  outline: 2px solid var(--acento-btn);
  outline-offset: 2px;
}

/* Interactive element focus */
a:focus, button:focus, input:focus, textarea:focus, select:focus {
  border-radius: 4px;
  outline: 2px solid var(--acento-btn);
  outline-offset: 2px;
}

/* Focus-visible (keyboard only) */
.element:focus-visible {
  outline: 3px solid light-dark(#a855f7, #a78bfa);
  outline-offset: 4px;
  border-radius: 4px;
}
```

### Skip Navigation

```css
.skip-nav {
  position: absolute;
  z-index: 1000;
  top: -40px;
  left: 6px;
  padding: 8px;
  border-radius: 4px;
  color: white;
  text-decoration: none;
  background-color: var(--acento-btn);
  transition: top 0.3s;
}

.skip-nav:focus {
  top: 6px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

---

## Component-Scoped Styles

### Inline Styles Pattern

```astro
---
// Component logic
---

<div class="component">
  <!-- Markup -->
</div>

<style>
  /* Scoped to this component */
  .component {
    /* Styles */
  }
</style>
```

**Benefits**:
- Automatic scoping (no class conflicts)
- Dead code elimination
- Smaller CSS bundles
- Component co-location

### External Stylesheets

```astro
---
import '../assets/styles/ComponentName.css';
---
```

**Use When**:
- Styles exceed ~200 lines
- Shared across multiple components
- Need global scope

---

## Animation Library

### Fade In Up

```css
@keyframes fadeInUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.element {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.1s;
}
```

### Blob Float

```css
@keyframes blobFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-25px, -35px) scale(1.08);
  }
}

.blob {
  animation: blobFloat 20s ease-in-out infinite;
}
```

### Rotating Border (ButtonCta)

```css
@property --angulo {
  inherits: false;
  initial-value: 0deg;
  syntax: "<angle>";
}

@keyframes girar {
  0% { --angulo: 0deg; }
  100% { --angulo: 360deg; }
}

.btn::before {
  background: conic-gradient(
    from var(--angulo),
    var(--color-1),
    var(--color-2),
    var(--color-3)
  );
  animation: girar 3s linear infinite;
}
```

### Slide In Left

```css
@keyframes slideInLeft {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

---

## Best Practices

### 1. Use CSS Variables

```css
/* ❌ Don't hardcode */
.element {
  color: #8e44ad;
  background: #fff;
}

/* ✅ Use variables */
.element {
  color: var(--deanny-purpura);
  background: var(--deanny-bg-color);
}
```

### 2. Use light-dark()

```css
/* ❌ Don't use separate dark mode rules */
.element {
  background: #fff;
}
@media (prefers-color-scheme: dark) {
  .element {
    background: #1a1a1a;
  }
}

/* ✅ Use light-dark() */
.element {
  background: light-dark(#fff, #1a1a1a);
}
```

### 3. Mobile-First Responsive

```css
/* ✅ Mobile first */
.element {
  padding: 1rem;
}
@media (width >= 768px) {
  .element {
    padding: 2rem;
  }
}

/* ❌ Desktop first */
.element {
  padding: 3rem;
}
@media (width <= 767px) {
  .element {
    padding: 1rem;
  }
}
```

### 4. Prefer Modern Syntax

```css
/* ✅ Modern */
@media (width >= 768px) { }

/* ❌ Legacy */
@media (min-width: 768px) { }
```

---

## Performance Tips

1. **Use transforms** for animations (GPU-accelerated)
2. **Avoid** animating `width`, `height`, `top`, `left`
3. **Prefer** `transform`, `opacity`
4. **Use** `will-change` sparingly
5. **Minimize** backdrop-filter usage
6. **Optimize** custom properties (don't overuse)

---

## Related Documentation

- [Components](.claude/sections/components.md)
- [Header & Navigation](.claude/sections/header.md)
- [Footer](.claude/sections/footer.md)

---

## Quick Reference

### Color Usage
- Primary: `--deanny-purpura`
- Accent: `--deanny-cian`
- Text: `--deanny-text-color`
- Background: `--deanny-bg-color`

### Breakpoints
- Mobile: < 767px
- Tablet: ≥ 768px
- Desktop: ≥ 1024px
- Large: ≥ 1400px

### Common Patterns
- Glassmorphism: `backdrop-filter: blur(20px)`
- Gradient text: `background-clip: text`
- Hover effects: `transform` + `box-shadow`
