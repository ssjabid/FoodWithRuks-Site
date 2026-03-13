"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerReveal";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FoodPlaceholder } from "@/components/shared/FoodPlaceholder";
import type { Recipe } from "@/types";

interface FeaturedRecipesProps {
  recipes: Recipe[];
}

export function FeaturedRecipes({ recipes }: FeaturedRecipesProps) {
  const featured = recipes.slice(0, 3);

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Featured Recipes
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base sm:text-lg">
                My most-loved recipes, handpicked for you
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featured.map((recipe) => (
            <StaggerItem key={recipe.slug}>
              <Link href={`/recipes/${recipe.slug}`} className="group block h-full">
                <Card className="h-full">
                  <div className="overflow-hidden">
                    <motion.div
                      className="aspect-[4/3]"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <FoodPlaceholder className="w-full h-full" />
                    </motion.div>
                  </div>
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
            </StaggerItem>
          ))}
        </StaggerContainer>

        <StaggerContainer>
          <StaggerItem>
            <div className="mt-8">
              <Link
                href="/recipes"
                className="group inline-flex items-center gap-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
              >
                View all recipes
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
