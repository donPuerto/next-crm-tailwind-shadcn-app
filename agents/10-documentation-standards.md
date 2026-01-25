# 10 - Documentation Standards

## Core Rule: Never Show Arbitrary Values in Docs

When writing documentation (markdown, comments, examples), **avoid displaying Tailwind arbitrary values** even as examples of what NOT to do. The linter flags them regardless of context.

---

## How to Show "Bad" Examples Safely

### ❌ Wrong (Triggers Linter Warnings)

```markdown
### Bad Example
\`\`\`tsx
className="w-[158px] border-black/[.08]"  // DON'T DO THIS
\`\`\`
```

**Problem:** Linter flags `w-[158px]` and `border-black/[.08]` even in docs.

### ✅ Right (No Warnings)

Use plain text, bullet lists, or tables WITHOUT code blocks:

```markdown
### Bad Patterns (Don't Use These)

- `158px` width values → Use `w-40` instead
- `border-black/[.08]` opacity → Use `border-black/8` instead
- Hex colors like `#383838` → Use color names like `bg-gray-700` instead

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
   Instead of writing: arbitrary values
   Use: native Tailwind classes
   ```

2. **Bullet points:**
   ```
   - Don't use: 158px → Use: w-40
   - Don't use: #383838 → Use: bg-gray-700
   ```

3. **Tables (no code blocks):**
   ```
   | Avoid | Use Instead |
   |-------|-------------|
   | 158px width | w-40 |
   | Hex #383838 | bg-gray-700 |
   ```

4. **Comments in code blocks (only for CORRECT code):**
   ```tsx
   // ✅ Good: Use native classes
   className="w-40 border-black/8 bg-gray-700"
   
   // Note: Don't use arbitrary values like w-[158px]
   ```

### ❌ Never Do This

- ❌ Code blocks showing arbitrary values
- ❌ Copy-paste arbitrary values anywhere in docs
- ❌ Inline code like `\`w-[158px]\`` in prose

---

## Examples

### Creating an Instruction (Like This File)

**Bad:**
```markdown
## Wrong
Use className="w-[158px]" is wrong, use w-40 instead
```

**Good:**
```markdown
## Correct Pattern

Use `w-40` for 160px width values instead of arbitrary pixel sizes.
```

---

### Creating Code Examples

**Bad:**
```markdown
# Example
\`\`\`tsx
<div className="w-[158px] bg-[#383838]">Bad</div>
\`\`\`
```

**Good:**
```markdown
# Example
\`\`\`tsx
// ✅ Use native Tailwind classes
<div className="w-40 bg-gray-700">Good</div>
\`\`\`
```

---

### Conversion Guides

**Bad:**
```markdown
| Don't | Do |
|------|-----|
| w-[158px] | w-40 |
| bg-[#383838] | bg-gray-700 |
```

**Good:**
```markdown
| Instead Of | Use This |
|------------|----------|
| 158px width | w-40 |
| Hex #383838 | bg-gray-700 |
```

---

## Pre-Commit Checklist for Docs

Before adding/updating documentation:
- ✅ No arbitrary values `[...]` in code blocks
- ✅ Bad examples shown as plain text, not code
- ✅ Only correct code shown in \`\`\`tsx blocks
- ✅ Use bullet points or tables for comparisons
- ✅ No inline arbitrary values in prose

---

## Summary

**Golden Rule:** If you wouldn't write it in real code, don't show it in a code block in docs.

Use plain text, bullet lists, and tables to discuss bad patterns instead.
