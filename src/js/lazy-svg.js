// Generate an picture tag with image src URLs which use Neltify image transforms

module.exports = (ImageName, ImageAlt) => {
  return `<picture class="lazy lazy-initial>
            <img src="/assets/img/${ImageName}.svg" alt="${ImageAlt}" />
          </picture>`;
};
