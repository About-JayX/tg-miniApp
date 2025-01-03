module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import", "simple-import-sort"],
  rules: {
    "ntno-empty":"off",
    "@typescript-eslint/ban-ts-comment":"off",
    "@typescript-eslint/no-unused-vars":"off",
    "@typescript-eslint/ban-types":"off",
    "import/no-anonymous-default-export": "off",
    "import/no-unresolved": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "simple-import-sort/imports": "off",
    "simple-import-sort/exports": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react-refresh/only-export-components": "off",
    "react-hooks/exhaustive-deps": "off",
  },
};
