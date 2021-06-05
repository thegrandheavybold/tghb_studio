module.exports = function(eleventyConfig) {


  //seleventyConfig.setTemplateFormats("html,njk");


  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  //eleventyConfig.addPassthroughCopy("src/img");


  // You can return your Config object (optional).
  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };


  // date filter (localized)
  eleventyConfig.addNunjucksFilter("date", function (date, format, locale) {
    locale = locale ? locale : "en";
    moment.locale(locale);
    return moment(date).format(format);
  });




};
