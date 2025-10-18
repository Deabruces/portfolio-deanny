# Content & Collections Documentation

## Overview

This project uses Astro's Content Collections API for type-safe content management. Collections are defined in `src/content.config.ts` and stored as Markdown files with frontmatter.

---

## Content Collections Structure

```
src/content/
├── categories.json          # Blog categories
├── posts/                   # Blog posts (Markdown)
│   ├── post-1.md
│   ├── post-2.md
│   └── ...
├── projects/                # Portfolio projects (Markdown)
│   ├── project-1.md
│   ├── project-2.md
│   └── ...
└── tools/                   # Interactive tools (MD/MDX)
    ├── tool-1.md
    ├── tool-2.mdx
    └── ...
```

---

## Collection Definitions (content.config.ts)

### 1. Categories Collection

**Type**: JSON data source
**File**: `src/content/categories.json`

**Schema**:
```typescript
const categories = defineCollection({
  loader: file("./src/content/categories.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    color: z.string(),
  }),
});
```

**Current Categories**:

| ID | Name | Color Variable |
|----|------|----------------|
| `seo` | SEO y marketing digital | `--seo-marketing-digital` |
| `web` | Programación y mejores prácticas | `--programacion-y-mejores-practicas` |
| `accesibilidad` | Accesibilidad y Usabilidad | `--accesibilidad-y-usabilidad` |
| `experiencia` | Experiencia de usuario (UX/UI) | `--experiencia-de-usuario-ux-ui` |
| `rendimiento` | Rendimiento y optimización web | `--rendimiento-web-y-optimizacion` |
| `negocios` | Negocios y Estrategias | `--negocios-y-estrategias` |

**Color Variables** (defined in `global.css`):
```css
--seo-marketing-digital: #8e44ad;
--programacion-y-mejores-practicas: #c38cf6;
--accesibilidad-y-usabilidad: #a2d5f2;
--experiencia-de-usuario-ux-ui: #dda0dd;
--rendimiento-web-y-optimizacion: #5c2e91;
--negocios-y-estrategias: #6fb1d2;
```

---

### 2. Projects Collection

**Type**: Markdown files
**Location**: `src/content/projects/`
**Pattern**: `**/*.md`

**Schema**:
```typescript
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),              // Project title
      image: image(),                 // Optimized image
      summary: z.string(),            // Project description
      date: z.string(),               // Publication date
      tags: z.array(z.string()).optional(),  // Tech stack tags
      starred: z.boolean().optional(),       // Featured project flag
    }),
});
```

**Frontmatter Example**:
```markdown
---
title: "Portfolio Website Redesign"
image: "./portfolio-screenshot.png"
summary: "Complete redesign of my portfolio with Astro and modern web technologies."
date: "2025-01-15"
tags: ["astro", "react", "typescript", "tailwind"]
starred: true
---

Project content here...
```

**Querying Projects**:
```typescript
import { getCollection } from 'astro:content';

// Get all projects
const allProjects = await getCollection('projects');

// Get featured projects only
const featuredProjects = await getCollection('projects', ({ data }) => {
  return data.starred === true;
});

// Sort by date (newest first)
const sortedProjects = allProjects.sort((a, b) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);
```

**Image Handling**:
- Images are co-located with markdown files
- Use relative paths: `./image.png`
- Astro automatically optimizes images
- Returns `ImageMetadata` type

---

### 3. Posts Collection

**Type**: Markdown files
**Location**: `src/content/posts/`
**Pattern**: `**/*.md`

**Schema**:
```typescript
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),                      // Post title
      image: image(),                         // Featured image
      summary: z.string(),                    // Post excerpt
      categories: z.array(reference("categories")),  // Category references
      date: z.string(),                       // Publication date
    }),
});
```

**Frontmatter Example**:
```markdown
---
title: "Optimizing Web Performance in 2025"
image: "./performance-hero.png"
summary: "Learn the latest techniques for building lightning-fast websites."
categories: ["rendimiento", "web"]
date: "2025-01-20"
---

Post content here...
```

**Category References**:
- Uses `reference("categories")` for type-safe category linking
- Categories must exist in `categories.json`
- Returns full category object when queried

**Querying Posts**:
```typescript
import { getCollection } from 'astro:content';

// Get all posts
const allPosts = await getCollection('posts');

// Get posts by category
const seoPosts = await getCollection('posts', ({ data }) => {
  return data.categories.some(cat => cat.id === 'seo');
});

// Sort by date
const recentPosts = allPosts.sort((a, b) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);

// Get latest 3 posts
const latestPosts = recentPosts.slice(0, 3);
```

---

### 4. Tools Collection

**Type**: Markdown/MDX files
**Location**: `src/content/tools/`
**Pattern**: `**/*.{md,mdx}`

**Schema**:
```typescript
const tools = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tools" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),                    // Tool name
      description: z.string(),              // Tool description
      keywords: z.array(z.string()).optional(),  // SEO keywords
      image: image(),                       // Tool screenshot/icon
      summary: z.string().optional(),       // Short summary
      tags: z.array(z.string()).optional(), // Technology tags
    }),
});
```

**Frontmatter Example**:
```markdown
---
title: "QR Code Generator"
description: "Generate custom QR codes for your business"
keywords: ["qr code", "generator", "business", "marketing"]
image: "./qr-tool-preview.png"
summary: "Free online QR code generator with customization options"
tags: ["javascript", "react", "qrcode"]
---

Tool content and interactive elements here...
```

**MDX Support**:
- Use `.mdx` extension for interactive content
- Import React components directly
- Embed interactive tools in content

**Example MDX**:
```mdx
---
title: "Color Contrast Checker"
description: "WCAG contrast ratio validator"
---

import ContrastChecker from '@components/ContrastChecker.jsx';

## Check Your Colors

<ContrastChecker client:load />

Additional content...
```

---

## Using Collections in Pages

### Basic Collection Query

```astro
---
import { getCollection } from 'astro:content';

const projects = await getCollection('projects');
---

<ul>
  {projects.map(project => (
    <li>{project.data.title}</li>
  ))}
</ul>
```

### Rendering Collection Entry

```astro
---
import { getCollection, getEntry } from 'astro:content';

// Dynamic route: /projects/[id].astro
const { id } = Astro.params;
const project = await getEntry('projects', id);

if (!project) {
  return Astro.redirect('/404');
}

const { Content } = await project.render();
---

<h1>{project.data.title}</h1>
<img src={project.data.image.src} alt={project.data.title} />
<Content />
```

### Filtering Collections

```astro
---
import { getCollection } from 'astro:content';

// Filter by criteria
const featuredProjects = await getCollection('projects', ({ data }) => {
  return data.starred === true;
});

// Filter by tag
const astroProjects = await getCollection('projects', ({ data }) => {
  return data.tags?.includes('astro');
});

// Filter by category (posts)
const seoArticles = await getCollection('posts', ({ data }) => {
  return data.categories.some(cat => cat.id === 'seo');
});
---
```

### Sorting Collections

```typescript
// Sort by date (newest first)
const sortedPosts = posts.sort((a, b) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);

// Sort by title
const sortedProjects = projects.sort((a, b) =>
  a.data.title.localeCompare(b.data.title)
);

// Sort by custom field
const sortedTools = tools.sort((a, b) =>
  (b.data.views || 0) - (a.data.views || 0)
);
```

---

## Dynamic Routes with Collections

### Example: Blog Post Route

**File**: `src/pages/blog/[post].astro`

```astro
---
import { getCollection } from 'astro:content';
import Layout from '@layouts/Layout.astro';

// Generate static paths for all posts
export async function getStaticPaths() {
  const posts = await getCollection('posts');

  return posts.map(post => ({
    params: { post: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<Layout
  title={post.data.title}
  description={post.data.summary}
  image={post.data.image.src}
  type="article"
  publishedTime={post.data.date}
>
  <article>
    <h1>{post.data.title}</h1>
    <time datetime={post.data.date}>{post.data.date}</time>
    <Content />
  </article>
</Layout>
```

### Example: Category Filter Route

**File**: `src/pages/blog/categories/[category].astro`

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
      props: { category, posts: categoryPosts },
    };
  });
}

const { category, posts } = Astro.props;
---

<h1>Posts in {category.data.name}</h1>
<ul>
  {posts.map(post => (
    <li><a href={`/blog/${post.id}`}>{post.data.title}</a></li>
  ))}
</ul>
```

---

## Content Organization Best Practices

### File Naming

**Posts**:
- Use kebab-case: `my-blog-post.md`
- Include date prefix (optional): `2025-01-15-my-post.md`
- Descriptive filenames that match slugs

**Projects**:
- Use project identifier: `portfolio-redesign.md`
- Avoid special characters
- Keep filenames short and clear

**Tools**:
- Tool name: `qr-code-generator.md`
- Function-based: `contrast-checker.mdx`

### Image Organization

**Co-locate images** with content:
```
posts/
├── my-post.md
├── hero-image.png
├── diagram-1.svg
└── screenshot.jpg
```

**Reference in frontmatter**:
```markdown
---
image: "./hero-image.png"
---

![Diagram](./diagram-1.svg)
```

### Frontmatter Consistency

**Required fields** (always include):
- `title` - Clear, descriptive title
- `image` - Featured/preview image
- `summary` - Brief description (150-200 chars)
- `date` - Publication date (YYYY-MM-DD format)

**Optional fields** (use when relevant):
- `tags` - Technology/topic tags
- `categories` - Category references (posts only)
- `starred` - Featured flag (projects)
- `keywords` - SEO keywords (tools)

---

## Adding New Content

### Adding a Blog Post

1. Create file: `src/content/posts/new-post.md`
2. Add frontmatter:
```markdown
---
title: "Your Post Title"
image: "./featured-image.png"
summary: "Brief description of your post"
categories: ["web", "seo"]
date: "2025-01-20"
---

Your content here...
```
3. Add images to same directory
4. Post automatically appears in blog listing

### Adding a Project

1. Create file: `src/content/projects/project-name.md`
2. Add frontmatter:
```markdown
---
title: "Project Name"
image: "./project-screenshot.png"
summary: "What this project does"
date: "2025-01-15"
tags: ["astro", "react", "typescript"]
starred: true
---

Project details...
```
3. Mark as `starred: true` to feature on homepage

### Adding a Tool

1. Create file: `src/content/tools/tool-name.md` (or `.mdx`)
2. Add frontmatter:
```markdown
---
title: "Tool Name"
description: "What the tool does"
keywords: ["keyword1", "keyword2"]
image: "./tool-preview.png"
summary: "Short summary"
tags: ["javascript", "react"]
---

Tool content...
```
3. Use `.mdx` for interactive components

### Adding a Category

1. Edit `src/content/categories.json`
2. Add new category object:
```json
{
  "id": "new-category",
  "name": "New Category Name",
  "color": "--new-category-color"
}
```
3. Define color in `global.css`:
```css
--new-category-color: #hexcode;
```

---

## Content Validation

### Type Safety

Astro validates all content against schemas:

```typescript
// ✅ Valid
{
  title: "Post Title",
  image: "./image.png",
  summary: "Description",
  categories: ["seo"],
  date: "2025-01-20"
}

// ❌ Invalid - missing required field
{
  title: "Post Title",
  // Missing image, summary, categories, date
}

// ❌ Invalid - wrong type
{
  title: 123,  // Should be string
  image: "./image.png",
  categories: "seo",  // Should be array
}
```

### Build-time Validation

Run `npm run build` to check for errors:
- Missing required fields
- Invalid image paths
- Type mismatches
- Invalid category references

---

## Querying Content Examples

### Get Recent Posts

```typescript
const posts = await getCollection('posts');
const recentPosts = posts
  .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
  .slice(0, 5);
```

### Get Featured Projects

```typescript
const featuredProjects = await getCollection('projects', ({ data }) => {
  return data.starred === true;
});
```

### Get Posts by Multiple Categories

```typescript
const targetCategories = ['seo', 'web'];
const posts = await getCollection('posts', ({ data }) => {
  return data.categories.some(cat =>
    targetCategories.includes(cat.id)
  );
});
```

### Get Tools by Tag

```typescript
const reactTools = await getCollection('tools', ({ data }) => {
  return data.tags?.includes('react');
});
```

---

## Content Rendering

### Render Markdown Content

```astro
---
const post = await getEntry('posts', 'my-post');
const { Content } = await post.render();
---

<Content />
```

### Render with Custom Components (MDX)

```mdx
---
title: "Interactive Tool"
---

import CustomButton from '@components/CustomButton.astro';

## My Tool

<CustomButton>Click Me</CustomButton>

Regular markdown content...
```

### Syntax Highlighting

Astro automatically highlights code blocks:

````markdown
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```
````

Uses **highlight.js** (configured in dependencies)

---

## SEO Optimization

### Metadata from Content

```astro
---
const post = await getEntry('posts', Astro.params.post);
---

<Layout
  title={post.data.title}
  description={post.data.summary}
  image={post.data.image.src}
  type="article"
  publishedTime={post.data.date}
  keywords={post.data.categories.map(c => c.data.name).join(', ')}
/>
```

### Sitemap Generation

Astro automatically includes collection pages in sitemap:
- All blog posts
- All projects
- All tools
- Category pages

**Configuration**: `astro.config.mjs`

---

## Performance Considerations

### Image Optimization

- Use Astro's `image()` schema helper
- Images are automatically optimized
- Multiple formats generated (WebP, AVIF)
- Lazy loading enabled by default

### Content Pagination

For large collections, implement pagination:

```astro
---
export async function getStaticPaths({ paginate }) {
  const posts = await getCollection('posts');
  return paginate(posts, { pageSize: 10 });
}

const { page } = Astro.props;
---

{page.data.map(post => (
  <article>{post.data.title}</article>
))}
```

---

## Related Documentation

- [Pages & Routing](.claude/sections/pages.md)
- [Components](.claude/sections/components.md)
- [Styling System](.claude/sections/styling.md)

---

## Quick Reference

### Collection Locations
- **Posts**: `src/content/posts/*.md`
- **Projects**: `src/content/projects/*.md`
- **Tools**: `src/content/tools/*.{md,mdx}`
- **Categories**: `src/content/categories.json`

### Common Queries
```typescript
// Get all
await getCollection('posts')

// Get one
await getEntry('posts', 'post-id')

// Filter
await getCollection('posts', ({ data }) => data.starred)

// Render
const { Content } = await post.render()
```

### Collection Exports
```typescript
export const collections = {
  projects,
  posts,
  categories,
  tools
};
```
