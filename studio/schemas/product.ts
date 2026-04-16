import { defineType, defineField } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Livestock (Fish & Plants)', value: 'livestock' },
          { title: 'Aquarium Tanks & Furniture', value: 'tanks' },
          { title: 'Equipment & Hardware', value: 'equipment' },
          { title: 'Maintenance & Consumables', value: 'maintenance' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      description: 'Select the subcategory for this product',
      options: {
        list: [
          // Livestock
          { title: 'Freshwater Fish', value: 'freshwater-fish' },
          { title: 'Marine Fish', value: 'marine-fish' },
          { title: 'Shrimp & Invertebrates', value: 'shrimp-inverts' },
          { title: 'Live Aquatic Plants', value: 'live-plants' },
          // Tanks
          { title: 'Starter Kits', value: 'starter-kits' },
          { title: 'Specialty Tanks', value: 'specialty-tanks' },
          { title: 'Stands & Cabinetry', value: 'stands-cabinetry' },
          // Equipment
          { title: 'Filtration Systems', value: 'filtration' },
          { title: 'Lighting', value: 'lighting' },
          { title: 'Heaters & Thermometers', value: 'heaters-thermo' },
          { title: 'Air Pumps & Wave Makers', value: 'air-pumps-wave' },
          { title: 'CO₂ Systems', value: 'co2-systems' },
          // Maintenance
          { title: 'Fish Food', value: 'fish-food' },
          { title: 'Water Conditioners & Chemicals', value: 'water-conditioners' },
          { title: 'Fertilizers', value: 'fertilizers' },
          { title: 'Substrates & Decor', value: 'substrates-decor' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: 'priceLabel',
      title: 'Price Label',
      type: 'string',
      description: 'e.g. "each", "per pair", "onwards"',
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      description: 'e.g. "In Store", "Pre-order", "Limited Stock", "Out of Stock"',
      options: {
        list: [
          { title: 'In Store', value: 'In Store' },
          { title: 'Pre-order', value: 'Pre-order' },
          { title: 'Limited Stock', value: 'Limited Stock' },
          { title: 'Out of Stock', value: 'Out of Stock' },
        ],
      },
      initialValue: 'In Store',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
});
