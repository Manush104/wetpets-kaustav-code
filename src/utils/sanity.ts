import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'smg3m7h8',  // Sanity project ID
  dataset: 'production', // Dataset name
  useCdn: true,          // Use CDN for faster read responses
  apiVersion: '2023-05-03', // API version
});

export async function getProducts() {
  const query = `*[_type == "product"]{
    "id": _id,
    name,
    "slug": slug.current,
    category,
    subcategory,
    price,
    priceLabel,
    "image": image.asset->url,
    description,
    inStock,
    availability
  }`;
  return await sanityClient.fetch(query);
}
