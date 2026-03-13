"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerReveal";
import { RECIPE_CATEGORIES } from "@/lib/constants";

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 bg-[var(--color-surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Browse by Category
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base sm:text-lg">
                Find exactly what you&apos;re craving
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <StaggerContainer className="flex flex-wrap gap-3">
          {RECIPE_CATEGORIES.map((cat) => (
            <StaggerItem key={cat.value}>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link
                  href={`/recipes?category=${cat.value}`}
                  className="h-9 px-4 rounded-full border border-[var(--color-border)] bg-[var(--color-elevated)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-200 text-sm inline-flex items-center"
                >
                  {cat.label}
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
