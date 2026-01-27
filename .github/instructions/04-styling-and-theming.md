# 04 - Styling & Theme System

## 🎨 Overview

The application features a comprehensive **Dynamic Theme System** powered by CSS variables and Tailwind CSS v4.
- **Location**: `app/hooks/useTheme.ts`, `lib/constants/themes.ts`.
- **Core Principle**: Never hardcode colors. Always use CSS variables.

## 🌈 Theme System Usage

### Configuration Structure
- **Theme**: Defines global design language (fonts, spacing, radius).
  - *Current*: `vercel`, `neo-brutalism`.
- **Accent Color**: Primary brand color.
  - *Current*: `neutral`, `amber`, `blue`, `cyan`, `emerald`, `fuchsia`, `green`, `indigo`, `lime`, `orange`, `pink`.
- **Base Color**: Neutral background palette.
  - *Current*: `neutral`, `stone`, `zinc`, `gray`.
- **Style Preset**: `vega` (default), `nova`, `maia`, etc.

### `useTheme` Hook (MANDATORY)
Always use this hook for theme-aware logic in Client Components.

```tsx
'use client';
import { useTheme } from '@/app/hooks/useTheme';

const { theme, color, setTheme, setColor } = useTheme();
// Use `theme` for logic, `color` for display labels
```

### CSS Variable Rules
- **Format**: `oklch(L C H)` (all colors).
- **Naming**: `--primary`, `--background`, `--card`, `--muted`, `--accent`, `--destructive`.
- **Charts**: `--chart-1` through `--chart-5`.

**Correct Styles:**
```tsx
// ✅ GOOD: Updates automatically
<div className="bg-primary/10 text-primary">
  <Icon className="text-accent" />
</div>

// ❌ BAD: Hardcoded hex
<div style={{ backgroundColor: '#EC4899' }}>
```

## 💅 Tailwind Standards

### 1. Utility-First
Use native classes unless absolutely necessary.
- **Spacing**: Use the scale (e.g., `p-4` = 1rem, `m-6` = 1.5rem).
- **Colors**: Use semantic names (`text-primary`) or Tailwind defaults (`text-gray-500`) for non-theme elements.
- **Dark Mode**: Use `dark:` prefix.

### 2. Class Grouping
Order classes logically:
1.  **Layout**: `flex`, `grid`, `absolute`, `w-full`.
2.  **Spacing**: `p-4`, `m-2`, `gap-2`.
3.  **Typography**: `text-sm`, `font-medium`, `uppercase`.
4.  **Visuals**: `bg-primary`, `border`, `rounded-lg`, `shadow-sm`.
5.  **Interactive**: `hover:bg-primary/90`, `focus:ring-2`.

### 3. Arbitrary Values
Avoid `w-[123px]` unless specific to a one-off asset (like an ad banner).
- **Exception**: Complex animations or very specific transform values.

## 🔠 Typography
- **Fonts**: `Geist Sans` (variable) and `Geist Mono`.
- **Headings**: Use `text-2xl font-bold tracking-tight` for localized headings.
- **Scaling**: Use `text-sm` for UI labels, `text-base` for body copy.
