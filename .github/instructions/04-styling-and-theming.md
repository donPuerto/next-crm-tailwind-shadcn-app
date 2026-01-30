# 04 - Styling & Theme System

## 🎨 Overview

The application features a comprehensive **Dynamic Theme System** powered by CSS variables and Tailwind CSS v4.
- **Core Files**: 
  - `components/themes/active-theme.tsx` - Theme context provider
  - `components/themes/theme.config.ts` - Theme configurations & color mappings
  - `app/hooks/use-theme-color.ts` - Landing page color sync hook
  - `app/styles/themes/*.css` - Individual theme CSS files
- **Core Principle**: Never hardcode colors. Always use CSS variables.

## 🏗️ Theme System Architecture

### File Structure
```
components/themes/
├── active-theme.tsx          # Context provider (manages theme/color state)
├── theme-switcher.tsx        # UI component for theme selection
├── theme.config.ts           # Theme & color configuration
└── font.config.ts            # Font imports per theme

app/styles/themes/
├── claude.css                # Claude theme (coral primary)
├── supabase.css              # Supabase theme (emerald primary)
├── vercel.css                # Vercel theme (neutral primary)
├── neobrutalism.css          # Neobrutalism theme (pink primary)
├── mono.css                  # Mono theme (black primary)
└── notebook.css              # Notebook theme (blue primary)

app/hooks/
└── use-theme-color.ts        # Hook for landing page dynamic colors
```

### Core Components

#### 1. ActiveThemeProvider (`components/themes/active-theme.tsx`)
Central theme management - wraps entire app.

**State Management:**
- `activeTheme`: Current theme name (e.g., 'supabase', 'claude')
- `activeColor`: Optional color override (undefined = use theme default)

**Cookie/localStorage Keys:**
- `app-theme` - Stores selected theme
- `app-color` - Stores color override (cleared when undefined)

**Key Behavior:**
- When theme changes → `activeColor` set to `undefined` (clears override)
- When `activeColor` undefined → Clears cookies/localStorage, uses theme CSS
- When `activeColor` set → Overrides `--primary` and `--ring` CSS variables

```tsx
// components/themes/active-theme.tsx
const [activeTheme, setActiveTheme] = useState<string>(themeToUse);
const [activeColor, setActiveColor] = useState<ThemeColor | undefined>(() => {
    if (initialColor && AVAILABLE_COLORS.includes(initialColor)) {
        return initialColor as ThemeColor;
    }
    return undefined; // Use theme default
});
```

#### 2. Theme Configuration (`components/themes/theme.config.ts`)

**THEMES Array:**
```tsx
export const THEMES = [
    { name: 'Claude', value: 'claude' },
    { name: 'Neobrutalism', value: 'neobrutalism' },
    { name: 'Supabase', value: 'supabase' },
    { name: 'Vercel', value: 'vercel' },
    { name: 'Mono', value: 'mono' },
    { name: 'Notebook', value: 'notebook' }
];
```

**THEME_DEFAULT_COLORS Mapping:**
Maps theme name to hex color (used in landing page when no override exists):
```tsx
export const THEME_DEFAULT_COLORS: Record<string, string> = {
    claude: '#d97757',      // coral/salmon
    neobrutalism: '#ec4899', // pink
    supabase: '#10b981',    // emerald
    vercel: '#525252',      // neutral gray
    mono: '#525252',        // neutral gray
    notebook: '#3b82f6'     // blue
};
```

**COLOR_CONFIG:**
Available color overrides (20 colors):
```tsx
export const COLOR_CONFIG: Record<ThemeColor, { name: string; hex: string }> = {
    red: { name: 'Red', hex: '#FF4D50' },
    pink: { name: 'Pink', hex: '#ec4899' },
    emerald: { name: 'Emerald', hex: '#10b981' },
    // ... 17 more colors
};
```

#### 3. Landing Page Hook (`app/hooks/use-theme-color.ts`)

Syncs theme colors for landing page components that use inline styles.

**Returns:**
- `color` - Current hex color (from override or theme default)
- `mounted` - Whether client-side hydration is complete

**Logic Flow:**
1. Check `localStorage.getItem('app-color')` for override
2. If no override, read theme from `data-theme` attribute
3. Return `THEME_DEFAULT_COLORS[currentTheme]`
4. Listen for 'theme-changed' events
5. Poll every 500ms for changes (fallback)

```tsx
const { color, mounted } = useThemeColor();
// Use: {mounted ? color : undefined}
```

### Theme CSS Files

Each theme file in `app/styles/themes/*.css` defines:

```css
[data-theme='supabase'] {
    --background: oklch(1 0 0);
    --foreground: oklch(0.129 0.0163 260.6713);
    --primary: oklch(0.4883 0.1601 146.6111);  /* Emerald - theme's default */
    --primary-foreground: oklch(0.9851 0 0);
    --ring: oklch(0.709 0 0);
    /* ... more variables */
    
    /* Font configuration */
    --font-sans: var(--font-geist), ui-sans-serif, system-ui;
    --font-mono: var(--font-geist-mono), ui-monospace;
    
    /* Radius & spacing */
    --radius: 0.5rem;
}

[data-theme='supabase'].dark {
    --background: oklch(0.1073 0.0175 262.9758);
    --primary: oklch(0.5555 0.1486 144.7246);  /* Lighter emerald for dark mode */
    /* ... dark mode overrides */
}
```

## 🌈 Theme System Usage

### In Dashboard (Server/Client Components)
Dashboard uses CSS variables directly via Tailwind classes:

```tsx
// ✅ Automatic theme color updates
<div className="bg-primary/10 text-primary">
  <Icon className="text-primary" />
  <Button className="bg-primary hover:bg-primary/90">Click</Button>
</div>
```

### In Landing Page (Client Components)
Landing page uses `useThemeColor()` hook for inline styles:

```tsx
'use client';
import { useThemeColor } from '@/app/hooks/use-theme-color';

export function LandingComponent() {
  const { color, mounted } = useThemeColor();
  
  return (
    <div style={{ borderColor: mounted ? color : undefined }}>
      {/* Only apply color after mount to avoid flash */}
    </div>
  );
}
```

### Logo Component Pattern
Logo accepts optional color prop, falls back to CSS variable:

```tsx
'use client';
export function Logo({ color }: { color?: string }) {
  const logoStyle = color ? { color } : undefined;
  
  return (
    <div 
      className="text-primary border-current" 
      style={logoStyle}
    >
      DP
    </div>
  );
}

// Usage with hook
const { color, mounted } = useThemeColor();
<Logo color={mounted ? color : undefined} />
```

## ➕ Adding a New Theme

Follow this pattern to add a new theme (example: "GitHub" theme):

### Step 1: Create Theme CSS File
Create `app/styles/themes/github.css`:

```css
[data-theme='github'] {
    /* Light mode */
    --background: oklch(1 0 0);
    --foreground: oklch(0.1448 0 0);
    --primary: oklch(0.4167 0.0926 258.3377);  /* GitHub blue #0969DA */
    --primary-foreground: oklch(1 0 0);
    /* ... all other CSS variables ... */
    
    /* Font configuration */
    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --font-mono: "SF Mono", Monaco, monospace;
    
    --radius: 0.375rem;  /* 6px like GitHub */
}

[data-theme='github'].dark {
    /* Dark mode overrides */
    --background: oklch(0.1292 0.0182 264.5316);
    --primary: oklch(0.5833 0.1435 246.9693);  /* Lighter blue for dark */
    /* ... */
}
```

### Step 2: Register in Theme Config
Update `components/themes/theme.config.ts`:

```tsx
export const THEMES = [
    { name: 'Claude', value: 'claude' },
    { name: 'GitHub', value: 'github' },  // ✅ Add here
    // ... existing themes
];

export const THEME_DEFAULT_COLORS: Record<string, string> = {
    claude: '#d97757',
    github: '#0969DA',  // ✅ Add hex approximation of --primary
    // ... existing mappings
};
```

### Step 3: Import CSS in Globals
Update `app/styles/globals.css`:

```css
@import './themes/claude.css';
@import './themes/github.css';  /* ✅ Add import */
/* ... other imports */
```

### Step 4: (Optional) Add Font Configuration
If theme uses custom fonts, update `components/themes/font.config.ts`:

```tsx
import localFont from 'next/font/local';

export const githubFont = localFont({
  src: '../fonts/GitHubSans.woff2',
  variable: '--font-github',
  display: 'swap',
});

// Add to font map
export const THEME_FONTS = {
  github: githubFont.variable,
  // ... existing
};
```

### Step 5: Test Implementation
1. **Dashboard**: Switch to new theme, verify colors update
2. **Landing Page**: Refresh page, verify no color flash
3. **Color Picker**: Select custom color, switch themes, verify override clears
4. **Dark Mode**: Toggle dark mode, verify color adjustments

## 🎯 Key Rules

### CSS Variable Rules
- **Format**: `oklch(L C H)` for all colors
- **Naming**: Use semantic names (`--primary`, `--background`, `--muted`)
- **Charts**: Define `--chart-1` through `--chart-5` for data visualization

### Color Override Behavior
- **Default**: `activeColor = undefined` → Use theme's CSS `--primary`
- **Override**: User selects color → `activeColor` set, overrides CSS variables
- **Theme Switch**: Always clears `activeColor` to `undefined`
- **Page Refresh**: If no override in cookies, `activeColor` stays `undefined`

### Landing Page Color Sync
- **Hook Required**: Use `useThemeColor()` for components with inline styles
- **Prevent Flash**: Only apply color after `mounted` is true
- **Poll Interval**: 500ms fallback ensures sync even without events

**Correct Pattern:**
```tsx
const { color, mounted } = useThemeColor();

<Component 
  style={{ 
    backgroundColor: mounted ? `${color}20` : undefined  // 20 = 12.5% opacity
  }} 
/>
```

### 💅 Tailwind Standards

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
