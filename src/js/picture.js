// Generate an picture tag with image src URLs which use Neltify image transforms

module.exports = (ImageName, ImageAlt) => {
  return `<picture>
            <source srcset="/assets/img/${ImageName}" type="image" media="(min-width: 1025px)">
            <source srcset="/assets/img/${ImageName}?nf_resize=fit&w=1024" type="image" media="(min-width: 769px)">
            <source srcset="/assets/img/${ImageName}?nf_resize=fit&w=768" type="image" media="(min-width: 481px)">

            <img src="/assets/img/${ImageName}?nf_resize=fit&w=480" alt="${ImageAlt}" />
          </picture>`;
};
