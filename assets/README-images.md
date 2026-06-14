# Image drop-in guide — Akhri Niwala

The site is built so you can add real photos **without touching any HTML**. Each visual
slot reads a CSS variable. Drop your optimised image into `/assets/` and set the variable.

## How to "turn on" a photo
Open `css/style.css` and set the variable, OR add a tiny `style="..."` on the element.

| Slot | CSS variable | Where it shows | Exact size (WebP) |
|------|--------------|----------------|-------------------|
| Hero background | `--hero-img` | Homepage hero | 1920×1080 |
| Category cards | `--cat-img` (per card) | Homepage + /shop | 800×600 |
| Product card image | `--prod-img` | All product cards | 600×600 |
| Story portrait | `--story-img` | Homepage story + /our-story | 1000×1250 (4:5) |
| Product detail hero | `--pdp-img` | Product pages | 1200×1200 |
| Instagram cells | `--ig-img` | Homepage IG grid | 600×600 |
| OG share image | (file) `og-cover.jpg` | Social link previews | 1200×630 |

### Example — set the hero photo
In `css/style.css`, change the `.hero::before` rule, or add to `index.html` hero:
```html
<section class="hero" style="--hero-img:url('/assets/hero-kitchen.webp')">
```

### Example — set a category card photo
```html
<a class="cat-card" style="--cat-img:url('/assets/cat-baked.webp')" href="...">
```

## Photography spec (shoot brief)
- **Light:** natural window light only. No flash, no orange tungsten.
- **Surfaces:** cream cloth, wood, brass, marble. Never plastic.
- **Always include:** steam, hands in frame (her hands = the brand), one human detail.
- **Hero shot:** wide, slightly overhead, food + hands + warm background blur.
- **Product shots:** straight-on or 45°, single hero product, lots of negative space.
- **Do NOT use stock photos.** An empty cream placeholder beats a fake photo.

## Optimisation protocol (free, required before upload)
1. Shoot/export at the exact pixel size above (never upload a 4000px phone photo).
2. Convert to **WebP** at **squoosh.app** (free, by Google) — quality 75–80.
3. Target weights: hero < 200KB, product/category < 90KB, IG cells < 60KB.
4. Name files lowercase-with-dashes: `chicken-karahi.webp`, `fudge-brownie-box.webp`.
5. Every `<img>` you add should include: `loading="lazy"` `width` `height` and descriptive `alt`.
   Alt text formula: `[dish] — [key detail], freshly cooked by Akhri Niwala, Lahore`.
