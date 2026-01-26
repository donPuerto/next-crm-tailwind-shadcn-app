# 08 - Folder Structure Standards

## Official Directory Structure

Organized by scope, with shadcn/ui prioritized for UI components.

---

## Complete Project Structure

```
components/
├── ui/                        # shadcn/ui components (PRIMARY - copy-paste only)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── table.tsx
│   ├── form.tsx
│   ├── tabs.tsx
│   └── ...
│
├── custom/                    # Custom components (only if shadcn doesn't have it)
│   └── (ask before adding)
│
└── layout/                    # Global layout components (appear on all pages)
    ├── Header.tsx
    ├── Footer.tsx
    ├── Sidebar.tsx
    └── Navigation.tsx

app/
├── hooks/
├── layout.tsx
├── page.tsx
└── globals.css

lib/
├── utils.ts                   # shadcn utilities (DO NOT MODIFY)
└── (other utilities)

agents/                        # Agent instructions
```

---

## Dashboard Structure

```
app/
├── layout.tsx
├── page.tsx
│
├── sales/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── components/            # Sales-specific (ask before adding)
│   ├── reports/
│   │   └── page.tsx
│   └── leads/
│       └── page.tsx
│
└── admin/
    ├── layout.tsx
    ├── page.tsx
    ├── components/            # Admin-specific (ask before adding)
    ├── users/
    │   ├── page.tsx
    │   ├── components/        # User page-specific (ask before adding)
    │   └── [id]/
    │       └── page.tsx
    └── settings/
        └── page.tsx
```

---

## Component Organization & Decision Tree

**When you need a component, ask yourself:**

1. Is it available in shadcn/ui? → YES: Run `npx shadcn-ui@latest add [component]`
2. Is it NOT in shadcn? → Ask before creating in `components/custom/`
3. Is it global layout? → Add to `components/layout/`
4. Is it section-specific? → Add to `app/section/components/`
5. Is it page-specific? → Add to `app/section/page/components/` or same folder

| Scope | Location | Decision |
|-------|----------|----------|
| **Global UI** | `components/ui/` | shadcn only - use `add` command |
| **Custom UI** | `components/custom/` | Not in shadcn - ask first |
| **Global Layout** | `components/layout/` | Header, Footer, Sidebar |
| **Section Components** | `app/section/components/` | Used only in /section/* |
| **Page Components** | `app/section/page/components/` | Used only in this page |

---

## Naming Rules

- **shadcn components:** lowercase (`button.tsx`, `card.tsx`)
- **Custom components:** PascalCase (`Header.tsx`, `AdminStats.tsx`)
- **Folders:** lowercase with hyphens (`user-profile/`, `sales-reports/`)
- **Dynamic routes:** brackets (`[id]/`, `[slug]/`)
- **Route groups:** parentheses (`(auth)/`, `(marketing)/`)
- **File extension:** always `.tsx`

---

## Do Not

- ❌ Create folders without asking
- ❌ Add custom code to `components/ui/` (shadcn only)
- ❌ Modify `lib/utils.ts`
- ❌ Mix naming conventions
