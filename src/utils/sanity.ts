import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'i4hcwb1h',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

/* ── Product Queries ──────────────────────────────────────── */

export async function getProducts() {
  const query = `*[_type == "product"] | order(sortOrder asc, _createdAt desc) {
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
    availability,
    featured,
    sortOrder
  }`;
  return await sanityClient.fetch(query);
}

export async function getFeaturedProducts() {
  const query = `*[_type == "product" && featured == true && inStock == true] | order(sortOrder asc) [0...4] {
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

/* ── Special Offers ───────────────────────────────────────── */

export async function getSpecialOffers() {
  const query = `*[_type == "specialOffer" && isActive == true] | order(sortOrder asc) {
    "id": _id,
    title,
    subtitle,
    description,
    badge,
    "image": image.asset->url,
    ctaText,
    ctaLink
  }`;
  return await sanityClient.fetch(query);
}

/* ── Services ─────────────────────────────────────────────── */

export async function getServices() {
  const query = `*[_type == "service"] | order(sortOrder asc) {
    "id": _id,
    title,
    description,
    "image": image.asset->url,
    link
  }`;
  return await sanityClient.fetch(query);
}

/* ── Reviews ──────────────────────────────────────────────── */

export async function getReviews() {
  const query = `*[_type == "review" && featured == true] | order(sortOrder asc) {
    "id": _id,
    name,
    initials,
    text,
    rating,
    source
  }`;
  return await sanityClient.fetch(query);
}

/* ── FAQs ─────────────────────────────────────────────────── */

export async function getFaqs() {
  const query = `*[_type == "faq"] | order(sortOrder asc) {
    "id": _id,
    question,
    answer
  }`;
  return await sanityClient.fetch(query);
}

/* ── Singletons ───────────────────────────────────────────── */

export async function getHeroSection() {
  const query = `*[_type == "heroSection"][0] {
    label,
    heading,
    highlightText,
    description,
    "backgroundImage": backgroundImage.asset->url,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    stats
  }`;
  return await sanityClient.fetch(query);
}

export async function getAboutSection() {
  const query = `*[_type == "aboutSection"][0] {
    label,
    heading,
    paragraph1,
    paragraph2,
    highlights,
    "mainImage": mainImage.asset->url,
    "galleryImage1": galleryImage1.asset->url,
    "galleryImage2": galleryImage2.asset->url
  }`;
  return await sanityClient.fetch(query);
}

export async function getContactInfo() {
  const query = `*[_type == "contactInfo"][0] {
    storeName,
    phone,
    whatsapp,
    email,
    address,
    city,
    googleMapsUrl,
    openingHours
  }`;
  return await sanityClient.fetch(query);
}

export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    siteName,
    tagline,
    "logo": logo.asset->url,
    announcementBar,
    seoTitle,
    seoDescription,
    "ogImage": ogImage.asset->url,
    facebookUrl,
    instagramUrl,
    youtubeUrl
  }`;
  return await sanityClient.fetch(query);
}
