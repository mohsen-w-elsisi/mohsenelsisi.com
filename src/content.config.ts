import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import projectToolIconIndex from "../projects/tool-icons/index.json";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./posts",
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./projects",
  }),
  schema: z.object({
    title: z.string(),
    favourite: z.boolean(),
    description: z.string(),
    tools: z.array(z.string()),
    links: z.array(
      z.object({
        platform: z.string(),
        url: z.string(),
      }),
    ),
  }),
});

export const collections = { posts, projects };
