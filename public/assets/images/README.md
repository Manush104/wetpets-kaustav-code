# Wet Pets — Image Assets

This folder contains all images used on the Wet Pets website.
Replace the placeholder JPG files with real photos from the business listing.

---

## Folder Structure

```
public/assets/images/
│
├── hero/
│   └── hero-main.jpg          ← Main hero banner (recommended: 1920×1080px or wider, landscape)
│
├── store/
│   ├── store-interior.jpg     ← Interior view of the store (used in About section, left large image)
│   ├── store-tanks.jpg        ← Close-up of display tanks (About section, bottom-left small)
│   └── store-fish.jpg         ← Fish in tank close-up (About section, bottom-right small)
│
├── fish/
│   ├── tropical.jpg           ← Tropical & tetra fish (Neon Tetras, Guppies, Angelfish, etc.)
│   ├── goldfish.jpg           ← Goldfish & Koi varieties
│   ├── cichlid.jpg            ← Cichlids (Discus, Oscar, Flowerhorn, Parrot Fish)
│   ├── arowana.jpg            ← Arowana fish
│   ├── betta.jpg              ← Betta / Siamese Fighting Fish
│   ├── sharks.jpg             ← Redtail Shark, Bala Shark, Clown Loach
│   ├── gourami.jpg            ← Gouramis, Barbs, Rainbow Fish
│   └── specialty.jpg         ← Specialty/rare fish (Puffer, Bichir, Piranha)
│
└── services/
    ├── service-fish.jpg        ← Live fish service card image
    ├── service-tanks.jpg       ← Aquariums & tanks service card image
    ├── service-equipment.jpg   ← Filters / equipment service card image
    ├── service-plants.jpg      ← Plants & decor service card image
    ├── service-food.jpg        ← Fish food service card image
    └── service-advice.jpg      ← Expert advice service card image
```

---

## Image Guidelines

| Use Case       | Recommended Size  | Format | Notes                              |
|----------------|-------------------|--------|------------------------------------|
| Hero image     | 1920 × 1080 px    | JPG    | Compress to < 400KB                |
| About (main)   | 800 × 600 px      | JPG    | Portrait or landscape works        |
| About (small)  | 400 × 400 px      | JPG    | Square crop recommended            |
| Fish cards     | 600 × 450 px      | JPG    | 4:3 ratio, dark background ideal   |
| Service cards  | 800 × 450 px      | JPG    | 16:9 ratio                         |

- **Prefer dark or moody backgrounds** — they integrate naturally with the site's charcoal palette.
- Compress all images before uploading (use [Squoosh](https://squoosh.app) or similar).
- Keep filenames exactly as listed above, or update `src/components/*.astro` references accordingly.

---

## How to Replace Placeholder Images

1. Prepare your photo (resize + compress as per the table above).
2. Name it exactly as listed in the folder structure.
3. Drop it into the appropriate folder under `public/assets/images/`.
4. The site will automatically use it — no code changes needed.
