module.exports = function(eleventyConfig) {

  const moment = require("moment");

  eleventyConfig.addPassthroughCopy("src/js/main.js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/style.css");

  // Universl Shortcode -- Responsive Images
  eleventyConfig.addShortcode("lazypicture", function(ImageName, ImageAlt){
    return `<picture class="lazy lazy_initial">
              <source srcset="/assets/img/tiny/${ImageName}" media="(min-width: 1200px)">
              <source srcset="/assets/img/tiny/${ImageName}" media="(min-width: 740px)">
              <img src="/assets/img/tiny/${ImageName}" alt="${ImageAlt}" />
            </picture>`;
  });

  // date filter (localized)
  eleventyConfig.addNunjucksFilter("date", function (date, format, locale) {
    locale = locale ? locale : "en";
    moment.locale(locale);
    return moment(date).format(format);
  });

  //©copyrights year output
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  //Post Collections
  module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("posts_de", function (collection) {
    return collection.getFilteredByGlob("./src/en/posts/*.njk");
  });
  };

  module.exports = function (eleventyConfig) {
    eleventyConfig.addCollection("posts_en", function (collection) {
      return collection.getFilteredByGlob("./src/en/posts/*.njk");
    });
  };



  // You can return your Config object (optional).
  return {
    dir: {
      input: "src",
      output: "dist",
      data: "_data"
    }
  };

};
