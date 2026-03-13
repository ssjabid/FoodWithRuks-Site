"use client";

import { useRef } from "react";
import { RecipeCard } from "./RecipeCard";
import { RecipeCardSkeleton } from "@/components/ui/Skeleton";
import type { Recipe } from "@/types";

interface RecipeGridProps {
  recipes: Recipe[];
  loading?: boolean;
}

export function RecipeGrid({ recipes, loading }: RecipeGridProps) {
  // Generation counter forces key change → full remount → CSS animations replay
  const prevIdsRef = useRef("");
  const genRef = useRef(0);
  const currentIds = recipes.map((r) => r.id).join(",");
  if (currentIds !== prevIdsRef.current) {
    prevIdsRef.current = currentIds;
    genRef.current++;
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <svg className="w-16 h-16 mx-auto text-[var(--color-text-secondary)] opacity-30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="font-bold tracking-tight text-xl text-[var(--color-text-primary)] mb-2">No recipes found</h3>
        <p className="text-[var(--color-text-secondary)]">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {recipes.map((recipe, i) => (
        <div
          key={`${genRef.current}-${recipe.id}`}
          className="animate-grid-item"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
}
