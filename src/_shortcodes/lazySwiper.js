import { getImageRenderDimensions } from "./imageMeta.js";
import { withBrandContext } from "./altText.js";

export default function lazySwiper(
  imageName,
  imageAlt,
  {
    isFirst = false,
    widths = [800, 1200, 1600],
    sizes = "100vw",
    width,
    height
  } = {}
) {
  const finalAlt = withBrandContext(imageAlt);

  const loading = isFirst ? "eager" : "lazy";
  const fetchpriority = isFirst ? 'fetchpriority="high"' : "";
  const { baseWidth, sourceWidth, sourceHeight, resolvedImageName } =
    getImageRenderDimensions(imageName, widths, 1200);

  const finalWidth = width || baseWidth;
  const finalHeight = height
    || Math.max(1, Math.round(finalWidth * (sourceHeight / sourceWidth)));

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
    loading="${loading}"
    decoding="async"
    width="${finalWidth}"
    height="${finalHeight}"
    style="aspect-ratio:${finalWidth}/${finalHeight}; width:100%; height:auto;"
    ${fetchpriority}
  />
</picture>`;
}
