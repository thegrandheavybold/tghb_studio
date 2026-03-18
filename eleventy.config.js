import moment from "moment";
import MarkdownIt from "markdown-it";

import picture from "./src/_shortcodes/picture.js";
import lazyPicture from "./src/_shortcodes/lazyPicture.js";
import lazySwiper from "./src/_shortcodes/lazySwiper.js";
import { getImageSourceDimensions } from "./src/_shortcodes/imageMeta.js";

import { EleventyI18nPlugin } from "@11ty/eleventy";

import fs from "fs"

export default function (eleventyConfig) {
  const md = new MarkdownIt({
    html: false,
    breaks: true,
    linkify: true
  });
  // PassthroughCopy
  eleventyConfig.addPassthroughCopy("./src/assets/img");
  eleventyConfig.addPassthroughCopy("./src/assets/fav");
  eleventyConfig.addPassthroughCopy("./src/assets/pdf");
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy("./src/_headers");
  if (fs.existsSync("./src/_redirects")) {
    eleventyConfig.addPassthroughCopy("./src/_redirects");
  }

  // Shortcodes
  eleventyConfig.addShortcode("picture", picture);
  eleventyConfig.addShortcode("lazypicture", lazyPicture);
  eleventyConfig.addShortcode("lazyswiper", lazySwiper);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Date filter (localized)
  eleventyConfig.addNunjucksFilter("date", (date, format, locale = "en") => {
    moment.locale(locale);
    return moment(date).format(format);
  });

  // Collections
  eleventyConfig.addCollection("projects_de", collection =>
    collection
      .getFilteredByGlob("./src/project/de/*.njk")
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  )

  eleventyConfig.addCollection("projects_en", collection =>
    collection
      .getFilteredByGlob("./src/project/en/*.njk")
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  )


  //NeverNotCooking 
  eleventyConfig.addCollection("nevernotcooking_en", (collection) => {
    return collection
      .getFilteredByGlob("src/nevernotcooking/en/items/**/*.{md,njk}")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("nevernotcooking_de", (collection) => {
    return collection
      .getFilteredByGlob("src/nevernotcooking/de/items/**/*.{md,njk}")
      .sort((a, b) => b.date - a.date);
  });


  // i18n
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
		defaultLanguage: "en",

		// Rename the default universal filter names
		filters: {
			// transform a URL with the current page’s locale code
			url: "locale_url",

			// find the other localized content for a specific input file
			links: "locale_links"
		},

		// When to throw errors for missing localized content files
		errorMode: "strict"

	});

  //Nav Filter
  eleventyConfig.addFilter("nav_url", function (slug, locale) {
    const path = `/${slug}/`;

    if (locale === "de") {
      return `/de${path}`;
    }

    return path;
  });
  

  // Next Project Filter
  eleventyConfig.addFilter("nextItem", (items, currentPage) => {
  if (!Array.isArray(items) || !currentPage?.url) return null

  const index = items.findIndex(item => item.url === currentPage.url)
  if (index === -1) return null

  return items[(index + 1) % items.length]
  })

  eleventyConfig.addFilter("imageMeta", imageName =>
    getImageSourceDimensions(imageName)
  )

  eleventyConfig.addFilter("markdown", (value = "") => {
    if (!value) return "";
    return md.render(String(value));
  });


  // Dev Mode Detection
  eleventyConfig.addGlobalData("isDev", process.env.NODE_ENV !== "production")
  eleventyConfig.addGlobalData("isServeMode", process.argv.includes("--serve"))

  // Vite 
  eleventyConfig.addGlobalData("vite", () => {
    try {
      return JSON.parse(
        fs.readFileSync(".vite-build/.vite/manifest.json", "utf8")
      )
    } catch (e) {
      return {}
    }
  })

  //Config object.
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    }
  };

}
