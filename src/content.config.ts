import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";
import * as yaml from "yaml";

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

const journalMetadata = defineCollection({
  loader: file("content/journals/index.yaml", {
    parser: yaml.parse,
  }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    favourite: z.boolean().default(false),
  }),
});

const journalEntries = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "content/journals",
    generateId: ({ data }) => `${data.parent}-${data.issue}`,
  }),
  schema: z.object({
    parent: z.string(),
    issue: z.number(),
    title: z.string(),
    date: z.date(),
  }),
});

export const collections = {
  posts,
  projects,
  tools,
  platforms,
  journalMetadata,
  journalEntries,
};
