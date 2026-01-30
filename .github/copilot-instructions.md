# AI Copilot Instructions for nextjs-app

> **CRITICAL**: Before implementing any changes, read the relevant instruction files from `.github/instructions/` folder. This ensures consistency with project standards and patterns.

## ⚠️ Auto-Resolve Warnings Instruction

**When you see file-not-found warnings:**
1. **Stop and analyze** — Check the error paths in the Problems panel
2. **Auto-resolve** — Run: `bun run lint` to identify breaking references
3. **Fix immediately** — Update relative paths to point to `.github/instructions/[file].md`
4. **Verify** — Confirm all warnings clear before proceeding
5. **Rule**: Instruction file references should use format: `instructions/01-project-context.md` (example) — plain text only, no markdown links

### VSCode Configuration for Warning Suppression
The following settings are already configured in `.vscode/settings.json`:
- `markdown.validate.enabled: false` — Disables markdown validation warnings
- `problems.exclude` — Hides all markdown warnings from Problems panel  
- `files.exclude` — Hides `.next`, `node_modules`, and `.git` from file explorer
- `markdown.linkify: false` — Disables VSCode's built-in link validation
- `[markdown]` formatter settings — Disables formatting and code actions on save
- All `.md` and `.markdown` files excluded from validation rules

**After any VSCode updates, reload with `Ctrl+Shift+P` → `Developer: Reload Window`**

### If Warnings Still Persist
- Close all markdown files
- Close VS Code completely
- Delete `.vscode/.DS_Store` (if on Mac)
- Reopen VS Code
- Problems panel should now be clean

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
   - Check `instructions/11-shadcn-components.md` for list
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
├── hooks/                # Custom hooks (use-theme-color.ts, use-mobile.ts, etc. - kebab-case)
├── dashboard/
│   ├── layout.tsx        # Sidebar wrapper layout
│   ├── [section]/
│   │   └── components/   # Section-scoped components
│   └── page.tsx

lib/
├── utils.ts              # shadcn utilities — DO NOT MODIFY
├── constants/
│   └── themes.ts         # Theme config (colors, presets, etc.)

.github/
└── instructions/         # Documentation (01-14 .md files)
```

### 3. **Naming Conventions**
- **shadcn components**: lowercase (`button.tsx`, `card.tsx`)
- **Custom components**: PascalCase (`Header.tsx`, `AdminStats.tsx`)
- **Folders**: lowercase-with-hyphens (`user-profile/`, `sales-reports/`)
- **Dynamic routes**: brackets (`[id]/`, `[slug]/`)
- **Hooks**: kebab-case files (`use-theme-color.ts`, `use-mobile.ts`) with camelCase exports (`useThemeColor()`, `useMobile()`)
- **All files**: `.tsx` (not `.ts` for components)

### 4. **Styling Guidelines**
- **Utility-first**: Use Tailwind classes; avoid custom CSS unless global/required
- **Layout utilities**: `layout-container`, `layout-padding` for consistent spacing
- **Dark mode**: Use `dark:` variants; theme defines both light and dark via CSS variables
- **Grouping classes**: layout → spacing → typography → color → effects

**Theme Color Integration (CRITICAL)**:
- **Always use CSS variables for theme colors**: `bg-primary/10`, `text-primary`, `border-primary`
- **Common CSS variable patterns**:
  - Backgrounds: `bg-primary`, `bg-primary/10`, `bg-primary/20`
  - Text: `text-primary`, `text-secondary`, `text-muted-foreground`
  - Borders: `border-primary`, `border-border`
  - Icons: `text-primary`, `text-destructive`, `text-warning`
- **Never use inline hex values**: `style={{ color: '#EC4899' }}` ❌
- **Why**: CSS variables (`--primary`, `--accent`) auto-update when theme changes
- **IMPORTANT**: For every new page/component implementation, ensure all theme colors use CSS variables
- **Pattern for colored elements**:
  ```tsx
  {/* Correct - auto-updates with theme changes */}
  <div className="bg-primary/10">
    <Icon className="text-primary" />
  </div>
  
  {/* Wrong - won't update when theme changes */}
  <div style={{ backgroundColor: `${color}20` }}>
    <Icon style={{ color: color }} />
  </div>
  ```
- **Charts exception**: Recharts requires hex colors - use `colors` state from `useEffect` polling
- **Chart color localStorage key**: Use `'app-color'` not `'theme-color'`
  ```tsx
  const currentColor = (localStorage.getItem('app-color') || 'pink') as keyof typeof COLOR_CONFIG;
  ```
- **Chart color updates**: Add `key` prop with ALL color values to force re-render:
  ```tsx
  {/* Single color chart */}
  <ChartContainer key={`chart-${colors.chart1}`}>
  
  {/* Multiple colors - include ALL in key */}
  <ChartContainer key={`chart-${colors.chart1}-${colors.chart2}`}>
    <AreaChart>
      <Area stroke={colors.chart1} fill={colors.chart1} />
      <Area stroke={colors.chart2} fill={colors.chart2} />
    </AreaChart>
  </ChartContainer>
  
  {/* Pie chart with dynamic data */}
  <ChartContainer key={`pie-${colors.chart1}-${colors.chart2}`}>
    <PieChart>
      <Pie data={data.map((d, i) => ({ ...d, fill: chartColors[i] }))} />
    </PieChart>
  </ChartContainer>
  ```

**Card Header Spacing Pattern**:
```tsx
{/* Standard pattern - vertical spacing between title and description */}
<Card>
  <CardHeader>
    <CardTitle>Title Here</CardTitle>
    <CardDescription>Description here</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>

{/* ❌ AVOID - Removes default spacing */}
<CardHeader className="flex flex-row items-center justify-between">
  <div>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </div>
</CardHeader>
```

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
- **Hooks location**: `app/hooks/` (all files use kebab-case: `use-theme-color.ts`, `use-mobile.ts`)
- **Hooks file naming**: `use-feature-name.ts` (kebab-case, all lowercase)
- **Hooks export naming**: `export function useFeatureName() { ... }` (camelCase for the exported function)
- **Utilities location**: `lib/` (e.g., `lib/utils.ts` for shadcn; create new files as needed)
- **Hook naming**: `use` prefix; one job per hook
- **Utility pattern**: Pure functions, clear names, brief comments
- **No custom `lib/utils.ts`**: That's reserved for shadcn; use separate utility files

**Theme Color Sync Pattern** (for components with dynamic colors):
```tsx
'use client';

import { useEffect, useState } from 'react';
import { COLOR_CONFIG } from '@/lib/constants/themes';

export default function DynamicColorComponent() {
  const [colors, setColors] = useState({
    chart1: '#EC4899',
    // ... other color variations
  });

  useEffect(() => {
    const updateColors = () => {
      const currentColor = (localStorage.getItem('theme-color') || 'pink') as keyof typeof COLOR_CONFIG;
      const baseColor = COLOR_CONFIG[currentColor]?.hex || '#EC4899';
      setColors({ chart1: baseColor, /* ... */ });
    };

    updateColors();

    // Listen for theme changes
    const handleThemeChange = () => updateColors();
    window.addEventListener('theme-changed', handleThemeChange);

    // Poll for changes (fallback)
    const intervalId = setInterval(updateColors, 500);

    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
      clearInterval(intervalId);
    };
  }, []);

  // Use colors.chart1 for Recharts components
  return <AreaChart><Area fill={colors.chart1} /></AreaChart>;
}
```

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
1. Check `components/ui/` and see `instructions/11-shadcn-components.md`
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
// app/hooks/use-custom.ts (kebab-case file name)
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

All 15 instruction files guide development (located in `instructions/` folder):

**ESLint & Warnings (Read First if you see warnings):**
- 00-eslint-warnings.md — Warning categories, fixes, and resolution

**Foundation (Start here):**
- 01-project-context.md — Stack, assumptions, core tech
- 02-structure-standards.md — Routing & organization rules
- 08-folder-structure.md — Complete directory layout & organization

**UI & Components:**
- 11-shadcn-components.md — UI component workflow (shadcn-first approach)
- 03-styling-standards.md — Tailwind CSS v4 & layout utilities
- 09-tailwind-standards.md — Tailwind conventions & patterns
- 14-typography.md — Font system & text styling

**Theme & Design:**
- 12-theme-system.md — Theme variables & CSS structure
- 13-theme-colors.md — Color palette definitions

**Code Quality:**
- 04-typescript-standards.md — TypeScript strict mode & types
- 07-hooks-utilities-ui.md — Custom hooks, utilities, UI patterns

**Development:**
- 06-linting-build.md — Build, lint, and deployment
- 05-accessibility-performance.md — A11y & performance standards
- 10-documentation-standards.md — Code comments & documentation

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

If uncertain about patterns, component placement, or architectural decisions, refer to the `.github/instructions/` folder first. It contains comprehensive, maintainable standards that guide all code changes.
