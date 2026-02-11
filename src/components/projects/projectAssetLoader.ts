import type { ImageMetadata } from "astro";
import type { SvgComponent } from "astro/types";
import { readdir } from "fs/promises";
import path from "path";

const projectDir = path.resolve(process.cwd(), "./projects");
const imagesDir = path.resolve(projectDir, "./images");
const toolIconsDir = path.resolve(projectDir, "./tool-icons");
const platformsDir = path.resolve(projectDir, "./platforms");

const projectImageDir = (id: string) => path.resolve(imagesDir, `./${id}`);

const toolIconsIndex = (await import(
  path.resolve(toolIconsDir, "./index.json")
)) as {
  [key: string]: string;
};

const platformIndex = (await import(path.resolve(platformsDir, "./index.json")))
  .default as {
  name: string;
  color: string;
}[];

async function loadImageFromPath(imaePath: string) {
  const imageImport = await (import(imaePath) as Promise<{
    default: ImageMetadata;
  }>);
  return imageImport.default;
}

async function loadSvgFromPath(svgPath: string) {
  const svgImport = await (import(svgPath) as Promise<{
    default: SvgComponent & ImageMetadata;
  }>);
  return svgImport.default;
}

export function loadPreviewImage(projectId: string) {
  const previewImagePath = path.resolve(projectImageDir(projectId), "./0.png");
  const image = loadImageFromPath(previewImagePath);
  return image;
}

export async function loadShowcaseImages(projectId: String) {
  const shocaseImageDir = projectImageDir(projectId);
  const getfullImagePath = (imageName: string) => {
    return path.resolve(shocaseImageDir, `${imageName}`);
  };
  return await Promise.all(
    (await readdir(shocaseImageDir))
      .map(getfullImagePath)
      .map(loadImageFromPath),
  );
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
