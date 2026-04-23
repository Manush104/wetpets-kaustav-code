import { defineType, defineField } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'link',
      title: 'Link (Product Category URL)',
      type: 'string',
      description: 'e.g. /products?cat=livestock',
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
      title: 'title',
      media: 'image',
      sortOrder: 'sortOrder',
    },
    prepare({ title, media, sortOrder }) {
      return {
        title,
        subtitle: sortOrder ? `Order: ${sortOrder}` : '',
        media,
      };
    },
  },
});
