"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function AboutSnippet() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Meet Ruks
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed mb-4">
              Welcome to my little corner of the internet where food meets love. I believe every meal
              tells a story, and I&apos;m here to share mine with you — one recipe at a time.
            </p>
            <Link
              href="/about"
              className="link-arrow text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
            >
              Learn more <span className="arrow">&rarr;</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
