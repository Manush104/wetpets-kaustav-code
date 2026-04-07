import { defineType, defineField } from 'sanity';

export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact Info',
  type: 'document',
  fields: [
    defineField({
      name: 'storeName',
      title: 'Store Name',
      type: 'string',
      initialValue: 'Wet Pets',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Include country code, e.g. +91 98765 43210',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Without + or spaces, e.g. 919876543210',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      initialValue: 'Kolkata',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Link',
      type: 'url',
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'string',
      initialValue: 'Open 24 Hours — 7 Days a Week',
    }),
  ],
  // Singleton — only one document of this type
  preview: {
    prepare: () => ({ title: 'Contact Information' }),
  },
});
