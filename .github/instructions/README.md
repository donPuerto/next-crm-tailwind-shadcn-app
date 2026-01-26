# Agent Instructions

These files define how automated agents should work in this repository to keep the build reliable and aligned with Next.js + Tailwind best practices.

## Beginner-Friendly Rules
- Always read these agent instructions first before creating or editing code.
- Always ask the user for confirmation before making changes.
- Add clear comments to new or edited code (components, modules, and major blocks) to explain intent.
- If debugging is needed, auto-run basic checks and explain results in simple terms.

## Pre-Work Checklist (Before Implementation)
1. **Read Instructions First**: Always read relevant agent instruction files before implementing any feature.
2. **Use shadcn/ui Components**: Always use shadcn/ui components from `components/ui/` when available.
   - Search the `components/ui/` folder to check if the component exists.
   - If the component is not found, ask the user before creating a custom component.
   - Reference `11-shadcn-components.md` for available components and usage patterns.
3. **Component Priority**:
   - First: Check if shadcn/ui has the component
   - Second: Search existing `components/ui/` folder
   - Third: Ask user before creating custom components
4. **Read Order**: Hooks → Utilities → Components/UI (see 07-hooks-utilities-ui.md).
5. **Confirm** these rules were reviewed before creating any UI component.

## Files
- 01-project-context.md
- 02-structure-standards.md
- 03-styling-standards.md
- 04-typescript-standards.md
- 05-accessibility-performance.md
- 06-linting-build.md
- 07-hooks-utilities-ui.md
- 08-folder-structure.md
- 09-tailwind-standards.md
- 10-documentation-standards.md
- 11-shadcn-components.md
- 12-theme-system.md
- 13-theme-colors.md
- 14-typography.md
