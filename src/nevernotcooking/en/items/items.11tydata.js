function inferLocale(inputPath) {
  if (inputPath.includes("/items/de/")) {
    return "de";
  }

  if (inputPath.includes("/items/en/")) {
    return "en";
  }

  return "en";
}

function normalizeHashtags(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item : ""))
      .map((item) => item.replace(/^#+/, "").trim())
      .filter(Boolean);
  }

  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(/[\n,]+/)
    .map((item) => item.replace(/^#+/, "").trim())
    .filter(Boolean);
}

export default {
  eleventyComputed: {
    locale: data => inferLocale(data.page.inputPath),
    lang: data => inferLocale(data.page.inputPath),
    tags: data => `nevernotcooking_${inferLocale(data.page.inputPath)}`,
    hashtags: data => normalizeHashtags(data.hashtags),
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
