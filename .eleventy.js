module.exports = function(eleventyConfig) {

  const moment = require("moment");

  eleventyConfig.addPassthroughCopy("src/js/main-min.js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/style.css");

  // A responsive image helper using Netlify Large Media - image transformation
  eleventyConfig.addShortcode("picture", require("src/js/picture.js"));
  // A lazy loading image helper using Netlify Large Media - image transformation
  eleventyConfig.addShortcode("lazypicture", require("src/js/lazy-picture.js"));

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
