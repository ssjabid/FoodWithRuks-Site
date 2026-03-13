"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerReveal";

export function AboutSnippet() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer>
          <StaggerItem>
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Meet Ruks
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed mb-4">
                Welcome to my little corner of the internet where food meets love. I believe every meal
                tells a story, and I&apos;m here to share mine with you — one recipe at a time.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
              >
                Learn more
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  &rarr;
                </motion.span>
              </Link>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
