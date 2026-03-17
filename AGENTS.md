# AGENTS.md — Coding Agent Guidelines

This file provides instructions for agentic coding tools (AI assistants, automated agents, etc.)
working in this repository.

---

## Project Overview

A personal blog/portfolio built with **Astro 6** (static output), **TypeScript** (strict mode),
**SCSS**, and **MDX** for content. No React/Vue/Svelte — all UI components are pure `.astro` files.
Deployed to GitHub Pages via GitHub Actions. Package manager: **Bun**.

---

## Build, Dev, and Check Commands

```bash
# Install dependencies
bun install

# Start local dev server
bun run dev

# Type-check the project (Astro + TypeScript)
bun run check

# Full production build (Astro build + Pagefind search index)
bun run build

# Build + preview locally
bun run preview
```

### Notes
- **No test suite exists.** There are no unit, integration, or e2e tests. No test runner is configured.
- **No linter or formatter is configured.** There is no ESLint, Prettier, or Biome setup.
  Maintain code style manually by following the conventions in this file.
- `bun run check` runs `bunx --bun astro check`, which validates TypeScript types across all
  `.astro`, `.ts`, and `.tsx` files. Always run this after making TypeScript changes.
- `bun run build` must be run before `bun run preview` — the search index (`pagefind`) is built
  as a post-build step and is not available in `astro dev`.
- The `clean-vite` script (`Remove-Item -Recurse -Force node_modules\.vite`) is Windows/PowerShell
  only; on Linux/Mac, use `rm -rf node_modules/.vite` instead.
- The default branch is `master` (not `main`).

---

## Project Structure

```
src/
  components/         # Reusable .astro UI components
    mdx/              # Components used inside MDX blog posts
  content/
    posts/            # Blog post .md / .mdx files
  data/               # Static typed data (e.g. projects.ts)
  layouts/            # Page layout wrappers (BaseLayout, PostLayout, etc.)
  pages/              # File-based routes (.astro + feed.xml.ts)
  plugins/            # Custom rehype/remark plugins (.mjs)
  styles/             # SCSS entry point + partials
  config.ts           # Global site config (single source of truth)
  content.config.ts   # Astro content collection schema
  utils.ts            # Shared utility functions
public/               # Static assets served as-is
```

---

## Code Style Guidelines

### General Formatting

- **Indentation:** 2 spaces (no tabs).
- **Semicolons:** Always required in TypeScript/JavaScript.
- **Quotes:** Single quotes in `.ts` / `.mjs` files; double quotes in HTML attributes.
- **Trailing commas:** Include in multi-line arrays and objects.
- **Line endings:** LF (Unix-style).
- **Arrow functions:** Preferred for callbacks, array methods, and single-expression functions.
- **Template literals:** Use for string interpolation and URL construction.

### Imports

- Use the `@/` path alias (resolves to `src/`) for all cross-directory imports.
- Use relative `./` imports only for siblings in the same directory (e.g., a layout importing
  another layout in the same `layouts/` folder).
- Use `import type { ... }` for type-only imports.

```typescript
// Correct — alias import
import { siteConfig } from '@/config';
import PostCard from '@/components/PostCard.astro';
import '@/styles/main.scss';

// Correct — type-only import
import type { GetStaticPaths } from 'astro';

// Correct — relative sibling import
import BaseLayout from './BaseLayout.astro';

// Avoid — relative cross-directory imports
import { siteConfig } from '../../config';   // Wrong
```

### TypeScript

- The project uses Astro's **strict** TypeScript preset (`astro/tsconfigs/strict`).
- Always annotate function parameter and return types explicitly.
- Use `import type` for all type-only imports to avoid runtime artifacts.
- Use **optional chaining (`?.`)** for all potentially-null DOM / object access.
- Use **nullish coalescing (`??`)** for fallback values.
- Use non-null assertion (`!`) only after an explicit guard (e.g., after a `Map.has()` check).
- Avoid `any`; use `unknown` and narrow with type guards when the type is genuinely unknown.
- For DOM generics, use `document.querySelector<HTMLElement>(...)` etc.

```typescript
// Good
const code = pre?.querySelector('code');
if (!code) return;
await navigator.clipboard.writeText(code.textContent ?? '');

// Good — non-null assertion only after has() guard
if (!tagMap.has(tag)) tagMap.set(tag, []);
tagMap.get(tag)!.push(post);
```

### Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Astro component files | `PascalCase.astro` | `PostCard.astro`, `BaseLayout.astro` |
| Page files | `kebab-case.astro` or route syntax | `about.astro`, `[...slug].astro` |
| TypeScript files | `camelCase.ts` | `utils.ts`, `config.ts`, `projects.ts` |
| Plugin files | `camelCase.mjs` | `rehypeCodeBar.mjs` |
| SCSS partials | `_kebab-case.scss` | `_post-card.scss` |
| Interfaces / Types | `PascalCase` | `Project`, `Props` |
| Functions | `camelCase` | `getPostSlug()`, `getPostUrl()` |
| Constants / config | `camelCase` | `siteConfig`, `sortedPosts` |
| CSS classes | `kebab-case` | `post-card`, `code-bar`, `flex-container` |

### Error Handling

- Use **early return / guard clause** as the primary error-handling pattern.
- Use **optional chaining** for safe DOM traversal; never assume an element exists.
- Use `console.warn` (not `console.error`) for non-fatal dev-time warnings (e.g., missing build
  artifacts).
- No `try/catch` is used anywhere in the codebase for async operations; do not introduce them
  without a clear reason.
- Use `AbortController` to clean up event listeners across Astro's `astro:page-load` transitions.

```typescript
// Good — guard clause
const el = document.getElementById('pagefind-search');
if (!el) return;

// Good — optional chaining + nullish coalescing
const isOpen = pageWrapper?.classList.toggle('active') ?? false;
```

### Astro Components

- All UI is in `.astro` files. Do not introduce React, Vue, or Svelte components unless there
  is a compelling reason.
- Define `Props` interface at the top of the frontmatter script and destructure from `Astro.props`.
- Client-side scripts go in `<script>` blocks inside `.astro` files, not in separate `.ts` files
  (unless it's a shared utility).
- Use `astro:page-load` instead of `DOMContentLoaded` to support Astro's `ClientRouter` (view
  transitions / SPA mode).

### SCSS / Styles

- All styles live in `src/styles/`. The entry point is `main.scss`, which `@use`s partials.
- Use the SCSS `@use` module system (not `@import`).
- Each component has a corresponding partial in `src/styles/partials/` named `_component-name.scss`.
- Color variables for light/dark mode are defined in `light.scss` and `dark.scss`.
- CSS classes use `kebab-case`.

### Content (Blog Posts)

- Blog posts are `.md` or `.mdx` files in `src/content/posts/`.
- Required frontmatter fields are validated by the Zod schema in `src/content.config.ts`.
- Custom MDX components (code blocks, callouts, videos, etc.) are in `src/components/mdx/`.

### Site Configuration

- All site-wide constants (title, URL, author, social links, pagination size, etc.) live in
  `src/config.ts`. Do not hardcode site metadata anywhere else.

---

## CI/CD

- GitHub Actions workflow: `.github/workflows/deploy.yml`
- Trigger: push to `master` branch (or manual `workflow_dispatch`).
- Steps: `bun install` → `bun run build` → upload `dist/` → deploy to GitHub Pages.
- There are no separate lint, type-check, or test steps in CI — run `bun run check` locally
  before pushing.
