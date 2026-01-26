# 12 - Theme System Standards

## Overview

The theme system uses CSS variables organized in importable .css files. Each theme defines complete light and dark mode configurations following a standardized structure.

**Current Themes:**
- pp/themes/vercel.css - Clean, minimal, professional (STANDARD TEMPLATE)
- pp/themes/neo-brutalism.css - Bold, raw, high-contrast

## Configuration Controls

Beyond full theme switching, the system supports runtime configuration for:
- Accent Color: selectable palette applied via `--primary-color`/`--color-custom-accent`.
- Base Neutral: `neutral | stone | zinc | gray` mapped to `--base-color`.
- Style Preset: `vega | nova | maia | lyra | mira` sets `--radius`, `--spacing-base`, `--tracking`, `--shadow-weight`.
- Radius: explicit override `none | sm | md | lg` mapped to `--radius`.
- Menu Accent: `subtle | bold` mapped to `--menu-accent-weight`.
- Font Overrides: optional sans/serif/mono runtime changes using `next/font` variables.

## Theme Structure (Standard Template)

Every new theme MUST follow this exact structure in both :root and .dark sections:

### 1. Fonts (3 variables)
\\\css
--font-sans: var(--font-geist-sans);
--font-serif: Georgia, serif;
--font-mono: var(--font-geist-mono);
\\\

### 2. Colors (30+ variables)
**Base Colors:**
- \--background\ / \--foreground\
- \--card\ / \--card-foreground\
- \--popover\ / \--popover-foreground\

**Semantic Colors:**
- \--primary\ / \--primary-foreground\
- \--secondary\ / \--secondary-foreground\
- \--muted\ / \--muted-foreground\
- \--accent\ / \--accent-foreground\
- \--destructive\ / \--destructive-foreground\

**UI Elements:**
- \--border\
- \--input\
- \--ring\

**Charts (5 colors):**
- \--chart-1\ through \--chart-5\

**Sidebar (6 colors):**
- \--sidebar\ / \--sidebar-foreground\
- \--sidebar-primary\ / \--sidebar-primary-foreground\
- \--sidebar-accent\ / \--sidebar-accent-foreground\
- \--sidebar-border\
- \--sidebar-ring\

### 3. Layout (3 variables)
\\\css
--radius: 0.5rem;
--shadow-x: 0px;
--shadow-y: 1px;
--shadow-blur: 2px;
--shadow-spread: 0px;
--shadow-opacity: 0.18;
--shadow-color: hsl(0 0% 0%);
\\\

### 4. Shadows (8 variables)
\\\css
--shadow-2xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.09);
--shadow-xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.09);
--shadow-sm: 0px 1px 2px 0px hsl(...), 0px 1px 2px -1px hsl(...);
--shadow: ...
--shadow-md: ...
--shadow-lg: ...
--shadow-xl: ...
--shadow-2xl: ...
\\\

### 5. Typography (2 variables)
\\\css
--tracking-normal: 0em;
--spacing: 0.25rem;
\\\

## Creating a New Theme

**Step 1: Use Vercel Theme as Template**

\\\ash
# Copy the Vercel theme structure
cp app/themes/vercel.css app/themes/my-theme.css
\\\

**Step 2: Update Comment Header**
\\\css
/* My Theme - Description of design system */
\\\

**Step 3: Customize Within Structure**
- Change fonts if desired
- Adjust all color values
- Modify shadows if needed
- Keep variable names EXACTLY the same

**Step 4: Apply to globals.css**
\\\css
@import "./themes/my-theme.css";
\\\

## Color Format

Use **oklch color space** exclusively:
- \oklch(L C H)\ where:
  - L = Lightness (0-1)
  - C = Chroma (0-0.37)
  - H = Hue (0-360)

Example:
\\\css
--primary: oklch(0.5 0.2 45);      /* Mid-tone orange */
--background: oklch(1 0 0);        /* Pure white */
--destructive: oklch(0.6 0.2 25);  /* Red */
\\\

## Light vs Dark Mode

**Light Mode (:root)**
- Background: Light oklch (high L value, near 1)
- Foreground: Dark oklch (low L value, near 0)
- Cards: Light with dark text

**Dark Mode (.dark)**
- Background: Dark oklch (low L value, near 0)
- Foreground: Light oklch (high L value, near 1)
- Cards: Dark with light text

## Variable Ordering Checklist

For every theme file:

\\\
:root {
   Fonts (3)
   Colors - Base (6 + 2 for popover = 8)
   Colors - Semantic (8 pairs = 16)
   Colors - UI (3)
   Colors - Charts (5)
   Colors - Sidebar (6)
   Layout - Radius
   Layout - Shadow config (6)
   Layout - Shadows (8)
   Typography (2)
}

.dark {
   Same structure as :root
   Inverted/adjusted color values
   Same variable names
}
\\\

## Switching Themes

### Automatic (Runtime Switching)
Use the `useTheme` hook to switch themes at runtime, and adjust configuration:

```tsx
'use client';

import { useTheme } from '@/app/hooks/useTheme';

export function MyComponent() {
  const { theme, setTheme, setColor, setBaseColor, setStyle, setRadius, setMenuAccent, setFonts } = useTheme();

  return (
    <button onClick={() => setTheme('neo-brutalism')}>Switch to Neo Brutalism (currently: {theme})</button>
    <button onClick={() => setColor('indigo')}>Indigo Accent</button>
    <button onClick={() => setBaseColor('zinc')}>Base: Zinc</button>
    <button onClick={() => setStyle('maia')}>Style: Maia</button>
    <button onClick={() => setRadius('lg')}>Radius: Large</button>
    <button onClick={() => setMenuAccent('bold')}>Menu Accent: Bold</button>
    <button onClick={() => setFonts({ sans: 'inter', mono: 'geist-mono' })}>Use Inter + Geist Mono</button>
  );
}
```

### Theme Switcher Component
Pre-built component in `components/ui/theme-switcher.tsx`:

```tsx
import { ThemeSwitcher } from '@/components/ui/theme-switcher';

export function Navbar() {
  return (
    <nav>
      <h1>My App</h1>
      <ThemeSwitcher />
    </nav>
  );
}
```

### Manual (Edit globals.css)
Edit [app/globals.css](app/globals.css) import for static theme selection:

```css
/* Current */
@import "./themes/vercel.css";

/* Switch to another */
@import "./themes/neo-brutalism.css";
```

## Implementation Details

### useTheme Hook
- Location: `app/hooks/useTheme.ts`
- Manages theme state and localStorage persistence
- Returns: `{ theme, setTheme, mounted, isVercel, isNeoBrutalism }`
- Prevents hydration mismatch with mounted flag

### ThemeProvider
- Location: `app/providers/theme-provider.tsx`
- Wraps entire app (already in `app/layout.tsx`)
- Initializes theme system on client-side
- Ensures smooth theme switching

### Theme Constants
Location: `lib/constants/themes.ts`
- Themes: `AVAILABLE_THEMES`, `THEME_CONFIG`, `DEFAULT_THEME`, `THEME_STORAGE_KEY`
- Accent Colors: `AVAILABLE_COLORS`, `COLOR_CONFIG`, `DEFAULT_COLOR`, `COLOR_STORAGE_KEY`
- Base Neutral: `AVAILABLE_BASE_COLORS`, `BASE_COLOR_CONFIG`, `DEFAULT_BASE_COLOR`, `BASE_COLOR_STORAGE_KEY`
- Styles: `AVAILABLE_STYLES`, `STYLE_CONFIG`, `DEFAULT_STYLE`, `STYLE_STORAGE_KEY`
- Radius/Menu Accent: `AVAILABLE_RADII`, `AVAILABLE_MENU_ACCENTS`, `RADIUS_STORAGE_KEY`, `MENU_ACCENT_STORAGE_KEY`

### How It Works
1. App loads with default theme (Vercel) and defaults for color/base/style.
2. ThemeProvider initializes on client-side.
3. `useTheme` reads persisted settings (theme, accent, base, style, radius, menu accent).
4. `data-theme` attribute set on `<html>` element; CSS variables updated.
5. CSS rules and variables drive component styling (shadcn/ui).
6. Preferences saved to localStorage.
7. Next visit loads saved configuration seamlessly.

All components automatically update since they use CSS variables.

## Best Practices

 Use oklch for all colors (device-independent, perceptually uniform)
 Test both light and dark modes
 Maintain contrast ratios (AA minimum: 4.5:1)
 Keep chart colors visually distinct
 Use consistent shadow depths
 Document your theme's design philosophy in the comment header
 Never skip variables - always use the complete structure

Prefer separating concerns:
- Theme defines the design language (full token set).
- Accent color adjusts emphasis only.
- Base neutral sets overall tonal backdrop.
- Style preset controls radius/spacing/typography feel.

## Icons

Use Lucide as the official icon library:
- Package: `lucide-react`
- Import convention: `import { IconName } from 'lucide-react'`
- Keep icon size and stroke aligned via Tailwind classes (e.g., `size-4 stroke-[1.5]`).

## Common Patterns

**Material Design Light/Dark**
- Light: oklch(0.95-1, low C, H)
- Dark: oklch(0.1-0.2, low C, H)

**High Contrast (Neo Brutalism)**
- Pure black: oklch(0, 0, 0)
- Pure white: oklch(1, 0, 0)
- Heavy shadows: 4px+ offset, 0px blur

**Pastel Theme**
- Soft backgrounds: oklch(0.95, 0.1, H)
- Muted accents: oklch(0.5-0.7, 0.15, H)
- Subtle shadows: 1px-2px offset
