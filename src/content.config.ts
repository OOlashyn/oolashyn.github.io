import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) => z.object({
    layout: z.string().optional(),
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional().default(''),
    excerpt: z.string().optional().default(''),
    shortDescription: z.string().optional().default(''),
    // Cover, relative to the post (../../assets/covers/...) so Astro can optimize it
    img: image(),
    image: z.string().optional().default(''),
    tags: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { posts };
