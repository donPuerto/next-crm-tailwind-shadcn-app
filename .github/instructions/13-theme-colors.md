# 13 - Theme Color System

## Overview

The color system allows users to choose from 11 accent colors while keeping the main theme structure intact. Colors work with both light and dark modes across all themes.

**Available Colors:**
- Neutral, Amber, Blue, Cyan, Emerald, Fuchsia, Green, Indigo, Lime, Orange, Pink

## Architecture

**Colors are separate from Themes:**
- **Themes** (vercel, neo-brutalism): Control overall design language
- **Colors** (neutral, amber, blue, etc.): Control primary accent color

This separation allows infinite combinations (2 themes × 11 colors = 22 configurations).

## Implementation

### Color Constants
Location: `lib/constants/themes.ts`

```typescript
export const AVAILABLE_COLORS = [
  'neutral', 'amber', 'blue', 'cyan', 'emerald',
  'fuchsia', 'green', 'indigo', 'lime', 'orange', 'pink'
] as const;

export const COLOR_CONFIG: Record<ThemeColor, { name: string; hex: string }>
```

### useTheme Hook
Returns both theme and color:

```typescript
const { theme, color, setTheme, setColor, mounted } = useTheme();

// Change theme
setTheme('neo-brutalism');

// Change color
setColor('blue');

// Change both at once
setThemeAndColor('vercel', 'amber');
```

### ThemeSwitcher Component
Shows both theme and color options:

```tsx
import { ThemeSwitcher } from '@/components/ui/theme-switcher';

export default function App() {
  return <ThemeSwitcher />;
}
```

Renders:
- 2 theme buttons (Vercel, Neo Brutalism)
- 11 color circles (click to select)

## Storage

Both preferences persist in localStorage:
- `app-theme`: 'vercel' | 'neo-brutalism'
- `app-color`: Color name string

Loaded on next visit automatically.

## CSS Variables

Color selection updates:
```css
--primary-color: #FFA500;  /* Hex value of selected color */
--color-custom-accent: amber;  /* Color name */
```

Available in Tailwind as:
```tsx
<div className="bg-primary text-primary-foreground">
  Uses currently selected color
</div>
```

## Adding New Colors

1. Add to `AVAILABLE_COLORS` array:
```typescript
export const AVAILABLE_COLORS = [
  'neutral', 'amber', 'blue', /* ... */
  'my-new-color'  // Add here
] as const;
```

2. Add to `COLOR_CONFIG`:
```typescript
export const COLOR_CONFIG: Record<ThemeColor, { name: string; hex: string }> = {
  'my-new-color': { name: 'My Color', hex: '#ABCDEF' },
  // ... rest
};
```

That's it! The system automatically makes it available in the switcher.

## Customization Example

```tsx
'use client';

import { useTheme } from '@/app/hooks/useTheme';

export function CustomColorPicker() {
  const { color, setColor } = useTheme();

  return (
    <div className="space-y-2">
      <p>Selected Color: {color}</p>
      <button onClick={() => setColor('blue')}>
        Use Blue
      </button>
      <button onClick={() => setColor('pink')}>
        Use Pink
      </button>
    </div>
  );
}
```

## Best Practices

✓ Always use color names from AVAILABLE_COLORS
✓ Test both light and dark modes with different colors
✓ Ensure accent colors have sufficient contrast
✓ Store user preference after selection
✓ Provide visual feedback of selected color
✓ Keep color palette consistent across themes

## Color Hex Values Reference

| Color | Hex | oklch |
|-------|-----|-------|
| Neutral | #808080 | oklch(0.6 0 0) |
| Amber | #FFA500 | oklch(0.7 0.22 95) |
| Blue | #3B82F6 | oklch(0.6 0.25 260) |
| Cyan | #06B6D4 | oklch(0.65 0.28 200) |
| Emerald | #10B981 | oklch(0.6 0.25 150) |
| Fuchsia | #D946EF | oklch(0.65 0.3 305) |
| Green | #22C55E | oklch(0.65 0.35 130) |
| Indigo | #4F46E5 | oklch(0.55 0.28 280) |
| Lime | #84CC16 | oklch(0.75 0.4 110) |
| Orange | #F97316 | oklch(0.65 0.28 45) |
| Pink | #EC4899 | oklch(0.65 0.35 330) |

## Integration with Themes

Colors work with all themes:

**Vercel + Blue:**
- Professional look with blue accents
- Light mode: white bg, blue primary buttons
- Dark mode: dark bg, bright blue accents

**Neo Brutalism + Pink:**
- Bold, high-contrast with pink highlights
- Pure black/white with hot pink accents
- Sharp edges with pink shadows

## Future Enhancements

- [ ] Custom color picker (HEX/RGB input)
- [ ] Color shade variations (light/dark variants)
- [ ] Automatic contrast ratio checking
- [ ] AI color suggestion based on theme
- [ ] Export theme configuration as JSON
