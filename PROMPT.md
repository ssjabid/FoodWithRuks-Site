# PROMPT.md — Claude Code Prompts

> Prompts to paste into Claude Code to kick off and continue development.

---

## Initial Prompt (First Session)

```
You are building FoodWithRuks — a modern recipe blog website with a warm pink + Japanese Ma (空間) design aesthetic.

Before starting any task:
1. Read CLAUDE.md to understand the current project state
2. Read TASKS.md to find the next unchecked task
3. Read INSTRUCTIONS.md for design details, architecture, and data models

After completing any task:
1. Mark the task as complete in TASKS.md (change [ ] to [x])
2. Update CLAUDE.md with: current phase, last updated date, last task completed, and move features to "Completed" list
3. Commit with a clear message: "feat: [description]" or "fix: [description]"
4. Move to the next unchecked task

Key design rules:
- "Warm Ma" aesthetic: generous negative space (Ma), asymmetric layouts, organic shapes, subtle depth
- All colors via CSS custom properties (palette swap = edit ~12 values)
- Fonts: Cormorant Garamond (headings), DM Sans (body), Satisfy (logo only)
- Mobile-first responsive (65%+ of recipe traffic is mobile)
- Dark mode on every component
- Animations: subtle fade-ins ONLY (300-400ms ease-out). No bouncing, wiggling, parallax.
- Rounded corners: 12-16px cards, 8px smaller elements
- TypeScript strict mode — no `any` types
- Server Components by default, Client Components only for interactivity
- All images via next/image

Start with Phase 1, Task 1.1.
```

---

## Continuation Prompt (Every Subsequent Session)

```
Continue building FoodWithRuks.

1. Read CLAUDE.md for current state
2. Read TASKS.md for next task
3. Complete the task
4. Update CLAUDE.md and TASKS.md
5. Commit and continue

If you hit a blocker, document it in CLAUDE.md under "Known Issues / Blockers" and skip to the next available task.
```

---

## Description for Claude Project

> Paste this into the "Description" field of the Claude Project:

```
Building a Blogging website for my wife's recipes (FoodWithRuks). Instagram food creator recipe blog with warm pink + Japanese Ma aesthetic. Tech: Next.js 14 + TypeScript, Tailwind, Firebase (Firestore/Auth/Storage), Vercel hosting, GitHub. Features: recipe pages with Instagram video embeds, admin CMS for easy recipe management, anonymous comments/ratings, visitor favorites, contact form. Design: modern minimalist with generous spacing, dark mode, mobile-first.
```
