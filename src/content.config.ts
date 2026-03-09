import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    layout: z.string().optional(),
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional().default(''),
    excerpt: z.string().optional().default(''),
    shortDescription: z.string().optional().default(''),
    img: z.string().optional().default(''),
    image: z.string().optional().default(''),
    tags: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { posts };
