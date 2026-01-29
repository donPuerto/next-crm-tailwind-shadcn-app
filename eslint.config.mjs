import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".github/**",
    // Ignore documentation and instruction files
    "**/*.md",
    "README.md",
  ]),
  // Custom rule overrides for TypeScript/React files
  {
    ignores: ["**/*.md"],
    rules: {
      // Suppress React Compiler warnings about incompatible libraries
      // TanStack Table (useReactTable) and next-themes are known to skip memoization
      "react-hooks/incompatible-library": "off",

      // Suppress purity warnings for Math.random() in useCallback/useMemo
      // These are used for UI placeholders and non-critical randomization
      "react-hooks/purity": "warn",

      // Enforce strict typing - forbid 'any'
      "@typescript-eslint/no-explicit-any": "error",

      // Allow some unused variables (e.g., imported icons that may be used conditionally)
      "@typescript-eslint/no-unused-vars": [
        "error", // Set to error for stricter enforcement
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
]);

export default eslintConfig;
