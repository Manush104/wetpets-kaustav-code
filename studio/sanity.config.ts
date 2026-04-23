import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import type { StructureBuilder } from 'sanity/structure';
import { Logo } from './components/Logo';

/* ── Custom Desk Structure ────────────────────────────────── */
const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Wet Pets Admin')
    .items([
      // ── Shop ──
      S.listItem()
        .title('🐠 Products')
        .schemaType('product')
        .child(S.documentTypeList('product').title('All Products')),

      S.listItem()
        .title('🏷️ Special Offers')
        .schemaType('specialOffer')
        .child(S.documentTypeList('specialOffer').title('Special Offers')),

      S.divider(),

      // ── Website Content ──
      S.listItem()
        .title('⚙️ What We Offer (Services)')
        .schemaType('service')
        .child(S.documentTypeList('service').title('What We Offer')),

      S.listItem()
        .title('⭐ Customer Reviews')
        .schemaType('review')
        .child(S.documentTypeList('review').title('Customer Reviews')),

      S.listItem()
        .title('❓ FAQs')
        .schemaType('faq')
        .child(S.documentTypeList('faq').title('FAQ Items')),

      S.divider(),

      // ── Page Sections (Singletons) ──
      S.listItem()
        .title('🏠 Hero Section')
        .child(
          S.document()
            .schemaType('heroSection')
            .documentId('heroSection')
            .title('Hero Section'),
        ),

      S.listItem()
        .title('📖 About Section')
        .child(
          S.document()
            .schemaType('aboutSection')
            .documentId('aboutSection')
            .title('About Section'),
        ),

      S.divider(),

      // ── Settings ──
      S.listItem()
        .title('📞 Contact Info')
        .child(
          S.document()
            .schemaType('contactInfo')
            .documentId('contactInfo')
            .title('Contact Information'),
        ),

      S.listItem()
        .title('⚙️ Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),
    ]);

/* ── Sanity Config ────────────────────────────────────────── */
export default defineConfig({
  name: 'wetpets',
  title: 'Wet Pets — Admin Panel',

  projectId: 'i4hcwb1h',
  dataset: 'production',

  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      logo: Logo,
    },
  },
});
