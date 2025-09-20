import eslintPluginAstro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import tseslint from "typescript-eslint";
import markdown from "@eslint/markdown";

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
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    },
  },

  // Markdown configuration (only for .md and .mdx files)
  {
    files: ["**/*.md", "**/*.mdx"],
    plugins: {
      markdown: markdown,
    },
    processor: "markdown/markdown",
    rules: {
      ...markdown.configs.recommended.rules,
      // Disable rules that don'
      // t work well with Astro frontmatter
      // "markdown/no-missing-label-refs": "off",
      // "markdown/no-duplicate-headings": "warn",
      // "markdown/no-empty-links": "error",
    },
  },
];
