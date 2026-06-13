import type { ImageMetadata } from "astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

import path from "path";

const contentModules = import.meta.glob(
  "/content/**/*.{png,jpg,jpeg,svg,gif,webp}",
  {
    eager: true,
  },
) as Record<string, any>;

export default function loadContentImage(absImagePath: string): ContentImage {
  const relPath = path
    .relative(process.cwd(), absImagePath)
    .replace(/\\/g, "/");
  const key = absImagePath.startsWith("/") ? absImagePath : `/${absImagePath}`;
  const mod = contentModules[key];
  if (!mod) throw Error(`Cannot find content image ${absImagePath}`);

  const resolvedImage: ImageMetadata | AstroComponentFactory =
    "default" in mod ? mod.default : mod;
  const isSvg = absImagePath.endsWith(".svg");
  
  return new ContentImage(
    isSvg ? "svg" : "raster",
    isSvg ? undefined : resolvedImage as ImageMetadata,
    isSvg ? resolvedImage as AstroComponentFactory : undefined,
  );
}

export class ContentImage {
  constructor(
    public type: "svg" | "raster",
    private metadata?: ImageMetadata,
    private svgIcon?: AstroComponentFactory,
  ) {
    if (type === "svg" && !svgIcon) {
      throw new Error("SVG content images require an AstroComponentFactory");
    }
    if (type === "raster" && !metadata) {
      throw new Error("Raster content images require ImageMetadata");
    }
  }

  get rasterMetadata() {
    if (this.type !== "raster") {
      throw new Error("Not a raster image");
    }
    return this.metadata!;
  }

  get svgComponent() {
    if (this.type !== "svg") {
      throw new Error("Not an SVG image");
    }
    return this.svgIcon!;
  }
}
