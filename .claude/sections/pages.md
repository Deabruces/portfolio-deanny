# Pages & Routing Documentation

## Overview

This document covers all pages, routing patterns, and API endpoints in the portfolio. The site uses Astro's file-based routing with both static and dynamic routes.

---

## Page Structure

```
src/pages/
├── index.astro                      # Homepage
├── sobre-mi.astro                   # About page
├── servicios.astro                  # Services page
├── proyectos.astro                  # Projects listing
├── contacto.astro                   # Contact page
├── accesibilidad.astro              # Accessibility page
├── plantillas.astro                 # Templates page
├── 404.astro                        # 404 error page
├── blog/
│   ├── index.astro                  # Blog listing
│   ├── [post].astro                 # Individual post (dynamic)
│   └── categories/
│       └── [category].astro         # Category filter (dynamic)
├── projects/
│   └── [id].astro                   # Individual project (dynamic)
├── tools/
│   ├── index.astro                  # Tools listing
│   └── [id].astro                   # Individual tool (dynamic)
└── api/
    ├── chatbot.ts                   # AI chatbot endpoint
    └── accessibility-scan.ts        # Accessibility scanner endpoint
```

---

## Static Pages

### 1. Homepage (/)

**File**: `src/pages/index.astro`

**Purpose**: Main landing page showcasing services, projects, and blog

**Sections**:
- `<NarrativeHeroWrapper />` - Hero with value proposition
- `<FeaturedProjects />` - Featured portfolio projects
- `<FeaturesCards />` - Key features/benefits
- `<AboutMeHome />` - Brief introduction
- `<Services />` - Services overview
- `<Process />` - Work methodology
- `<BlogHome />` - Recent blog posts
- `<ToolsHome />` - Featured tools
- `<AutomationShowcase />` - Automation services
- `<CtaFinal />` - Final call-to-action

**SEO**:
```astro
<Layout
  title="Inicio"
  description="Desarrolladora Frontend especializada en crear sitios web que convierten. Diseño, desarrollo y SEO estratégico para hacer crecer tu negocio."
  type="website"
/>
```

---

### 2. About (/sobre-mi)

**File**: `src/pages/sobre-mi.astro`

**Purpose**: Personal bio, skills, experience, and professional journey

**Typical Content**:
- Professional background
- Skills and expertise
- Technology stack
- Work philosophy
- Contact information

**Layout Pattern**:
```astro
<Layout
  title="Sobre mí"
  description="Conoce a Deanny Bruces, desarrolladora frontend especializada en UX/UI y SEO."
  type="website"
/>
```

---

### 3. Services (/servicios)

**File**: `src/pages/servicios.astro`

**Purpose**: Detailed service offerings and packages

**Typical Services**:
- Web Development
- UI/UX Design
- SEO Optimization
- Accessibility Consulting
- Performance Optimization
- Maintenance & Support

**Features**:
- Service cards with icons
- Pricing information
- CTA for consultation
- Service chatbot integration

---

### 4. Projects (/proyectos)

**File**: `src/pages/proyectos.astro`

**Purpose**: Portfolio showcase of all projects

**Implementation**:
```astro
---
import { getCollection } from 'astro:content';
import Card from '@components/Card.astro';

const projects = await getCollection('projects');
const sortedProjects = projects.sort((a, b) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);
---

<Layout
  title="Proyectos"
  description="Explora mi portafolio de proyectos web"
>
  <div class="projects-grid">
    {sortedProjects.map(project => (
      <Card
        title={project.data.title}
        image={project.data.image}
        summary={project.data.summary}
        tags={project.data.tags || []}
        link={`/projects/${project.id}`}
        identifier={project.id}
      />
    ))}
  </div>
</Layout>
```

**Features**:
- Grid layout of project cards
- Filterable by technology tag
- Sortable by date
- Uses Card component

---

### 5. Contact (/contacto)

**File**: `src/pages/contacto.astro`

**Purpose**: Contact form and contact information

**Components Used**:
- `<Formulario />` - Contact form
- `<SocialIcons />` - Social media links
- Contact details (email, phone, WhatsApp)

**Integrations**:
- FormSubmit.co for form handling
- WhatsApp direct link
- Google Calendar booking

---

### 6. Accessibility (/accesibilidad)

**File**: `src/pages/accesibilidad.astro`

**Purpose**: Accessibility commitment and checker tool

**Features**:
- `<AccessibilityChecker />` - Interactive WCAG scanner
- Accessibility statement
- WCAG guidelines information
- Keyboard navigation guide

---

### 7. Templates (/plantillas)

**File**: `src/pages/plantillas.astro`

**Purpose**: Downloadable templates and resources

**Typical Content**:
- Free website templates
- Code snippets
- Design resources
- Documentation templates

---

### 8. 404 Error Page

**File**: `src/pages/404.astro`

**Purpose**: Custom error page for missing routes

**Features**:
- Friendly error message
- Navigation suggestions
- Search functionality (optional)
- Link back to homepage

**Example**:
```astro
<Layout
  title="Página no encontrada"
  description="La página que buscas no existe"
>
  <section class="error-page">
    <h1>404 - Página no encontrada</h1>
    <p>Lo sentimos, la página que buscas no existe.</p>
    <a href="/">Volver al inicio</a>
  </section>
</Layout>
```

---

## Dynamic Routes

### 1. Blog Post Route (/blog/[post])

**File**: `src/pages/blog/[post].astro`

**Purpose**: Individual blog post pages

**Implementation**:
```astro
---
import { getCollection } from 'astro:content';
import Layout from '@layouts/Layout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts');

  return posts.map(post => ({
    params: { post: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();

// Get related posts
const allPosts = await getCollection('posts');
const relatedPosts = allPosts
  .filter(p => p.id !== post.id)
  .filter(p => p.data.categories.some(cat =>
    post.data.categories.some(postCat => postCat.id === cat.id)
  ))
  .slice(0, 3);
---

<Layout
  title={post.data.title}
  description={post.data.summary}
  image={post.data.image.src}
  type="article"
  publishedTime={post.data.date}
>
  <article class="blog-post">
    <header>
      <h1>{post.data.title}</h1>
      <time datetime={post.data.date}>{post.data.date}</time>
      <div class="categories">
        {post.data.categories.map(cat => (
          <a href={`/blog/categories/${cat.id}`}>{cat.data.name}</a>
        ))}
      </div>
    </header>

    <img src={post.data.image.src} alt={post.data.title} />

    <div class="content">
      <Content />
    </div>

    <aside class="related-posts">
      <h2>Artículos relacionados</h2>
      {relatedPosts.map(related => (
        <a href={`/blog/${related.id}`}>{related.data.title}</a>
      ))}
    </aside>
  </article>
</Layout>
```

**URL Structure**: `/blog/my-post-slug`

---

### 2. Blog Listing (/blog)

**File**: `src/pages/blog/index.astro`

**Purpose**: Blog post listing with categories

**Features**:
- All blog posts in grid
- Category filter links
- Sort by date (newest first)
- Pagination (optional)
- Search functionality (optional)

**Implementation**:
```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');
const categories = await getCollection('categories');

const sortedPosts = posts.sort((a, b) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);
---

<Layout title="Blog" description="Artículos sobre desarrollo web, SEO y UX/UI">
  <section class="blog-header">
    <h1>Blog</h1>
    <nav class="categories">
      {categories.map(cat => (
        <a href={`/blog/categories/${cat.id}`}>{cat.data.name}</a>
      ))}
    </nav>
  </section>

  <div class="posts-grid">
    {sortedPosts.map(post => (
      <CardBlog
        title={post.data.title}
        image={post.data.image}
        summary={post.data.summary}
        categories={post.data.categories}
        date={post.data.date}
        link={`/blog/${post.id}`}
      />
    ))}
  </div>
</Layout>
```

---

### 3. Category Filter Route (/blog/categories/[category])

**File**: `src/pages/blog/categories/[category].astro`

**Purpose**: Filter posts by category

**Implementation**:
```astro
---
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const categories = await getCollection('categories');
  const posts = await getCollection('posts');

  return categories.map(category => {
    const categoryPosts = posts.filter(post =>
      post.data.categories.some(cat => cat.id === category.id)
    );

    return {
      params: { category: category.id },
      props: {
        category,
        posts: categoryPosts.sort((a, b) =>
          new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
        ),
      },
    };
  });
}

const { category, posts } = Astro.props;
---

<Layout
  title={`Blog - ${category.data.name}`}
  description={`Artículos sobre ${category.data.name}`}
>
  <section class="category-page">
    <h1>{category.data.name}</h1>
    <p>{posts.length} artículos</p>

    <div class="posts-grid">
      {posts.map(post => (
        <CardBlog {...post.data} link={`/blog/${post.id}`} />
      ))}
    </div>
  </section>
</Layout>
```

**URL Structure**: `/blog/categories/seo`, `/blog/categories/web`

---

### 4. Project Detail Route (/projects/[id])

**File**: `src/pages/projects/[id].astro`

**Purpose**: Individual project showcase pages

**Implementation**:
```astro
---
import { getCollection, getEntry } from 'astro:content';

export async function getStaticPaths() {
  const projects = await getCollection('projects');

  return projects.map(project => ({
    params: { id: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await project.render();
---

<Layout
  title={project.data.title}
  description={project.data.summary}
  image={project.data.image.src}
  type="portfolio"
>
  <article class="project-detail">
    <header>
      <h1>{project.data.title}</h1>
      <div class="tech-stack">
        {project.data.tags?.map(tag => (
          <span class="tag">{tag}</span>
        ))}
      </div>
    </header>

    <img src={project.data.image.src} alt={project.data.title} />

    <div class="project-content">
      <Content />
    </div>

    <footer>
      <a href="/proyectos">← Ver todos los proyectos</a>
    </footer>
  </article>
</Layout>
```

**URL Structure**: `/projects/portfolio-redesign`

---

### 5. Tools Listing (/tools)

**File**: `src/pages/tools/index.astro`

**Purpose**: Display all available tools

**Features**:
- Tool cards with previews
- Category filtering
- Search functionality
- Interactive tool previews

---

### 6. Tool Detail Route (/tools/[id])

**File**: `src/pages/tools/[id].astro`

**Purpose**: Individual tool pages with interactive functionality

**Implementation**:
```astro
---
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const tools = await getCollection('tools');

  return tools.map(tool => ({
    params: { id: tool.id },
    props: { tool },
  }));
}

const { tool } = Astro.props;
const { Content } = await tool.render();
---

<Layout
  title={tool.data.title}
  description={tool.data.description}
  keywords={tool.data.keywords?.join(', ')}
  image={tool.data.image.src}
>
  <div class="tool-page">
    <header>
      <h1>{tool.data.title}</h1>
      <p>{tool.data.description}</p>
    </header>

    <!-- Interactive tool content (MDX with React components) -->
    <div class="tool-content">
      <Content />
    </div>

    <aside class="tool-sidebar">
      <h3>Herramientas relacionadas</h3>
      <!-- Related tools -->
    </aside>
  </div>
</Layout>
```

**URL Structure**: `/tools/qr-code-generator`, `/tools/contrast-checker`

---

## API Endpoints

### 1. Chatbot API (/api/chatbot)

**File**: `src/pages/api/chatbot.ts`

**Method**: POST

**Purpose**: AI-powered service consultation chatbot

**Request Body**:
```typescript
{
  message: string;      // User message
  history?: Array<{     // Optional conversation history
    role: 'user' | 'assistant';
    content: string;
  }>;
}
```

**Response**:
```typescript
{
  response: string;     // AI response
  status: 'success' | 'error';
  error?: string;       // Error message if failed
}
```

**Integration**:
- Anthropic Claude API
- OpenAI API (fallback)
- Environment variables: `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`

**Usage**:
```javascript
const response = await fetch('/api/chatbot', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Necesito información sobre tus servicios',
    history: []
  })
});

const data = await response.json();
console.log(data.response);
```

---

### 2. Accessibility Scanner API (/api/accessibility-scan)

**File**: `src/pages/api/accessibility-scan.ts`

**Method**: POST

**Purpose**: WCAG compliance checker for URLs

**Request Body**:
```typescript
{
  url: string;  // URL to scan
}
```

**Response**:
```typescript
{
  status: 'success' | 'error';
  data?: {
    issues: Array<{
      type: string;
      severity: 'error' | 'warning' | 'notice';
      element: string;
      message: string;
      wcag: string;  // WCAG guideline reference
    }>;
    score: number;   // Accessibility score (0-100)
    summary: {
      errors: number;
      warnings: number;
      notices: number;
    };
  };
  error?: string;
}
```

**Dependencies**:
- `src/utils/wcag-scanner.ts` - WCAG validation logic
- `src/utils/contrast-checker.ts` - Color contrast validation

**Usage**:
```javascript
const response = await fetch('/api/accessibility-scan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://example.com'
  })
});

const data = await response.json();
console.log(`Score: ${data.data.score}/100`);
```

---

## Routing Patterns

### File-Based Routing

Astro uses file-based routing:

```
src/pages/about.astro       →  /about
src/pages/blog/post.astro   →  /blog/post
src/pages/blog/index.astro  →  /blog
```

### Dynamic Routes

```
src/pages/blog/[post].astro     →  /blog/*
src/pages/blog/[...slug].astro  →  /blog/* (catch-all)
```

### API Routes

```
src/pages/api/endpoint.ts   →  /api/endpoint
```

---

## SEO Configuration

### Per-Page SEO

Each page should use the Layout component with SEO props:

```astro
<Layout
  title="Page Title"
  description="Page description for meta tags"
  image="/path/to/image.png"
  type="website | article | blog | portfolio"
  publishedTime="2025-01-20"  // For articles
  modifiedTime="2025-01-21"   // For articles
  keywords="keyword1, keyword2"
  author="Deanny Bruces"
/>
```

### Automatic Sitemap

Configured in `astro.config.mjs`:

```javascript
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.deannybruces.com',
  integrations: [sitemap()],
});
```

**Generated URL**: `/sitemap-index.xml`

### Structured Data

Use `<SEOStructuredData />` component in Layout:

```astro
<SEOStructuredData
  type="article"
  title={pageTitle}
  description={description}
  url={Astro.url.href}
  image={pageImage}
  publishedTime={publishedTime}
  modifiedTime={modifiedTime}
  author={author}
/>
```

---

## Navigation Structure

### Main Navigation

Defined in `Navigation.astro` and `BurgerMenu.astro`:

```typescript
const menuElements = [
  { name: "Quién soy!", path: "/sobre-mi" },
  { name: "Servicios", path: "/servicios" },
  { name: "Proyectos", path: "/proyectos" },
  { name: "Blog", path: "/blog" },
  { name: "Herramientas", path: "/tools" },
  { name: "Contacto", path: "/contacto" },
];
```

### Footer Navigation

Defined in `Footer.astro`:

```html
<ul class="nav-grid">
  <li><a href="/">Inicio</a></li>
  <li><a href="/sobre-mi">Sobre mí</a></li>
  <li><a href="/servicios">Servicios</a></li>
  <li><a href="/proyectos">Proyectos</a></li>
  <li><a href="/blog">Blog</a></li>
  <li><a href="/tools">Herramientas</a></li>
  <li><a href="/contacto">Contacto</a></li>
</ul>
```

---

## Adding New Pages

### Creating a Static Page

1. Create file: `src/pages/new-page.astro`
2. Add content:
```astro
---
import Layout from '@layouts/Layout.astro';
---

<Layout
  title="New Page"
  description="Description of new page"
>
  <h1>New Page</h1>
  <p>Content here...</p>
</Layout>
```
3. Add to navigation (if needed)
4. Test at `/new-page`

### Creating a Dynamic Route

1. Create file: `src/pages/[param].astro`
2. Implement `getStaticPaths()`:
```astro
---
export async function getStaticPaths() {
  const items = await getCollection('items');
  return items.map(item => ({
    params: { param: item.id },
    props: { item },
  }));
}

const { item } = Astro.props;
---
```
3. Render content
4. Test at `/item-id`

### Creating an API Endpoint

1. Create file: `src/pages/api/endpoint.ts`
2. Export handler:
```typescript
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  // Process request

  return new Response(JSON.stringify({
    status: 'success',
    data: {}
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
```
3. Test at `/api/endpoint`

---

## Performance Optimization

### Static Generation

All pages are pre-rendered at build time:

```bash
npm run build
```

**Output**: `dist/` directory with static HTML

### On-Demand Rendering (SSR)

API endpoints use SSR via Vercel adapter:

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'server',
  adapter: vercel(),
});
```

### Image Optimization

Use Astro's `<Image />` component:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '@images/hero.png';
---

<Image src={heroImage} alt="Hero" />
```

**Benefits**:
- Automatic optimization
- Multiple formats (WebP, AVIF)
- Responsive images
- Lazy loading

---

## Related Documentation

- [Components](.claude/sections/components.md)
- [Content & Collections](.claude/sections/content.md)
- [Styling System](.claude/sections/styling.md)

---

## Quick Reference

### Page Locations
- **Static pages**: `src/pages/*.astro`
- **Dynamic routes**: `src/pages/[param].astro`
- **API endpoints**: `src/pages/api/*.ts`

### Common Patterns
```astro
<!-- Static page -->
<Layout title="Title" description="Description">
  Content
</Layout>

<!-- Dynamic route -->
export async function getStaticPaths() { }
const { item } = Astro.props;

<!-- API endpoint -->
export const POST: APIRoute = async ({ request }) => { }
```

### URLs
- Homepage: `/`
- Blog: `/blog`
- Post: `/blog/post-slug`
- Category: `/blog/categories/category-id`
- Project: `/projects/project-id`
- Tool: `/tools/tool-id`
- API: `/api/endpoint`
