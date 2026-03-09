"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function ShopTeaser() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-xl">
            <h2 className="font-bold tracking-tight text-3xl sm:text-4xl text-[var(--color-text-primary)] mb-4">
              Shop Coming Soon
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-6">
              Handpicked spice mixes, kitchen tools, and more — crafted with the same love I put into my recipes.
            </p>
            <Link href="/shop">
              <Button variant="outline">See What&apos;s Coming</Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
