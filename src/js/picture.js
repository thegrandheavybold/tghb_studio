// Generate an picture tag with image src URLs which use Neltify image transforms

module.exports = (ImageName, ImageAlt) => {
  return `<picture>
            <source srcset="/assets/img/${ImageName}?nf_resize=fit&w=700" media="(min-width: 1200px)">
            <source srcset="/assets/img/${ImageName}?nf_resize=fit&w=600" media="(min-width: 740px)">
            <img src="/assets/img/${ImageName}?nf_resize=fit&w=500" alt="${ImageAlt}" />
          </picture>`;
};
