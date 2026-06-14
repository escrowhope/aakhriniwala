# Akhri Niwala — Website

**"Worth the last bite."** A static, mobile-first, bilingual (English/اردو) site for a premium
Lahore home-food brand. Pure HTML + CSS + vanilla JS. No build step, no framework, no paid platform.
Built to be hosted free on **GitHub Pages** with a custom domain from **Google Domains**.

---

## 0. Before you launch — find & replace these placeholders

Do a project-wide find & replace (every file) for each of these:

| Placeholder | Replace with | Appears in |
|-------------|--------------|------------|
| `923001234567` | Your real WhatsApp number, intl format, no `+` or spaces (e.g. `923211234567`) | every WhatsApp link |
| `akhriniwala.com` | Your real domain (only if different) | meta tags, schema, sitemap, CNAME |
| `@akhriniwala` | Your real Instagram/TikTok handle | header, footer, IG section |
| `YOUR_FORM_ID` | Your Formspree form id | `contact/index.html` |
| `PASTE_TOKEN_HERE` | Google Search Console verification token | `index.html` `<head>` (uncomment it) |
| `+92-300-1234567` | Real phone in schema | `index.html` JSON-LD |

> Tip in VS Code: `Ctrl+Shift+H` → enter the placeholder → "Replace All".

---

## 1. File structure

```
/                         index.html  (homepage)
/css/style.css            entire design system (colours, type, layout, animations, RTL)
/js/translations.js       EN + Urdu dictionary  (add new strings here)
/js/main.js               language toggle, scroll reveal, mobile menu, FAQ, PDP selector
/assets/                  images go here  (see assets/README-images.md)
/shop/                    category landing (the directory, not a menu dump)
/shop/baked-goods/brownies/   category page template (4 variants + BOOK CUSTOM)
/product/premium-fudge-brownie-box/   individual product page template (with FAQ + schema)
/our-story/  /how-it-works/  /contact/   content pages
/reviews/  /blog/         folders ready for you to fill
404.html  robots.txt  sitemap.xml  CNAME   technical files
```

**To add a new category page:** copy `shop/baked-goods/brownies/index.html`, change the copy,
products and prices. **To add a new product page:** copy the `product/.../index.html` template.

---

## 2. Publish on GitHub Pages (free)

1. Create a free account at **github.com**.
2. Create a new repository named **`<your-username>.github.io`** (exact name = your live URL).
   Set it **Public**. Don't add a README (you already have one).
3. Upload the files — easiest path with no Git knowledge:
   - On the repo page → **Add file → Upload files** → drag in **the contents of this folder**
     (so `index.html` sits at the repo root, not inside a subfolder) → **Commit changes**.
   - Or with Git installed:
     ```bash
     git init
     git add .
     git commit -m "Launch Akhri Niwala site"
     git branch -M main
     git remote add origin https://github.com/<username>/<username>.github.io.git
     git push -u origin main
     ```
4. Repo → **Settings → Pages** → **Source: Deploy from a branch**, Branch: **main**, folder **/ (root)** → Save.
5. Wait ~1–2 minutes. Your site is live at `https://<username>.github.io`.

---

## 3. Custom domain (Google Domains → Squarespace Domains)

> Note: Google Domains was acquired by **Squarespace Domains** — same thing, the DNS steps are identical.
> For this brand buy the **`.com`** (`akhriniwala.com`): it's what Pakistanis type by default, it travels
> internationally for your nationwide shipping, and `.com` reads more premium than `.pk` for a gifting brand.
> (Optionally also grab `.pk` and forward it to the `.com` so nobody else takes it.)

**Connect it to GitHub Pages:**
1. In your repo, the `CNAME` file already contains `akhriniwala.com`. (Change it if your domain differs.)
2. In your domain registrar's **DNS settings**, add these records:

   **Four A records** (point apex domain → GitHub):
   ```
   A   @   185.199.108.153
   A   @   185.199.109.153
   A   @   185.199.110.153
   A   @   185.199.111.153
   ```
   **One CNAME** (the www subdomain):
   ```
   CNAME   www   <your-username>.github.io.
   ```
3. Back in **repo → Settings → Pages → Custom domain**, type `akhriniwala.com` → Save.
4. DNS takes 15 min–24 hrs to propagate. Once it's green, tick **Enforce HTTPS** (free SSL from GitHub).
   Always leave this ON — it's required for SEO, the Meta pixel, and customer trust.

---

## 4. Business email — Google Workspace

Personal Gmail looks amateur on a premium brand. Set up **Google Workspace** (≈ $6/user/month):

1. Go to **workspace.google.com → Get started**, enter your domain `akhriniwala.com`.
2. Google gives you a few **MX records** to add in the same DNS panel as above. Add them exactly.
3. Create these addresses (aliases are free — point them all to one inbox to start):
   - **orders@akhriniwala.com** — the one on the site, where orders land
   - **hello@akhriniwala.com** — general / press / influencer outreach
   - **support@akhriniwala.com** — issues, replacements, after-sales
4. Set a Gmail signature with the logo, tagline and WhatsApp link.

> Cheaper interim option: **Zoho Mail** has a free tier for one custom-domain mailbox.
> You can start on Zoho and migrate to Workspace once orders are flowing.

---

## 5. Performance baseline (already built in)

- **Fonts:** `preconnect` to Google Fonts + a single combined `display=swap` request (no invisible text).
- **JS:** loaded with `defer` so it never blocks rendering. Total JS is ~6KB, no libraries.
- **CSS:** one small file; critical styles are simple enough to stay external and still be fast.
- **Lazy loading:** when you add real `<img>` tags, include `loading="lazy"` + `width`/`height`
  (prevents layout shift). Background-image slots load only when their section appears.
- **Images:** convert to **WebP** at sizes in `assets/README-images.md` before upload. This is the
  single biggest speed lever on GitHub Pages.
- **Reduced motion:** animations auto-disable for users who request it (accessibility + no jank).
- **Target:** 90+ on Google PageSpeed Insights mobile once images are optimised.

---

## 6. The bilingual system (how to extend it)

- Any text that should translate carries `data-i18n="some.key"`.
- Add the key to **both** `en` and `ur` in `js/translations.js`. Done — the toggle handles the rest
  (text swap, `dir="rtl"`, Urdu font, layout flip, saved in localStorage).
- Prices/phone numbers: wrap the number in `<span data-num="1,200">1,200</span>` and it auto-renders
  Urdu numerals (۱،۲۰۰) in Urdu mode.
- The homepage is fully translated as the reference. Inner-page nav/footer already translate;
  to translate an inner page's body, give its elements `data-i18n` keys and add the Urdu strings.

---

*Made with love in Lahore 🇵🇰*
