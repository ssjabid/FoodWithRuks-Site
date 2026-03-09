import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SAMPLE_RECIPES } from "@/lib/sampleData";
import { SITE_NAME } from "@/lib/constants";
import { RecipePageClient } from "./RecipePageClient";

// TODO: Replace with Firebase calls when data is seeded
function getRecipe(slug: string) {
  return SAMPLE_RECIPES.find((r) => r.slug === slug) || null;
}

function getRelated(slug: string) {
  return SAMPLE_RECIPES.filter((r) => r.slug !== slug).slice(0, 3);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return { title: "Recipe Not Found" };

  return {
    title: recipe.seo?.metaTitle || recipe.title,
    description: recipe.seo?.metaDescription || recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      type: "article",
      siteName: SITE_NAME,
    },
  };
}

export function generateStaticParams() {
  return SAMPLE_RECIPES.map((r) => ({ slug: r.slug }));
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  const relatedRecipes = getRelated(slug);

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: recipe.heroImage || undefined,
    author: { "@type": "Person", name: "Ruks" },
    datePublished: recipe.publishedAt?.toISOString(),
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${recipe.prepTime + recipe.cookTime}M`,
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.category[0] || "",
    recipeCuisine: "South Asian",
    keywords: recipe.tags.join(", "),
    recipeIngredient: recipe.ingredients.map((i) => `${i.amount} ${i.unit} ${i.name}`),
    recipeInstructions: recipe.instructions.map((i) => ({
      "@type": "HowToStep",
      text: i.text,
    })),
    nutrition: recipe.nutrition ? {
      "@type": "NutritionInformation",
      calories: recipe.nutrition.calories ? `${recipe.nutrition.calories} calories` : undefined,
      proteinContent: recipe.nutrition.protein ? `${recipe.nutrition.protein}g` : undefined,
      carbohydrateContent: recipe.nutrition.carbs ? `${recipe.nutrition.carbs}g` : undefined,
      fatContent: recipe.nutrition.fat ? `${recipe.nutrition.fat}g` : undefined,
    } : undefined,
    aggregateRating: recipe.rating.count > 0 ? {
      "@type": "AggregateRating",
      ratingValue: recipe.rating.average,
      ratingCount: recipe.rating.count,
    } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RecipePageClient recipe={recipe} relatedRecipes={relatedRecipes} />
    </>
  );
}
