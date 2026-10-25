import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  redirect: z.boolean().optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  languageVersions: z
    .array(
      z.object({
        language: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  relatedPosts: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: postSchema,
});

export const collections = {
  posts,
};
