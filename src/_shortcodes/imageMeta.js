import fs from "fs";
import path from "path";
import { imageSize } from "image-size";

const imageMetaCache = new Map();
const warnedFiles = new Set();
const imageRoot = path.join(process.cwd(), "src/assets/img");

function getFallbackSize(imageName) {
  const isPortrait = /_p\./i.test(imageName);
  return isPortrait
    ? { width: 900, height: 1200 }
    : { width: 1200, height: 900 };
}

function readImageMeta(imageName) {
  const resolvedImageName = resolveImageName(imageName);

  if (imageMetaCache.has(resolvedImageName)) {
    return imageMetaCache.get(resolvedImageName);
  }

  const filePath = path.join(imageRoot, resolvedImageName);
  let meta;

  try {
    const buffer = fs.readFileSync(filePath);
    const dimensions = imageSize(buffer);

    if (!dimensions?.width || !dimensions?.height) {
      throw new Error("Missing width/height in image metadata");
    }

    meta = {
      width: dimensions.width,
      height: dimensions.height
    };
  } catch (error) {
    if (!warnedFiles.has(resolvedImageName)) {
      warnedFiles.add(resolvedImageName);
      console.warn(
        `[image-meta] Falling back for "${resolvedImageName}" (${error.message})`
      );
    }
    meta = getFallbackSize(resolvedImageName);
  }

  const result = {
    ...meta,
    resolvedImageName
  };

  imageMetaCache.set(resolvedImageName, result);
  return result;
}

function resolveImageName(imageName) {
  const directPath = path.join(imageRoot, imageName);
  if (fs.existsSync(directPath)) return imageName;

  const match = imageName.match(/^(.*?)(\.[a-zA-Z0-9]+)$/);
  if (!match) return imageName;

  const [, rawStem, rawExt] = match;
  const exts = [rawExt, ".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];

  const stemVariants = new Set([rawStem]);

  if (rawStem.startsWith("tghb_studio__")) {
    stemVariants.add(rawStem.replace(/^tghb_studio__/, "tghb.studio__"));
  }
  if (rawStem.startsWith("tghb.studio__")) {
    stemVariants.add(rawStem.replace(/^tghb\.studio__/, "tghb_studio__"));
  }

  const suffixVariants = rawStem.match(/_(l|p)$/i) ? [""] : ["", "_l", "_p"];

  for (const stem of stemVariants) {
    for (const suffix of suffixVariants) {
      for (const ext of exts) {
        const candidate = `${stem}${suffix}${ext}`;
        if (fs.existsSync(path.join(imageRoot, candidate))) {
          return candidate;
        }
      }
    }
  }

  return imageName;
}

function getBaseWidth(widths, defaultWidth) {
  if (Array.isArray(widths) && widths.length > 1) return widths[1];
  if (Array.isArray(widths) && widths.length === 1) return widths[0];
  return defaultWidth;
}

export function getImageRenderDimensions(imageName, widths, defaultWidth) {
  const {
    width: sourceWidth,
    height: sourceHeight,
    resolvedImageName
  } = readImageMeta(imageName);
  const baseWidth = getBaseWidth(widths, defaultWidth);
  const ratio = sourceHeight / sourceWidth;
  const renderHeight = Math.max(1, Math.round(baseWidth * ratio));

  return {
    sourceWidth,
    sourceHeight,
    resolvedImageName,
    baseWidth,
    baseHeight: renderHeight
  };
}

export function getImageSourceDimensions(imageName) {
  if (!imageName) return null;

  const {
    width,
    height,
    resolvedImageName
  } = readImageMeta(imageName);

  return {
    width,
    height,
    resolvedImageName
  };
}
