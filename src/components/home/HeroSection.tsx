import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/5 via-[var(--color-background)] to-[var(--color-accent)]/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-extrabold tracking-tight text-5xl sm:text-6xl lg:text-7xl text-[var(--color-text-primary)] mb-4">
            <span className="text-[var(--color-text-primary)]">FoodWith</span>
            <span className="text-[var(--color-primary)]">Ruks</span>
          </h1>
          <p className="text-xl sm:text-2xl text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto leading-relaxed">
            Delicious recipes crafted with love — from my kitchen to yours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
