import type { Loader } from "astro/loaders";

import { z } from "astro/zod";
import { readFile } from "fs/promises";
import path from "path";

export default function toolLoader(options: ToolLoaderOptions): Loader {
  return {
    name: "tool-icon-loader",
    schema: toolSchema,

    load: async ({ store }) => {
      store.clear();
      const tools = await parseTools(options.toolDir);
      tools.forEach((tool) => store.set({ id: tool.name, data: tool }));
    },
  };
}

const toolSchema = z.object({
  name: z.string(),
  icon: z.string(),
});

type Tool = z.infer<typeof toolSchema>;

interface ToolLoaderOptions {
  toolDir: string;
}

async function parseTools(toolIconsDir: string): Promise<Tool[]> {
  const toolIndex = await getToolIndex(toolIconsDir);
  
  const tools: Tool[] = [];

  for (const [name, iconFilename] of Object.entries(toolIndex)) {
    tools.push({
      name,
      icon: path.join(toolIconsDir, "icons", iconFilename),
    });
  }
  
  return tools;
}

async function getToolIndex(toolIconsDir: string) {
  const indexFile = await readFile(
    path.resolve(toolIconsDir, "./index.json"),
    "utf-8",
  );
  const toolIndex = JSON.parse(indexFile) as { [key: string]: string };
  return toolIndex;
}
