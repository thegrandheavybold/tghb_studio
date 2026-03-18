export function initNncVideoHover() {
  if (!window.matchMedia("(hover: hover)").matches) return;

  const videos = document.querySelectorAll(".nnc-video-preview");

  videos.forEach(video => {
    const parent = video.closest(".nnc-item");

    parent.addEventListener("mouseenter", () => {
      video.play().catch(() => {});
    });

    parent.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}