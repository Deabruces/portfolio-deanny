// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://www.deannybruces.com",
  output: "static", // Enables server-side rendering for API endpoints
  integrations: [react(), sitemap(), mdx()],
  adapter: vercel(),
});
