import {
  LOCALE_STORAGE_KEY,
  detectLocaleFromNavigator,
  resolveLocaleAction,
} from "../i18n/config";

const FAILSAFE_MS = 300;

function markReady(root: HTMLElement): void {
  root.removeAttribute("data-locale-pending");
  root.setAttribute("data-locale-ready", "");
}

function readStoredLocale(): string | null {
  try {
    return localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function initLocaleRedirect(): void {
  const root = document.documentElement;
  let failsafeId: ReturnType<typeof setTimeout> | undefined;

  const clearFailsafe = () => {
    if (failsafeId !== undefined) {
      clearTimeout(failsafeId);
      failsafeId = undefined;
    }
  };

  try {
    const pathname = window.location.pathname;
    const storedLocale = readStoredLocale();
    const detectedLocale = detectLocaleFromNavigator(navigator.languages);
    const action = resolveLocaleAction({
      pathname,
      storedLocale,
      detectedLocale,
    });

    if (action.type === "skip") {
      markReady(root);
      return;
    }

    root.setAttribute("data-locale-pending", "");

    failsafeId = setTimeout(() => {
      markReady(root);
    }, FAILSAFE_MS);

    if (action.type === "redirect") {
      window.location.replace(action.target);
      return;
    }

    clearFailsafe();
    markReady(root);
  } catch {
    clearFailsafe();
    markReady(root);
  }
}

initLocaleRedirect();
