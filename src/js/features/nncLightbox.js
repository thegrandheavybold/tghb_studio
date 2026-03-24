export function initNncLightbox() {
  const lb = document.getElementById("nncLightbox");
  const items = Array.isArray(window.NNC_ITEMS) ? window.NNC_ITEMS : null;
  if (!lb || !items || !items.length) return;

  const mediaContainer = lb.querySelector(".nnc-lightbox__media");
  const titleEl = lb.querySelector(".nnc-lightbox__title");
  const descEl = lb.querySelector(".nnc-lightbox__description");
  const tagsEl = lb.querySelector(".nnc-lightbox__tags");
  const closeBtn = lb.querySelector(".nnc-lightbox__close");
  const prevBtn = lb.querySelector(".nnc-lightbox__prev");
  const nextBtn = lb.querySelector(".nnc-lightbox__next");
  const galleryUrl = lb.dataset.galleryUrl || "/nevernotcooking/";

  if (!mediaContainer || !titleEl || !descEl || !tagsEl || !closeBtn) return;

  let currentItemIndex = null;
  let currentMediaIndex = 0;

  const normalizeAssetValue = (value, folder) => {
    if (!value || typeof value !== "string") return "";
    return value
      .replace(`/assets/${folder}/`, "")
      .replace(`assets/${folder}/`, "")
      .replace(/^\//, "");
  };

  const normalizeTagValue = (value) => {
    if (!value || typeof value !== "string") return "";
    return value.replace(/^#+/, "").trim();
  };

  const setScrollLock = (lock) => {
    document.body.style.overflow = lock ? "hidden" : "";
  };

  const setNavState = (item) => {
    const hasMultipleMedia = (item.media || []).length > 1;

    if (prevBtn) prevBtn.hidden = !hasMultipleMedia;
    if (nextBtn) nextBtn.hidden = !hasMultipleMedia;
  };

  const renderMedia = (item) => {
    const mediaList = item.media || [];
    const entry = mediaList[currentMediaIndex];
    mediaContainer.innerHTML = "";
    if (!entry) return;

    if (entry.type === "image") {
      const img = document.createElement("img");
      img.src = `/assets/img/${normalizeAssetValue(entry.src, "img")}`;
      img.alt = entry.alt || item.title || "";
      mediaContainer.appendChild(img);

      requestAnimationFrame(() => {
        img.classList.add("is-visible");
      });
      return;
    }

    if (entry.type === "video") {
      const videoAsset = normalizeAssetValue(entry.full || entry.preview, "video");
      const video = document.createElement("video");
      video.src = `/assets/video/${videoAsset}`;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      mediaContainer.appendChild(video);
    }
  };

  const renderMeta = (item) => {
    titleEl.textContent = item.title || "";
    if (item.descriptionHtml) {
      descEl.innerHTML = item.descriptionHtml;
    } else {
      descEl.textContent = item.description || "";
    }
    tagsEl.innerHTML = "";

    (item.tags || []).forEach((tag) => {
      const normalizedTag = normalizeTagValue(tag);
      if (!normalizedTag) return;

      const span = document.createElement("span");
      span.textContent = `#${normalizedTag}`;
      tagsEl.appendChild(span);
    });
  };

  const open = (index, { push = true } = {}) => {
    const item = items[index];
    if (!item) return;

    currentItemIndex = index;
    currentMediaIndex = 0;

    renderMedia(item);
    renderMeta(item);
    setNavState(item);

    lb.hidden = false;
    requestAnimationFrame(() => {
      lb.classList.add("is-active");
      closeBtn.setAttribute("aria-expanded", "true");
    });
    setScrollLock(true);

    if (push && item.url) {
      history.pushState({ nncLightbox: true, index }, "", item.url);
    }
  };

  const close = ({ resetUrl = false } = {}) => {
    lb.classList.remove("is-active");
    closeBtn.setAttribute("aria-expanded", "false");
    setScrollLock(false);
    currentItemIndex = null;
    currentMediaIndex = 0;

    setTimeout(() => {
      lb.hidden = true;
      mediaContainer.innerHTML = "";
    }, 300);

    if (resetUrl && window.location.pathname !== galleryUrl) {
      history.replaceState({}, "", galleryUrl);
    }
  };

  const next = () => {
    const item = items[currentItemIndex];
    if (!item || !item.media || item.media.length < 2) return;

    currentMediaIndex = (currentMediaIndex + 1) % item.media.length;
    renderMedia(item);
  };

  const prev = () => {
    const item = items[currentItemIndex];
    if (!item || !item.media || item.media.length < 2) return;

    currentMediaIndex = (currentMediaIndex - 1 + item.media.length) % item.media.length;
    renderMedia(item);
  };

  document.querySelectorAll(".nnc-trigger").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const index = Number(trigger.dataset.index);
      if (!Number.isNaN(index)) open(index);
    }, true);
  });

  closeBtn.addEventListener("click", () => {
    if (history.state && history.state.nncLightbox) {
      history.back();
      return;
    }
    close({ resetUrl: true });
  });

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  lb.addEventListener("click", (e) => {
    if (e.target === lb) {
      if (history.state && history.state.nncLightbox) {
        history.back();
        return;
      }
      close({ resetUrl: true });
    }
  });

  window.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-active")) return;

    if (e.key === "Escape") {
      if (history.state && history.state.nncLightbox) {
        history.back();
      } else {
        close({ resetUrl: true });
      }
    }
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.nncLightbox) {
      open(event.state.index, { push: false });
      return;
    }

    if (lb.classList.contains("is-active")) {
      close();
    }
  });
}
