# TypeScript & Linting Implementation Standards

## Objective
Maintain a "zero tolerance" environment for linting errors and TypeScript type violations to ensure code quality, maintainability, and reliability.

## Core Principles
1. **No-Explicit-Any**: The use of `any` is strictly prohibited. Always use specific types, interfaces, or `unknown` (if the type is truly unknown).
2. **No-Unused-Vars**: All declared variables, imports, and functions must be used.
3. **Strict Type Checking**: TypeScript strict mode is enabled. Don't use non-null assertions (`!`) or type casts (`as any`) to bypass the compiler.
4. **Autonomous Correction**: The AI Copilot is mandated to identify and fix linting and TypeSript errors autonomously and immediately across the entire application.

## Best Practices

### 1. Recharts & Third-Party Libraries
When using libraries like Recharts, always provide explicit types for formatters and callbacks.
```tsx
// Correct
<YAxis tickFormatter={(value: number) => `$${value}`} />

// Incorrect
<YAxis tickFormatter={(value: any) => `$${value}`} />
```

### 2. React Hooks & Hydration
In Next.js, suppress `react-hooks/set-state-in-effect` only when absolutely necessary for client-side synchronization (e.g., with `localStorage`). Use block-level suppression with a clear justification.
```tsx
/* eslint-disable react-hooks/set-state-in-effect */
useEffect(() => {
  setIsMounted(true);
  // sync with localStorage
}, []);
/* eslint-enable react-hooks/set-state-in-effect */
```

### 3. Lucide Icons
Always import only the icons you use. Periodically run lint to identify and remove unused icon imports.

### 4. Custom Hooks & Stable References
Wrap internal helper functions in `useCallback` when they are dependencies for `useEffect` to avoid unnecessary re-renders and potential infinite loops.

## Verification Workflow
Before completing any task, run the following command to ensure zero errors:
```bash
bun run lint
```
No task is considered complete until `bun run lint` exits with code 0.
