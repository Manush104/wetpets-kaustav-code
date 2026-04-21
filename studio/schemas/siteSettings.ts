import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'social', title: 'Social Links' },
  ],
  fields: [
    // General
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      initialValue: 'Wet Pets',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'general',
      initialValue: 'Aquarium Store, Kolkata | Fish, Tanks & Supplies',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
    }),
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar Text',
      type: 'string',
      group: 'general',
      description: 'Scrolling marquee text on the home page. Leave empty to hide.',
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'Default SEO Title',
      type: 'string',
      group: 'seo',
      initialValue: 'Wet Pets — Aquarium Store, Kolkata | Fish, Tanks & Supplies',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      initialValue: 'Ornamental fish, aquariums, and aquarium supplies in Kolkata. 200+ freshwater species. Open 24/7.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default OG Image',
      type: 'image',
      group: 'seo',
      description: 'Social media share image (1200×630px recommended)',
    }),

    // Social
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      group: 'social',
    }),
  ],
  // Singleton
  preview: {
    prepare: () => ({ title: '⚙️ Site Settings' }),
  },
});
