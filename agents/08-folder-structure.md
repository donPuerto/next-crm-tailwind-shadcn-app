# 08 - Folder Structure Standards

## Official Directory Structure

This document defines the standard folder organization for the project.

## Root Structure

```
components/
├── ui/                     # Global reusable UI primitives
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── Table.tsx
│
└── layout/                 # Global layout components (appear on multiple pages)
    ├── Footer.tsx
    ├── Header.tsx
    ├── Navbar.tsx
    └── Sidebar.tsx

app/
├── hooks/                  # Custom React hooks
├── layout.tsx              # Root layout (wraps everything)
├── page.tsx                # Homepage (/)
└── globals.css             # Global styles

lib/                        # Utility functions
    # Root layout
├── page.tsx                # Homepage (/)
│
├── sales/
│   ├── layout.tsx          # Sales dashboard layout (sidebar, nav)
│   ├── page.tsx            # /sales (sales overview)
│   ├── components/         # Sales-only components
│   │   ├── SalesChart.tsx
│   │   └── LeadCard.tsx
│   ├── reports/
│   │   └── page.tsx        # /sales/reports
│   └── leads/
│       └── page.tsx        # /sales/leads
│
└── admin/
    ├── layout.tsx          # Admin dashboard layout (sidebar, nav)
    ├── page.tsx            # /admin (admin overview)
    ├── components/         # Admin-only components
    │   ├── AdminStats.tsx
    │   └── UserCard.tsx
    ├── users/
    │   ├── page.tsx        # /admin/users
    │   ├── UserTable.tsx   # Page-specific component
    │   └── UserFilters.tsx # Page-specific component
    └── settings/
        └── page.tsx        # /sales/reports
│   └── leads/
│       └── page.tsx    # /sales/leads
│
└── admin/
   Component Organization

Components are organized by scope and reusability:

| Scope | Location | Examples | When to Use |
|-------|----------|----------|-------------|
| **Global UI Primitives** | `components/ui/` | Button, Input, Card, Table | Used in multiple pages/sections |
| **Global Layout** | `components/layout/` | Footer, Header, Navbar, Sidebar | Appears on multiple pages |
| **Section-Specific** | `app/section/components/` | AdminStats, SalesChart | Only used within one section (/admin/*, /sales/*) |
| **Page-Specific** | `app/section/page/` | UserTable, UserFilters | Only used by one page (/admin/users) |

### Global Component Usage

Global components are imported and used in **root layout** or **section layouts**:

**app/layout.tsx** (Root layout - wraps all pages):
```tsx
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Footer />  {/* Appears on every page */}
      </body>
    </html>
  );
}
```

**app/admin/layout.tsx** (Section layout - wraps admin pages):
```tsx
import { Button } from "@/components/ui/Button";
import { AdminStats } from "./components/AdminStats";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside>Admin Sidebar</aside>
      <main>
        <AdminStats />
        {children}
        <Button>Add New</Button>
      </main>
    </div>
  );
}
```ettings
```

### Why Separate Paths?

- Clear URL structure (`/sales/*` vs `/admin/*`)
- Easy route protection with middleware
- Different layouts per dashboard type
- Simple role-based access control

## Alternative: Route Groups (Advanced)

For shared URLs with different layouts:

```
app/
├── layout.tsx
├── (marketing)/
│   ├── layout.tsx      # Marketing layout (header + footer)
│   ├── page.tsx        # /
│   └── about/
│       └── page.tsx    # /about
│
└── (app)/
    ├── layout.tsx      # App layout (sidebar)
    └── dashboard/
        └── page.tsx    # /dashboard
```

**Note:** `(marketing)` and `(app)` are route groups - they don't appear in URLs.

## Page Types

| File | Purpose | Required |
|------|---------|----------|
| `layout.tsx` | Wrapper/frame for pages | ✅ Root only |
| `page.tsx` | Actual page content | ✅ For routes |
| `loading.tsx` | Loading UI fallback | ❌ Optional |
| `error.tsx` | Error boundary | ❌ Optional |
| `not-found.tsx` | 404 page | ❌ Optional |

## Naming Rules

- Use lowercase with hyphens for folders: `user-profile/`, `sales-reports/`
- Dynamic routes use brackets: `[id]/`, `[slug]/`
- Route groups use parentheses: `(auth)/`, `(marketing)/`
- Always use `.tsx` extension for TypeScript files

## Do Not

- ❌ Create folders without confirmation
- ❌ Mix naming conventions
- ❌ Duplicate folder structures
- ❌ Create nested route groups unnecessarily
