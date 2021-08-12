// Generate an picture tag with image src URLs which use Neltify image transforms

module.exports = (ImageName, ImageAlt) => {
  return `<picture class="lazy lazy-initial>
            <source srcset="/assets/img/tiny/${ImageName}.svg" type="image/svg+xml">

            <img src="/assets/img/tiny/${ImageName}.svg" alt="${ImageAlt}" />
          </picture>`;
};
