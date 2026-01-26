# AI Copilot Instructions for nextjs-app

## Project Overview
**Next.js 16 dashboard application** with TypeScript, Tailwind CSS v4, and shadcn/ui components. Uses **Server Components by default** with careful Client Component integration. Package manager: **Bun** (npm/yarn acceptable).

## Architecture & Data Flow

### Core Stack
- **Framework**: Next.js 16 (App Router) with Server Components by default
- **Language**: TypeScript (strict mode, no `any` unless unavoidable)
- **Styling**: Tailwind CSS v4 + CSS variables (theme system in `app/themes/`)
- **UI Library**: shadcn/ui (Radix UI primitives + Tailwind, copy-paste only)
- **Theme**: Dynamic theme/color/radius switching with `useTheme()` hook

### Page Structure
```
app/
├── (root pages)     → Navbar visible
└── dashboard/       → Sidebar + nested layout
    ├── layout.tsx   → SidebarProvider + AppSidebar wrapper
    ├── page.tsx     → Dashboard home
    └── [section]/   → sales, marketing, users, etc.
        └── page.tsx
```

**Key**: Dashboard pages are wrapped in a sidebar layout with `h-svh` height management and `overflow-auto` scrolling at the innermost content div.

### Theme System
Located at `app/hooks/useTheme.ts` and `lib/constants/themes.ts`. Themes define CSS variables:
- **Colors**: background, foreground, card, primary, secondary, muted, accent, destructive, sidebar colors, chart colors
- **Layout**: radius (corner rounding), shadows, spacing
- **Current themes**: `vercel.css` (standard), `neo-brutalism.css` (bold)

**Usage**: Import `useTheme()` in client components to read/set theme, base color, style preset, radius, and dark mode.

## Developer Workflows

### Start Development
```bash
bun dev
# or: npm run dev / yarn dev
# Opens http://localhost:3000
```

### Build & Lint
```bash
bun run build          # Production build
bun run lint           # Run ESLint
bun start              # Start production server
```

### Install shadcn Components
```bash
npx shadcn-ui@latest add [component]
# Examples: button, card, input, dialog, table, sidebar
# Components land in: components/ui/[component].tsx
```

## Critical Patterns & Rules

### 1. **Component Decision Tree** (READ BEFORE IMPLEMENTING UI)
1. **Is it in shadcn/ui?** → Use existing component from `components/ui/`
   - Check [instruction/11-shadcn-components.md](../instruction/11-shadcn-components.md) for list
2. **Not in shadcn?** → ASK USER before creating custom component
3. **Use custom?** → Create in `components/custom/[ComponentName].tsx` (PascalCase)
4. **Section-specific?** → Add to `app/[section]/components/` (PascalCase)
5. **Page-specific?** → Add to `app/[section]/[page]/components/` or same folder (PascalCase)

**Do NOT**: Add custom code to `components/ui/` — shadcn only.

### 2. **File Organization**
```
components/
├── ui/                   # shadcn components only (copy-paste)
│   ├── button.tsx
│   ├── card.tsx
│   └── sidebar.tsx
├── custom/               # Custom components (ask first)
├── app-sidebar.tsx       # Global layout components (e.g., AppSidebar)
├── nav-main.tsx
└── typography.tsx

app/
├── hooks/                # Custom hooks (useTheme, useMobile, etc.)
├── dashboard/
│   ├── layout.tsx        # Sidebar wrapper layout
│   ├── [section]/
│   │   └── components/   # Section-scoped components
│   └── page.tsx

lib/
├── utils.ts              # shadcn utilities — DO NOT MODIFY
├── constants/
│   └── themes.ts         # Theme config (colors, presets, etc.)

instruction/              # Documentation (01-14 .md files)
```

### 3. **Naming Conventions**
- **shadcn components**: lowercase (`button.tsx`, `card.tsx`)
- **Custom components**: PascalCase (`Header.tsx`, `AdminStats.tsx`)
- **Folders**: lowercase-with-hyphens (`user-profile/`, `sales-reports/`)
- **Dynamic routes**: brackets (`[id]/`, `[slug]/`)
- **Hooks**: `use` prefix (`useTheme`, `useMobile`)
- **All files**: `.tsx` (not `.ts` for components)

### 4. **Styling Guidelines**
- **Utility-first**: Use Tailwind classes; avoid custom CSS unless global/required
- **Layout utilities**: `layout-container`, `layout-padding` for consistent spacing
- **Dark mode**: Use `dark:` variants; theme defines both light and dark via CSS variables
- **Grouping classes**: layout → spacing → typography → color → effects

**Dashboard layout pattern**:
```tsx
<div className="layout-container mx-auto w-full h-svh bg-sidebar">
  <SidebarProvider className="w-full h-full bg-sidebar p-3">
    <AppSidebar />
    <SidebarInset className="h-full flex-1 flex flex-col pr-px bg-sidebar">
      <div className="h-full rounded-xl border border-border bg-background overflow-y-auto">
        {children}
      </div>
    </SidebarInset>
  </SidebarProvider>
</div>
```
Key: `bg-sidebar` at every container level; `overflow-y-auto` on innermost div; `h-svh` (screen height) + `h-full` nesting.

### 5. **TypeScript Standards**
- **Strict mode enabled**: No implicit `any`; use `unknown` + type narrowing if needed
- **Avoid type assertions**: Prefer proper typing; use `as` only when necessary
- **Export prop types**: Export interfaces for component props (e.g., `ButtonProps`)
- **Comments**: Add brief comments to new/edited code explaining intent
- **Keep types near code**: Define types in same file or nearby folder

Example:
```tsx
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated';
}

export function Card({ variant = 'default', ...props }: CardProps) {
  return <div {...props} className={cn('card', variant)} />;
}
```

### 6. **Server vs Client Components**
- **Server Components by default** (faster, smaller JS bundles)
- **Client Components only when needed**: Hooks (`useState`, `useEffect`, `useTheme`), event handlers, real-time updates
- **Mark with `'use client'`** at top of file

Example:
```tsx
// app/dashboard/page.tsx (Server Component)
import { ClientChart } from './components/client-chart';

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ClientChart /> {/* Client component for interactivity */}
    </div>
  );
}

// app/dashboard/components/client-chart.tsx (Client Component)
'use client';

import { useTheme } from '@/app/hooks/useTheme';
import { Chart } from '@/components/ui/chart';

export function ClientChart() {
  const { theme } = useTheme();
  return <Chart theme={theme} />;
}
```

### 7. **Hooks & Utilities**
- **Hooks location**: `app/hooks/` (e.g., `useTheme.ts`, `useMobile.ts`)
- **Utilities location**: `lib/` (e.g., `lib/utils.ts` for shadcn; create new files as needed)
- **Hook naming**: `use` prefix; one job per hook
- **Utility pattern**: Pure functions, clear names, brief comments
- **No custom `lib/utils.ts`**: That's reserved for shadcn; use separate utility files

### 8. **Accessibility & Performance**
- **Keyboard accessible**: All interactive elements work with Tab/Enter/Escape
- **Semantic HTML**: Use `<button>`, `<nav>`, `<main>`, `<header>`, `<footer>`
- **ARIA attributes**: Add `aria-label`, `aria-expanded`, `role` when needed
- **Color contrast**: Check light/dark mode readability
- **Images**: Use `next/image` for optimization
- **Lazy loading**: Code split with dynamic imports when appropriate

## Common Tasks

### Adding a New Page/Section
1. Create folder: `app/dashboard/[section]/`
2. Add `layout.tsx` (optional, inherits parent layout)
3. Add `page.tsx` with Server Component
4. Use `app-sidebar.tsx` navigation if adding menu item

### Creating a New UI Component
1. Check `components/ui/` and [agents/11-shadcn-components.md](../agents/11-shadcn-components.md)
2. If shadcn has it → Import from `@/components/ui/[component]`
3. If not → Ask user; then create in `components/custom/[Name].tsx`
4. Example shadcn import: `import { Button } from '@/components/ui/button'`

### Using Theme in a Component
```tsx
'use client';

import { useTheme } from '@/app/hooks/useTheme';

export function ThemedComponent() {
  const { theme, setTheme, color, setColor } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('neo-brutalism')}>
        Change Theme
      </button>
    </div>
  );
}
```

### Creating a Reusable Hook
```tsx
// app/hooks/useCustom.ts
'use client';

import { useState, useCallback } from 'react';

/**
 * Custom hook for managing specific state or side effect.
 * Used in: components that need [specific behavior]
 */
export function useCustom(initialValue: string) {
  const [state, setState] = useState(initialValue);
  
  const update = useCallback((newValue: string) => {
    // Your logic here
    setState(newValue);
  }, []);
  
  return { state, update };
}
```

## Complete Instruction Files

All 14 instruction files guide development:

**Foundation (Start here):**
1. [instruction/01-project-context.md](../instruction/01-project-context.md) — Stack, assumptions, core tech
2. [instruction/02-structure-standards.md](../instruction/02-structure-standards.md) — Routing & organization rules
3. [instruction/08-folder-structure.md](../instruction/08-folder-structure.md) — Complete directory layout & organization

**UI & Components:**
4. [instruction/11-shadcn-components.md](../instruction/11-shadcn-components.md) — UI component workflow (shadcn-first approach)
5. [instruction/03-styling-standards.md](../instruction/03-styling-standards.md) — Tailwind CSS v4 & layout utilities
6. [instruction/09-tailwind-standards.md](../instruction/09-tailwind-standards.md) — Tailwind conventions & patterns
7. [instruction/14-typography.md](../instruction/14-typography.md) — Font system & text styling

**Theme & Design:**
8. [instruction/12-theme-system.md](../instruction/12-theme-system.md) — Theme variables & CSS structure
9. [instruction/13-theme-colors.md](../instruction/13-theme-colors.md) — Color palette definitions

**Code Quality:**
10. [instruction/04-typescript-standards.md](../instruction/04-typescript-standards.md) — TypeScript strict mode & types
11. [instruction/07-hooks-utilities-ui.md](../instruction/07-hooks-utilities-ui.md) — Custom hooks, utilities, UI patterns

**Development:**
12. [instruction/06-linting-build.md](../instruction/06-linting-build.md) — Build, lint, and deployment
13. [instruction/05-accessibility-performance.md](../instruction/05-accessibility-performance.md) — A11y & performance standards
14. [instruction/10-documentation-standards.md](../instruction/10-documentation-standards.md) — Code comments & documentation

## Do Not

- ❌ Create top-level folders without confirmation
- ❌ Add custom code to `components/ui/` (shadcn only)
- ❌ Modify `lib/utils.ts` (shadcn utilities)
- ❌ Use `any` in TypeScript without explaining why
- ❌ Create custom UI components without checking shadcn/ui first
- ❌ Mix naming conventions (PascalCase vs lowercase)
- ❌ Create Client Components when Server Components suffice
- ❌ Ignore dashboard layout structure (sidebar + height management)

## Questions?

If uncertain about patterns, component placement, or architectural decisions, refer to the `instruction/` folder first. It contains comprehensive, maintainable standards that guide all code changes.
