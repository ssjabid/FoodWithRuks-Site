import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/5 via-[var(--color-background)] to-[var(--color-accent)]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="font-extrabold tracking-tight text-5xl sm:text-6xl lg:text-7xl text-[var(--color-text-primary)] mb-4">
            <span className="text-[var(--color-text-primary)]">FoodWith</span>
            <span className="text-[var(--color-primary)]">Ruks</span>
          </h1>
          <p className="text-xl sm:text-2xl text-[var(--color-text-secondary)] mb-8 max-w-lg leading-relaxed">
            Delicious recipes crafted with love — from my kitchen to yours.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/recipes">
              <Button size="lg">Explore Recipes</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">About Me</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
