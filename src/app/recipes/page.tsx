import type { Metadata } from "next";
import { RecipesClient } from "./RecipesClient";
import { getPublishedRecipes } from "@/lib/firebase/recipes";
import { SAMPLE_RECIPES } from "@/lib/sampleData";

export const metadata: Metadata = {
  title: "Recipes",
  description: "Browse all recipes from FoodWithRuks — find your next favorite dish.",
};

export default async function RecipesPage() {
  let recipes;
  try {
    recipes = await getPublishedRecipes();
    if (recipes.length === 0) recipes = SAMPLE_RECIPES;
  } catch {
    recipes = SAMPLE_RECIPES;
  }

  return <RecipesClient initialRecipes={recipes} />;
}
