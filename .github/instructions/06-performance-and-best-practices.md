# 06 - Performance & Best Practices

## ⚡ Performance

### 1. Image Optimization
- Always use `next/image` (`<Image />`).
- Define `width` and `height` to prevent layout shift (CLS).
- Use `priority` for above-the-fold images (LCP).

### 2. Font Optimization
- Use `next/font` (already configured with Geist).
- Do not import fonts via CSS/CDN unless absolutely necessary.

### 3. Bundle Size
- Import specific icons: `import { Icon } from 'lucide-react'` (tree-shakable).
- Lazy load heavy components: `dynamic(() => import(...))`.

## ♿ Accessibility (A11y)

### 1. Semantic HTML
- Use `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`.
- Use `<button>` for actions, `<a>` (`<Link>`) for navigation.

### 2. Interactive Elements
- **Focus**: Ensure visible focus states (`focus-visible:ring`).
- **Keyboard**: Must be navigable via Tab/Enter/Space.
- **Labels**: Use `aria-label` for icon-only buttons.

### 3. Forms
- All inputs needs associated labels (`<Label htmlFor="...">`).
- Error messages connected via `aria-describedby`.

## 🔒 Security

### 1. Environment Variables
- `NEXT_PUBLIC_` is visible to browser.
- Secrets (API keys, DB URLs) must NOT have this prefix.
- Validate env vars on startup (e.g., `zod` schema).

### 2. Server Actions
- Validate all inputs using `zod`.
- Verify authentication/authorization inside the action.
