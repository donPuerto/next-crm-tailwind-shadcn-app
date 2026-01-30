# Theme Color Reset on Theme Switch - Fix

## Problem
When switching themes (e.g., from Vercel to Supabase), the previously selected color from localStorage persisted instead of resetting to the new theme's default color. This meant:
- User selected "pink" in Vercel theme
- User switches to "Supabase" theme
- Pink color still applied (should be "emerald")

## Solution Implemented

### 1. Added Theme Default Color Mapping
**File**: `components/themes/theme.config.ts`

Added a new configuration mapping each theme to its default color:
```typescript
export const THEME_DEFAULT_COLORS: Record<string, ThemeColor> = {
    claude: 'blue',
    neobrutalism: 'neutral',
    supabase: 'emerald',      // Supabase uses emerald by default
    vercel: 'neutral',         // Vercel uses neutral by default
    mono: 'neutral',
    notebook: 'amber'
};
```

### 2. Updated Active Theme Provider
**File**: `components/themes/active-theme.tsx`

Modified the theme change effect to automatically reset color to the theme's default:

**Before:**
```typescript
useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme !== activeTheme) {
        // ... theme update logic
        // Color was NOT reset here - it persisted from localStorage
    }
}, [activeTheme]);
```

**After:**
```typescript
useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme !== activeTheme) {
        // ... theme update logic
        
        // Reset color to theme's default when switching themes
        const defaultColorForTheme = THEME_DEFAULT_COLORS[activeTheme];
        if (defaultColorForTheme && defaultColorForTheme !== activeColor) {
            setActiveColor(defaultColorForTheme);
        }
        
        // Broadcast theme change
        window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: activeTheme } }));
    }
}, [activeTheme, activeColor]);
```

## How It Works Now

1. **User selects theme**: "Supabase"
2. **activeTheme state changes** to "supabase"
3. **useEffect detects the change**
4. **Looks up default color**: `THEME_DEFAULT_COLORS['supabase']` → 'emerald'
5. **Resets color**: `setActiveColor('emerald')`
6. **localStorage is updated** to 'emerald'
7. **CSS variables applied** with emerald color

## Default Colors Per Theme

| Theme | Default Color | Hex |
|-------|--------------|-----|
| Claude | Blue | #3b82f6 |
| Neobrutalism | Neutral | #808080 |
| **Supabase** | **Emerald** | **#10b981** |
| Vercel | Neutral | #808080 |
| Mono | Neutral | #808080 |
| Notebook | Amber | #fbbf24 |

## User Experience

✅ Users can still manually change colors within a theme  
✅ When switching themes, the appropriate default color is automatically applied  
✅ localStorage only stores the current theme + color combination  
✅ Each theme has a consistent visual identity with its default color

## Testing

The implementation has been verified with:
- ✅ Build compilation successful
- ✅ No TypeScript errors
- ✅ All 24 pages generate correctly
- ✅ Theme switching logic intact
