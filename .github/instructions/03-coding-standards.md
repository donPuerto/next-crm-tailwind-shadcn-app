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
- **Warnings**: Do not ignore warnings. Fix them.
- **Unused Vars**: Prefix with `_` if they must exist (e.g., `_req`).

### Handling "File Not Found" Warnings
If you see errors about missing instruction files:
1.  **Stop**: Do not create empty files to silence it.
2.  **Check Path**: Verify the relative path in the markdown/comment.
3.  **Fix**: Point to the correct file in `.github/instructions/`.

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
