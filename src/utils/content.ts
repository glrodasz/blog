import { getCollection, type CollectionEntry } from "astro:content";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "../i18n/config";
import { getMessages } from "../i18n";

export type Post = CollectionEntry<"posts">;

type RSSFeedContext = {
  site: string;
  currentLocale?: string;
  preferredLocale?: string;
};

export function getLanguageFromSlug(slug: string): Locale {
  const match = slug.match(new RegExp(`^(${LOCALES.join('|')})/`));
  return (match?.[1] as Locale) || DEFAULT_LOCALE;
}

export function getCleanSlug(slug: string): string {
  const pattern = new RegExp(`^(${LOCALES.join('|')})/`);
  return slug.replace(pattern, '');
}

export async function getPostsByLanguage(language: Locale) {
  return await getCollection("posts", ({ slug }) => {
    return getLanguageFromSlug(slug) === language;
  });
}

export function getPostUrl(slug: string, locale: Locale): string {
  const cleanSlug = getCleanSlug(slug);
  
  if (locale === DEFAULT_LOCALE) {
    return `/posts/${cleanSlug}/`;
  }
  
  return `/${locale}/posts/${cleanSlug}/`;
}

export function calculateReadingTime(text: string, wordsPerMinute = 200): number {
  const words = text.trim().split(/\s+/);
  const totalWords = words.length;

  const readingTimeMinutes = totalWords / wordsPerMinute;
  const roundedMinutes = Math.round(readingTimeMinutes);

  return roundedMinutes;
}

export async function generateRSSFeed(locale: Locale, context: RSSFeedContext) {
  const posts = await getPostsByLanguage(locale);
  const messages = getMessages(locale);

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );

  return {
    title: messages.site.title,
    description: messages.site.description,
    site: context.site,
    xmlns: { media: "http://search.yahoo.com/mrss/" },
    items: sortedPosts.map((post) => ({
      ...post.data,
      link: getPostUrl(post.slug, locale),
      customData: post.data.heroImage
        ? `<media:content url="${context.site}${post.data.heroImage}" medium="image" />`
        : undefined,
    })),
  };
}

export async function generateSlugPaths(locale: Locale) {
  const posts = await getPostsByLanguage(locale);

  return posts.map((post) => ({
    params: { slug: getCleanSlug(post.slug) },
    props: { post, locale }
  }));
}

export function getPostTags(post: Post): string[] {
  const { tags } = post.data;
  if (!tags) return [];
  return Array.isArray(tags) ? tags : [tags];
}

export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getTagUrl(tag: string, locale: Locale): string {
  const slug = tagToSlug(tag);
  if (locale === DEFAULT_LOCALE) {
    return `/tags/${slug}/`;
  }
  return `/${locale}/tags/${slug}/`;
}

export function collectTagsFromPosts(posts: Post[]): string[] {
  const set = new Set<string>();
  for (const post of posts) {
    for (const tag of getPostTags(post)) {
      set.add(tag);
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export async function getRelatedPosts(
  slugs: string[] | undefined,
  locale: Locale
): Promise<Post[]> {
  if (!slugs || slugs.length === 0) return [];
  const all = await getPostsByLanguage(locale);
  const bySlug = new Map<string, Post>();
  for (const post of all) {
    bySlug.set(getCleanSlug(post.slug), post);
  }
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((p): p is Post => Boolean(p));
}
