import { getImageRenderDimensions } from "./imageMeta.js";
import { withBrandContext } from "./altText.js";

export default function lazyPicture(
  imageName,
  imageAlt,
  {
    widths = [400, 800, 1200],
    sizes = "100vw",
    priority = false
  } = {}
) {
  const finalAlt = withBrandContext(imageAlt);

  const loading = priority ? "eager" : "lazy";
  const fetchpriority = priority ? 'fetchpriority="high"' : "";
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
  <source type="image/avif" srcset="${srcsetAvif}" sizes="${sizes}">
  <source type="image/webp" srcset="${srcsetWebp}" sizes="${sizes}">
  <img
    src="/.netlify/images?url=/assets/img/${resolvedImageName}&w=${baseWidth}"
    srcset="${srcsetDefault}"
    sizes="${sizes}"
    alt="${finalAlt}"
    width="${baseWidth}"
    height="${baseHeight}"
    loading="${loading}"
    decoding="async"
    style="aspect-ratio:${baseWidth}/${baseHeight}; width:100%; height:auto;"
    ${fetchpriority}
  />
</picture>`;
}
