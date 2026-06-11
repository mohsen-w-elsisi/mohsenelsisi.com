import type { Loader } from "astro/loaders";
import { readFile, readdir } from "fs/promises";
import { parse as parseYaml } from "yaml";
import { join } from "path";
import { z } from "astro/zod";

export default function projectLoader(options: ProjectLoaderOptions): Loader {
  return {
    name: "project-loader",
    schema: projectSchema,

    load: async ({ store, renderMarkdown }) => {
      store.clear();

      const projectFolders = await readdir(options.rootDir);

      for (const folder of projectFolders) {
        const folderPath = join(options.rootDir, folder);
        const filePaths = getFilePaths(folderPath);

        store.set({
          id: folder,
          data: {
            ...parseYaml(await readFile(filePaths.info, "utf-8")),
            resume: await readFile(filePaths.resume, "utf-8"),
            thumbnail: await getThumbnailImage(filePaths.images),
            showcaseImages: await getShowcaseImages(filePaths.images),
            icon: (await projectHasIcon(folderPath))
              ? join(filePaths.images, "icon.svg")
              : undefined,
          },
          rendered: await renderMarkdown(
            await readFile(filePaths.details, "utf-8"),
          ),
        });
      }
    },
  };
}

interface ProjectLoaderOptions {
  rootDir: string;
}

const projectSchema = z.object({
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
  resume: z.string(),
  icon: z.string().optional(),
  thumbnail: z.string(),
  showcaseImages: z.array(z.string()),
});

function getFilePaths(folderPath: string) {
  return {
    info: join(folderPath, "info.yaml"),
    details: join(folderPath, "details.md"),
    resume: join(folderPath, "resume.md"),
    images: join(folderPath, "images"),
  };
}

async function getThumbnailImage(imagesDir: string) {
  const allImages = await readdir(imagesDir);
  const thumbnail = allImages.find((file) => file.startsWith("thumbnail"));
  if (!thumbnail) {
    throw new Error(`No thumbnail image found in ${imagesDir}`);
  }
  return join(imagesDir, thumbnail);
}

async function getShowcaseImages(imagesDir: string) {
  return (await readdir(imagesDir))
    .filter((file) => !file.startsWith("icon"))
    .toSorted((left, right) => {
      if (left.startsWith("thumbnail")) return -1;
      if (right.startsWith("thumbnail")) return 1;
      const leftNum = parseInt(left.split(".")[0]);
      const rightNum = parseInt(right.split(".")[0]);
      return leftNum - rightNum;
    })
    .map((file) => join(imagesDir, file));
}

async function projectHasIcon(projectDir: string) {
  try {
    await readFile(join(projectDir, "images", "icon.svg"));
    return true;
  } catch {
    return false;
  }
}
