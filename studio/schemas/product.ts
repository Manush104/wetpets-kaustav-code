import { defineType, defineField } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: () => '🐠',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'pricing', title: 'Pricing & Stock' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      group: 'basic',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Special Offers', value: 'special-offers' },
          { title: 'Livestock (Fish & Plants)', value: 'livestock' },
          { title: 'Aquarium Tanks & Furniture', value: 'tanks' },
          { title: 'Equipment & Hardware', value: 'equipment' },
          { title: 'Maintenance & Consumables', value: 'maintenance' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      group: 'basic',
      description: 'Select the subcategory for this product',
      options: {
        list: [
          // Special Offers
          { title: 'Combo Deals', value: 'combo-deals' },
          { title: 'Discount Coupons', value: 'discount-coupons' },
          // Livestock
          { title: 'Freshwater Fish', value: 'freshwater-fish' },
          { title: 'Marine Fish', value: 'marine-fish' },
          { title: 'Shrimp & Invertebrates', value: 'shrimp-inverts' },
          { title: 'Live Aquatic Plants', value: 'live-plants' },
          { title: 'Livestock Variants', value: 'livestock-variants' },
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
      group: 'pricing',
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: 'priceLabel',
      title: 'Price Label',
      type: 'string',
      group: 'pricing',
      description: 'e.g. "each", "per pair", "onwards"',
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Additional Images',
      type: 'array',
      group: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Optional additional product images',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'basic',
      rows: 3,
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      group: 'pricing',
      initialValue: true,
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      group: 'pricing',
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
    defineField({
      name: 'featured',
      title: 'Featured on Homepage?',
      type: 'boolean',
      group: 'basic',
      description: 'Show this product in the "Popular Right Now" section on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      group: 'basic',
      description: 'Lower number = shown first. Leave empty for default ordering.',
    }),
  ],
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Price Low → High',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
    {
      title: 'Price High → Low',
      name: 'priceDesc',
      by: [{ field: 'price', direction: 'desc' }],
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
      subtitle: 'category',
      media: 'image',
      price: 'price',
      inStock: 'inStock',
    },
    prepare({ title, subtitle, media, price, inStock }) {
      return {
        title: `${title}${inStock === false ? ' ❌' : ''}`,
        subtitle: `${subtitle} — ₹${price ?? '?'}`,
        media,
      };
    },
  },
});
