function inferLocale(inputPath) {
  if (inputPath.includes("/items/en/")) {
    return "en";
  }

  if (inputPath.includes("/items/de/")) {
    return "de";
  }

  return "de";
}

export default {
  eleventyComputed: {
    locale: data => inferLocale(data.page.inputPath),
    lang: data => inferLocale(data.page.inputPath),
    tags: data => `nevernotcooking_${inferLocale(data.page.inputPath)}`,
    layout: "layouts/nnc-item.njk",
    permalink: data => {
      const locale = inferLocale(data.page.inputPath);
      const slug = data.page.fileSlug;

      return locale === "de"
        ? `/de/nevernotcooking/${slug}/`
        : `/nevernotcooking/${slug}/`;
    }
  }
};
