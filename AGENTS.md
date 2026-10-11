# AGENTS.md — Coding Agent Guidelines

This file provides instructions for agentic coding tools (AI assistants, automated agents, etc.)
working in this repository.

---

## Project Overview

A personal blog/portfolio built with **Astro 7** (static output), **TypeScript** (strict mode),
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
- `bun run clean-vite` deletes Vite's dependency cache (`node_modules/.vite`) on any OS. Use it
  when a build or check fails with `EBUSY: resource busy or locked` on Windows (another process,
  such as an editor's language server or a running dev/preview server, is holding the cache).
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
- Header behaviour (mobile drawer, search overlay, subscribe modal, Escape handling) lives in
  `HeaderInteractions.astro`. The mobile nav is `NavDrawer.astro`: a `popover="manual"` rendered
  outside `.page-wrapper` (so the page can be made `inert` while it is open) whose swipe is native
  CSS scroll snap, not pointer-event code. The desktop links stay in `Header.astro`.

### SCSS / Styles

- All styles live in `src/styles/`. The entry point is `main.scss`, which `@use`s partials.
- Use the SCSS `@use` module system (not `@import`).
- Each component has a corresponding partial in `src/styles/partials/` named `_component-name.scss`.
- Light/dark theme lives in `partials/_theme.scss`: color variables per theme, plus
  `@include when-light { ... }` / `@include when-dark { ... }` for theme-specific rules.
  By default the site follows the OS (`prefers-color-scheme`). `<html data-theme="light|dark">`
  exists only when the reader has overridden it with the toggle in `Header.astro`; the inline
  script in `Head.astro` applies a stored override before first paint and adds the `js` class.
  The toggle follows the `dark-mode-toggle` guide: switching back to the OS theme clears the
  override instead of storing it. Read the rendered theme as `data-theme` falling back to
  `matchMedia('(prefers-color-scheme: dark)')`, never `data-theme` alone, and listen for the
  `themechange` event (also fired on OS changes while no override is set). `color-scheme` on
  `:root` follows the theme so native UI (scrollbars, inputs) matches.
- CSS classes use `kebab-case`.
- Write `animation-name` / `animation-timing-function` / `animation-fill-mode` as longhands
  whenever `animation-timeline` is set. The build's CSS minifier otherwise folds them into the
  `animation` shorthand, which can't carry a timeline, so browsers drop the whole declaration.
  Check the built CSS in `dist/_astro/` when a modern CSS feature works in source but not on the site.

### Modern Web Guidance (front-end work)

- Before building or changing UI, interaction, motion or other client-side HTML/CSS/JS, search
  Chrome's modern-web-guidance skill for an existing pattern and follow it, adapted to this repo:
  `npx -y modern-web-guidance@latest search "<what you want to achieve>"`, then
  `npx -y modern-web-guidance@latest retrieve "<id>"`. Both are pre-approved in
  `.claude/settings.json`, which also enables the plugin.
- Search first, not after: `NavDrawer.astro` was rebuilt once because a hand-rolled version
  already existed when the `navigation-drawer` guide turned up.
- Browser support follows the skill's default: Baseline Widely available features need no
  fallback; anything newer gets the fallback the guide prescribes.
- Test gestures with real touch input (e.g. Playwright CDP `Input.dispatchTouchEvent`), not
  `Input.synthesizeScrollGesture`, which doesn't drive scroll-snap swipes in headless Chromium.

### Content (Blog Posts)

- Blog posts are `.md` or `.mdx` files in `src/content/posts/`.
- Use the helpers in `src/utils.ts` instead of re-implementing them: `getSortedPosts()` (all
  posts, newest first), `formatPostDate()`, `getPostSlug()` / `getPostUrl()`, and
  `getTagUrl()` / `getTagAnchor()` for links to a tag's section on the tags page.
- The post list is `index.astro` (hero + first page) and `page[page].astro` (`/page2/` onwards,
  via Astro's `paginate()`).
- Required frontmatter fields are validated by the Zod schema in `src/content.config.ts`, which
  also documents what each field is for. Some only look redundant: `description` (SEO, RSS and
  the Mailchimp newsletter) and `cardDescription` (post cards); `img` (site cover) and `image`
  (stable RSS/Open Graph URL) are separate on purpose. Don't merge them.
- Custom MDX components (code blocks, callouts, videos, etc.) are in `src/components/mdx/`.
  The RSS feed (`src/data/feeds.ts`) renders MDX itself: plain HTML tags pass through, callouts
  listed in `feedCallouts` become labelled blockquotes, and any other component is dropped. Add a
  new callout component to `feedCallouts` so its text reaches feed readers and Mailchimp.
- Cover images (`img:`) live in `src/assets/covers/` and are referenced relative to the post
  (`img: ../../assets/covers/2026-10-06-cover.jpg`) so Astro optimizes them; render them with
  `CoverImage.astro`. The RSS/Open Graph image (`image:`) stays in `public/assets/img/` because
  it needs a stable URL.

### Site Configuration

- All site-wide constants (title, URL, author, social links, pagination size, etc.) live in
  `src/config.ts`. Do not hardcode site metadata anywhere else.

---

## CI/CD

- GitHub Actions workflow: `.github/workflows/deploy.yml`
- Trigger: push to `master` branch (or manual `workflow_dispatch`).
- Steps: `bun install --frozen-lockfile` → `bun run check` → `bun run build` → upload `dist/` →
  deploy to GitHub Pages. Bun packages and optimized images (`node_modules/.astro`) are cached.
- A type error or a `bun.lock` that is out of sync with `package.json` fails the deploy — run
  `bun run check` and commit `bun.lock` together with `package.json` changes.
- There are no lint or test steps in CI.
