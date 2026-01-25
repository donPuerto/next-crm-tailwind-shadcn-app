# 04 - TypeScript Standards

## Types
- No `any` unless unavoidable; prefer `unknown` + narrowing.
- Avoid non-null assertions and type assertions unless necessary.
- Export prop types for reuse.

## Readability
- Add brief comments to new or edited code to explain intent.
- Keep types close to the components/functions that use them.
