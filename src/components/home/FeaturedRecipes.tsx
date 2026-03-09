"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FoodPlaceholder } from "@/components/shared/FoodPlaceholder";
import { SAMPLE_RECIPES } from "@/lib/sampleData";

export function FeaturedRecipes() {
  const featured = SAMPLE_RECIPES.filter((r) => r.featured).slice(0, 3);

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Featured Recipes
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg">
              My most-loved recipes, handpicked for you
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featured.map((recipe, i) => (
            <ScrollReveal key={recipe.slug} className={`stagger-${i + 1}`}>
              <Link href={`/recipes/${recipe.slug}`} className="group block h-full">
                <Card className="h-full">
                  <FoodPlaceholder className="w-full aspect-[4/3]" />
                  <div className="p-4">
                    <Badge className="mb-2">{recipe.category[0]}</Badge>
                    <h3 className="text-base font-bold tracking-tight text-[var(--color-text-primary)] mb-1 line-clamp-2">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {recipe.prepTime + recipe.cookTime} min
                    </p>
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-8">
            <Link
              href="/recipes"
              className="link-arrow text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
            >
              View all recipes <span className="arrow">&rarr;</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
