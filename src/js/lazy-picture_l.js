// Generate an picture tag with image src URLs which use Neltify image transforms

module.exports = (ImageName, ImageAlt) => {
  return `<picture class="lazy lazy-initial">
            <source srcset="/assets/img/${ImageName}.webp" type="image/webp" media="(min-width: 1025px)">
            <source srcset="/assets/img/${ImageName}.webp?nf_resize=fit&w=1024" type="image/webp" media="(min-width: 769px)">
            <source srcset="/assets/img/${ImageName}.webp?nf_resize=fit&w=768" type="image/webp" media="(min-width: 481px)">

            <source srcset="/assets/img/${ImageName}.jpg" type="image/jpeg" media="(min-width: 1025px)">
            <source srcset="/assets/img/${ImageName}.jpg?nf_resize=fit&w=1024" type="image/jpeg" media="(min-width: 769px)">
            <source srcset="/assets/img/${ImageName}.jpg?nf_resize=fit&w=768" type="image/jpeg" media="(min-width: 481px)">

            <source srcset="/assets/img/${ImageName}.svg" type="image/svg+xml"
            
            <img src="/assets/img/${ImageName}.jpg?nf_resize=fit&w=480" alt="${ImageAlt}" />
          </picture>`;
};
