# Hook Naming Convention - Unified Standard

## Overview
Established a unified naming convention for all React hooks across the project using **kebab-case for file names** and **camelCase for exported function names**.

## Standard Pattern

### File Naming (Kebab-Case)
```
app/hooks/use-feature-name.ts
```

### Function Export (camelCase)
```typescript
export function useFeatureName() {
  // Hook implementation
}
```

## Examples

### Current Hooks (All Updated)
- ✅ `use-mobile.ts` → exports `useMobile()`
- ✅ `use-scroll-animation.ts` → exports `useScrollAnimation()`
- ✅ `use-theme-color.ts` → exports `useThemeColor()`

### Import Pattern
```typescript
import { useThemeColor } from "@/app/hooks/use-theme-color";

export function MyComponent() {
  const { color } = useThemeColor();
  // ...
}
```

## Why This Convention?

1. **Consistency**: All hooks follow the same pattern
2. **Clarity**: Kebab-case file names match Next.js/React conventions
3. **Function Export**: camelCase for exported functions is standard JavaScript
4. **File System**: Easier to navigate file explorers (lowercase, hyphenated)
5. **Search**: Easier to find with command palette and grep

## Migration Completed

### Files Renamed
- `useThemeColor.ts` → `use-theme-color.ts`

### Files Updated (8 total)
1. `components/landing/landing-page-client.tsx`
2. `components/landing/stats-section.tsx`
3. `components/landing/pricing-section.tsx`
4. `components/landing/testimonials-section.tsx`
5. `components/landing/how-it-works-section.tsx`
6. `components/landing/integrations-section.tsx`
7. `components/landing/contact-form.tsx`
8. `components/landing/scroll-to-top.tsx`
9. `components/landing/simple-footer.tsx`

### Documentation Updated
1. `.github/copilot-instructions.md` - Updated hook naming references throughout
2. `.github/instructions/05-components-and-hooks.md` - Updated hooks section with new convention

## Best Practices

### Creating a New Hook
```typescript
// File: app/hooks/use-my-feature.ts
'use client';

import { useState, useCallback } from 'react';

/**
 * useMyFeature - Brief description of what this hook does
 * @example
 * const { value, setValue } = useMyFeature();
 */
export function useMyFeature() {
  const [value, setValue] = useState('');

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  return { value, setValue: handleChange };
}
```

### Using the Hook
```typescript
import { useMyFeature } from '@/app/hooks/use-my-feature';

export function Component() {
  const { value, setValue } = useMyFeature();
  // ...
}
```

## Next Steps
- ✅ All existing hooks follow the convention
- ✅ Documentation updated
- ✅ Build verified
- 📝 Enforce this pattern for all future hooks
