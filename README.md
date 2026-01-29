# Next.js CRM (Enterprise-Ready)

[![Production](https://img.shields.io/badge/Production-Live-green)](https://next-crm-tailwind-shadcn-app.vercel.app/)

A modern, high-performance CRM (Customer Relationship Management) system built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Supabase**. Designed for multi-tenant organizations with granular RBAC and field service capabilities.

## 🚀 CRM Core Features

### 🏢 Entity Management
- **Organizations & Teams**: Native multi-tenancy support for enterprise scaling.
- **Companies & Contacts**: Advanced relationship tracking with normalized addresses and phone storage.
- **Profiles & RBAC**: Granular permission system (Admin, Sales, Technician, etc.) with dedicated performance stats.

### 📈 Sales & Field Service
- **Sales Pipeline**: Track opportunities from Lead to Won/Lost with source attribution.
- **Task Management**: Advanced ClickUp-style tasks with subtasks, labels, and checklists.
- **Quotes & Invoicing**: Professional proposal generation and billing lifecycle management.
- **Jobs & Scheduling**: Dispatching system for field technicians with GPS history tracking.

### 🛠️ Collaboration & Productivity
- **Rich Notes & Comments**: Pinned documentation and team collaboration threads.
- **User Integrations**: Secure OAuth connectivity for Google, Slack, and Outlook.
- **Automated Workflows**: Designed for seamless integration with **n8n** for external accounting (Xero/QuickBooks).

## 💻 Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components)
- **Database/Auth:** Supabase (PostgreSQL)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4 + Shadcn UI
- **Package Manager:** Bun
- **Theme System:** Dynamic Theme Switching (Colors, Radius, Styles)

## 📂 Project Structure

```
app/
├── (auth)/               # Multi-tenant Login/Register
├── dashboard/            # Main CRM Modules (Leads, Contacts, Sales, Analytics)
├── hooks/                # CRM-specific React Hooks
└── layout.tsx            # Global Root Layout
components/
├── ui/                   # shadcn/ui shared components
├── custom/               # CRM-specific UI components
└── layout/               # Global layout (Sidebar, Navbar)
lib/
├── constants/            # System-wide configuration
└── utils.ts              # Business logic utilities
```

## 👩‍💻 Developer Standards

| ID | Topic | Description |
|---|---|---|
| **01** | [Project Overview](.github/instructions/01-project-overview.md) | Architecture and CRM Goals. |
| **04** | [Styling & Theming](.github/instructions/04-styling-and-theming.md) | CSS Variables & Theme System. |
| **05** | [Components & Hooks](.github/instructions/05-components-and-hooks.md) | shadcn vs Custom CRM components. |
| **08** | [Database Schema](supabase/schema.md) | Entity relationships and SQL definitions. |

## 🛠️ Implementation & Setup

1.  **Install dependencies:**
    ```bash
    bun install
    ```
2.  **Environment Setup:** Update `.env.local` with your Supabase credentials.
3.  **Run development server:**
    ```bash
    bun dev
    ```

## ⚠️ Important Rules

- **Schema First**: Every UI change must be reflected in `supabase/schema.md`.
- **Strict Typing**: No `any`. Utilize generated types for Supabase relations.
- **Performance**: Prioritize Server Components for data-heavy CRM tables.
- **Theming**: Always use `useTheme` for dynamic visual consistency.
