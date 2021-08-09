// Generate an picture tag with image src URLs which use Neltify image transforms

module.exports = (ImageName, ImageAlt) => {
  return `<picture class="lazy lazy_initial">
            <source srcset="/assets/img/tiny/${ImageName}" media="(min-width: 1200px)">
            <source srcset="/assets/img/tiny/${ImageName}" media="(min-width: 740px)">
            <img src="/assets/img/tiny/${ImageName}" alt="${ImageAlt}" />
          </picture>`;
};
