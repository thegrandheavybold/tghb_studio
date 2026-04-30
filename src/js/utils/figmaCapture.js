function hasCaptureFlag(searchParams) {
  if (searchParams.has('figmaCapture')) {
    const value = (searchParams.get('figmaCapture') || '').toLowerCase();
    return value === '' || value === '1' || value === 'true' || value === 'yes';
  }

  return false;
}

function hasHashCaptureFlag() {
  const hash = window.location.hash || '';
  return hash.includes('figmacapture=');
}

export function isFigmaCaptureMode() {
  const params = new URLSearchParams(window.location.search);
  return hasCaptureFlag(params) || hasHashCaptureFlag();
}

function injectCaptureStyles() {
  if (document.getElementById('tghb-figma-capture-style')) return;

  const style = document.createElement('style');
  style.id = 'tghb-figma-capture-style';
  style.textContent = `
    html.figma-capture, html.figma-capture * {
      scroll-behavior: auto !important;
      animation: none !important;
      transition: none !important;
      caret-color: transparent !important;
    }
    html.figma-capture .lazy-initial img {
      filter: none !important;
      margin: 0 !important;
      width: 100% !important;
      will-change: auto !important;
    }
  `;
  document.head.appendChild(style);
}

function removeConsentUi() {
  const selectors = [
    '[id^="ccm"]',
    '[id*="ccm19"]',
    '[class*="ccm"]',
    '[class*="cookie-consent"]',
    '[class*="cookiebanner"]'
  ];

  const nodes = document.querySelectorAll(selectors.join(','));
  nodes.forEach((node) => {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}

function forceImagesEager() {
  const images = document.querySelectorAll('img');

  images.forEach((img) => {
    img.loading = 'eager';
    img.decoding = 'sync';
    img.setAttribute('fetchpriority', 'high');

    const picture = img.closest('picture');
    if (picture) {
      picture.classList.remove('lazy-initial');
    }
  });
}

function normalizeNetlifyImageUrls() {
  const images = document.querySelectorAll('img[src*="/.netlify/images?url="], img[srcset*="/.netlify/images?url="]');

  images.forEach((img) => {
    const src = img.getAttribute('src') || '';
    if (src.includes('/.netlify/images?url=')) {
      try {
        const parsed = new URL(src, window.location.origin);
        const original = parsed.searchParams.get('url');
        if (original) img.setAttribute('src', original);
      } catch {
        // no-op
      }
    }

    const srcset = img.getAttribute('srcset') || '';
    if (srcset.includes('/.netlify/images?url=')) {
      const firstCandidate = srcset.split(',')[0]?.trim() || '';
      const firstUrl = firstCandidate.split(' ')[0];
      try {
        const parsed = new URL(firstUrl, window.location.origin);
        const original = parsed.searchParams.get('url');
        if (original) {
          img.setAttribute('srcset', original);
        }
      } catch {
        // no-op
      }
    }

    const picture = img.closest('picture');
    if (picture) {
      picture.querySelectorAll('source').forEach((source) => {
        const sourceSrcset = source.getAttribute('srcset') || '';
        if (!sourceSrcset.includes('/.netlify/images?url=')) return;

        const first = sourceSrcset.split(',')[0]?.trim() || '';
        const firstSourceUrl = first.split(' ')[0];
        try {
          const parsed = new URL(firstSourceUrl, window.location.origin);
          const original = parsed.searchParams.get('url');
          if (original) {
            source.setAttribute('srcset', original);
          }
        } catch {
          // no-op
        }
      });
    }
  });
}

function forceCaptureVisibility() {
  const hiddenCandidates = document.querySelectorAll('[data-animate], .mix, .prjct, .nnc-item');
  hiddenCandidates.forEach((el) => {
    el.style.opacity = '1';
    el.style.visibility = 'visible';
    el.style.transform = 'none';
    el.style.filter = 'none';
  });

  document.querySelectorAll('[style*=\"opacity: 0\"], [style*=\"opacity:0\"]').forEach((el) => {
    el.style.opacity = '1';
  });
}

function pauseMedia() {
  const videos = document.querySelectorAll('video');
  videos.forEach((video) => {
    try {
      video.pause();
    } catch {
      // no-op
    }
  });
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

async function waitForImages(timeoutMs = 12000) {
  const images = Array.from(document.images || []);
  const pending = images.filter((img) => !img.complete);
  if (!pending.length) return;

  await Promise.race([
    Promise.all(
      pending.map(
        (img) =>
          new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
          })
      )
    ),
    new Promise((resolve) => setTimeout(resolve, timeoutMs))
  ]);
}

async function warmFullPage() {
  const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  if (maxY <= 0) return;

  const step = Math.max(600, Math.floor(window.innerHeight * 0.9));
  for (let y = 0; y <= maxY; y += step) {
    window.scrollTo(0, y);
    await nextFrame();
  }

  window.scrollTo(0, maxY);
  await nextFrame();
  window.scrollTo(0, 0);
  await nextFrame();
}

export async function stabilizeForFigmaCapture() {
  document.documentElement.classList.add('figma-capture');
  window.__TGHB_FIGMA_CAPTURE__ = true;

  injectCaptureStyles();
  removeConsentUi();
  normalizeNetlifyImageUrls();
  forceImagesEager();
  forceCaptureVisibility();
  pauseMedia();

  if (document.fonts && typeof document.fonts.ready?.then === 'function') {
    try {
      await document.fonts.ready;
    } catch {
      // no-op
    }
  }

  await waitForImages();
  await warmFullPage();
  forceCaptureVisibility();
  await waitForImages(5000);
  await nextFrame();
  await nextFrame();

  window.__TGHB_CAPTURE_READY__ = true;
}
