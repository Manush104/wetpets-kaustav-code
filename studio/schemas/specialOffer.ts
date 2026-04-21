import { defineType, defineField } from 'sanity';

export const specialOffer = defineType({
  name: 'specialOffer',
  title: 'Special Offer / Banner',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    defineField({
      name: 'title',
      title: 'Offer Title',
      type: 'string',
      validation: (r) => r.required(),
      description: 'e.g. "Premium Collections", "Monsoon Sale"',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g. "Discount Coupons & Combos"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of the offer',
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'e.g. "Up to 30% Off", "New Arrival", "Limited Time"',
    }),
    defineField({
      name: 'image',
      title: 'Offer Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Explore Deals',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Button Link',
      type: 'string',
      initialValue: '/wetpets-kaustav-code/products?cat=spacial-offers',
    }),
    defineField({
      name: 'isActive',
      title: 'Active?',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle off to hide this offer from the website',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower number = shown first',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'badge',
      media: 'image',
      isActive: 'isActive',
    },
    prepare({ title, subtitle, media, isActive }) {
      return {
        title: `${isActive === false ? '🔴 ' : '🟢 '}${title}`,
        subtitle: subtitle ?? '',
        media,
      };
    },
  },
});
