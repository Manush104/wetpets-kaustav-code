import { defineType, defineField } from 'sanity';

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  icon: () => '📖',
  fields: [
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Our Story',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Your Trusted Source for Aquatic Life',
    }),
    defineField({
      name: 'paragraph1',
      title: 'Paragraph 1',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'paragraph2',
      title: 'Paragraph 2',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'highlights',
      title: 'Highlight Points',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'The checkmark list items (e.g. "Wide variety of ornamental fish, always in stock")',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'galleryImage1',
      title: 'Gallery Image 1 (Small)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'galleryImage2',
      title: 'Gallery Image 2 (Small)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  // Singleton
  preview: {
    prepare: () => ({ title: '📖 About Section' }),
  },
});
