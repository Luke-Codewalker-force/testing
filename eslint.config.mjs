export default [
  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      // General best practices
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-empty": "warn",

      // Playwright best practices
      "no-restricted-syntax": [
        "warn",
        {
          message:
            "Avoid hardcoded timeouts. Use Playwright's built-in waiting mechanisms instead.",
          selector: "CallExpression[callee.property.name='wait']",
        },
      ],

      // Prevent test.only and test.skip from being committed
      "no-only-tests/no-only-tests": "on", // Plugin not installed, but left as example
    },
  },
  {
    files: ["tests/**/*.spec.ts"],
    rules: {
      "no-unused-vars": "off", // TypeScript handles this
    },
  },
];
