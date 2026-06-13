// @ts-check
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";
import remarkPreviewToFrontmatter from "remark-preview-to-frontmatter";


// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      [
        remarkPreviewToFrontmatter,
        { charLimit: 250, trailingWordBreakPolicy: "full word" },
      ],
    ],
  },

  integrations: [svelte()],

  vite: {
    resolve: {
      alias: {
        "@components": "/src/components",
        "@layouts": "/src/layouts",
        "@assets": "/src/assets",
      },
    },
  }
});
