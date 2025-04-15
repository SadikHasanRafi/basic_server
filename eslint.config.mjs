import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["node_modules", "dist"],
    rules: {
      // "no-unused-vars": "warn", // was "warning"
      "no-console": "warn", // discourage console logs in production
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      eqeqeq: ["error", "always"], // enforce === instead of ==
      curly: "error", // require curly braces for all control statements
      // "object-curly-spacing": ["warn", "always"], // enforce spacing inside braces
      "arrow-spacing": ["error", { before: true, after: true }], // enforce space around arrows
      "no-multiple-empty-lines": ["warn", { max: 10 }], // limit blank lines
    },
  },
];
