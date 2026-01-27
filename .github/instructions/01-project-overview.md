# 01 - Project Overview

## 🎯 Project Goal
**Next.js 16 dashboard application** built with performance, scalability, and developer experience in mind.
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 + Custom Theme System
- **UI Library**: shadcn/ui (Radix Primitives)
- **Package Manager**: Bun

## 🏗️ Core Architecture

### Server Components by Default
- **Performance**: Minimize client-side JavaScript.
- **Data Fetching**: Fetch data directly in Server Components (`async/await`).
- **Client Boundary**: Push client logic (`useState`, `useEffect`, event listeners) as far down the tree as possible.
- **Directive**: Add `'use client'` at the top of files *only* when necessary.

### Key Features
- **Dynamic Theming**: Runtime switching of colors, radius, and styles.
- **Sidebar Layout**: Complex nested layout with independent scrolling.
- **Strict Typing**: No `any` types; Zod for validation.

## 🤝 Agent & Developer Workflow
1.  **Read Instructions**: Always consult these files before starting work.
2.  **Plan**: Break down tasks into steps.
3.  **Implement**: Follow the "Component Decision Tree" (see `05-components-and-hooks.md`).
4.  **Verify**: Run linting and type checks.
5.  **Document**: Add comments explaining *why*, not just *what*.

## 📚 Documentation Map
| File | Purpose |
|------|---------|
| `01-project-overview.md` | Tech stack, architecture, and workflow. |
| `02-app-structure.md` | Folder layout, routing, and dashboard patterns. |
| `03-coding-standards.md` | TypeScript, ESLint, and documentation rules. |
| `04-styling-and-theming.md` | Tailwind, CSS variables, and the Theme System. |
| `05-components-and-hooks.md` | shadcn/ui coverage, custom components, and hooks. |
| `06-performance-and-best-practices.md` | Accessibility, optimization, and security. |
