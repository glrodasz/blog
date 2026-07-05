import { normalizeForSearch } from "./searchNormalize";

/**
 * Wires up the home page filter bar: tag tabs, search input, post grid
 * filtering, and the expanded-search interactions. Shared by the English
 * and Spanish index pages.
 */
export function initHomeFilter() {
  document.addEventListener("DOMContentLoaded", () => {
    const tabs = Array.from(
      document.querySelectorAll<HTMLElement>(".tag-carousel [data-tag]")
    );
    const searchInput = document.querySelector<HTMLInputElement>(
      "[data-search-input]"
    );
    const scroll = document.querySelector<HTMLElement>("[data-tag-scroll]");
    const wrapper = document.querySelector<HTMLElement>("[data-post-grid]");
    const emptyState = document.querySelector<HTMLElement>(
      "[data-empty-state]"
    );
    if (!wrapper) return;

    const desktopQuery = window.matchMedia("(min-width: 641px)");
    const defaultPlaceholder = searchInput?.placeholder ?? "";
    const searchInTemplate = searchInput?.dataset.searchInPlaceholder ?? "";

    const updatePlaceholder = (label: string, tag: string) => {
      if (!searchInput) return;
      searchInput.placeholder =
        tag === "all"
          ? defaultPlaceholder
          : searchInTemplate.replace("{tag}", label);
    };

    const scrollTabIntoView = (tab: HTMLElement, tag: string) => {
      if (!desktopQuery.matches) return;
      if (tag === "all") {
        scroll?.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        tab.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    };

    const filterCards = Array.from(
      wrapper.querySelectorAll<HTMLElement>(".filter-view [data-search]")
    );

    let activeTag = "all";
    let query = "";

    const apply = () => {
      const isFiltering = activeTag !== "all" || query !== "";
      wrapper.classList.toggle("filter-active", isFiltering);

      if (!isFiltering) {
        filterCards.forEach((card) => {
          card.style.display = "";
        });
        if (emptyState) emptyState.hidden = true;
        return;
      }

      let visibleCount = 0;
      filterCards.forEach((card) => {
        const tagSlugs = (card.dataset.tagSlugs ?? "")
          .split(" ")
          .filter(Boolean);
        const haystack = card.dataset.search ?? "";
        const tagMatch = activeTag === "all" || tagSlugs.includes(activeTag);
        const queryMatch = !query || haystack.includes(query);
        const show = tagMatch && queryMatch;
        card.style.display = show ? "" : "none";
        if (show) visibleCount += 1;
      });

      if (emptyState) {
        emptyState.hidden = visibleCount > 0;
      }
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", (event) => {
        const tag = tab.dataset.tag;
        if (!tag) return;
        if (tab.tagName === "A") {
          if (
            (event as MouseEvent).metaKey ||
            (event as MouseEvent).ctrlKey ||
            (event as MouseEvent).shiftKey ||
            (event as MouseEvent).button === 1
          ) {
            return;
          }
          event.preventDefault();
        }
        activeTag = tag;
        tabs.forEach((t) => {
          const isActive = t === tab;
          t.classList.toggle("active", isActive);
          if (isActive) {
            t.setAttribute("aria-current", "true");
          } else {
            t.removeAttribute("aria-current");
          }
        });
        apply();
        updatePlaceholder(tab.textContent?.trim() ?? "", tag);
        scrollTabIntoView(tab, tag);
      });
    });

    let debounceId: number | undefined;
    searchInput?.addEventListener("input", () => {
      if (debounceId) window.clearTimeout(debounceId);
      debounceId = window.setTimeout(() => {
        query = normalizeForSearch(searchInput.value ?? "");
        apply();
      }, 120);
    });

    const mobileQuery = window.matchMedia("(max-width: 640px)");
    searchInput?.addEventListener("focus", () => {
      if (!mobileQuery.matches) return;
      const header = document.getElementById("main-header");
      const offset = (header?.offsetHeight ?? 0) + 16;
      const top =
        searchInput.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });

    searchInput?.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (searchInput.value !== "") {
        searchInput.value = "";
        query = "";
        apply();
      }
      searchInput.blur();
    });
  });
}
