import type { APIRoute, GetStaticPaths } from "astro";
import { generateOgImage } from "../../utils/ogImage";
import { getMessages } from "../../i18n";
import {
  getPostsByLanguage,
  getPostTags,
  tagToSlug,
} from "../../utils/content";
import type { Locale } from "../../i18n/config";

type OgEntry = {
  params: { slug: string };
  props: {
    variant: "brand" | "content";
    title: string;
    subtitle?: string;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: OgEntry[] = [];

  for (const locale of ["en", "es"] as Locale[]) {
    const messages = getMessages(locale);
    const prefix = locale === "es" ? "es/" : "";

    paths.push({
      params: { slug: `${prefix}home` },
      props: {
        variant: "brand",
        title: `${messages.site.title} by ${messages.site.author}`,
        subtitle: messages.site.shortDescription,
      },
    });

    paths.push({
      params: { slug: `${prefix}about` },
      props: {
        variant: "content",
        title: locale === "es" ? "Acerca del blog" : "About the blog",
        subtitle: messages.site.shortDescription,
      },
    });

    const posts = await getPostsByLanguage(locale);
    const tagSlugs = new Set<string>();

    for (const post of posts) {
      for (const tag of getPostTags(post)) {
        const slug = tagToSlug(tag);
        if (!tagSlugs.has(slug)) {
          tagSlugs.add(slug);
          paths.push({
            params: { slug: `${prefix}tags/${slug}` },
            props: {
              variant: "content",
              title: `#${tag}`,
              subtitle: messages.site.shortDescription,
            },
          });
        }
      }
    }
  }

  return paths;
};

export const GET: APIRoute = async ({ props }) => {
  const { variant, title, subtitle } = props as {
    variant: "brand" | "content";
    title: string;
    subtitle?: string;
  };

  const png = await generateOgImage({ variant, title, subtitle });

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000" },
  });
};
