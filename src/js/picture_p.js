// Generate an picture tag with image src URLs which use Neltify image transforms

module.exports = (ImageName, ImageAlt) => {
  return `<picture>
            <source srcset="/assets/img/${ImageName}.webp" type="image/webp">

            <source srcset="/assets/img/${ImageName}.jpg" type="image/jpeg" media="(min-width: 1025px)">
            <source srcset="/assets/img/${ImageName}.jpg?nf_resize=fit&w=480" type="image/jpeg" media="(max-width: 1024px)">
            <source srcset="/assets/img/${ImageName}.jpg?nf_resize=fit&w=768" type="image/jpeg" media="(min-width: 481px) and (max-width: 768px)">

            <img src="/assets/img/${ImageName}.jpg?nf_resize=fit&w=480" alt="${ImageAlt}" />
          </picture>`;
};
