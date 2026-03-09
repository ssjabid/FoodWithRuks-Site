"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function AboutSnippet() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl">
            <h2 className="font-bold tracking-tight text-3xl sm:text-4xl text-[var(--color-text-primary)] mb-6">
              Meet Ruks
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-4">
              Welcome to my little corner of the internet where food meets love. I believe every meal
              tells a story, and I&apos;m here to share mine with you — one recipe at a time.
            </p>
            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-6">
              From comforting weeknight dinners to show-stopping weekend feasts, my recipes are all
              about bold flavors, simple techniques, and the joy of feeding the people you love.
            </p>
            <Link
              href="/about"
              className="link-arrow text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
            >
              Read more <span className="arrow">&rarr;</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
