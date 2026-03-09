"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { RECIPE_CATEGORIES } from "@/lib/constants";

export function CategoriesSection() {
  return (
    <section className="py-20 sm:py-28 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="font-bold tracking-tight text-3xl sm:text-4xl text-[var(--color-text-primary)] mb-3">
              Browse by Category
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg">
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
                className="px-6 py-3 rounded-[var(--radius-badge)] border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] filter-pill text-sm"
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
