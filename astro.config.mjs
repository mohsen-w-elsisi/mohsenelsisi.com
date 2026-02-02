// @ts-check
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
});
