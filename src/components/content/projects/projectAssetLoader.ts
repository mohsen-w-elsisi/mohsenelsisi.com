import type { ImageMetadata } from "astro";

import { readdir } from "fs/promises";
import path from "path";

const projectDir = path.resolve(process.cwd(), "./projects");
import { readFile } from "fs/promises";
const imagesDir = path.resolve(projectDir, "./images");
const toolIconsDir = path.resolve(projectDir, "./tool-icons");
const platformsDir = path.resolve(projectDir, "./platforms");

const projectImageDir = (id: string) => path.resolve(imagesDir, `./${id}`);

const projectIconName = "icon.svg";

// Eagerly import all project images so Vite includes them in the build output.
const projectImageModules = import.meta.glob(
  "/projects/images/**",
  { eager: true },
) as Record<string, any>;

const toolImageModules = import.meta.glob(
  "/projects/tool-icons/**",
  { eager: true },
) as Record<string, any>;

const platformSvgModules = import.meta.glob(
  "/projects/platforms/**",
  { eager: true },
) as Record<string, any>;

const toolSvgModules = import.meta.glob(
  "/projects/tool-icons/**",
  { eager: true },
) as Record<string, any>;

const toolIconsIndex = JSON.parse(
  await readFile(path.resolve(toolIconsDir, "./index.json"), {
    encoding: "utf-8",
  }),
) as {
  [key: string]: string;
};

const platformIndex = JSON.parse(
  await readFile(path.resolve(platformsDir, "./index.json"), {
    encoding: "utf-8",
  }),
) as {
  name: string;
  color: string;
}[];

async function loadImageFromPath(imaePath: string) {
  const rel = path.relative(process.cwd(), imaePath).replace(/\\/g, "/");
  const key = "/" + rel;
  const mod = projectImageModules[key] ?? toolImageModules[key];
  if (mod) return mod.default ?? mod;

  throw new Error(`Image not found at path: ${imaePath}`);
}

async function loadSvgFromPath(svgPath: string) {
  const rel = path.relative(process.cwd(), svgPath).replace(/\\/g, "/");
  const key = "/" + rel;
  const fromPlatforms = platformSvgModules[key];
  if (fromPlatforms) return fromPlatforms.default ?? fromPlatforms;
  const fromTools = toolSvgModules[key];
  if (fromTools) return fromTools.default ?? fromTools;

  throw new Error(`Image not found at path: ${svgPath}`);
}

export async function loadProjectIcon(projectId: string) {
  const iconPath = path.resolve(projectImageDir(projectId), projectIconName);
  try {
    const image = await loadSvgFromPath(iconPath);
    return image;
  } catch (e) {
    return null;
  }
}

export function loadToolIcon(toolName: string) {
  const iconPath = path.resolve(toolIconsDir, `./${toolIconsIndex[toolName]}`);
  const image = loadImageFromPath(iconPath);
  return image;
}

export function loadToolIcons(toolNames: string[]) {
  return toolNames.map(loadToolIcon);
}

export async function loadPlatformData(platform: string) {
  const platformData = platformIndex.find((p) => p.name === platform);
  if (!platformData) throw new Error(`Platform ${platform} not found`);
  const platformIconPath = path.resolve(
    platformsDir,
    `./${platformData.name}.svg`,
  );
  const Icon = await loadSvgFromPath(platformIconPath);
  return { ...platformData, Icon };
}
