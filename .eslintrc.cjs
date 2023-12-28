module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:react-hooks/recommended", "plugin:tailwindcss/recommended"],
  ignorePatterns: [".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "tailwindcss"],
  rules: {
    "tailwindcss/no-custom-classname": "off",
    "react/prop-types":"off",
    "no-unused-vars": "off",
    "no-unreachable": "off",
    "tailwindcss/classnames-order": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
};
