const THEME_STORAGE_KEY = "theme";
const THEME_COLOR_LIGHT = "#ffffff";
const THEME_COLOR_DARK = "#1b262c";

function updateThemeLabels(): void {
  const isDark =
    document.documentElement.getAttribute("data-theme") === "dark";
  document.querySelectorAll<HTMLSpanElement>(".theme-label").forEach((el) => {
    const light = el.dataset.light ?? "Light";
    const dark = el.dataset.dark ?? "Dark";
    el.textContent = isDark ? light : dark;
  });
}

export function initThemeToggle(): void {
  updateThemeLabels();

  document
    .querySelectorAll<HTMLButtonElement>(".theme-toggle")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const next =
          document.documentElement.getAttribute("data-theme") === "dark"
            ? "light"
            : "dark";
        document.documentElement.setAttribute("data-theme", next);
        const meta = document.querySelector<HTMLMetaElement>(
          'meta[name="theme-color"]'
        );
        if (meta)
          meta.setAttribute(
            "content",
            next === "dark" ? THEME_COLOR_DARK : THEME_COLOR_LIGHT
          );
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
          /* storage unavailable */
        }
        updateThemeLabels();
      });
    });
}
