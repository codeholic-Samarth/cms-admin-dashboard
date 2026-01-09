import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

export default defineConfig([
  // Next.js defaults (keep these)
  ...nextVitals,
  ...nextTs,

  // Project-wide rules
  {
    plugins: {
      "unused-imports": unusedImports,
      import: importPlugin,
    },

    rules: {
      /* ----------------------------
       * Code quality
       * ---------------------------- */
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",

      /* ----------------------------
       * Unused code
       * ---------------------------- */
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      /* ----------------------------
       * Import order (CMS-grade)
       * ---------------------------- */
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],

      /* ----------------------------
       * React / Next.js adjustments
       * ---------------------------- */
      "react/react-in-jsx-scope": "off",
      "@next/next/no-html-link-for-pages": "off",

      /* ----------------------------
       * Architecture safety (optional but recommended)
       * ---------------------------- */
      "no-restricted-imports": [
        "error",
        {
          patterns: ["../*"],
        },
      ],
    },
  },

  // ✅ Ignore build artifacts
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
