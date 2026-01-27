# Next.js App

A modern Next.js application built with TypeScript, Tailwind CSS v4, and a dynamic theming system.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + Shadcn UI
- **Package Manager:** Bun
- **Theme System:** Dynamic Theme Switching (Colors, Radius, Styles)

## 📂 Project Structure

```
app/
├── (auth)/               # Login/Register routes
├── dashboard/            # Main application area (Sidebar Layout)
├── hooks/                # Custom React Hooks
└── layout.tsx            # Global Root Layout

components/
├── ui/                   # shadcn/ui components (Do not modify structure)
├── custom/               # Custom application components
└── layout/               # Global layout components (Sidebar, Navbar)

lib/
├── constants/            # Configuration constants
└── utils.ts              # Utility functions
```

## 👩‍💻 Agent Instructions & Standards

This project follows strict coding standards. Please refer to the `.github/instructions/` folder for detailed guidelines.

| ID | Topic | Description |
|---|---|---|
| **01** | [Project Overview](.github/instructions/01-project-overview.md) | Architecture, Server Components, and Goals. |
| **02** | [App Structure](.github/instructions/02-app-structure.md) | Folder layout, Dashboard patterns, and Routing. |
| **03** | [Coding Standards](.github/instructions/03-coding-standards.md) | TypeScript, ESLint, Comments, and Docs. |
| **04** | [Styling & Theming](.github/instructions/04-styling-and-theming.md) | CSS Variables, Theme System (`useTheme`), Tailwind rules. |
| **05** | [Components & Hooks](.github/instructions/05-components-and-hooks.md) | Usage of shadcn/ui vs Custom components. |
| **06** | [Best Practices](.github/instructions/06-performance-and-best-practices.md) | Performance, Accessibility, and Security. |

## 🛠️ Getting Started

1.  **Install dependencies:**
    ```bash
    bun install
    ```

2.  **Run development server:**
    ```bash
    bun dev
    ```

3.  **Build for production:**
    ```bash
    bun run build
    ```

## ⚠️ Important Rules

- **Strict Mode**: TypeScript strict mode is enabled. No `any`.
- **Linter**: Run `bun run lint` before committing.
- **Components**: Always check `components/ui` (shadcn) before creating custom components.
- **Theming**: Use the `useTheme` hook for color logic; never hardcode hex values.
