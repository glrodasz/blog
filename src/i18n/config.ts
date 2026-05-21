export const LOCALES = ["en", "es"] as const;
export const DEFAULT_LOCALE = "en" as const;
export const LOCALE_STORAGE_KEY = "locale" as const;

export type Locale = typeof LOCALES[number];

export type LocaleAction =
  | { type: "skip" }
  | { type: "redirect"; target: string }
  | { type: "ready" };

export const LANGUAGE_CONFIG = {
  en: { name: "English" },
  es: { name: "Español" },
} as const satisfies Record<Locale, { name: string }>;

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

export function getValidLocale(locale: string | undefined): Locale {
  if (locale && isValidLocale(locale)) {
    return locale;
  }
  return DEFAULT_LOCALE;
}

export function getLocaleFromAstro(astro: {
  currentLocale?: string;
  preferredLocale?: string;
  props?: { locale?: string };
}): Locale {
  const locale = astro.currentLocale || astro.preferredLocale || astro.props?.locale;
  return getValidLocale(locale);
}

export function isExplicitLocalePath(pathname: string): boolean {
  return (
    pathname.startsWith("/posts/") ||
    pathname.startsWith("/tags/") ||
    pathname.startsWith("/es/")
  );
}

export function detectLocaleFromNavigator(
  languages: readonly string[] | undefined
): Locale {
  if (!languages?.length) {
    return DEFAULT_LOCALE;
  }

  for (const language of languages) {
    if (language.toLowerCase().startsWith("es")) {
      return "es";
    }
  }

  return DEFAULT_LOCALE;
}

export function buildLocalizedPath(pathname: string, targetLocale: Locale): string {
  if (targetLocale === DEFAULT_LOCALE) {
    if (pathname === "/es" || pathname.startsWith("/es/")) {
      const unprefixed = pathname.slice(3) || "/";
      return unprefixed.startsWith("/") ? unprefixed : `/${unprefixed}`;
    }
    return pathname;
  }

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    return pathname;
  }

  return pathname === "/" ? "/es/" : `/es${pathname}`;
}

export function resolveLocaleAction({
  pathname,
  storedLocale,
  detectedLocale,
}: {
  pathname: string;
  storedLocale: string | null;
  detectedLocale: Locale;
}): LocaleAction {
  if (isExplicitLocalePath(pathname)) {
    return { type: "skip" };
  }

  const targetLocale = getValidLocale(storedLocale ?? detectedLocale);
  const isPrefixed = pathname === "/es" || pathname.startsWith("/es/");

  if (targetLocale === "es" && !isPrefixed) {
    return {
      type: "redirect",
      target: buildLocalizedPath(pathname, "es"),
    };
  }

  return { type: "ready" };
}

export function switchLocalePath(currentPath: string, targetLocale: Locale): string {
  const segments = currentPath.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  let cleanPath: string;
  if (isValidLocale(firstSegment)) {
    const remainingSegments = segments.slice(1);
    cleanPath = remainingSegments.length > 0 ? '/' + remainingSegments.join('/') : '/';
  } else {
    cleanPath = currentPath;
  }
  
  if (cleanPath.includes('/posts/')) {
    return targetLocale === DEFAULT_LOCALE ? '/' : `/${targetLocale}/`;
  }
  
  return targetLocale === DEFAULT_LOCALE ? cleanPath : `/${targetLocale}${cleanPath}`;
}
