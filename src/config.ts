export const siteConfig = {
  name: 'olashyn.dev',
  title: 'olashyn.dev',
  description:
    "Oleksandr Olashyn's blog about web dev, Power Platform and beyond",
  url: 'https://olashyn.dev',
  baseUrl: '',
  // Link preview image for pages without their own (posts use /og/<slug>.jpg). A 1200×630 card
  // with the logo and a tagline, rendered once from the logo SVG.
  shareImage: '/assets/img/og-default.png',

  // Author
  author: 'Oleksandr Olashyn',
  authorJobTitle: 'Power Platform Architect',
  authorPicFull: 'face.jpg',
  aboutAuthor:
    'My name is Oleksandr Olashyn. I am former Microsoft Business Application MVP (5x), MCT, certified Power Platform Architect with passion for coding and dancing.',
  email: 'oleksandr@olashyn.dev',

  // Social / Contact
  website: 'olashyn.dev',
  linkedin: 'dancingwithcrm',
  github: 'oolashyn',
  twitter: '@dancingwithcrm',

  // Profiles listed as the author's sameAs in the home page's structured data (see Head.astro)
  social: {
    name: 'Oleksandr Olashyn',
    links: [
      'https://www.linkedin.com/in/dancingwithcrm',
      'https://github.com/oolashyn',
    ],
  },

  // Newsletter (MailChimp)
  mailchimp:
    'https://dancingwithcrm.us4.list-manage.com/subscribe/post',
  mailchimpU: '146d1df030bf451984f7700fb',
  mailchimpId: 'ba3c34cafb',

  // Comments (Giscus, backed by GitHub Discussions). Each post's thread is the discussion whose
  // title is the post slug, so renaming the site or a post title never orphans it. The IDs come
  // from https://giscus.app; while either is empty no comments are shown. The theme follows the
  // site's light/dark mode (see Giscus.astro).
  giscus: {
    repo: 'OOlashyn/oolashyn.github.io',
    repoId: 'MDEwOlJlcG9zaXRvcnkxODc5MTE2MTI=',
    category: 'Announcements',
    categoryId: 'DIC_kwDOCzNNvM4DI1D5',
  },

  // Analytics (Cloudflare Web Analytics; empty token disables the beacon)
  analytics: {
    cloudflareToken: '0b72638e91eb4c07bcf270882d8ec924',
  },

  // Pagination
  postsPerPage: 6,

  // RSS feed: number of newest posts to include. Mailchimp only sends items newer than its
  // last send, so this just needs to exceed the posts published between two campaign runs.
  feedItemLimit: 20,
} as const;
