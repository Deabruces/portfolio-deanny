import eslintPluginAstro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      ".astro/**",
      ".frontmatter/**",
      ".vercel/**",
      ".vscode/**",
      "dist/**",
      "node_modules/**",
      "**/*.d.ts", // Ignore generated TypeScript declaration files
    ],
  },
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-strict"],
  ...tseslint.configs.recommended,
  {
    files: ["**/*.astro"],
    plugins: {
      astro: eslintPluginAstro,
    },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      ...eslintPluginAstro.configs.recommended.rules,
      ...eslintPluginAstro.configs["jsx-a11y-strict"].rules,
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    },
  },
];
