# CLAUDE.md — FoodWithRuks Project State

> This file is the single source of truth for Claude Code. Read before every task. Update after every completed task.

## Project

**FoodWithRuks** — A modern recipe blog for an Instagram food creator. Sage green + monochrome palette + Japanese Ma (空間) design principles.

## Current State

**Phase**: Phase 1 + Phase 2 + Phase 3 (Admin CMS) + partial Phase 4 + Major Restructure + UI Refinement + Animation Overhaul + UI Consistency Pass + Mobile Responsiveness Pass complete
**Last Updated**: 2026-03-13
**Last Task Completed**: Multi-admin support — ADMIN_EMAIL env var now supports comma-separated emails for multiple admins (verify route + authCheck). Previous: Mobile & Tablet Responsiveness Pass — Fixed admin CMS overflow issues (RecipeForm ingredient/instruction rows, timing grid, action buttons; LifestyleForm/ProductForm action buttons), improved admin dashboard/comments card layout for small screens, fixed MobileMenu portal (createPortal to body to escape framer-motion stacking context), fixed hamburger menu useEffect dependency bug. All public and admin pages verified at 375px/768px/1280px with zero horizontal overflow. 39 routes, zero build errors.

## Tech Stack

- Next.js 14+ (App Router) + TypeScript
- Tailwind CSS (custom design tokens via CSS variables)
- Firebase (Firestore enabled, Auth with Google Sign-In, Storage pending)
- Framer Motion (animations + micro-interactions)
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
- **Framer Motion animation overhaul**: iOS-style sliding nav pill (layoutId), page transitions (fade+slide on all pages), card hover lift (-8px) + inner zoom (1.06), button fill-from-left hover effect, staggered scroll cascades (StaggerContainer/StaggerItem with spring physics), glassmorphism header (blur+opacity on scroll), mobile menu right drawer (AnimatePresence + spring), bouncy filter pills (scale 1→1.08→1), heart bounce+glow ring, inline newsletter submit, sun/moon morph dark mode toggle (AnimatePresence), scroll progress bar on recipe pages (useScroll+useSpring), share buttons with whileHover/whileTap + "Copied" morph, animated ingredient checkboxes (bounce + line-through), star rating cascade (60ms delay per star), nutrition section AnimatePresence expand/collapse
- **Intentionally image-free design**: FoodPlaceholder component with SVG fork+knife icons replaces all images site-wide. Real images planned for Phase 5 when Firebase Storage is enabled.
- **UI Refinement pass complete**: Standardized sizing system (h-9 filter pills/action buttons, h-11 CTA buttons/inputs, w-10 h-10 icon buttons), collapsible recipe filter panel with active count badge, max-w-6xl containers on all pages with py-16 sm:py-20 spacing, unified card design (aspect-[4/3] placeholders, p-4 content, text-base font-bold titles), 4-column footer with inline newsletter, centered hero section, 3-card featured grid, dark mode polished
- **UI Consistency pass (DRY)**: Reusable FilterPill component (`src/components/ui/FilterPill.tsx`) used across /recipes, /lifestyle, /shop — eliminated 3 duplicate inline implementations. AnimatedDropdown component (`src/components/ui/AnimatedDropdown.tsx`) replaces native `<select>` with spring-animated popup + chevron rotation + click-outside-close. Standardized all h2 section headings (5 home sections + 1 lifestyle post) from `text-3xl sm:text-4xl font-extrabold` to `text-2xl sm:text-3xl font-bold` — clear hierarchy: h1=extrabold, h2=bold. DRY audit confirmed cards (p-4), badges, text colors, spacing, grid gaps were already consistent.
- **Phase 3 Admin CMS complete**: Google Auth (signInWithPopup + GoogleAuthProvider), server-side admin verification (ADMIN_EMAIL env var — never exposed to browser), admin dashboard with sidebar layout, full CRUD editors for recipes/lifestyle/products, comment moderation (approve/delete), contact message management (read/unread/delete), all admin API routes protected with Bearer token + verifyAdminRequest helper. No image upload — URL text fields only (Firebase Storage not enabled). Public pages read from Firestore with sample data fallback pattern.
- **Mobile & Tablet Responsiveness pass complete**: Admin CMS responsive fixes (RecipeForm ingredient rows stack on mobile, instruction image URL below textarea, timing grid 1→3 cols, action buttons stack on mobile; same for LifestyleForm/ProductForm). Admin dashboard date hidden on small screens, comment cards flex-wrap. MobileMenu rendered via `createPortal` to `document.body` to escape framer-motion's `transform` stacking context — full-viewport overlay now works correctly. Fixed useEffect dependency bug that prevented menu from opening. All pages verified at 375px, 768px, 1280px with zero horizontal overflow.

## In Progress

_Mobile responsiveness pass complete. Ready for: Firebase Auth enablement in Console (Google Sign-In provider), Firestore security rules, image uploads (requires Firebase Storage/Blaze plan)._

## Environment Setup

- [x] Next.js project initialized (v16 with Turbopack)
- [x] Tailwind CSS configured with custom theme tokens
- [x] Firebase project created (project ID: foodwithruks-site)
- [x] Firestore database enabled (test mode)
- [ ] Firebase Authentication — **Code complete (Google Sign-In). Enable in Firebase Console: Build → Authentication → Get Started → Google provider → Enable. Then sign in with ADMIN_EMAIL account.**
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

### Authentication: ⚠️ CODE COMPLETE — NEEDS CONSOLE SETUP
- **What's built**: Google Sign-In (client-side) + server-side admin verification (ADMIN_EMAIL env var, comma-separated for multiple admins, never exposed to browser)
- **How to enable**: Firebase Console → Build → Authentication → Get Started → Google provider → Enable
- **Then**: Sign in with the Google account matching ADMIN_EMAIL in `.env.local`
- **Security**: Admin verification is server-side only — `verifyAdminRequest()` checks Firebase ID token + email against `process.env.ADMIN_EMAIL` (comma-separated list)
- **No custom claims needed** — admin check is purely email-based, server-side
- **Multiple admins**: Set `ADMIN_EMAIL=admin1@gmail.com,admin2@gmail.com` in `.env.local`

### Storage: ❌ NOT YET ENABLED
- **When needed**: Before enabling image upload in admin editors
- **How to enable**: Upgrade to Firebase Blaze plan (pay-as-you-go, free tier covers ~5GB), then enable Storage
- **Current workaround**: Admin editors use URL text fields for images (no file upload)

### Firestore Security Rules: ⚠️ NEEDS SETUP
- **Current**: Test mode (all reads/writes allowed)
- **Recommended rules**:
  - Public read on published recipes, lifestyle posts, products
  - Authenticated admin write on all collections
  - Anonymous create on comments and contactMessages (with validation)
  - Deny all other writes

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
| `src/components/ui/FilterPill.tsx` | Reusable filter pill (used on recipes, lifestyle, shop) |
| `src/components/ui/AnimatedDropdown.tsx` | Animated custom dropdown (replaces native select) |
| `src/hooks/useAuth.ts` | Client-side auth hook (Google sign-in, admin verification) |
| `src/lib/adminFetch.ts` | Authenticated fetch helper (attaches Bearer token) |
| `src/lib/firebase/authCheck.ts` | Server-side admin verification (verifyAdminRequest) |
| `src/lib/firebase/recipes.ts` | Recipe CRUD + public queries |
| `src/lib/firebase/lifestyle.ts` | Lifestyle post CRUD + public queries |
| `src/lib/firebase/products.ts` | Product CRUD + public queries |
| `src/lib/firebase/comments.ts` | Comment moderation (approve/delete) |
| `src/lib/firebase/messages.ts` | Contact message management |

## Design System

- **Palette**: "Monochrome & Sage" — sage green (#5B7F5E) + white + monochrome
- **Dark mode**: Toggle with system preference detection (darker sage: #7A9E7E primary, #0A0C0A bg)
- **Font**: Inter only — weight 700-800 for headings (tracking-tight), weight 400-500 for body
- **Logo**: "FoodWith" in text-primary + "Ruks" in sage green (#5B7F5E)
- **Spacing**: 8px grid with generous Ma-inspired margins
- **Shadows**: Soft (sm: 2px/8px/0.04, md: 4px/16px/0.06, lg: 8px/32px/0.08)
- **Animations**: pageEnter, fadeInUp, fadeInLeft, heartBounce, gentlePulse, comingSoonPulse, stagger-1 through stagger-8, star-cascade, ingredient-checked, btn-press, card-hover, link-arrow, filter-pill, social-hover, back-to-top-enter/exit
- **Corners**: 16px on cards (--radius-lg), 10px on buttons (--radius-sm), 999px on badges/pills (--radius-badge)
- **Sizing**: Filter pills h-9 px-4 rounded-full, CTA buttons h-11 px-6, inputs h-11, icon buttons w-10 h-10
- **Containers**: max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
- **Section spacing**: py-16 sm:py-20, heading-to-content mb-8 sm:mb-10, grid gaps gap-5 sm:gap-6
- **Page header**: h1 text-3xl sm:text-4xl font-extrabold tracking-tight mb-2, p text-[color-text-secondary] text-base sm:text-lg
- **Cards**: aspect-[4/3] placeholder, p-4 content, text-base font-bold title, bg-[var(--color-elevated)]
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
- **Admin auth pattern**: Google Sign-In (client) → Bearer token → server-side verifyAdminRequest (Firebase Admin verifyIdToken + ADMIN_EMAIL check). ADMIN_EMAIL supports comma-separated list for multiple admins. Server-side only (no NEXT_PUBLIC_ prefix)
- **Public pages Firestore pattern**: Server component fetches from Firestore, falls back to sample data if empty/error
- **For dev without Auth**: Public pages work fully, skip admin testing until Auth enabled in Firebase Console
- Navigation: Recipes, About, Lifestyle, Shop, Contact (no Home or Categories links)
- 4-group recipe filter system with pill-based UI (Category, Meal Type, Special Diet, Special Occasion)

## Known Issues / Blockers

- Firebase Auth not enabled in Console (code complete — enable Google provider to test admin CMS)
- Firebase Storage not enabled (blocks image upload — admin editors use URL text fields as workaround)
- Firestore security rules still in test mode (need to configure proper rules before production)

## Commands

```bash
npm run dev          # Local development → localhost:3000
npm run build        # Production build
npm run lint         # Linting
npm run seed         # Seed sample data (when available)
```

---

_Claude Code: After completing any task, update "Current State", "Last Updated", "Last Task Completed", "Completed Features", and any other relevant sections._
