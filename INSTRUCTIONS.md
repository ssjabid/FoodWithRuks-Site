# FoodWithRuks — Project Instructions

## Project Overview

**FoodWithRuks** is a modern, beautifully designed recipe blog/website for an Instagram food creator. The site showcases her recipes with stunning visuals, clean typography, and a delightful user experience. Think: a personal food brand — not a generic blog template.

The goal is a site that feels like opening a gorgeous cookbook, with the convenience of Instagram-level content discovery and the performance of a modern web app.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 14+ (App Router)** with TypeScript |
| Styling | **Tailwind CSS** + custom design tokens |
| Database | **Firebase Firestore** (recipes, categories, user data) |
| Auth | **Firebase Auth** (admin login for CMS) |
| Storage | **Firebase Storage** (recipe images, media) |
| Hosting | **Vercel** (with custom domain support) |
| Source Control | **GitHub** |
| Dev Tool | **Claude Code** |
| Instagram Embeds | **react-social-media-embed** (just paste URL, no API tokens) |

---

## Design Philosophy

### Brand Identity
- **Name**: FoodWithRuks
- **Vibe**: Clean, natural, intentional — like a stylish Japanese-inspired café where a friend shares her favorite recipes
- **Style Fusion**: Sage green + monochrome elegance + Japanese "Ma" (空間) design principles
- **NOT**: Generic food blog, corporate, cluttered, overly playful/childish, or cold minimalism

### Design Direction — "Warm Ma (空間)"

This design blends a natural sage green + monochrome palette with Japanese aesthetic principles:

1. **Ma (空間) — Negative Space**: Generous breathing room between all elements. Empty space is not wasted — it gives the food photography room to shine.

2. **Fukinsei (不均整) — Asymmetric Balance**: Layouts don't need to be perfectly symmetrical. Use intentional asymmetry — a hero image offset to one side, text aligned left with open space right.

3. **Kanso (簡素) — Simplicity**: Strip away everything that doesn't serve a purpose. No decorative clutter. Every element earns its place.

4. **Shizen (自然) — Naturalness**: Subtle organic shapes (soft rounded corners, gentle curves), natural-feeling transitions.

5. **Shibui (渋い) — Understated Elegance**: Quietly beautiful. Sophistication through restraint, not showing off.

**In practice:**
- Extra-large padding/margins everywhere (1.5-2x what feels "normal")
- Food photos get maximum space — no cramped grids
- Subtle fade-in animations that feel like gentle breathing (200-400ms, ease-out)
- Soft shadows, no harsh borders
- Rounded corners (12-16px on cards, 8px on smaller elements)
- Asymmetrical hero layouts (e.g., 60/40 splits instead of 50/50)
- Organic flowing sections rather than rigid boxes

### Color System (Interchangeable Palette)

All colors defined as CSS custom properties / Tailwind config tokens — swap the entire palette by changing ~12 values.

**Primary Palette — "Monochrome & Sage" (Default Light Mode):**
```
--color-primary: #5B7F5E        /* Sage green — buttons, accents, links */
--color-primary-hover: #4A6B4D  /* Darker sage — hover states */
--color-secondary: #F0F2ED      /* Light sage tint — card backgrounds, highlights */
--color-accent: #7A9E7E         /* Medium sage — tags, badges, secondary accents */
--color-background: #FFFFFF     /* White — page background */
--color-surface: #FAFBF9        /* Near-white sage tint — cards, modals */
--color-text-primary: #111111   /* Near-black — body text */
--color-text-secondary: #6B6B6B /* Gray — captions, metadata */
--color-text-tertiary: #999999  /* Light gray — subtle captions */
--color-border: #E8EBE5         /* Soft sage border */
--color-success: #5B7F5E        /* Sage green — success states */
--color-warning: #D4A843        /* Warm amber — warnings */
--color-error: #C75050          /* Muted red — errors */
```

**Dark Mode Palette:**
```
--color-primary: #7A9E7E
--color-primary-hover: #8FB893
--color-secondary: #1A1F1A
--color-accent: #5B7F5E
--color-background: #0A0C0A
--color-surface: #141814
--color-text-primary: #E8EBE5
--color-text-secondary: #8A8F87
--color-text-tertiary: #5A5F57
--color-border: #2A302A
--color-success: #7A9E7E
--color-warning: #D4A843
--color-error: #C75050
```

### Typography
- **All text**: Inter (clean, modern sans-serif — highly readable)
- **Headings**: Inter weight 700–800, tight letter-spacing (`tracking-tight`)
- **Body**: Inter weight 400–500
- **Logo**: "FoodWith" in text-primary + "Ruks" in sage green, Inter weight 700–800

### Spacing System (8px grid, Ma-inspired)
```
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
--space-3xl: 64px
--space-4xl: 96px
--space-5xl: 128px
--space-section: 96px      /* Between page sections */
--space-section-lg: 128px
```

### Animation Guidelines
- **Allowed**: Subtle fade-ins on scroll (opacity 0→1, translateY 20px→0, 300-400ms ease-out)
- **Allowed**: Gentle hover scale on cards (scale 1→1.02, 200ms ease)
- **Allowed**: Smooth page transitions (fade, 200ms)
- **NOT allowed**: Bouncing, wiggling, parallax, spinning, sliding from sides
- **Rule**: If an animation draws attention to itself, remove it.

---

## Site Architecture

### Public Pages

#### 1. Landing / Home Page (`/`)

7 sections, top to bottom:

- **Hero Section**: Full-width gradient background with split logo ("FoodWith" + "Ruks"), tagline, and CTA. 85vh desktop, 70vh mobile. Subtle scroll indicator.
- **Featured Recipes**: Curated grid (3-6 recipes) with generous gaps. Uses FoodPlaceholder cards. Asymmetric layout (one large card + two smaller). Section title in bold Inter.
- **Browse by Category**: Horizontal row of category pill links (Starters, Mains, Desserts, Snacks, Drinks). Links to `/recipes?category=[slug]`.
- **Meet Ruks**: Text-only about snippet (no photo). Short bio with link to About page.
- **From the Kitchen Journal**: Lifestyle blog teaser — shows latest 2-3 lifestyle posts with excerpts. Link to `/lifestyle`.
- **Shop Coming Soon**: Teaser section for upcoming products (spice kits, merchandise). Links to `/shop`.
- **Stay Connected**: Newsletter signup — email field + submit. Warm CTA copy.
- **Footer**: Nav links, social icons, copyright.

#### 2. Recipes Page (`/recipes`)
- **Search bar**: Prominent, real-time with debounce
- **4-group filter system**:
  - **Category**: Starters, Mains, Desserts, Snacks, Drinks
  - **Meal Type**: Breakfast, Lunch, Dinner, Brunch
  - **Special Diet**: Vegetarian, Vegan, Gluten-Free, Halal, Dairy-Free, Keto
  - **Special Occasion**: Eid, Ramadan, Christmas, Date Night, Quick Weeknight
- **Sort**: Newest, Most Popular, Quickest
- **Recipe grid**: Generous Ma spacing. Cards show image, title, category, cook time, rating
- **"Load More" button** (not infinite scroll)
- **Favorites filter**: Toggle to show only saved recipes
- **Empty/loading states**

#### 3. Single Recipe Page (`/recipes/[slug]`) — MOST IMPORTANT PAGE

Layout top to bottom:

1. **Instagram Reel/Video Hero** — If recipe has Instagram URL, embed reel prominently. Full-width mobile, centered with Ma on desktop. Falls back to hero image if no video.
2. **Recipe Header** — Title (large Inter bold), category tags, date, reading time.
3. **Personal Story** — Warm intro paragraph from Ruks. Styled distinctly (accent background or decorative quote mark).
4. **Quick Stats Bar** — Prep Time | Cook Time | Total Time | Servings (adjustable) | Difficulty. Clean icons.
5. **"Jump to Recipe" Button** — Sticky on mobile. Sage green accent.
6. **Ingredients List** — Checkable checkboxes, adjustable servings, grouped by section.
7. **Step-by-Step Instructions** — Numbered, each in own card, optional photo per step.
8. **Tips & Notes** — Callout box with accent background.
9. **Nutrition Info** — Collapsible section.
10. **Share Buttons** — Copy link, WhatsApp, Pinterest, Twitter/X.
11. **Anonymous Comments & Ratings** — Star rating + text box, no login needed. Honeypot spam prevention. Moderation queue.
12. **Related Recipes** — Grid of 3-4 similar recipes.

**Additional features:**
- Print stylesheet (title, ingredients, instructions only)
- Schema.org Recipe JSON-LD for rich Google snippets
- Smooth transition from recipe card click
- Favorite (heart) button

#### 4. About Page (`/about`)
- Personal story, text-only layout (no photo), cooking journey, mission
- Link to Contact page

#### 5. Contact Us Page (`/contact`)
- Form: Name, Email, Subject, Message
- Saves to Firebase `contactMessages` collection
- Wife reviews in admin dashboard
- Honeypot spam field
- Success/error states

#### 6. Lifestyle Page (`/lifestyle`)
- Blog articles about cooking, kitchen life, and food culture
- Category filter pills at the top
- 2-column grid of article cards (title, excerpt, category, reading time)
- Each article has a slug-based route (`/lifestyle/[slug]`) with prose content, share buttons, and related posts

#### 7. Shop Page (`/shop`)
- Coming soon page showcasing future products (spice kits, merchandise)
- Category filter pills at the top
- 3-column product grid with pulsing "Coming Soon" badges
- Products display name, description, price, and category

### Navigation

Main navigation links (in order): **Recipes, About, Lifestyle, Shop, Contact**. No Home or Categories link in the nav bar.

### Admin / CMS Pages (Firebase Auth protected)

#### 8. Admin Login (`/admin/login`)
- Email/password form → Firebase Auth

#### 9. Admin Dashboard (`/admin`)
- Stats: total recipes (published/draft), pending comments, unread messages
- Quick actions: "Add New Recipe", "Manage Categories"
- Recent recipes list, pending comments list

#### 10. Recipe Editor (`/admin/recipes/new` and `/admin/recipes/[id]/edit`)

**Form fields:**
- Title → auto-generates slug
- Slug (editable)
- Description (short summary for cards + SEO)
- Personal Story (rich text for intro paragraph)
- Instagram Reel URL (paste URL, preview renders below)
- Category (multi-select)
- Tags (free-form)
- Dietary Tags (checkboxes: Vegetarian, Vegan, Gluten-Free, Dairy-Free, Halal, Nut-Free)
- Prep Time, Cook Time, Servings, Difficulty
- Ingredients (dynamic list: Amount | Unit | Name | Group — add/remove/reorder)
- Instructions (dynamic list: Step text | Optional image — add/remove/reorder)
- Hero Image (drag-and-drop upload, WebP conversion)
- Tips/Notes
- Nutrition (optional: Calories, Protein, Carbs, Fat)
- SEO (meta title, description with char count, OG image)
- Status: Draft / Published toggle
- Featured toggle

**Editor features:**
- Auto-save every 30 seconds
- Preview mode
- Validation with helpful errors

#### 11. Recipe List (`/admin/recipes`)
- Table: Title, Status, Category, Date, Actions (Edit/Delete)
- Filter by status, search by title

#### 12. Category Manager (`/admin/categories`)
- CRUD: Name, Slug, Description, Image, Order

#### 13. Comments Manager (`/admin/comments`)
- Filter: Pending / Approved / All
- Actions: Approve, Delete

#### 14. Contact Messages (`/admin/messages`)
- List: Name, Email, Subject, Date, Read/Unread
- Click to view full message, mark read/unread, delete

---

## Firebase Data Models

### Firestore Collections

```
recipes/
  {recipeId}/
    title: string
    slug: string (unique)
    description: string
    personalStory: string
    instagramUrl: string (optional)
    category: string[]
    tags: string[]
    dietaryTags: string[]
    mealType: string[] (Breakfast, Lunch, Dinner, Brunch)
    specialOccasion: string[] (Eid, Ramadan, Christmas, Date Night, Quick Weeknight)
    prepTime: number (minutes)
    cookTime: number (minutes)
    servings: number
    difficulty: "easy" | "medium" | "hard"
    ingredients: [{ id, amount, unit, name, group? }]
    instructions: [{ step, text, image? }]
    heroImage: string (Storage URL)
    tips: string
    nutrition: { calories?, protein?, carbs?, fat? }
    seo: { metaTitle?, metaDescription?, ogImage? }
    status: "draft" | "published"
    featured: boolean
    rating: { average: number, count: number }
    viewCount: number
    createdAt: timestamp
    updatedAt: timestamp
    publishedAt: timestamp
    scheduledAt: timestamp (optional — future use)

categories/
  {categoryId}/
    name: string
    slug: string
    description: string
    image: string
    order: number
    recipeCount: number

comments/
  {commentId}/
    recipeId: string
    recipeSlug: string
    text: string
    rating: number (1-5)
    status: "pending" | "approved"
    createdAt: timestamp
    ipHash: string

contactMessages/
  {messageId}/
    name: string
    email: string
    subject: string
    message: string
    read: boolean
    createdAt: timestamp

siteSettings/
  general/
    siteName, tagline, aboutText, aboutImage
    socialLinks: { instagram, pinterest, tiktok, youtube }
    newsletterEnabled: boolean
    heroImage, heroTagline
    instagramPostUrls: string[] (for homepage feed section)

lifestylePosts/
  {postId}/
    title: string
    slug: string (unique)
    excerpt: string
    content: string (HTML)
    category: string
    readingTime: number (minutes)
    status: "draft" | "published"
    createdAt: timestamp
    updatedAt: timestamp
    publishedAt: timestamp

products/
  {productId}/
    name: string
    slug: string (unique)
    description: string
    price: number
    currency: string
    category: string
    image: string (optional)
    inStock: boolean
    comingSoon: boolean
```

### Firebase Storage Structure
```
/recipes/{recipeId}/hero.webp
/recipes/{recipeId}/steps/step-{n}.webp
/categories/{categoryId}/cover.webp
/about/profile.webp
```

---

## Spam Prevention (Anonymous Comments + Contact Form)

1. **Honeypot field** — hidden field, rejected if filled
2. **Rate limiting** — max 3 comments per IP per hour (hashed IP)
3. **Minimum length** — comments must be 10+ characters
4. **Moderation queue** — all comments default to `pending`
5. **Time check** — reject if submitted in under 2 seconds

---

## Visitor Favorites (localStorage)

- Heart icon on recipe cards and recipe pages
- Saves recipe slug to `localStorage` key `fwr_favorites`
- Filter on `/recipes` page: "Show favorites only"
- Note in UI: "Favorites saved to this browser only"
- No account needed

---

## Instagram Integration

- Wife pastes Instagram reel/post URL into recipe form
- Renders via `react-social-media-embed` `InstagramEmbed` component
- **Homepage feed section has been removed.** Instagram embeds are still supported on individual recipe pages via the `instagramUrl` field.
- No API tokens or Facebook app needed

---

## SEO Requirements

- Schema.org Recipe JSON-LD on every recipe page
- Dynamic sitemap from published recipes
- OG + Twitter Card meta tags on all pages
- Canonical URLs
- Next.js Metadata API
- robots.txt
- Image alt text (enforced in admin)
- Dynamic OG images via `@vercel/og`
- Target: Lighthouse 95+

---

## Key Technical Decisions

1. Next.js App Router, Server Components by default
2. ISR for recipe pages, on-demand revalidation
3. Firebase Admin SDK server-side, Client SDK for admin pages + public writes
4. Images: Intentionally not used during development. FoodPlaceholder component with SVG icons used site-wide. Real images via Firebase Storage planned for Phase 5.
5. Vercel auto-deploy from GitHub `main` branch
6. Instagram embeds via `react-social-media-embed`
7. Favorites via localStorage
8. Anonymous comments with honeypot + rate limiting + moderation
9. Contact form saves to Firestore (admin reviews in dashboard)
10. Scheduling-ready data model (scheduledAt field) for future use
11. Lifestyle blog articles with category filtering and prose content rendering
12. Shop page with coming-soon product grid (Stripe integration planned for later)

---

## File Structure
```
foodwithruks/
├── CLAUDE.md
├── TASKS.md
├── .env.local / .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Landing
│   │   ├── not-found.tsx               # 404
│   │   ├── sitemap.ts
│   │   ├── recipes/
│   │   │   ├── page.tsx                # Listing
│   │   │   └── [slug]/page.tsx         # Single recipe
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── lifestyle/
│   │   │   ├── page.tsx                # Lifestyle listing
│   │   │   └── [slug]/page.tsx         # Single lifestyle article
│   │   ├── shop/page.tsx               # Shop (coming soon)
│   │   ├── admin/
│   │   │   ├── layout.tsx              # Auth guard
│   │   │   ├── page.tsx                # Dashboard
│   │   │   ├── login/page.tsx
│   │   │   ├── recipes/page.tsx
│   │   │   ├── recipes/new/page.tsx
│   │   │   ├── recipes/[id]/edit/page.tsx
│   │   │   ├── categories/page.tsx
│   │   │   ├── comments/page.tsx
│   │   │   └── messages/page.tsx
│   │   └── api/
│   │       ├── revalidate/route.ts
│   │       ├── comments/route.ts
│   │       ├── contact/route.ts
│   │       └── og/route.tsx
│   ├── components/
│   │   ├── ui/          # Button, Card, Input, Badge, Skeleton, Modal, StarRating
│   │   ├── layout/      # Header, Footer, Nav, MobileMenu
│   │   ├── recipe/      # RecipeCard, RecipeGrid, IngredientList, InstructionStep, ServingsAdjuster, ShareButtons, PrintButton
│   │   ├── admin/       # RecipeForm, CategoryForm, CommentsList, MessagesList, DashboardStats
│   │   ├── home/        # LifestyleTeaser, ShopTeaser (homepage-specific sections)
│   │   └── shared/      # ThemeToggle, Newsletter, BackToTop, FoodPlaceholder, FavoriteButton, JumpToRecipe, AnonymousCommentForm
│   ├── lib/
│   │   ├── firebase/    # config, admin, auth, recipes, categories, comments, contact, storage
│   │   ├── utils.ts
│   │   ├── favorites.ts
│   │   ├── spam.ts
│   │   └── constants.ts
│   ├── hooks/           # useAuth, useFavorites, useDebounce, useInView
│   ├── types/index.ts
│   └── styles/
│       ├── globals.css  # Tailwind + CSS variables + print
│       └── print.css
└── scripts/
    └── seed.ts
```

**Note on images**: Images are intentionally NOT used during development. The `FoodPlaceholder` component (with SVG food icons) replaces all images site-wide. Real images will be added via Firebase Storage in a later phase.

---

## Phase Plan

### Phase 1 — Foundation
- Project setup (Next.js, Tailwind, Firebase, GitHub, Vercel)
- Design tokens + theme system (light/dark with CSS variables)
- Typography (Inter via next/font — single font for all text)
- Base UI components
- Layout (Header, Footer, Nav, Mobile Menu)
- Landing page (full design, placeholder content)
- Dark mode toggle

### Phase 2 — Recipe Display
- Recipe card + grid components
- Recipes listing page (filter, search, sort, load more)
- Single recipe page (all 12 sections)
- Instagram reel embed
- Adjustable servings
- Jump to Recipe button
- Category pages
- Visitor favorites (localStorage)
- Schema.org JSON-LD
- SEO (sitemap, meta, OG images)
- Print stylesheet

### Phase 3 — Admin CMS
- Firebase Auth + admin login
- Admin layout with auth guard
- Dashboard with stats
- Recipe editor (full form, dynamic lists, image upload)
- Instagram URL with preview
- Auto-save, preview mode
- Recipe list with filters
- Category manager
- On-demand ISR on publish

### Phase 4 — Engagement & Polish
- Anonymous comments + ratings (spam prevention)
- Comment moderation in admin
- Contact page + Firestore submission
- Messages list in admin
- Newsletter signup (email capture)
- Instagram feed on homepage
- About page
- Share buttons
- Related recipes
- Scroll animations
- 404 page + error boundaries
- Performance pass

### Phase 5 — Launch
- Custom domain + DNS + SSL
- Seed 5-10 real recipes
- Create categories with images
- QA across devices + browsers
- Analytics setup
- Lighthouse audit (target 95+)
- Schema.org testing
- Social sharing testing
