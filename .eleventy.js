module.exports = function(eleventyConfig) {

  eleventyConfig.setTemplateFormats("html,njk");


  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/img");


  // You can return your Config object (optional).
  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
