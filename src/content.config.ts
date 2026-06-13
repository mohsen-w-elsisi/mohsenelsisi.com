import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

import platformLoader from "./contentLoaders/platformLoader";
import projectLoader from "./contentLoaders/projectContentLoader";
import toolLoader from "./contentLoaders/toolLoader";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "content/posts",
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

const projects = defineCollection({
  loader: projectLoader({
    rootDir: "content/projects",
  }),
});

const tools = defineCollection({
  loader: toolLoader({
    toolDir: "content/tools",
  }),
});

const platforms = defineCollection({
  loader: platformLoader({
    rootDir: "content/platforms",
  }),
});

export const collections = { posts, projects, tools, platforms };
