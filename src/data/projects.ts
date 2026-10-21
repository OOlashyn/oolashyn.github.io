import type { ImageMetadata } from 'astro';
import attachmentGallery from '@/assets/projects/attachment-gallery.jpg';
import lookupToSelect from '@/assets/projects/lookup-to-select.jpg';
import powerPagesHelper from '@/assets/projects/power-pages-helper.jpg';
import rangeSlider from '@/assets/projects/range-slider.jpg';
import siteSettingsAndSnippets from '@/assets/projects/site-settings-and-snippets.jpg';
import stockMarketCard from '@/assets/projects/stock-market-card.jpg';
import tagCloud from '@/assets/projects/tag-cloud.jpg';
import webFormStepsVisualizer from '@/assets/projects/web-form-steps-visualizer.jpg';

/**
 * What a project card shows. A video is a short muted demo loop from `public/assets/videos/`;
 * its poster is a frame from the clip (in `src/assets/projects/`, so Astro optimizes it) and
 * also gives the player its size. `alt` describes what the media shows.
 */
export type ProjectMedia =
  | { kind: 'video'; src: string; poster: ImageMetadata; alt: string }
  | { kind: 'image'; src: ImageMetadata; alt: string };

export interface Project {
  title: string;
  url: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  media: ProjectMedia;
  /** Listed under "Things I've built" on the about page */
  featured?: boolean;
}

// Section order on the projects page
export const projectCategories = ['Power Pages', 'PCF components'] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export const projects: Project[] = [
  {
    title: 'Power Pages Lookup to Select',
    url: '/power-pages-lookup-to-select/',
    description:
      'A jQuery library that replaces the Power Pages lookup control with a searchable Select2 dropdown.',
    category: 'Power Pages',
    tags: ['jQuery', 'Select2'],
    media: {
      kind: 'video',
      src: '2024-05-26-lts-full.mp4',
      poster: lookupToSelect,
      alt: 'A Power Pages form where the Country lookup is a searchable dropdown',
    },
    featured: true,
  },
  {
    title: 'Power Pages Helper for VS Code',
    url: 'https://marketplace.visualstudio.com/items?itemName=oleksandr-olashyn.portal-helper-vscode',
    description:
      'A VS Code extension with commands and shortcuts that simplify working with the Power Platform CLI for Power Pages.',
    category: 'Power Pages',
    tags: ['VS Code', 'Power Platform CLI'],
    media: {
      kind: 'video',
      src: 'portal-helper-list-portals.mp4',
      poster: powerPagesHelper,
      alt: 'The VS Code command palette listing the Power Pages Helper commands',
    },
    featured: true,
  },
  {
    title: 'Site Settings & Content Snippets',
    url: 'https://github.com/OOlashyn/PowerAppsPortalSiteSettingsAndSnippets',
    description:
      'A list of little-known and hidden content snippets and site settings for Power Pages (formerly Power Apps portals).',
    category: 'Power Pages',
    tags: ['Reference'],
    media: {
      kind: 'image',
      src: siteSettingsAndSnippets,
      alt: 'A list of site settings and content snippets with what each one does',
    },
    featured: true,
  },
  {
    title: 'Web Form Steps Visualizer',
    url: 'https://github.com/OOlashyn/PCF-WebFormStepVisualizer',
    description:
      'Shows the steps of a Power Pages web form as a flow chart, so multistep forms are easier to understand and edit.',
    category: 'PCF components',
    tags: ['PCF', 'Power Pages'],
    media: {
      kind: 'video',
      src: 'WebFormStepVisualizer_v1.mp4',
      poster: webFormStepsVisualizer,
      alt: 'Advanced form steps drawn as a flow chart in the Portal Management app',
    },
  },
  {
    title: 'Attachment Gallery',
    url: 'https://github.com/OOlashyn/PCF-AttachmentGalleryControl',
    description:
      'A gallery of the images and PDFs attached to a record’s notes, with each note’s title and text.',
    category: 'PCF components',
    tags: ['PCF', 'React'],
    media: {
      kind: 'video',
      src: 'pcf-gallery-v1.mp4',
      poster: attachmentGallery,
      alt: 'A model-driven form with a gallery of the images attached to its notes',
    },
  },
  {
    title: 'Tag Cloud',
    url: 'https://github.com/OOlashyn/PCF-TagCloud',
    description:
      'A dataset component that turns a view into a tag cloud, built with React and Fluent UI.',
    category: 'PCF components',
    tags: ['PCF', 'React', 'Fluent UI'],
    media: {
      kind: 'video',
      src: 'pcf-tagcloud-v1.mp4',
      poster: tagCloud,
      alt: 'Account names shown as a tag cloud on a model-driven form',
    },
  },
  {
    title: 'Range Slider',
    url: 'https://github.com/OOlashyn/PCF-RangeSliderControl',
    description:
      'A slider for picking a range between two numeric fields.',
    category: 'PCF components',
    tags: ['PCF'],
    media: {
      kind: 'video',
      src: 'pcf-rangeslider-v1.mp4',
      poster: rangeSlider,
      alt: 'A range slider bound to a lower and an upper number field',
    },
  },
  {
    title: 'Stock Market Card',
    url: 'https://github.com/OOlashyn/PCF-StockMarketCard',
    description:
      'A stock price card rendered with Adaptive Cards.',
    category: 'PCF components',
    tags: ['PCF', 'Adaptive Cards'],
    media: {
      kind: 'image',
      src: stockMarketCard,
      alt: 'A stock price card for MSFT on a model-driven form',
    },
  },
];
