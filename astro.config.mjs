// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

const isDev = process.argv.includes("dev");

// https://astro.build/config
export default defineConfig({
  site: 'https://AlexPerrin.github.io',
  integrations: isDev
    ? [react(), markdoc(), keystatic()]
    : [react(), markdoc()],

  vite: {
    plugins: [tailwindcss()],
  },

  ...(isDev && { output: "server" }),
});
