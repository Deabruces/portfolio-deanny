# Header & Navigation Documentation

## Overview

The header uses a **dual navigation system** optimized for both desktop and mobile experiences. It features a glassmorphic design with scroll-aware behavior and full accessibility support.

---

## File Structure

```
src/
├── layouts/
│   └── Layout.astro           # Main layout (header integration)
├── components/
│   ├── Navigation.astro       # Desktop navigation (≥1024px)
│   └── BurgerMenu.astro       # Mobile navigation (<1024px)
└── assets/styles/
    └── Header.css             # All header styling (375 lines)
```

---

## Architecture

### Header Integration (Layout.astro:187-208)

The header is rendered in the main layout and appears on all pages:

```html
<header class="header" id="main-header">
  <div class="header-container">
    <!-- Logo Section -->
    <div class="logo-section">
      <a href="/" class="logo-link" aria-label="Ir a la página de inicio">
        <Image src={LogoDeanny} alt="Logo de Deanny Bruces" class="logo-image" />
        <span class="logo-text">Deanny Bruces</span>
      </a>
    </div>

    <!-- Desktop Navigation (≥1024px) -->
    <div class="header-desktop">
      <Navigation />
    </div>

    <!-- Mobile Navigation (<1024px) -->
    <div class="header-mobile">
      <BurgerMenu />
    </div>
  </div>
</header>
```

**Key Features**:
- Fixed positioning (`z-index: 1000`)
- Scroll-aware state changes
- Skip navigation link for accessibility
- 85px top margin on `<main>` to prevent overlap

---

## Desktop Navigation Component

**File**: `src/components/Navigation.astro`

### Menu Structure

```typescript
const menuElements: MenuElement[] = [
  { name: "Quién soy!", icon: Person, path: "/sobre-mi" },
  { name: "Servicios", icon: Services, path: "/services" },
  { name: "Proyectos", icon: Projects, path: "/proyectos" },
  { name: "Blog", icon: Blog, path: "/blog" },
  { name: "Herramientas", icon: Tool, path: "/tools" },
  { name: "Contacto", icon: Send, path: "/contacto" },
];
```

### Features

1. **Home Icon** - Separate home link with icon-only display
2. **Visual Separator** - Purple divider between home and menu items
3. **Icon-based Menu** - 6 navigation items with SVG icons + labels
4. **Active Page Detection** - URL pathname matching
5. **Glassmorphic Design** - Blur backdrop + semi-transparent background

### HTML Structure

```html
<nav role="navigation" aria-label="Navegación principal">
  <ul>
    <!-- Home Icon -->
    <li class:list={["li__home", { active: isActualPage({ path: "/" }) }]}>
      <a href="/"><Home /></a>
    </li>

    <!-- Separator -->
    <li class="li__separador"><span class="separator"></span></li>

    <!-- Navigation Items -->
    {menuElements.map((element) => (
      <li class:list={["li__nav", { active: isActualPage(element) }]}>
        <a href={element.path}>
          <element.icon />
          {element.name}
        </a>
      </li>
    ))}
  </ul>
</nav>
```

### Styling (Navigation.astro:51-146)

```css
nav {
  height: min-content;
  border: 1px solid var(--deanny-purpura);
  border-radius: 60px;
  font-size: 20px;
  background-color: light-dark(#faf8ffa9, #26122ba5);
  backdrop-filter: blur(10px);
}

/* Active State */
.li__nav.active {
  border: 1px solid var(--deanny-cian);
  border-radius: 20px;
  font-weight: 800;
  color: var(--deanny-cian);
}

/* Hover State */
.li__nav:hover {
  border: 1px solid var(--deanny-cian);
  border-radius: 20px;
}
```

**Design Tokens**:
- Border: `var(--deanny-purpura)` (#8e44ad)
- Active/Hover: `var(--deanny-cian)` (#4bc0c8)
- Background: Semi-transparent with `blur(10px)`
- Transition: `300ms ease-in-out`

---

## Mobile Navigation Component

**File**: `src/components/BurgerMenu.astro`

### Two-Part System

#### 1. Hamburger Button
```html
<button class="menu-burger-button" aria-label="Abrir menú" aria-expanded="false">
  <svg viewBox="0 0 100 100" width="30">
    <!-- 3 animated paths (hamburger → X) -->
  </svg>
</button>
```

**Features**:
- Fixed positioning (`z-index: 1001`)
- Animated SVG transformation (hamburger ↔ X)
- ARIA-expanded for screen readers
- Smooth path transitions

#### 2. Slide-in Drawer
```html
<nav class="nav-burger" aria-label="Menú de navegación móvil">
  <ul class="nav-burger-menu">
    {menuElements.map((element) => (
      <li class="nav-burger-item">
        <a href={element.path} class="nav-burger-link">
          <element.icon />
          {element.name}
        </a>
      </li>
    ))}
  </ul>
</nav>
```

**Features**:
- Full-height drawer (100vh)
- Transform-based animation (`translateX`)
- Staggered item animations
- Auto-close on link click or outside click

### Interactive Behavior (Client-side JS)

```javascript
// Toggle menu
burger?.addEventListener("click", () => {
  const isActive = menuBurger?.classList.toggle("active");
  burger?.setAttribute("aria-expanded", isActive ? "true" : "false");
  burger?.classList.toggle("active", isActive);
});

// Close on navigation
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    menuBurger?.classList.remove("active");
    burger?.setAttribute("aria-expanded", "false");
    burger?.classList.remove("active");
  });
});

// Close on outside click
document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu-burger-button") &&
      !e.target.closest(".nav-burger")) {
    // Close menu
  }
});
```

### Animations

**Slide-in Animation**:
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

/* Staggered delays for 5 items */
.nav-burger-item:nth-child(1) { animation-delay: 0.1s; }
.nav-burger-item:nth-child(2) { animation-delay: 0.15s; }
.nav-burger-item:nth-child(3) { animation-delay: 0.2s; }
.nav-burger-item:nth-child(4) { animation-delay: 0.25s; }
.nav-burger-item:nth-child(5) { animation-delay: 0.3s; }
```

---

## Header Styling (Header.css)

### Main Header Styles

```css
.header {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.25rem 2rem;
  background: light-dark(rgb(255 255 255 / 85%), rgb(30 27 75 / 85%));
  backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Scroll Behavior

**Trigger**: When `window.pageYOffset > 50`

**Normal State**:
```css
.header {
  padding: 1.25rem 2rem;
  background: light-dark(rgb(255 255 255 / 85%), rgb(30 27 75 / 85%));
}

.logo-image {
  width: 45px;
  height: 45px;
}
```

**Scrolled State**:
```css
.header.scrolled {
  padding: 0.75rem 2rem;  /* Compact */
  background: light-dark(rgb(255 255 255 / 95%), rgb(30 27 75 / 95%));  /* More opaque */
}

.header.scrolled .logo-image {
  width: 38px;  /* Smaller */
  height: 38px;
}
```

**JavaScript** (Layout.astro:218-230):
```javascript
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    header?.classList.add("scrolled");
  } else {
    header?.classList.remove("scrolled");
  }
});
```

### Logo Styling

```css
.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.logo-link:hover {
  transform: scale(1.08) rotate(-5deg);
}

.logo-text {
  font-family: Poppins, sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #a855f7, #06b6d4);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Responsive Breakpoints

```css
/* Mobile-first approach */
@media (width >= 1024px) {
  .header-desktop { display: flex; }      /* Show desktop nav */
  .header-mobile { display: none; }       /* Hide burger menu */
}

@media (width >= 1400px) {
  .header { padding: 1.25rem 3rem; }      /* Larger horizontal padding */
}

@media (width <= 767px) {
  .logo-image {
    width: 40px;
    height: 40px;
  }

  .header.scrolled .logo-image {
    width: 35px;
    height: 35px;
  }
}
```

---

## Accessibility Features

### Keyboard Navigation

```css
.logo-link:focus-visible,
.menu-burger-button:focus-visible,
.nav-burger-link:focus-visible {
  outline: 3px solid light-dark(#a855f7, #a78bfa);
  outline-offset: 4px;
  border-radius: 4px;
}
```

### Screen Reader Support

- `role="navigation"` on nav elements
- `aria-label="Navegación principal"` for context
- `aria-expanded` state on burger button
- `aria-hidden="true"` on decorative elements
- Skip navigation link (Layout.astro:175)

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

---

## Navigation Icons

**Location**: `src/assets/icons/`

**Used Icons**:
- `home.svg` - Home icon
- `person.svg` - About/Profile
- `services.svg` - Services
- `projects.svg` - Projects
- `blog.svg` - Blog
- `tool.svg` - Tools/Herramientas
- `send.svg` - Contact

**Import Pattern**:
```astro
---
import Home from "../assets/icons/home.svg";
import Person from "../assets/icons/person.svg";
// etc...
---
```

---

## Modifying the Header

### Adding a New Navigation Item

1. **Add icon** to `src/assets/icons/`
2. **Import** in both `Navigation.astro` and `BurgerMenu.astro`
3. **Add to menuElements array**:
   ```typescript
   { name: "New Page", icon: NewIcon, path: "/new-page" }
   ```
4. **Keep both files in sync** (desktop + mobile)

### Changing Colors

Use CSS variables instead of hardcoding:

```css
/* ❌ Don't do this */
border: 1px solid #8e44ad;

/* ✅ Do this */
border: 1px solid var(--deanny-purpura);
```

### Adjusting Scroll Trigger

Modify the scroll threshold in Layout.astro:230:

```javascript
if (currentScroll > 50) {  // Change this value
  header?.classList.add("scrolled");
}
```

### Adding New States

1. **Add class** to header element
2. **Define styles** in Header.css
3. **Toggle via JavaScript** in Layout.astro or component

---

## Common Issues & Solutions

### Issue: Navigation items not aligning properly
**Solution**: Check flex/grid properties on `.header-container` and navigation components

### Issue: Logo overlapping content on mobile
**Solution**: Verify `margin-top: 85px` on `<main>` element and adjust if needed

### Issue: Burger menu not closing
**Solution**: Check JavaScript event listeners and ensure `.active` class toggling is working

### Issue: Active state not showing
**Solution**: Verify `Astro.url.pathname` matches the exact path in menuElements

---

## Performance Considerations

- **Fixed positioning** reduces reflows during scroll
- **CSS transforms** for animations (GPU-accelerated)
- **Backdrop blur** may impact performance on older devices
- **Debounce scroll events** if needed for better performance
- **Minimal JavaScript** - only for burger menu and scroll detection

---

## Related Files

- `src/layouts/Layout.astro` - Header integration
- `src/components/Navigation.astro` - Desktop nav
- `src/components/BurgerMenu.astro` - Mobile nav
- `src/assets/styles/Header.css` - All header styles
- `src/assets/styles/global.css` - CSS variables

---

## Testing Checklist

- [ ] Desktop navigation displays correctly at ≥1024px
- [ ] Mobile burger menu displays correctly at <1024px
- [ ] Active page highlighting works on all pages
- [ ] Scroll behavior triggers at 50px
- [ ] Logo scales properly on scroll
- [ ] Burger menu opens/closes smoothly
- [ ] Outside click closes mobile menu
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Focus states are visible
- [ ] Screen reader announces navigation correctly
- [ ] Reduced motion preference is respected
- [ ] All navigation links are correct
