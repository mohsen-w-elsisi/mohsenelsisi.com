import type { Loader } from "astro/loaders";
import { z } from "astro/zod";
import { readFile } from "fs/promises";
import path from "path";

export default function platformLoader(options: PlatformLoaderOptions): Loader {
  return {
    name: "platform-loader",
    schema: platformScheme,

    load: async ({ store }) => {
      store.clear();
      const platforms = await parsePlatforms(options.rootDir);
      platforms.forEach((platform) =>
        store.set({ id: platform.name, data: platform }),
      );
    },
  };
}

interface PlatformLoaderOptions {
  rootDir: string;
}

const platformScheme = z.object({
  name: z.string(),
  color: z.string(),
  icon: z.string(),
});

type Platform = z.infer<typeof platformScheme>;

async function parsePlatforms(rootDir: string): Promise<Platform[]> {
    const platformIndexPath = path.resolve(rootDir, "./index.json");
    const indexContents = await readFile(platformIndexPath, { encoding: "utf-8" });
    const parsedIndex = z.array(
        z.object({
            name: z.string(),
            color: z.string(),
            icon: z.string().optional(),
        }),
    ).parse(JSON.parse(indexContents));
    const iconsDir = path.join(rootDir, "./icons");
    const platforms = parsedIndex.map((platform) => {
        platform.icon = platform.icon ?? `${platform.name}.svg`;
        platform.icon = path.join(iconsDir, platform.icon!);
        return platform as Platform;
    });
    return platforms;
}
