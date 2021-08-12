// Generate an picture tag with image src URLs which use Neltify image transforms

module.exports = (ImageName, ImageAlt) => {
  return `<picture>
            <source srcset="/assets/img/${ImageName}.svg" type="image/svg+xml">

            <img src="/assets/img/${ImageName}.svg" alt="${ImageAlt}" />
          </picture>`;
};
