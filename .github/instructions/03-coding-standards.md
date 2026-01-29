# 03 - Coding Standards

## 📘 TypeScript Rules
- **Strict Mode**: Enabled. No implicit `any`.
- **Typing**:
  - Prefer `interface` for object definitions (props, data models).
  - Use `type` for unions/intersections.
  - Avoid `enum`; use `as const` object literals or union types.
- **Props**: Export component props interface (e.g., `export interface ButtonProps`).
- **Async**: Always type the return of async functions if not inferred clearly.

```tsx
// ✅ GOOD
export interface UserProps {
  id: string;
  role: 'admin' | 'user';
}

// ❌ BAD
const User = (props: any) => { ... }
```

## 🛠️ Linting & ESLint
- **Run Lint**: `bun run lint`
- **Zero Tolerance**: All linting errors and warnings **MUST** be fixed immediately. 
- **Autonomous Fixing**: The AI copilot is **REQUIRED** to autonomously run linting and fix all issues across the entire codebase. Do not ask for permission before fixing existing errors.
- **Unused Vars**: Prefix with `_` if they must exist (e.g., `_req`).

### Handling "File Not Found" Warnings
If you see errors about missing instruction files:
1.  **Stop**: Do not create empty files to silence it.
2.  **Check Path**: Verify the relative path in the markdown/comment.
3.  **Fix**: Point to the correct file in `.github/instructions/`.

> **CRITICAL**: 
> 1. **READ FIRST**: Before implementing any changes, read the relevant instruction files from `.github/instructions/` folder. State clearly that you have read them in your first response.
> 2. **FIX LINT IMMEDIATELY**: Whenever you encounter or cause linting/TypeScript errors, fix them **immediately** before proceeding or completing the task.
> 3. **ALWAYS** use the existing `useTheme` hook and theme constants.
> 4. **COMMENT** every HTML block and function as per the rules below.

## 📝 Documentation & Commenting
**Mandatory Requirements:**
1.  **Functions**: JSDoc style comment explanations for complex logic.
2.  **HTML Blocks**: Comment major sections of JSX.
3.  **"Why" > "What"**: Explain the *intent* behind non-obvious code.

```tsx
/**
 * Calculates total revenue.
 * Uses a reduce because data shape is flat.
 */
const total = data.reduce(...)

return (
  // Main Dashboard Grid
  <div className="grid gap-4">
    {/* Revenue Card */}
    <Card>...</Card>
  </div>
)
```

## 📦 Build Process
- **Command**: `bun run build`
- **Check**: Ensure no type errors or lint errors before pushing.
- **Environment**: Ensure `NEXT_PUBLIC_` variables are strictly separated from server secrets.
