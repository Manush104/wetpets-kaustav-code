export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'livestock' | 'tanks' | 'equipment' | 'maintenance';
  subcategory: string;
  price: number;         // INR
  priceLabel?: string;   // e.g. "per pair", "onwards"
  image: string;
  description: string;
  inStock: boolean;
  availability?: string; // e.g. "In Store", "Pre-order", "Limited Stock"
}

/* ────────────────────────────────────────────────────────────
   CATEGORY TREE
   ──────────────────────────────────────────────────────────── */
export interface CategoryGroup {
  id: Product['category'];
  label: string;
  image: string;       // background image path for card UI
  subcategories: { id: string; label: string }[];
}

export const categoryTree: CategoryGroup[] = [
  {
    id: 'livestock',
    label: 'Livestock',
    image: '/wetpets-kaustav-code/assets/images/categories/livestock.png',
    subcategories: [
      { id: 'freshwater-fish',  label: 'Freshwater Fish' },
      { id: 'marine-fish',      label: 'Marine Fish' },
      { id: 'shrimp-inverts',   label: 'Shrimp & Invertebrates' },
      { id: 'live-plants',      label: 'Live Aquatic Plants' },
    ],
  },
  {
    id: 'tanks',
    label: 'Aquarium Tanks & Furniture',
    image: '/wetpets-kaustav-code/assets/images/categories/tanks.jpg',
    subcategories: [
      { id: 'starter-kits',     label: 'Starter Kits' },
      { id: 'specialty-tanks',  label: 'Specialty Tanks' },
      { id: 'stands-cabinetry', label: 'Stands & Cabinetry' },
    ],
  },
  {
    id: 'equipment',
    label: 'Equipment & Hardware',
    image: '/wetpets-kaustav-code/assets/images/categories/equipment.jpg',
    subcategories: [
      { id: 'filtration',       label: 'Filtration Systems' },
      { id: 'lighting',         label: 'Lighting' },
      { id: 'heaters-thermo',   label: 'Heaters & Thermometers' },
      { id: 'air-pumps-wave',   label: 'Air Pumps & Wave Makers' },
      { id: 'co2-systems',      label: 'CO₂ Systems' },
    ],
  },
  {
    id: 'maintenance',
    label: 'Maintenance & Consumables',
    image: '/wetpets-kaustav-code/assets/images/categories/maintenance.png',
    subcategories: [
      { id: 'fish-food',        label: 'Fish Food' },
      { id: 'water-conditioners', label: 'Water Conditioners & Chemicals' },
      { id: 'fertilizers',      label: 'Fertilizers' },
      { id: 'substrates-decor', label: 'Substrates & Decor' },
    ],
  },
];

/* Flat list for simple filter tabs */
export const categories = categoryTree.map(c => ({ id: c.id, label: c.label }));

/* ────────────────────────────────────────────────────────────
   PRODUCTS
   ──────────────────────────────────────────────────────────── */
export const products: Product[] = [
  // ── Livestock ──────────────────────────────────────────────
  {
    id: 'l1',
    name: 'Neon Tetra',
    slug: 'neon-tetra',
    category: 'livestock',
    subcategory: 'freshwater-fish',
    price: 30,
    priceLabel: 'each',
    image: '/wetpets-kaustav-code/assets/images/fish/tropical.jpg',
    description: 'Bright neon-blue and red schooling fish. Best kept in groups of 6+.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 'l2',
    name: 'Fancy Guppy',
    slug: 'fancy-guppy',
    category: 'livestock',
    subcategory: 'freshwater-fish',
    price: 50,
    priceLabel: 'per pair',
    image: '/wetpets-kaustav-code/assets/images/fish/tropical.jpg',
    description: 'Colorful and hardy. Available in multiple tail and color varieties.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 'l3',
    name: 'Oranda Goldfish',
    slug: 'oranda-goldfish',
    category: 'livestock',
    subcategory: 'freshwater-fish',
    price: 250,
    priceLabel: 'each',
    image: '/wetpets-kaustav-code/assets/images/fish/goldfish.jpg',
    description: 'Fancy goldfish with a prominent head growth (wen). Multiple colors available.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 'l4',
    name: 'Flowerhorn',
    slug: 'flowerhorn',
    category: 'livestock',
    subcategory: 'freshwater-fish',
    price: 800,
    priceLabel: 'onwards',
    image: '/wetpets-kaustav-code/assets/images/fish/cichlid.jpg',
    description: 'Vibrant hybrid cichlid with a distinctive nuchal hump. Imported varieties.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 'l5',
    name: 'Discus Fish',
    slug: 'discus',
    category: 'livestock',
    subcategory: 'freshwater-fish',
    price: 1500,
    priceLabel: 'onwards',
    image: '/wetpets-kaustav-code/assets/images/fish/cichlid.jpg',
    description: 'The king of freshwater fish. Available in multiple strains and patterns.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 'l6',
    name: 'Silver Arowana',
    slug: 'silver-arowana',
    category: 'livestock',
    subcategory: 'freshwater-fish',
    price: 2000,
    priceLabel: 'onwards',
    image: '/wetpets-kaustav-code/assets/images/fish/arowana.jpg',
    description: 'Majestic predatory fish with shimmering silver scales.',
    inStock: true,
    availability: 'Limited Stock',
  },
  {
    id: 'l7',
    name: 'Halfmoon Betta',
    slug: 'halfmoon-betta',
    category: 'livestock',
    subcategory: 'freshwater-fish',
    price: 350,
    priceLabel: 'each',
    image: '/wetpets-kaustav-code/assets/images/fish/betta.jpg',
    description: 'Siamese fighting fish with a spectacular 180° tail spread.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 'l8',
    name: 'Oscar Fish',
    slug: 'oscar',
    category: 'livestock',
    subcategory: 'freshwater-fish',
    price: 400,
    priceLabel: 'onwards',
    image: '/wetpets-kaustav-code/assets/images/fish/cichlid.jpg',
    description: 'Intelligent, personable cichlid. Tiger and albino variants available.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 'l9',
    name: 'Clown Loach',
    slug: 'clown-loach',
    category: 'livestock',
    subcategory: 'freshwater-fish',
    price: 300,
    priceLabel: 'each',
    image: '/wetpets-kaustav-code/assets/images/fish/sharks.jpg',
    description: 'Playful bottom-dweller with vibrant orange and black bands.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 'l10',
    name: 'Angelfish',
    slug: 'angelfish',
    category: 'livestock',
    subcategory: 'freshwater-fish',
    price: 150,
    priceLabel: 'per pair',
    image: '/wetpets-kaustav-code/assets/images/fish/tropical.jpg',
    description: 'Elegant freshwater fish. Available in marble, koi, platinum and more.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 'l11',
    name: 'Cherry Shrimp',
    slug: 'cherry-shrimp',
    category: 'livestock',
    subcategory: 'shrimp-inverts',
    price: 40,
    priceLabel: 'each',
    image: '/wetpets-kaustav-code/assets/images/fish/tropical.jpg',
    description: 'Popular freshwater shrimp with vivid red coloration. Great algae cleaner.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 'l12',
    name: 'Java Fern',
    slug: 'java-fern',
    category: 'livestock',
    subcategory: 'live-plants',
    price: 120,
    priceLabel: 'each',
    image: '/wetpets-kaustav-code/assets/images/services/service-plants.jpg',
    description: 'Hardy aquatic plant that thrives in low-light conditions. Attach to driftwood.',
    inStock: true,
    availability: 'In Store',
  },

  // ── Tanks & Furniture ──────────────────────────────────────
  {
    id: 't1',
    name: 'Nano Desk Aquarium — 20L',
    slug: 'nano-20l',
    category: 'tanks',
    subcategory: 'starter-kits',
    price: 1200,
    image: '/wetpets-kaustav-code/assets/images/services/service-tanks.jpg',
    description: 'Compact rimless glass tank, perfect for a betta or small shrimp colony.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 't2',
    name: 'Standard Tank — 100L',
    slug: 'standard-100l',
    category: 'tanks',
    subcategory: 'starter-kits',
    price: 3500,
    image: '/wetpets-kaustav-code/assets/images/services/service-tanks.jpg',
    description: 'Versatile mid-size tank for community setups. Includes hood.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 't3',
    name: 'Display Aquarium — 300L',
    slug: 'display-300l',
    category: 'tanks',
    subcategory: 'specialty-tanks',
    price: 12000,
    image: '/wetpets-kaustav-code/assets/images/services/service-tanks.jpg',
    description: 'Premium large tank with cabinet stand. Ideal for cichlids and large species.',
    inStock: true,
    availability: 'In Store',
  },

  // ── Equipment & Hardware ──────────────────────────────────
  {
    id: 'e1',
    name: 'Sponge Filter — Medium',
    slug: 'sponge-filter-m',
    category: 'equipment',
    subcategory: 'filtration',
    price: 180,
    image: '/wetpets-kaustav-code/assets/images/services/service-equipment.jpg',
    description: 'Gentle biological filtration. Great for shrimp tanks and fry.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 'e2',
    name: 'Canister Filter — 1200L/h',
    slug: 'canister-filter',
    category: 'equipment',
    subcategory: 'filtration',
    price: 4500,
    image: '/wetpets-kaustav-code/assets/images/services/service-equipment.jpg',
    description: 'High-capacity external canister filter for medium to large tanks.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 'e3',
    name: 'Aquarium Heater — 200W',
    slug: 'heater-200w',
    category: 'equipment',
    subcategory: 'heaters-thermo',
    price: 650,
    image: '/wetpets-kaustav-code/assets/images/services/service-equipment.jpg',
    description: 'Adjustable submersible heater with thermostat. Suitable up to 200L.',
    inStock: true,
    availability: 'In Store',
  },

  // ── Maintenance & Consumables ─────────────────────────────
  {
    id: 'm1',
    name: 'Floating Fish Food — 100g',
    slug: 'fish-food-100g',
    category: 'maintenance',
    subcategory: 'fish-food',
    price: 120,
    image: '/wetpets-kaustav-code/assets/images/services/service-food.jpg',
    description: 'High-protein floating pellets for tropical and goldfish.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 'm2',
    name: 'Live Aquatic Plant Bundle',
    slug: 'plant-bundle',
    category: 'maintenance',
    subcategory: 'substrates-decor',
    price: 300,
    priceLabel: 'per bundle',
    image: '/wetpets-kaustav-code/assets/images/services/service-plants.jpg',
    description: 'Assorted live plants — Java Fern, Anubias, Vallisneria.',
    inStock: true,
    availability: 'In Store',
  },
  {
    id: 'm3',
    name: 'Driftwood — Medium',
    slug: 'driftwood-m',
    category: 'maintenance',
    subcategory: 'substrates-decor',
    price: 500,
    priceLabel: 'each',
    image: '/wetpets-kaustav-code/assets/images/services/service-plants.jpg',
    description: 'Natural driftwood piece for aquascaping. Pre-soaked and ready.',
    inStock: true,
    availability: 'In Store',
  },
];
