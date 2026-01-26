# 03 - Styling Standards (Tailwind)

## Rules
- Use utility-first classes; avoid custom CSS unless global or required.
- Keep class lists readable; group by layout → spacing → typography → color → effects.
- Avoid adding class helper libraries unless requested.

## Conventions
- Use `dark:` variants for dark mode when needed.
- Prefer semantic HTML with Tailwind for clarity.
## Layout System

### Layout Modes
The app supports two layout modes controlled by a class on the `<html>` element:
- **layout-full**: Full-width layout (no container constraint)
- **layout-fixed**: Container-constrained layout (respects max-width breakpoints)

### Layout Utilities (defined in `globals.css`)

```css
/* Container behavior based on mode */
html.layout-full .layout-container {
  @apply w-full;
}

html.layout-fixed .layout-container {
  @apply container px-0;
}

/* Standard horizontal padding */
.layout-padding {
  @apply px-6;
}
```

### Dashboard Layout Structure

The dashboard uses a nested layout system:

```tsx
// app/dashboard/layout.tsx structure
<div className="layout-container mx-auto w-full h-svh bg-sidebar">
  <SidebarProvider className="w-full h-full bg-sidebar p-3">
    <AppSidebar />
    <SidebarInset className="h-full flex-1 flex flex-col pr-[1px] bg-sidebar">
      <div className="flex-1 rounded-xl border border-border bg-sidebar overflow-hidden shadow-sm">
        <div className="h-full overflow-auto">
          {children}
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</div>
```

**Key principles:**
- Apply `bg-sidebar` at every container level to prevent black background showing through
- Use `overflow-hidden` on rounded containers to clip corners properly
- Inner content wrapper handles scrolling with `overflow-auto`
- Sidebar and dashboard content share the same height (`h-svh` → `h-full`)
- Small right padding (`pr-[1px]`) positions scrollbar correctly

### Using Layout Classes

**For pages:**
```tsx
<header className="layout-padding flex items-center gap-2 py-6">
  {/* Header content */}
</header>

<div className="layout-padding flex flex-1 flex-col gap-4 py-6">
  {/* Page content */}
</div>
```

**For navbar:**
```tsx
<div className="layout-container layout-padding mx-auto flex h-12 items-center justify-between">
  {/* Navbar content */}
</div>
```