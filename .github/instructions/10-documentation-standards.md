# 10 - Documentation Standards

## Core Rule: Never Show Arbitrary Values in Docs

When writing documentation (markdown, comments, examples), **avoid displaying Tailwind arbitrary values** even as examples of what NOT to do. The linter flags them regardless of context.

---

## How to Show "Bad" Examples Safely

### ❌ Wrong (Triggers Linter Warnings)

Don't show arbitrary syntax in code blocks—ever.

**Problem:** Linter flags arbitrary syntax even in docs.

### ✅ Right (No Warnings)

Use plain text, bullet lists, or tables WITHOUT showing the syntax:

```markdown
### Bad Patterns (Don't Use These)

- Arbitrary pixel widths → Use native width classes instead
- Arbitrary opacity syntax → Use native opacity classes instead  
- Hex colors → Use color names like bg-gray-700 instead

### Good Example
\`\`\`tsx
className="w-40 border-black/8 hover:bg-gray-700"
\`\`\`
```

---

## Rules for Documentation

### ✅ Safe Ways to Show Bad Patterns

1. **Plain text with arrows:**
   ```
   Instead of: pixel values
   Use: w-40, w-36, w-32
   ```

2. **Bullet points:**
   ```
   - Avoid: arbitrary widths → Use: w-40
   - Avoid: arbitrary opacity → Use: border-black/8
   ```

3. **Tables (no code blocks):**
   ```
   | Avoid | Use Instead |
   |-------|-------------|
   | Pixel values | Native width classes |
   | Hex codes | Color names |
   ```

4. **Comments in code blocks (only for CORRECT code):**
   ```tsx
   // ✅ Good: Use native classes
   className="w-40 border-black/8 bg-gray-700"
   
   // Note: Never use arbitrary syntax
   ```

### ❌ Never Do This

- ❌ Code blocks with arbitrary syntax
- ❌ Copy-paste arbitrary values anywhere in docs
- ❌ Show arbitrary values even in "bad examples"

---

## Examples

### Creating an Instruction

**Bad:**
```markdown
Don't use arbitrary pixel widths, use w-40 instead
```

**Good:**
```markdown
Use native Tailwind classes like w-40 for width values.
```

---

### Creating Code Examples

Only show CORRECT code in code blocks:

```tsx
// ✅ Good: Use native Tailwind classes
<div className="w-40 bg-gray-700">Content</div>
```

---

### Conversion Guides

```markdown
| Avoid | Use Instead |
|-------|-------------|
| Custom pixel values | Native Tailwind sizes |
| Hex color codes | Built-in color names |
| Decimal opacity | Tailwind opacity scale |
```

---

## Pre-Commit Checklist for Docs

Before adding/updating documentation:
- ✅ No arbitrary syntax in any code blocks
- ✅ Bad examples shown as plain text only
- ✅ Only correct code shown in \`\`\`tsx blocks
- ✅ Use bullet points or tables for patterns
- ✅ No inline arbitrary values anywhere

---

## Summary

**Golden Rule:** Never display arbitrary values in documentation, even as examples of "what NOT to do."

Use descriptions, tables, and bullet points instead.

