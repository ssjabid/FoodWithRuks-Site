"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FoodPlaceholder } from "@/components/shared/FoodPlaceholder";
import { SAMPLE_RECIPES } from "@/lib/sampleData";

export function FeaturedRecipes() {
  const featured = SAMPLE_RECIPES.filter((r) => r.featured).slice(0, 4);

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="font-bold tracking-tight text-3xl sm:text-4xl text-[var(--color-text-primary)] mb-3">
              Featured Recipes
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg">
              My most-loved recipes, handpicked for you
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((recipe, i) => (
            <ScrollReveal key={recipe.slug} className={`stagger-${i + 1} ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}>
              <Link href={`/recipes/${recipe.slug}`} className="group block h-full">
                <Card className="h-full">
                  <FoodPlaceholder className={`w-full ${i === 0 ? "aspect-[4/3] sm:aspect-[16/12]" : "aspect-[4/3]"}`} />
                  <CardContent>
                    <Badge className="mb-2">{recipe.category[0]}</Badge>
                    <h3 className="font-bold tracking-tight text-lg text-[var(--color-text-primary)] mb-1">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {recipe.prepTime + recipe.cookTime} min
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-10">
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
