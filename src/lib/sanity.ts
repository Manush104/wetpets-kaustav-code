/**
 * Sanity CMS Client
 *
 * Once your Sanity project is set up:
 * 1. Copy .env.example → .env
 * 2. Fill in SANITY_PROJECT_ID and SANITY_DATASET
 * 3. Products and contact info will be fetched from Sanity
 *
 * Until then, the site uses local placeholder data from src/data/
 */

import { createClient, type SanityClient } from '@sanity/client';

const projectId = import.meta.env.SANITY_PROJECT_ID ?? 'i4hcwb1h';
const dataset   = import.meta.env.SANITY_DATASET ?? 'production';
const token     = import.meta.env.SANITY_TOKEN ?? '';

export const isSanityConfigured = !!projectId;

let client: SanityClient | null = null;

if (isSanityConfigured) {
  client = createClient({
    projectId,
    dataset,
    token: token || undefined,
    useCdn: true,
    apiVersion: '2024-01-01',
  });
}

export { client };

/** Helper to run a GROQ query — returns null when Sanity isn't configured */
export async function query<T = unknown>(
  groq: string,
  params?: Record<string, unknown>,
): Promise<T | null> {
  if (!client) return null;
  return client.fetch<T>(groq, params ?? {});
}
