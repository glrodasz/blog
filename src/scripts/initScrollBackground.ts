export function initScrollBackground() {
  const body = document.body;
  const footer = document.querySelector("body > footer");

  if (footer) {
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          body.classList.toggle("footer-visible", entry.isIntersecting);
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
