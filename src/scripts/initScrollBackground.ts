export function initScrollBackground() {
  const body = document.body;
  const footer = document.querySelector("body > footer");

  if (footer) {
    let footerBgLayerTimeout: ReturnType<typeof setTimeout> | null = null;
    const FOOTER_BG_LAYER_DELAY_MS = 500;

    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (footerBgLayerTimeout) {
              clearTimeout(footerBgLayerTimeout);
              footerBgLayerTimeout = null;
            }
            body.classList.add("footer-visible", "footer-bg-layer");
          } else {
            body.classList.remove("footer-visible");
            if (footerBgLayerTimeout) {
              clearTimeout(footerBgLayerTimeout);
            }
            footerBgLayerTimeout = setTimeout(() => {
              body.classList.remove("footer-bg-layer");
              footerBgLayerTimeout = null;
            }, FOOTER_BG_LAYER_DELAY_MS);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10px 0px",
      }
    );
    footerObserver.observe(footer);
  }

  const topThreshold = () => window.innerHeight * 0.1;

  let ticking = false;
  const updateAtTop = () => {
    body.classList.toggle("at-top", window.scrollY < topThreshold());
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateAtTop);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateAtTop();
}
