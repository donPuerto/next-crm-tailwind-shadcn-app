# 00 - ESLint Warnings & Resolution Guide

## Overview

This project uses ESLint with Next.js recommended rules and TypeScript strict mode. Warnings appear in the Problems panel and should be fixed before committing code.

## Common Warning Categories

### 1. **Unused Imports/Variables** (`@typescript-eslint/no-unused-vars`)

**What it means**: You imported something but never used it.

**Fix options:**
- **Remove the import**: Delete the unused line
- **Prefix with underscore**: `const _unused = value` (tells linter it's intentional)
- **Use in code**: If meant to be used, add it to the component

**Example - WRONG:**
```tsx
import { Users, Heart } from 'lucide-react';  // Heart is imported but never used

export function MyComponent() {
  return <Users className="size-4" />;
}
```

**Example - RIGHT:**
```tsx
import { Users } from 'lucide-react';  // Only import what's used

export function MyComponent() {
  return <Users className="size-4" />;
}
```

### 2. **Unescaped Entities** (`react/no-unescaped-entities`)

**What it means**: Double quotes, apostrophes, etc. need escaping in JSX.

**Fix options:**
- Use HTML entities: `&quot;`, `&apos;`, `&ndash;`, etc.
- Use template literals or regular quotes outside JSX
- Use curly braces: `{"text with 'quotes'"}`

**Example - WRONG:**
```tsx
<div>He said "Hello, it's great!"</div>
```

**Example - RIGHT:**
```tsx
<div>He said &quot;Hello, it&apos;s great!&quot;</div>
{/* OR */}
<div>{"He said \"Hello, it's great!\""}</div>
```

### 3. **Unexpected `any` Type** (`@typescript-eslint/no-explicit-any`)

**What it means**: You used TypeScript `any` which bypasses type safety.

**Fix options:**
- **Specify the actual type**: `Record<string, unknown>`, `unknown`, specific interface
- **Use `unknown`**: Safer than `any`, requires type narrowing

**Example - WRONG:**
```tsx
const handleChange = (e: any) => {
  console.log(e.target.value);
};
```

**Example - RIGHT:**
```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

// OR for unknown object
const parseData = (data: unknown) => {
  if (typeof data === 'object' && data !== null) {
    return data;
  }
};
```

### 4. **React Hook Issues** (`react-hooks/*`)

#### **exhaustive-deps**: Missing dependencies

**What it means**: Your effect uses a variable not in the dependency array.

**Fix**: Add missing dependencies to the array.

```tsx
// WRONG
useEffect(() => {
  console.log(userId);
}, []); // Missing userId

// RIGHT
useEffect(() => {
  console.log(userId);
}, [userId]); // Include userId
```

#### **set-state-in-effect**: setState in effect body

**What it means**: Calling setState directly in an effect causes cascading renders.

**Fix**: Use useCallback or useLayoutEffect if needed, or restructure.

```tsx
// WRONG
useEffect(() => {
  setMounted(true);
}, []);

// RIGHT - Use useLayoutEffect for immediate state update
useLayoutEffect(() => {
  setMounted(true);
}, []);
```

#### **incompatible-library**: Library returns non-memoizable functions

**What it means**: React Compiler skips memoization for some libraries (TanStack Table, next-themes, etc.).

**Fix**: Acknowledged - these are expected. ESLint is configured to suppress.

### 5. **React Purity Issues** (`react-hooks/purity`)

**What it means**: Using impure functions (like Math.random()) during render.

**Fix**: Wrap in useCallback, useMemo, or useRef.

```tsx
// WRONG
const width = Math.random() * 100;

// RIGHT
const width = React.useMemo(() => Math.random() * 100, []);
```

## How to Fix Warnings Efficiently

### Step 1: Identify the Category
```bash
bun run lint
```
Look at the error code: `@typescript-eslint/*`, `react/*`, `react-hooks/*`

### Step 2: Locate the File & Line
```
app/dashboard/leads/page.tsx
  25:3  warning  'CheckCircle2' is defined but never used
```
→ File: `app/dashboard/leads/page.tsx`
→ Line: 25, Column: 3

### Step 3: Apply the Fix
Use the category guide above to fix the issue.

### Step 4: Verify
```bash
bun run lint
```
Should show fewer warnings.

## Suppressing Warnings (When Appropriate)

Some warnings can be suppressed with comments:

```tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = response;

// eslint-disable @typescript-eslint/no-unused-vars
const _temp = value; // Intentionally unused
```

**Only suppress when:**
- It's a known library limitation (see eslint.config.mjs)
- The code is intentional (marked with `_` prefix)
- You've documented why in a comment

## File Locations

- **ESLint Config**: [eslint.config.mjs](../../eslint.config.mjs)
- **TypeScript Config**: [tsconfig.json](../../tsconfig.json)
- **VSCode Settings**: [.vscode/settings.json](../../.vscode/settings.json)
- **ESLint Rules**: https://eslint.org/docs/rules/
- **TypeScript ESLint**: https://typescript-eslint.io/rules/

## Common Quick Fixes

| Issue | Command | File |
|-------|---------|------|
| Remove unused import | Delete line | Any `.tsx` file |
| Add HTML entity | Replace `"` with `&quot;` | `.tsx` with JSX |
| Add missing dependency | Add to `useEffect` array | `.ts` / `.tsx` |
| Fix `any` type | Replace with specific type | Any file |

## Zero-Warning Goal

Aim to eliminate all warnings before committing:
```bash
bun run lint
# Should show: ✖ 0 problems
```

If you see warnings, refer back to the categories above and this guide.

## Questions?

See:
- [04-typescript-standards.md](./04-typescript-standards.md) — TypeScript practices
- [05-accessibility-performance.md](./05-accessibility-performance.md) — Performance best practices
- [07-hooks-utilities-ui.md](./07-hooks-utilities-ui.md) — React hooks patterns
