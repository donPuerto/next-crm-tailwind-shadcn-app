# 09 - Tailwind CSS Standards

## Core Rule: Use Native Classes First

Always prefer **native Tailwind classes** over arbitrary values `[...]`.

---

## Common Conversions

### Spacing (Width, Height, Padding, Margin)

| Instead Of | Use This | Pixels |
|------------|----------|--------|
| `158px` value | `w-40` | 160px |
| `144px` value | `w-36` | 144px |
| `32px` value | `h-8` | 32px |
| `24px` value | `p-6` | 24px |
| `16px` value | `gap-4` | 16px |

**Tailwind spacing scale:** 4px = 1 unit (4, 8, 12, 16, 20, 24, 28, 32...)

### Colors

| Instead Of | Use This | Use Case |
|------------|----------|----------|
| `#383838` hex | `bg-gray-700` | Dark gray |
| `#ccc` hex | `bg-gray-300` | Light gray |
| `#1a1a1a` hex | `bg-gray-900` | Very dark |
| `#ffffff` hex | `text-white` | White |

**Use color names:** `gray-50`, `gray-100`, ... `gray-900`, `red-500`, `blue-600`, etc.

### Opacity

| Instead Of | Use This | Percentage |
|------------|----------|------------|
| `0.08` opacity | `/8` | 8% |
| `0.04` opacity | `/5` | 5% |
| `0.145` opacity | `/15` | 15% |

**Format:** `border-black/8`, `bg-white/10`, `hover:bg-black/5`

---

## Examples

### ❌ Anti-Pattern Examples

Do NOT use these patterns:

- `w-[158px]` → Use `w-40` instead
- `border-black/[.08]` → Use `border-black/8` instead  
- `bg-[#383838]` → Use `bg-gray-700` instead
- `text-[#1a1a1a]` → Use `text-gray-900` instead

### ✅ Good (Native Classes)

```tsx
className="w-40 border-black/8 hover:bg-gray-700 text-gray-900"
```

---

## Tailwind Utility Scale

### Width/Height
- `w-4` = 1rem (16px)
- `w-6` = 1.5rem (24px)
- `w-8` = 2rem (32px)
- `w-10` = 2.5rem (40px)
- `w-12` = 3rem (48px)
- `w-16` = 4rem (64px)
- `w-20` = 5rem (80px)
- `w-24` = 6rem (96px)
- `w-32` = 8rem (128px)
- `w-40` = 10rem (160px)

### Font Sizes
- `text-xs` = 0.75rem (12px)
- `text-sm` = 0.875rem (14px)
- `text-base` = 1rem (16px)
- `text-lg` = 1.125rem (18px)
- `text-xl` = 1.25rem (20px)
- `text-2xl` = 1.5rem (24px)
- `text-3xl` = 1.875rem (30px)

### Colors (500 = base)
- `gray-50` = lightest
- `gray-100`, `gray-200`, ... `gray-400`
- `gray-500` = base
- `gray-600`, `gray-700`, ... `gray-900` = darkest

---

## When Arbitrary Values Are OK

✅ **Acceptable only for:** Complex custom values when no native class fits
- `translate-x-[45%]` (specific percentage)
- `delay-[2.2s]` (specific timing)

❌ **Never use for:** Colors, spacing, opacity, or sizes that have native equivalents
- ❌ `w-[158px]` → Use `w-40`
- ❌ `bg-[#383838]` → Use `bg-gray-700`
- ❌ `border-black/[.08]` → Use `border-black/8`
- ❌ `text-[#1a1a1a]` → Use `text-gray-900`

---

## Dark Mode

Always use `dark:` prefix for dark mode:

```tsx
className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
```

---

## Code Review Checklist

Before committing:
- ✅ No arbitrary values `[...]` unless justified
- ✅ Use native Tailwind colors
- ✅ Use native spacing scale
- ✅ Dark mode classes included
- ✅ No custom hex colors in className

---

## Helpful Resources

- [Tailwind Color Palette](https://tailwindcss.com/docs/customizing-colors)
- [Spacing Scale](https://tailwindcss.com/docs/customizing-spacing)
- [Font Sizes](https://tailwindcss.com/docs/font-size)
