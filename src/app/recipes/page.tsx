import type { Metadata } from "next";
import { RecipesClient } from "./RecipesClient";
import { SAMPLE_RECIPES } from "@/lib/sampleData";

export const metadata: Metadata = {
  title: "Recipes",
  description: "Browse all recipes from FoodWithRuks — find your next favorite dish.",
};

export default function RecipesPage() {
  // TODO: Replace with getPublishedRecipes() from Firebase when data is seeded
  const recipes = SAMPLE_RECIPES;

  return <RecipesClient initialRecipes={recipes} />;
}
