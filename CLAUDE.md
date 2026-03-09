# CLAUDE.md — FoodWithRuks Project State

> This file is the single source of truth for Claude Code. Read before every task. Update after every completed task.

## Project

**FoodWithRuks** — A modern recipe blog for an Instagram food creator. Sage green + monochrome palette + Japanese Ma (空間) design principles.

## Current State

**Phase**: Phase 1 + Phase 2 + partial Phase 4 + Major Restructure complete
**Last Updated**: 2026-03-09
**Last Task Completed**: Major restructure — new pages (Lifestyle, Shop), 4-group recipe filters, landing page overhaul, micro-interactions, image-free design

## Tech Stack

- Next.js 14+ (App Router) + TypeScript
- Tailwind CSS (custom design tokens via CSS variables)
- Firebase (Firestore enabled, Auth + Storage pending)
- Vercel (hosting — not connected yet, testing locally first)
- react-social-media-embed (Instagram embeds)

## Completed Features

- Next.js 16 project with TypeScript + App Router
- Tailwind CSS v4 with custom design tokens (@theme directive)
- Full design system — "Monochrome & Sage" palette (light/dark), Inter font, custom animations
- Dark mode toggle with system preference detection + localStorage
- Base UI components (Button with btn-press, Card with card-hover, Input, Textarea, Badge, Skeleton, StarRating, Modal, Logo)
- Layout: Header with scroll-based blur/shadow transition, 4-column Footer, MobileMenu slide-out, BackToTop button
- Landing page with 7 sections: Hero (gradient bg, split logo), Featured Recipes, Browse by Category (pill links), Meet Ruks (text-only), From the Kitchen Journal (lifestyle teaser), Shop Coming Soon, Stay Connected (newsletter)
- Scroll-based fade-in animations (IntersectionObserver + ScrollReveal) + stagger delays
- RecipeCard with FoodPlaceholder, RecipeGrid, FavoriteButton with localStorage + heart bounce
- Recipes listing page with 4-group filter system (Category, Meal Type, Special Diet, Special Occasion), search, sort, favorites
- Single recipe page with all sections (FoodPlaceholder hero, header, personal story, stats, ingredients with servings adjuster, instructions, tips, nutrition, share, related)
- Lifestyle page (/lifestyle) with category filter pills + 2-column article grid
- Lifestyle article pages (/lifestyle/[slug]) with prose content, share buttons, related posts
- Shop page (/shop) with coming-soon product grid + category filters + pulsing badges
- Schema.org Recipe JSON-LD structured data
- About page (text-only layout, no photo)
- Contact page with form + honeypot spam prevention
- Custom 404 page
- API routes (contact, comments, revalidation for /, /recipes, /lifestyle, /shop)
- SEO (metadata on all pages, sitemap.xml with recipe + lifestyle slugs, robots.txt)
- Firebase data layer (recipes.ts, categories.ts — ready for Firestore)
- Sample data: 6 recipes (with mealType + specialOccasion), 4 lifestyle posts, 6 products
- Print stylesheet (hides nav, footer, non-essential elements)
- Firebase client + admin SDK config files
- Micro-interactions: btn-press, card-hover, link-arrow, filter-pill, social-hover, heart bounce, star cascade, ingredient strikethrough, coming-soon-pulse, back-to-top-enter/exit, page enter, scroll reveal with stagger
- **Intentionally image-free design**: FoodPlaceholder component with SVG fork+knife icons replaces all images site-wide. Real images planned for Phase 5 when Firebase Storage is enabled.

## In Progress

_Major restructure complete. All public pages built. Phase 3 blocked by Firebase Auth. Ready for visual QA + polish._

## Environment Setup

- [x] Next.js project initialized (v16 with Turbopack)
- [x] Tailwind CSS configured with custom theme tokens
- [x] Firebase project created (project ID: foodwithruks-site)
- [x] Firestore database enabled (test mode)
- [ ] ~~Firebase Authentication enabled~~ — **DEFERRED: Enable later in Firebase Console (Build → Authentication → Email/Password)**
- [ ] ~~Firebase Storage enabled~~ — **DEFERRED: Requires Blaze plan. Enable later when ready for image uploads.**
- [x] Firebase client config obtained
- [x] Firebase Admin SDK service account key obtained
- [x] `.env.local` created with credentials
- [x] GitHub repo created (https://github.com/ssjabid/FoodWithRuks-Site)
- [ ] GitHub repo properly initialized with project files
- [ ] Vercel project linked — **DEFERRED: Testing locally first via npm run dev**

## IMPORTANT: Firebase Services Status

### Firestore: ✅ ENABLED
- Working in test mode
- All recipe CRUD, comments, contact messages will work

### Authentication: ❌ NOT YET ENABLED  
- **When needed**: Before building Phase 3 (Admin CMS)
- **How to enable**: Firebase Console → Build → Authentication → Get Started → Email/Password → Enable
- **Then**: Create admin user (email + password) in the Users tab
- **Then**: Set admin custom claim (Claude Code will provide a script)
- **Impact of not having it**: Admin pages won't work, but all public pages will work fine

### Storage: ❌ NOT YET ENABLED
- **When needed**: Before building image upload features (Phase 3 recipe editor)
- **How to enable**: Upgrade to Firebase Blaze plan (pay-as-you-go, free tier covers ~5GB), then enable Storage
- **Impact of not having it**: Image upload won't work, but we can use placeholder images for development
- **Workaround for dev**: Use placeholder image URLs or local /public/images/ folder

### Admin User: ❌ NOT YET CREATED
- **When needed**: Before testing admin login (Phase 3)
- **How to create**: After enabling Auth, add user in Firebase Console → Authentication → Users → Add User

## Firebase Config

- **Project ID**: foodwithruks-site
- **Auth Domain**: foodwithruks-site.firebaseapp.com
- **Storage Bucket**: foodwithruks-site.firebasestorage.app
- **App ID**: 1:334090891750:web:5b35465a31367f598e6627

## Local Development

- **Project path**: `H:\Abid - Documents\Documents\Abid - Projects\Abid - FoodWithRuks Project\foodwithruks-site`
- **GitHub**: https://github.com/ssjabid/FoodWithRuks-Site
- **Test with**: `npm run dev` → http://localhost:3000

## Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | This file — project state |
| `TASKS.md` | Task tracker with status |
| `INSTRUCTIONS.md` | Full project spec — design, architecture, data models |
| `.env.local` | Firebase credentials (NEVER commit) |
| `.env.example` | Template showing required env vars (safe to commit) |
| `src/styles/globals.css` | CSS variables (color palette, spacing) |
| `tailwind.config.ts` | Tailwind theme extending CSS variables |
| `src/lib/firebase/config.ts` | Firebase client config |
| `src/lib/firebase/admin.ts` | Firebase Admin config |
| `src/types/index.ts` | Shared TypeScript interfaces |

## Design System

- **Palette**: "Monochrome & Sage" — sage green (#5B7F5E) + white + monochrome
- **Dark mode**: Toggle with system preference detection (darker sage: #7A9E7E primary, #0A0C0A bg)
- **Font**: Inter only — weight 700-800 for headings (tracking-tight), weight 400-500 for body
- **Logo**: "FoodWith" in text-primary + "Ruks" in sage green (#5B7F5E)
- **Spacing**: 8px grid with generous Ma-inspired margins
- **Shadows**: Soft (sm: 2px/8px/0.04, md: 4px/16px/0.06, lg: 8px/32px/0.08)
- **Animations**: pageEnter, fadeInUp, fadeInLeft, heartBounce, gentlePulse, comingSoonPulse, stagger-1 through stagger-8, star-cascade, ingredient-checked, btn-press, card-hover, link-arrow, filter-pill, social-hover, back-to-top-enter/exit
- **Corners**: 16px on cards (--radius-lg), 10px on buttons (--radius-sm), 999px on badges/pills (--radius-badge)
- **Images**: Intentionally none — FoodPlaceholder component with SVG icons replaces all images. Real images via Firebase Storage planned for Phase 5.
- All colors as CSS custom properties — swap palette by editing ~12 values

## Firebase Collections

- `recipes` — All recipe documents (draft + published)
- `categories` — Recipe categories with order
- `comments` — Anonymous comments with moderation (pending/approved)
- `contactMessages` — Contact form submissions (read/unread)
- `siteSettings` — Global config (social links, hero, tagline, Instagram URLs)
- `lifestylePosts` — Blog articles (draft + published)
- `products` — Shop products (coming soon items)

## Key Architecture Decisions

- Server Components by default, Client Components only for interactivity
- ISR for recipe pages, on-demand revalidation via /api/revalidate
- Firebase Admin SDK server-side, Client SDK for admin + public writes
- Instagram embeds via react-social-media-embed (URL paste, no API tokens)
- Visitor favorites via localStorage (no account needed)
- Anonymous comments with honeypot + rate limiting + moderation queue
- Contact form saves to Firestore (admin reviews in dashboard)
- Scheduling-ready data model (scheduledAt field for future use)
- Images intentionally removed during development — FoodPlaceholder component used site-wide
- **For dev without Auth**: Public pages work fully, skip admin testing until Auth enabled
- Navigation: Recipes, About, Lifestyle, Shop, Contact (no Home or Categories links)
- 4-group recipe filter system with pill-based UI (Category, Meal Type, Special Diet, Special Occasion)

## Known Issues / Blockers

- Firebase Auth not enabled (blocks admin CMS — Phase 3)
- Firebase Storage not enabled (blocks image upload — Phase 3)
- Neither blocks Phase 1 or Phase 2 development

## Commands

```bash
npm run dev          # Local development → localhost:3000
npm run build        # Production build
npm run lint         # Linting
npm run seed         # Seed sample data (when available)
```

---

_Claude Code: After completing any task, update "Current State", "Last Updated", "Last Task Completed", "Completed Features", and any other relevant sections._
