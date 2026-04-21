import { defineType, defineField } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: () => '❓',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower number = shown first',
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'question',
      sortOrder: 'sortOrder',
    },
    prepare({ title, sortOrder }) {
      return {
        title,
        subtitle: sortOrder ? `#${sortOrder}` : '',
      };
    },
  },
});
