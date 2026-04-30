import { gsap } from "../core/gsapSetup.js";

const COPY = {
  de: {
    eyebrow: "404 / Seite nicht gefunden",
    title: "Seite nicht gefunden.",
    body: "Die gesuchte Seite ist nicht mehr verfügbar. Nutze die Links unten, um weiterzumachen.",
    projectsLabel: "Projekte",
    studioLabel: "Studio"
  },
  en: {
    eyebrow: "404 / Page not found",
    title: "Page not found.",
    body: "The page you were looking for is no longer here. Use the links below to continue.",
    projectsLabel: "Projects",
    studioLabel: "Studio"
  }
};

const LINK_TARGETS = {
  de: {
    projects: "/de/projects/",
    studio: "/de/studio/"
  },
  en: {
    projects: "/projects/",
    studio: "/studio/"
  }
};

function detectLocale() {
  const { pathname } = window.location;

  if (pathname.startsWith("/de/")) return "de";
  if (pathname.startsWith("/en/")) return "en";

  return navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
}

function parseImages() {
  const source = document.getElementById("error404-images");
  if (!source) return [];

  try {
    const images = JSON.parse(source.textContent || "[]");
    return Array.isArray(images) ? images : [];
  } catch {
    return [];
  }
}

function localize404(locale) {
  const copy = COPY[locale] || COPY.en;
  const links = LINK_TARGETS[locale] || LINK_TARGETS.en;

  document.documentElement.lang = locale;

  Object.entries(copy).forEach(([key, value]) => {
    document.querySelectorAll(`[data-error-copy="${key}"]`).forEach((node) => {
      node.textContent = value;
    });
  });

  Object.entries(links).forEach(([key, value]) => {
    document.querySelectorAll(`[data-error-link="${key}"]`).forEach((node) => {
      node.setAttribute("href", value);
    });
  });
}

function isSplitAsset(asset) {
  return !!(asset && typeof asset === "object" && Array.isArray(asset.split) && asset.split.length === 2);
}

function createLayerNode() {
  const node = document.createElement("div");
  node.className = "error404__trail-image";

  const left = document.createElement("span");
  left.className = "error404__trail-pane error404__trail-pane--left";

  const right = document.createElement("span");
  right.className = "error404__trail-pane error404__trail-pane--right";

  node.append(left, right);
  return node;
}

function applyAsset(node, asset) {
  const [leftPane, rightPane] = node.children;
  const split = isSplitAsset(asset);

  node.classList.toggle("error404__trail-image--split", split);

  if (split) {
    node.style.backgroundImage = "none";
    leftPane.style.backgroundImage = `url("${asset.split[0]}")`;
    rightPane.style.backgroundImage = `url("${asset.split[1]}")`;
    return;
  }

  node.style.backgroundImage = `url("${asset}")`;
  leftPane.style.backgroundImage = "none";
  rightPane.style.backgroundImage = "none";
}

function mountBaseImage(stage, asset) {
  const base = createLayerNode();
  base.classList.add("error404__trail-image--base");
  applyAsset(base, asset);
  stage.appendChild(base);
}

function initPointerTrail(root, images) {
  const stage = root.querySelector(".error404__trail-stage");
  if (!stage || !images.length) return;

  mountBaseImage(stage, images[0]);

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsHover = window.matchMedia("(hover: hover)").matches;

  if (prefersReducedMotion || !supportsHover) {
    root.classList.add("is-static");
    return;
  }

  const pool = Array.from({ length: Math.min(images.length, 10) }, () => {
    const node = createLayerNode();
    stage.appendChild(node);
    return node;
  });

  root.classList.add("is-enhanced");

  let assetIndex = 1;
  let layerIndex = 0;
  let zIndex = 2;
  let lastX = window.innerWidth * 0.5;
  let lastY = window.innerHeight * 0.5;

  const reveal = (clientX) => {
    const node = pool[layerIndex % pool.length];
    const asset = images[assetIndex % images.length];
    const direction = clientX >= lastX ? 1 : -1;

    applyAsset(node, asset);

    gsap.killTweensOf(node);
    gsap.set(node, {
      autoAlpha: 0,
      xPercent: direction * 9,
      scale: 1.035,
      filter: "saturate(1.05) contrast(1.04) brightness(0.96)",
      zIndex: zIndex++
    });

    gsap.timeline()
      .to(node, {
        autoAlpha: 0.9,
        xPercent: 0,
        scale: 1,
        duration: 0.34,
        ease: "power2.out"
      })
      .to(node, {
        autoAlpha: 0,
        duration: 0.22,
        ease: "power1.out"
      }, 0.28);

    assetIndex += 1;
    layerIndex += 1;
  };

  window.addEventListener("pointermove", (event) => {
    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;

    if ((deltaX * deltaX) + (deltaY * deltaY) < 4900) {
      return;
    }

    reveal(event.clientX);
    lastX = event.clientX;
    lastY = event.clientY;
  });

  window.addEventListener("pointerleave", () => {
    pool.forEach((node) => {
      gsap.killTweensOf(node);
      gsap.to(node, {
        autoAlpha: 0,
        duration: 0.14,
        ease: "power1.out"
      });
    });
  });
}

export function initError404Trail() {
  const root = document.querySelector("[data-error-trail]");
  if (!root) return;

  const locale = detectLocale();
  const images = parseImages();

  localize404(locale);
  initPointerTrail(root, images);
}
