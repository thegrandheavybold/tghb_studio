// Generate an picture tag with image src URLs which use Neltify image transforms

module.exports = (ImageName, ImageAlt) => {
  return `<picture>
            <source srcset="/assets/img/${ImageName}?nf_resize=fit&w=1200" media="(min-width: 1200px)">
            <source srcset="/assets/img/${ImageName}?nf_resize=fit&w=800" media="(min-width: 768px)">
            <img src="/assets/img/${ImageName}?nf_resize=fit&w=700" alt="${ImageAlt}" />
          </picture>`;
};
