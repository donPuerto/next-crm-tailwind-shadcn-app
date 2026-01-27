# 02 - App Structure & Routing

## 📂 Directory Layout

```
app/
├── (auth)/               # Route group for authentication (login/register)
├── dashboard/            # Main protected application area
│   ├── layout.tsx        # Dashboard shell (Sidebar + Header)
│   ├── page.tsx          # Dashboard home
│   └── [section]/        # Feature sections (e.g., sales, users)
│       └── page.tsx
├── hooks/                # Custom React hooks (useTheme, etc.)
├── layout.tsx            # Root layout (Globals, ThemeProvider)
└── global.css            # Tailwind + CSS Variables

components/
├── ui/                   # shadcn/ui components (DO NOT MODIFY structure)
├── custom/               # Reusable custom components (Ask before creating)
├── layout/               # Global layout blocks (Sidebar, Navbar)
└── providers/            # React Context providers

lib/
├── constants/            # Static config (themes, navigation)
├── utils.ts              # shadcn utility (cn helper)
└── [feature].ts          # Feature-specific logic
```

## 📐 Dashboard Layout Pattern

The dashboard uses a specific nested layout to handle scrolling correctly.

**File:** `app/dashboard/layout.tsx`

```tsx
<div className="layout-container mx-auto w-full h-svh bg-sidebar">
  <SidebarProvider className="w-full h-full bg-sidebar p-3">
    <AppSidebar />
    <SidebarInset className="h-full flex-1 flex flex-col pr-px bg-sidebar">
      {/* Scrollable Content Area */}
      <div className="h-full rounded-xl border border-border bg-background overflow-y-auto">
        {children}
      </div>
    </SidebarInset>
  </SidebarProvider>
</div>
```

**Key Principles:**
1.  **`h-svh`**: Uses small viewport height to standardizes mobile view.
2.  **`bg-sidebar`**: applied to container to prevent visual glitching.
3.  **`overflow-y-auto`**: Applied *only* to the innermost content wrapper to preserve sidebar stability.
4.  **`SidebarInset`**: Handles the responsiveness of the main content area.

## 🛣️ Routing Conventions
- **Folders as Routes**: `app/users/page.tsx` -> `/users`
- **Dynamic Routes**: `app/users/[id]/page.tsx` -> `/users/123`
- **Route Groups**: Folders with `()` are organizational only and do not affect the URL (e.g., `(auth)`).
- **Parallel Routes**: `@modal` for intercepting modals (if needed).

## ⚠️ Important Rules
- **Do NOT create top-level folders** in `app/` without approval.
- **Do NOT put components in `app/`** unless they are strictly page-specific (colocated).
- **Keep `components/ui` pure**: Only shadcn components go here.
