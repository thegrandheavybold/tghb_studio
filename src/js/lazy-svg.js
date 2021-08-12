// Generate an picture tag with image src URLs which use Neltify image transforms

module.exports = (ImageName, ImageAlt) => {
  return `<picture class="lazy lazy-initial>
            <img src="/assets/img/tiny/${ImageName}.svg" alt="${ImageAlt}" />
          </picture>`;
};
