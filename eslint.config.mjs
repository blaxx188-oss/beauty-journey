import nextPlugin from "@next/eslint-plugin-next";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  // Global ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "src/**/*.d.ts",
  ]),

  // TypeScript files
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-interface": "warn",

      // React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Next.js rules
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "error",

      // General rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-undef": "off",
      "no-redeclare": "off",
    },
  },
]);

export default eslintConfig;
