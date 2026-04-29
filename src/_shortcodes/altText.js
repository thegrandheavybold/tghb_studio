const BRAND_NAME = "TheGrandHeavyBold";
const BRAND_PATTERN = /\b(?:thegrandheavybold|tghb(?:\.studio)?|tghb studio)\b/i;
const PLACEHOLDER_PATTERN = /^placeholder$/i;

function normalizeText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim();
}

export function withBrandContext(value, { fallback = BRAND_NAME } = {}) {
  const alt = normalizeText(value);

  if (!alt) {
    return fallback;
  }

  if (PLACEHOLDER_PATTERN.test(alt) || BRAND_PATTERN.test(alt)) {
    return alt;
  }

  return `${alt} · ${BRAND_NAME}`;
}

export function withNncBrandContext(value, title) {
  const alt = normalizeText(value);

  if (alt) {
    return withBrandContext(alt);
  }

  const normalizedTitle = normalizeText(title);
  const fallback = normalizedTitle
    ? `${normalizedTitle} – NeverNotCooking`
    : "NeverNotCooking";

  return withBrandContext(fallback);
}
