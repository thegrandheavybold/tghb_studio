export default function () {
  return {
    locale: "en",
    lang: "en",
    layout: "layouts/base.njk",

    permalink: (data) => {
      if (data.page.fileSlug === "index") {
        return "/index.html";
      }

      return `/${data.page.fileSlug}/index.html`;
    }
  };
}
