import type { ImageMetadata } from "astro";
import path from "path";

const projectDir = path.resolve(process.cwd(), "./projects");
const previewImageDir = path.resolve(projectDir, "./images");
const toolIconsDir = path.resolve(projectDir, "./tool-icons");

const toolIconsIndex = (await import(
  path.resolve(toolIconsDir, "./index.json")
)) as {
  [key: string]: string;
};

export function loadPreviewImage(projectId: String) {
  const previewImagePath = path.resolve(
    previewImageDir,
    `./${projectId}/0.png`,
  );
  const image = import(previewImagePath) as Promise<{
    default: ImageMetadata;
  }>;
  return image;
}

export function loadToolIcon(toolName: string) {
  const iconPath = path.resolve(toolIconsDir, `./${toolIconsIndex[toolName]}`);
  const image = import(iconPath) as Promise<{
    default: ImageMetadata;
  }>;
  return image;
}

export function loadToolIcons(toolNames: string[]) {
  return toolNames.map(loadToolIcon);
}
