"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { RECIPE_CATEGORIES } from "@/lib/constants";

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 bg-[var(--color-surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Browse by Category
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg">
              Find exactly what you&apos;re craving
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap gap-3">
            {RECIPE_CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/recipes?category=${cat.value}`}
                className="h-9 px-4 rounded-full border border-[var(--color-border)] bg-[var(--color-elevated)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] filter-pill text-sm inline-flex items-center"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
