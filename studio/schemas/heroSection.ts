import { defineType, defineField } from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  icon: () => '🏠',
  fields: [
    defineField({
      name: 'label',
      title: 'Top Label',
      type: 'string',
      initialValue: 'Aquarium Store · Kolkata',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main hero heading (use \\n for line breaks)',
      initialValue: 'Where Every Fish Finds a Home.',
    }),
    defineField({
      name: 'highlightText',
      title: 'Highlight Text',
      type: 'string',
      description: 'The italicized accent-colored text in the heading',
      initialValue: 'a Home.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      initialValue: 'Exotic ornamental fish, aquariums, and everything you need to build and maintain a thriving aquatic world.',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      initialValue: 'View Products',
    }),
    defineField({
      name: 'primaryButtonLink',
      title: 'Primary Button Link',
      type: 'string',
      initialValue: '/products',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'string',
      initialValue: '/contact',
    }),
    // Stats
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),
  ],
  // Singleton
  preview: {
    prepare: () => ({ title: '🏠 Hero Section' }),
  },
});
