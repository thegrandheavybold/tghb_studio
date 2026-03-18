import { getImageRenderDimensions } from "./imageMeta.js";

export default function picture(imageName, imageAlt) {

  const widths = [400, 800, 1200];
  const { baseWidth, baseHeight, resolvedImageName } = getImageRenderDimensions(
    imageName,
    widths,
    800
  );

  const srcsetAvif = widths
    .map(w => `/.netlify/images?url=/assets/img/${resolvedImageName}&w=${w}&fm=avif ${w}w`)
    .join(", ");

  const srcsetWebp = widths
    .map(w => `/.netlify/images?url=/assets/img/${resolvedImageName}&w=${w}&fm=webp ${w}w`)
    .join(", ");

  const srcsetDefault = widths
    .map(w => `/.netlify/images?url=/assets/img/${resolvedImageName}&w=${w} ${w}w`)
    .join(", ");

  return `
<picture>
  <source type="image/avif" srcset="${srcsetAvif}" sizes="100vw">
  <source type="image/webp" srcset="${srcsetWebp}" sizes="100vw">
  <img
    src="/.netlify/images?url=/assets/img/${resolvedImageName}&w=${baseWidth}"
    srcset="${srcsetDefault}"
    sizes="100vw"
    alt="${imageAlt}"
    loading="lazy"
    decoding="async"
    width="${baseWidth}"
    height="${baseHeight}"
    style="aspect-ratio:${baseWidth}/${baseHeight}; width:100%; height:auto;"
  />
</picture>`;
}
