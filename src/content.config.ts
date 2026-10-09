import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) => z.object({
    title: z.string().min(1),
    // Publish date. Also the RSS <pubDate> that Mailchimp uses to detect new posts —
    // changing it on an existing post can re-send that post to subscribers.
    date: z.coerce.date(),

    // Summary used for the page's meta/OG description and the RSS item description
    // (which Mailchimp shows in the newsletter).
    description: z.string().min(1),
    // Text for the post card and hero on the home page, sized to fit the card;
    // falls back to `description`.
    cardDescription: z.string().optional(),
    // Renamed to `cardDescription` — fail loudly instead of silently ignoring the old key.
    shortDescription: z.never({ error: 'shortDescription was renamed to cardDescription' }).optional(),

    // Cover shown on the site, optimized by Astro.
    // Path relative to the post: ../../assets/covers/<file>
    img: image(),
    // RSS / Mailchimp / Open Graph image. Stays in public/ so its URL never changes.
    image: z.string().startsWith('/assets/img/', {
      message: 'image must be a /assets/img/... path in public/ (it needs a stable URL for RSS)',
    }),

    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
