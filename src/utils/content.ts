import { getCollection, type CollectionEntry } from "astro:content";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "../i18n/config";
import { getMessages } from "../i18n";
import { getPostAudio } from "./audio";
import { PODCAST } from "../consts";

export type Post = CollectionEntry<"posts">;

type RSSFeedContext = {
  site: string;
  currentLocale?: string;
  preferredLocale?: string;
};

export function getLanguageFromSlug(slug: string): Locale {
  const match = slug.match(new RegExp(`^(${LOCALES.join("|")})/`));
  return (match?.[1] as Locale) || DEFAULT_LOCALE;
}

export function getCleanSlug(slug: string): string {
  const pattern = new RegExp(`^(${LOCALES.join("|")})/`);
  return slug.replace(pattern, "");
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

export function calculateReadingTime(
  text: string,
  wordsPerMinute = 200,
): number {
  const words = text.trim().split(/\s+/);
  const totalWords = words.length;

  const readingTimeMinutes = totalWords / wordsPerMinute;
  const roundedMinutes = Math.round(readingTimeMinutes);

  return roundedMinutes;
}

/** Channel-level iTunes tags so podcast apps and directories pick up the feed. */
function getPodcastChannelData(locale: Locale, site: string): string {
  const { author } = getMessages(locale).site;
  return [
    `<language>${locale}</language>`,
    `<itunes:author>${author}</itunes:author>`,
    PODCAST.ownerEmail &&
      `<itunes:owner><itunes:name>${author}</itunes:name><itunes:email>${PODCAST.ownerEmail}</itunes:email></itunes:owner>`,
    PODCAST.cover &&
      `<itunes:image href="${new URL(PODCAST.cover, site).href}" />`,
    `<itunes:category text="${PODCAST.category}" />`,
    `<itunes:explicit>${PODCAST.explicit}</itunes:explicit>`,
    `<itunes:type>episodic</itunes:type>`,
  ]
    .filter(Boolean)
    .join("");
}

export async function generateRSSFeed(locale: Locale, context: RSSFeedContext) {
  const posts = await getPostsByLanguage(locale);
  const messages = getMessages(locale);

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );

  return {
    title: messages.site.title,
    description: messages.site.description,
    site: context.site,
    xmlns: {
      media: "http://search.yahoo.com/mrss/",
      itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
    },
    customData: getPodcastChannelData(locale, context.site),
    items: sortedPosts.map((post) => {
      const audio = getPostAudio(post.slug, locale);
      const heroImage = post.data.heroImage
        ? `<media:content url="${new URL(post.data.heroImage, context.site).href}" medium="image" />`
        : "";
      const duration = audio
        ? `<itunes:duration>${Math.round(audio.durationSeconds)}</itunes:duration>`
        : "";
      return {
        ...post.data,
        link: getPostUrl(post.slug, locale),
        enclosure: audio
          ? {
              url: new URL(audio.src, context.site).href,
              length: audio.bytes,
              type: "audio/mpeg",
            }
          : undefined,
        customData: heroImage + duration || undefined,
      };
    }),
  };
}

export async function generateSlugPaths(locale: Locale) {
  const posts = await getPostsByLanguage(locale);

  return posts.map((post) => ({
    params: { slug: getCleanSlug(post.slug) },
    props: { post, locale },
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
  locale: Locale,
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
