import noOnlyTests from "eslint-plugin-no-only-tests";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: { "no-only-tests": noOnlyTests },
    rules: {
      // General best practices
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-empty": "warn",
      // Prevent test.only and test.skip from being committed
      "no-only-tests/no-only-tests": "error",

      // Playwright best practices
      "no-restricted-syntax": [
        "warn",
        {
          message:
            "Avoid hardcoded timeouts. Use Playwright's built-in waiting mechanisms instead.",
          selector: "CallExpression[callee.property.name='wait']",
        },
      ],
    },
    ignores: [
      ".husky/**",
      "node_modules/**",
      "test-results/**",
      "playwright-report/**",
    ],
  },
  {
    files: ["tests/**/*.spec.ts"],
    rules: {
      "no-unused-vars": "off", // TypeScript handles this
    },
  },
];
