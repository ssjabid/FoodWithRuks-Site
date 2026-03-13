"use client";

import Link from "next/link";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerReveal";
import { Button } from "@/components/ui/Button";

export function ShopTeaser() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer>
          <StaggerItem>
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Shop Coming Soon
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed mb-6">
                Handpicked spice mixes, kitchen tools, and more — crafted with the same love I put into my recipes.
              </p>
              <Link href="/shop">
                <Button variant="outline">See What&apos;s Coming</Button>
              </Link>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
