# Footer Documentation

## Overview

The footer features a modern glassmorphic design with a three-column grid layout, animated background blobs, and comprehensive site navigation. It includes brand information, navigation links, contact details, and social media icons.

---

## File Structure

```
src/
├── components/
│   ├── Footer.astro           # Main footer component (660 lines)
│   └── SocialIcons.astro      # Social media icons component
└── assets/
    ├── icons/
    │   └── love.svg           # Heart icon for copyright
    ├── images/
    │   └── logo-deanny.png    # Brand logo
    └── styles/
        └── Footer.css         # Inline styles in Footer.astro
```

---

## Footer Structure

### HTML Architecture (Footer.astro:9-136)

```html
<footer class="footer">
  <!-- Background Elements (decorative blobs) -->
  <div class="footer-background" aria-hidden="true">
    <div class="floating-blob blob-1"></div>
    <div class="floating-blob blob-2"></div>
  </div>

  <!-- Main Footer Content -->
  <div class="footer-main">
    <div class="footer-container">
      <!-- Column 1: Brand -->
      <div class="footer-brand">
        <div class="brand-top">
          <Image src={LogoDeanny} alt="Logo de Deanny Bruces" class="footer-logo" />
          <h2>Deanny Bruces</h2>
          <p>Desarrolladora Frontend · SEO · UX/UI</p>
        </div>
        <a href="https://calendar.app.google/7zL3cZ713aYB9tCW6" class="btn-footer">
          <span>Agendar cita</span>
          <svg><!-- Calendar icon --></svg>
        </a>
      </div>

      <!-- Column 2: Navigation -->
      <nav class="footer-nav" aria-label="Navegación del footer">
        <h4>Navegación</h4>
        <ul class="nav-grid">
          <li><a href="/">Inicio</a></li>
          <li><a href="/sobre-mi">Sobre mí</a></li>
          <li><a href="/servicios">Servicios</a></li>
          <li><a href="/proyectos">Proyectos</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/tools">Herramientas</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </nav>

      <!-- Column 3: Contact & Social -->
      <div class="footer-contact">
        <h4>Contacto</h4>
        <div class="contact-info">
          <div class="contact-item">
            <div class="contact-icon"><!-- Email icon --></div>
            <a href="mailto:deannybruces@gmail.com">deannybruces@gmail.com</a>
          </div>
          <div class="contact-item">
            <div class="contact-icon"><!-- Phone icon --></div>
            <a href="https://wa.me/56993068782">WhatsApp</a>
          </div>
        </div>
        <div class="social-icons">
          <SocialIcons />
        </div>
      </div>
    </div>
  </div>

  <!-- Footer Bottom (Copyright & Legal) -->
  <div class="footer-bottom">
    <div class="footer-bottom-container">
      <p class="copy">
        &copy; 2025 Hecho con <Love /> por Deanny Bruces
      </p>
      <div class="footer-links">
        <a href="/aviso-legal">Aviso legal</a>
        <span>|</span>
        <a href="/privacidad">Política de privacidad</a>
      </div>
    </div>
  </div>
</footer>
```

---

## Design System

### Layout Grid

**Responsive Grid Columns**:

```css
/* Mobile: 1 column */
.footer-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

/* Tablet (≥768px): 2 columns */
@media (width >= 768px) {
  .footer-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
}

/* Desktop (≥1024px): 3 columns (1.2fr 1fr 1fr) */
@media (width >= 1024px) {
  .footer-container {
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: 4rem;
  }
}
```

**Column Distribution**:
1. **Brand Column** (1.2fr) - Logo, tagline, CTA button
2. **Navigation Column** (1fr) - Site navigation links
3. **Contact Column** (1fr) - Contact info + social icons

---

## Styling Features

### 1. Background & Glassmorphism

**Gradient Background**:
```css
.footer {
  background: linear-gradient(
    135deg,
    light-dark(rgb(168 85 247 / 8%), rgb(30 27 75 / 95%)),
    light-dark(rgb(6 182 212 / 8%), rgb(17 17 17 / 98%))
  );
}
```

**Floating Blobs** (animated decorative elements):
```css
.floating-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  filter: blur(90px);
  animation: blobFloat 20s ease-in-out infinite;
}

.blob-1 {
  top: -20%;
  left: -10%;
  width: 35rem;
  height: 35rem;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  animation-delay: 0s;
}

.blob-2 {
  right: -12%;
  bottom: -15%;
  width: 40rem;
  height: 40rem;
  background: linear-gradient(135deg, #06b6d4, #8b5cf6);
  animation-delay: 10s;
}

@keyframes blobFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-25px, -35px) scale(1.08); }
}
```

**Bottom Section Glassmorphism**:
```css
.footer-bottom {
  border-top: 1px solid light-dark(rgb(168 85 247 / 15%), rgb(168 85 247 / 25%));
  background: light-dark(rgb(255 255 255 / 50%), rgb(17 17 17 / 80%));
  backdrop-filter: blur(10px);
}
```

### 2. Brand Section

**Logo Styling**:
```css
.footer-logo {
  width: 60px;
  height: 60px;
  padding: 0.75rem;
  border: 2px solid light-dark(rgb(168 85 247 / 20%), rgb(168 85 247 / 30%));
  border-radius: 1rem;
  background: light-dark(rgb(168 85 247 / 10%), rgb(168 85 247 / 20%));
  transition: all 0.3s ease;
}

.footer-logo:hover {
  transform: scale(1.08) rotate(-5deg);
  border-color: transparent;
  background: linear-gradient(135deg, #a855f7, #06b6d4);
  box-shadow: 0 8px 25px rgb(168 85 247 / 30%);
}
```

**Gradient Title**:
```css
.footer-brand h2 {
  font-family: Poppins, sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, #a855f7, #06b6d4);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Tagline**:
```css
.footer-brand p {
  font-size: 1rem;
  color: light-dark(#64748b, #cbd5e1);
}
```

### 3. CTA Button

**Gradient Button with Shine Effect**:
```css
.btn-footer {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  gap: 0.75rem;
  align-items: center;
  padding: 1rem 2rem;
  border: 2px solid transparent;
  border-radius: 2.5rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #a855f7, #06b6d4);
  box-shadow: 0 8px 30px rgb(168 85 247 / 30%);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Shine animation */
.btn-footer::before {
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

.btn-footer:hover::before {
  left: 100%;
}

.btn-footer:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 40px rgb(168 85 247 / 40%);
}
```

### 4. Navigation Grid

**Two-column Layout on Mobile**:
```css
.nav-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem 1.5rem;
  list-style: none;
}

@media (width <= 767px) {
  .nav-grid {
    grid-template-columns: 1fr;  /* Single column on mobile */
  }
}
```

**Link Hover Effect** (animated underline):
```css
.nav-grid a {
  position: relative;
  padding: 0.5rem 0;
  color: light-dark(#64748b, #cbd5e1);
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-grid a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #a855f7, #06b6d4);
  transition: width 0.3s ease;
}

.nav-grid a:hover {
  transform: translateX(5px);
  color: light-dark(#a855f7, #a78bfa);
}

.nav-grid a:hover::after {
  width: 100%;
}
```

### 5. Contact Section

**Contact Items** (icon + text):
```css
.contact-item {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid light-dark(rgb(168 85 247 / 20%), rgb(168 85 247 / 30%));
  border-radius: 0.75rem;
  color: light-dark(#8b5cf6, #a78bfa);
  background: light-dark(rgb(168 85 247 / 10%), rgb(168 85 247 / 15%));
  transition: all 0.3s ease;
}

.contact-item:hover .contact-icon {
  transform: scale(1.1);
  border-color: transparent;
  color: #fff;
  background: linear-gradient(135deg, #a855f7, #06b6d4);
}
```

**Contact Links**:
- **Email**: `deannybruces@gmail.com`
- **WhatsApp**: `https://wa.me/56993068782?text=...`

### 6. Footer Bottom

**Responsive Layout**:
```css
.footer-bottom-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  text-align: center;
}

@media (width >= 768px) {
  .footer-bottom-container {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}
```

**Copyright with Heart Icon**:
```html
<p class="copy">
  &copy; 2025 Hecho con <Love aria-hidden="true" /> por Deanny Bruces
</p>
```

```css
.copy svg {
  width: 18px;
  height: 18px;
  color: #ec4899;  /* Pink heart */
}
```

---

## Animations

### 1. Fade-in on Load

Each section has a staggered fade-in animation:

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

.footer-brand {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0s;
}

.footer-nav {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.1s;
}

.footer-contact {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.2s;
}
```

### 2. Blob Float Animation

```css
@keyframes blobFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-25px, -35px) scale(1.08);
  }
}
```

**Duration**: 20s infinite
**Easing**: ease-in-out
**Stagger**: blob-1 (0s), blob-2 (10s delay)

---

## Accessibility

### ARIA Labels

```html
<!-- Navigation -->
<nav class="footer-nav" aria-label="Navegación del footer">

<!-- Decorative elements -->
<div class="footer-background" aria-hidden="true">
<Love aria-hidden="true" />

<!-- Links with context -->
<a href="..." target="_blank" rel="noopener noreferrer" aria-label="...">
```

### Focus States

```css
.btn-footer:focus-visible,
.nav-grid a:focus-visible,
.contact-item a:focus-visible,
.footer-links a:focus-visible {
  outline: 3px solid light-dark(#a855f7, #a78bfa);
  outline-offset: 4px;
  border-radius: 4px;
}
```

### Reduced Motion Support

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

## Responsive Behavior

### Breakpoint Summary

| Breakpoint | Layout | Spacing | Changes |
|------------|--------|---------|---------|
| **< 767px** | 1 column | 1.5rem padding | Full-width CTA, single nav column |
| **≥ 768px** | 2 columns | 2rem padding | Footer bottom flexes horizontally |
| **≥ 1024px** | 3 columns | 3rem padding | Optimal three-column layout |
| **≥ 1400px** | 3 columns | 3rem padding | Increased vertical padding |

### Mobile Adjustments (≤767px)

```css
@media (width <= 767px) {
  .footer-main {
    padding: 3rem 1.5rem 1.5rem;
  }

  .footer-container {
    gap: 2.5rem;
  }

  .nav-grid {
    grid-template-columns: 1fr;
  }

  .btn-footer {
    justify-content: center;
    width: 100%;
  }

  .footer-bottom {
    padding: 1.5rem;
  }
}
```

---

## Social Icons Component

**File**: `src/components/SocialIcons.astro`

The footer uses the `<SocialIcons />` component to display social media links. This is a reusable component also used in other parts of the site.

**Typical social platforms**:
- LinkedIn
- GitHub
- Twitter/X
- Instagram
- Portfolio sites

---

## Modifying the Footer

### Adding a New Navigation Link

Edit `Footer.astro:57-64`:

```html
<ul class="nav-grid">
  <li><a href="/">Inicio</a></li>
  <li><a href="/sobre-mi">Sobre mí</a></li>
  <!-- Add new link here -->
  <li><a href="/new-page">New Page</a></li>
</ul>
```

### Changing Contact Information

Edit `Footer.astro:71-113`:

```html
<div class="contact-item">
  <div class="contact-icon"><!-- Icon --></div>
  <a href="mailto:newemail@example.com">newemail@example.com</a>
</div>
```

### Updating the CTA Button

Edit `Footer.astro:30-51`:

```html
<a
  href="https://new-calendar-link.com"
  class="btn-footer"
  target="_blank"
  rel="noopener noreferrer"
>
  <span>New CTA Text</span>
  <svg><!-- Icon --></svg>
</a>
```

### Customizing Colors

All colors use CSS variables from `global.css`:

```css
/* Brand colors */
--deanny-purpura: #8e44ad
--deanny-lila: #c38cf6
--deanny-cian: #4bc0c8

/* Neutral colors */
--text-color: light-dark(#64748b, #cbd5e1)
--h1-h2-color: light-dark(#6e6b6b, #e6e0e7)
```

Use `light-dark()` for theme-aware colors.

---

## Performance Considerations

- **Backdrop blur** may impact performance on low-end devices
- **Blob animations** use transform for GPU acceleration
- **Fade-in animations** only trigger once on page load
- **Minimal JavaScript** - footer is purely HTML/CSS
- **SVG icons** are lightweight and scalable

---

## Related Files

- `src/components/Footer.astro` - Main footer component
- `src/components/SocialIcons.astro` - Social media icons
- `src/assets/icons/love.svg` - Heart icon for copyright
- `src/assets/images/logo-deanny.png` - Brand logo
- `src/assets/styles/global.css` - CSS variables

---

## Testing Checklist

- [ ] Three-column layout on desktop (≥1024px)
- [ ] Two-column layout on tablet (768-1023px)
- [ ] Single-column layout on mobile (<768px)
- [ ] All navigation links work correctly
- [ ] CTA button opens Google Calendar in new tab
- [ ] Email link opens mail client
- [ ] WhatsApp link opens chat with pre-filled message
- [ ] Social icons component renders correctly
- [ ] Blob animations run smoothly
- [ ] Fade-in animations trigger on page load
- [ ] Focus states are visible on all interactive elements
- [ ] Reduced motion preference is respected
- [ ] Logo hover animation works
- [ ] Nav link underline animation works
- [ ] Contact icon hover effects work
- [ ] Footer bottom section is responsive
