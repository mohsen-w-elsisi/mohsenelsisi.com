import type { Loader } from "astro/loaders";
import { z } from "astro/zod";
import {
  PlatformsParser,
  ProjectsParser,
  ToolsParser,
  platformZodSchema,
  projectZodSchema,
  toolZodSchema,
} from "@mohsen-w-elsisi/content-parsers";

export function platformLoader({
  rootDir,
}: {
  rootDir: string;
}): Loader {
  return {
    name: "platform-loader",
    schema: platformZodSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>,

    load: async ({ store }) => {
      store.clear();
      const platforms = await new PlatformsParser(rootDir).parse();
      platforms.forEach((platform) =>
        store.set({
          id: platform.name,
          data: platform as unknown as Record<string, unknown>,
        }),
      );
    },
  };
}

export function projectLoader({
  rootDir,
}: {
  rootDir: string;
}): Loader {
  return {
    name: "project-loader",
    schema: projectZodSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>,

    load: async ({ store, renderMarkdown }) => {
      store.clear();

      const projects = await new ProjectsParser(rootDir).parse();

      for (const project of projects) {
        store.set({
          id: project.id,
          data: project,
          rendered: await renderMarkdown(project.details),
        });
      }
    },
  };
}

export function toolLoader({ rootDir }: { rootDir: string }): Loader {
  return {
    name: "tool-icon-loader",
    schema: toolZodSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>,

    load: async ({ store }) => {
      store.clear();
      const tools = await new ToolsParser(rootDir).parse();
      tools.forEach((tool) => store.set({ id: tool.name, data: tool }));
    },
  };
}
