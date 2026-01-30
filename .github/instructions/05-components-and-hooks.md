# 05 - Components & Hooks

## 🧩 Component Workflow

**Decision Tree (Follow Strictly):**
1.  **Check shadcn/ui**: exist in `components/ui/`?
    - YES: Import it. (`import { Button } from '@/components/ui/button'`)
    - NO: ask user.
2.  **Check Custom Components**: exist in `components/custom/` or `components/layout/`?
    - YES: Reuse.
    - NO: Should we create one? Ask user.
3.  **Create New**:
    - **Global**: `components/custom/[PascalCase].tsx`
    - **Feature-Scoped**: `app/[feature]/components/[PascalCase].tsx`

### shadcn/ui Rules
- **Do NOT modify** `components/ui/` structure unless customizing styles.
- **Do NOT add application logic** to shadcn components (keep them presentational).
- **Installation**: Use `npx shadcn-ui@latest add [component]`.

## 🎣 Hooks & Utilities

**Priority**: Logic should live in Hooks (`useLogic`) or Utilities (`utils.ts`) before Components.

### Custom Hooks (`app/hooks/`)
- **File Naming**: `use-feature-name.ts` (kebab-case, all lowercase).
  - Example: `use-mobile.ts`, `use-theme-color.ts`
  - Export naming: `export function useFeatureName() { ... }` (camelCase for exported function)
- **Reuse**: Check if a hook exists before writing `useEffect`.
- **All Hooks in `app/hooks/`**: Follow consistent kebab-case naming across all custom hooks.

### Utilities (`lib/`)
- **`utils.ts`**: Reserved for shadcn helper `cn` (clsx + tailwind-merge).
- **Feature Utils**: Create `lib/formatters.ts`, `lib/validators.ts`, etc. for specific logic.
- **Constants**: Store static data in `lib/constants/`.

## 🖥️ Server vs Client Components

**Default: Server Component** (`app/page.tsx`, `layout.tsx`)
- Fetching data.
- Accessing backend resources (DB, internal APIs).
- Keeping sensitive keys on server.

**Client Component** (`'use client'`)
- Interactivity (`onClick`, `onChange`).
- State (`useState`, `useReducer`).
- Lifecycle (`useEffect`).
- Browser APIs (`window`, `document`, `localStorage`).
- **Optimization**: Wrap interactive parts in a Client Component and import them into the Server Component.
