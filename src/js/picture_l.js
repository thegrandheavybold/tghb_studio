// Generate an picture tag with image src URLs which use Neltify image transforms

module.exports = (ImageName, ImageAlt) => {
  return `<picture>
            <source srcset="/assets/img/${ImageName}.webp" type="image/webp">

            <source srcset="/assets/img/${ImageName}.jpg?nf_resize=fit&w=1024" type="image/jpeg" media="(max-width: 1024px)">
            <source srcset="/assets/img/${ImageName}.jpg?nf_resize=fit&w=768" type="image/jpeg" media="(max-width: 768px)">
            <source srcset="/assets/img/${ImageName}.jpg?nf_resize=fit&w=480" type="image/jpeg" media="(max-width: 480px)">

            <img src="/assets/img/${ImageName}.jpg" alt="${ImageAlt}" />
          </picture>`;
};
