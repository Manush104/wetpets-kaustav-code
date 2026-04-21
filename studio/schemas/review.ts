import { defineType, defineField } from 'sanity';

export const review = defineType({
  name: 'review',
  title: 'Customer Review',
  type: 'document',
  icon: () => '⭐',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'initials',
      title: 'Initials',
      type: 'string',
      description: 'e.g. "RB" for "Regular Buyer" — shown in avatar',
      validation: (r) => r.required().max(3),
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (r) => r.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'Google Review',
      options: {
        list: [
          { title: 'Google Review', value: 'Google Review' },
          { title: 'Facebook', value: 'Facebook' },
          { title: 'WhatsApp', value: 'WhatsApp' },
          { title: 'In-Store', value: 'In-Store' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Show on Homepage?',
      type: 'boolean',
      initialValue: true,
      description: 'Only featured reviews appear on the home page',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Rating High → Low',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      rating: 'rating',
      source: 'source',
    },
    prepare({ title, rating, source }) {
      return {
        title,
        subtitle: `${'★'.repeat(rating ?? 0)}${'☆'.repeat(5 - (rating ?? 0))} — ${source ?? ''}`,
      };
    },
  },
});
