"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { FavoriteButton } from "@/components/shared/FavoriteButton";
import { FoodPlaceholder } from "@/components/shared/FoodPlaceholder";
import { ServingsAdjuster } from "@/components/recipe/ServingsAdjuster";
import { IngredientList } from "@/components/recipe/IngredientList";
import { InstructionStep } from "@/components/recipe/InstructionStep";
import { ShareButtons } from "@/components/recipe/ShareButtons";
import { PrintButton } from "@/components/recipe/PrintButton";
import { JumpToRecipe } from "@/components/recipe/JumpToRecipe";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { formatDate, formatCookTime } from "@/lib/utils";
import type { Recipe } from "@/types";

interface RecipePageClientProps {
  recipe: Recipe;
  relatedRecipes: Recipe[];
}

export function RecipePageClient({ recipe, relatedRecipes }: RecipePageClientProps) {
  const [servings, setServings] = useState(recipe.servings);
  const [nutritionOpen, setNutritionOpen] = useState(false);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Hero placeholder */}
      <div className="mb-8">
        <FoodPlaceholder className="w-full h-64 sm:h-80 rounded-[var(--radius-lg)]" />
      </div>

      {/* Recipe Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.category.map((cat) => (
            <Badge key={cat}>{cat}</Badge>
          ))}
          {recipe.dietaryTags.map((tag) => (
            <Badge key={tag} variant="accent">{tag}</Badge>
          ))}
        </div>
        <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)] mb-3">
          {recipe.title}
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg mb-3">{recipe.description}</p>
        <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
          {recipe.publishedAt && <span>{formatDate(recipe.publishedAt)}</span>}
          {recipe.rating.count > 0 && (
            <div className="flex items-center gap-1">
              <StarRating rating={Math.round(recipe.rating.average)} size="sm" />
              <span>({recipe.rating.count})</span>
            </div>
          )}
          <FavoriteButton slug={recipe.slug} />
        </div>
      </header>

      {/* Personal Story */}
      {recipe.personalStory && (
        <div className="mb-10 p-6 rounded-[var(--radius-lg)] bg-[var(--color-secondary)]/50 border-l-4 border-[var(--color-primary)]">
          <p className="text-[var(--color-text-primary)] leading-relaxed italic">
            &ldquo;{recipe.personalStory}&rdquo;
          </p>
        </div>
      )}

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8 p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]">
        <StatItem label="Prep" value={formatCookTime(recipe.prepTime)} />
        <StatItem label="Cook" value={formatCookTime(recipe.cookTime)} />
        <StatItem label="Total" value={formatCookTime(recipe.prepTime + recipe.cookTime)} />
        <div className="text-center">
          <p className="text-xs text-[var(--color-text-secondary)] mb-1">Servings</p>
          <ServingsAdjuster servings={servings} onChange={setServings} />
        </div>
        <StatItem label="Difficulty" value={recipe.difficulty} />
      </div>

      {/* Jump to Recipe */}
      <div className="mb-8">
        <JumpToRecipe />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <PrintButton />
        <ShareButtons title={recipe.title} slug={recipe.slug} />
      </div>

      {/* Ingredients */}
      <section id="ingredients" className="mb-10">
        <h2 className="font-bold tracking-tight text-2xl sm:text-3xl text-[var(--color-text-primary)] mb-6">
          Ingredients
        </h2>
        <IngredientList
          ingredients={recipe.ingredients}
          originalServings={recipe.servings}
          currentServings={servings}
        />
      </section>

      {/* Instructions */}
      <section className="mb-10">
        <h2 className="font-bold tracking-tight text-2xl sm:text-3xl text-[var(--color-text-primary)] mb-6">
          Instructions
        </h2>
        <div className="space-y-4">
          {recipe.instructions.map((instruction) => (
            <InstructionStep key={instruction.step} instruction={instruction} />
          ))}
        </div>
      </section>

      {/* Tips & Notes */}
      {recipe.tips && (
        <section className="mb-10">
          <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/20">
            <h3 className="font-bold tracking-tight text-xl text-[var(--color-text-primary)] mb-2">
              Tips & Notes
            </h3>
            <p className="text-[var(--color-text-primary)] leading-relaxed">{recipe.tips}</p>
          </div>
        </section>
      )}

      {/* Nutrition Info */}
      {recipe.nutrition && (
        <section className="mb-10">
          <button
            onClick={() => setNutritionOpen(!nutritionOpen)}
            className="flex items-center gap-2 font-bold tracking-tight text-xl text-[var(--color-text-primary)] mb-4"
          >
            Nutrition Information
            <svg
              className={`w-5 h-5 transition-transform ${nutritionOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {nutritionOpen && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recipe.nutrition.calories && <NutritionItem label="Calories" value={`${recipe.nutrition.calories}`} />}
              {recipe.nutrition.protein && <NutritionItem label="Protein" value={`${recipe.nutrition.protein}g`} />}
              {recipe.nutrition.carbs && <NutritionItem label="Carbs" value={`${recipe.nutrition.carbs}g`} />}
              {recipe.nutrition.fat && <NutritionItem label="Fat" value={`${recipe.nutrition.fat}g`} />}
            </div>
          )}
        </section>
      )}

      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section className="mt-16 related-recipes">
          <h2 className="font-bold tracking-tight text-2xl sm:text-3xl text-[var(--color-text-primary)] mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedRecipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-xs text-[var(--color-text-secondary)] mb-1">{label}</p>
      <p className="font-medium text-[var(--color-text-primary)] capitalize">{value}</p>
    </div>
  );
}

function NutritionItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center p-3 rounded-[var(--radius-sm)] bg-[var(--color-surface)] border border-[var(--color-border)]">
      <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>
      <p className="text-lg font-semibold text-[var(--color-text-primary)]">{value}</p>
    </div>
  );
}
