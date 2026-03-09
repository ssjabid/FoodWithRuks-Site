import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { FavoriteButton } from "@/components/shared/FavoriteButton";
import { FoodPlaceholder } from "@/components/shared/FoodPlaceholder";
import { formatCookTime } from "@/lib/utils";
import type { Recipe } from "@/types";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Link href={`/recipes/${recipe.slug}`} className="group block h-full">
      <Card className="h-full">
        {/* Placeholder */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <FoodPlaceholder className="w-full h-full" />
          {/* Favorite button overlay */}
          <div className="absolute top-2 right-2">
            <FavoriteButton slug={recipe.slug} />
          </div>
        </div>

        <CardContent>
          {/* Category badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {recipe.category.slice(0, 2).map((cat) => (
              <Badge key={cat} variant="default">
                {cat}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-bold tracking-tight text-lg text-[var(--color-text-primary)] mb-2 line-clamp-2">
            {recipe.title}
          </h3>

          {/* Meta info */}
          <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatCookTime(totalTime)}
              </span>
              <span className="capitalize">{recipe.difficulty}</span>
            </div>
            {recipe.rating.count > 0 && (
              <div className="flex items-center gap-1">
                <StarRating rating={Math.round(recipe.rating.average)} size="sm" />
                <span className="text-xs">({recipe.rating.count})</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
