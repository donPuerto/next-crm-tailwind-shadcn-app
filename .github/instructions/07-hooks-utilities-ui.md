# 07 - Hooks, Utilities, and UI Components

## Purpose
Keep reusable logic and UI consistent, discoverable, and beginner-friendly.

## Folder Locations (Required)
- Hooks: `app/hooks/`
- Utilities: `lib/`
- UI Components: `components/ui/`

## Custom Hooks
- Must be reusable and focused on one job.
- Name hooks with a `use` prefix (e.g., `useToggle`).
- Hooks are for client logic; use in client components only.
- Add short comments for intent and side effects.

## Utility Modules
- Prefer pure functions (no React, no side effects).
- Use clear names (e.g., `formatDate`, `slugify`).
- Add short comments describing inputs/outputs.

## UI Components (shadcn-like)
- Keep components small, composable, and well-typed.
- Add brief comments at the top and around major blocks for beginners.
- Avoid hidden logic; be explicit and readable.

## Required Read Order (before creating UI)
1) Hooks
2) Utilities
3) Components/UI

If adding a new UI component, confirm you reviewed these rules first.

## Visual References (Dribbble, etc.)
- You may use external images as inspiration or for guidance only.
- Do not copy or reuse copyrighted images or proprietary designs.
- Recreate layouts with original styling and assets.
- Avoid trademarked or brand-specific designs.
