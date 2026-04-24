import { defineCollection, z } from "astro:content";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  redirect: z.boolean().optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  languageVersions: z.array(z.object({
    language: z.string(),
    url: z.string()
  })).optional(),
  relatedPosts: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

const posts = defineCollection({
  type: "content",
  schema: postSchema,
});

export const collections = { 
  posts,
};
