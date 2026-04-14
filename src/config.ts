export const siteConfig = {
  name: 'Dancing with CRM',
  title: 'Dancing with CRM',
  description:
    "Oleksandr's Olashyn personal blog about Power Platform, Dynamics 365 and many more",
  url: 'https://www.dancingwithcrm.com',
  baseUrl: '',

  // Author
  author: 'Oleksandr Olashyn',
  authorPic: 'face-min.jpg',
  authorPicFull: 'face.jpg',
  aboutAuthor:
    'My name is Oleksandr Olashyn. I am a Microsoft Business Application MVP, MCT, certified Dynamics 365 Architect with passion for coding and dancing.',
  email: 'oleksandr@dancingwithcrm.com',

  // Social / Contact
  website: 'www.dancingwithcrm.com',
  linkedin: 'dancingwithcrm',
  github: 'oolashyn',
  twitter: '@dancingwithcrm',

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

  // Comments (Utterances)
  utterances: {
    repo: 'OOlashyn/oolashyn.github.io',
    issueTerm: 'title',
    label: 'Comment',
    theme: 'github-dark',
  },

  // Analytics
  analytics: 'UA-141204351-1',

  // Pagination
  postsPerPage: 6,
} as const;
