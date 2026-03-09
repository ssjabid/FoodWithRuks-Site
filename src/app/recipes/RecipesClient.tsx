"use client";

import { useState, useMemo } from "react";
import { RecipeGrid } from "@/components/recipe/RecipeGrid";
import { Input } from "@/components/ui/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { RECIPE_CATEGORIES, MEAL_TYPES, DIETARY_TAGS, SPECIAL_OCCASIONS, SORT_OPTIONS } from "@/lib/constants";
import { getFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/types";

interface RecipesClientProps {
  initialRecipes: Recipe[];
}

export function RecipesClient({ initialRecipes }: RecipesClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFavorites, setShowFavorites] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);

  const debouncedSearch = useDebounce(search);

  const activeFilterCount =
    selectedCategories.length +
    selectedMealTypes.length +
    selectedDietaryTags.length +
    selectedOccasions.length +
    (showFavorites ? 1 : 0);

  const filteredRecipes = useMemo(() => {
    let result = [...initialRecipes];

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((r) =>
        selectedCategories.some((cat) => r.category.includes(cat))
      );
    }

    if (selectedMealTypes.length > 0) {
      result = result.filter((r) =>
        selectedMealTypes.some((mt) => r.mealType.includes(mt))
      );
    }

    if (selectedDietaryTags.length > 0) {
      result = result.filter((r) =>
        selectedDietaryTags.every((tag) => r.dietaryTags.includes(tag))
      );
    }

    if (selectedOccasions.length > 0) {
      result = result.filter((r) =>
        selectedOccasions.some((occ) => r.specialOccasion.includes(occ))
      );
    }

    if (showFavorites) {
      const favorites = getFavorites();
      result = result.filter((r) => favorites.includes(r.slug));
    }

    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case "quickest":
        result.sort((a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime));
        break;
      default:
        result.sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
    }

    return result;
  }, [initialRecipes, debouncedSearch, selectedCategories, selectedMealTypes, selectedDietaryTags, selectedOccasions, sortBy, showFavorites]);

  const toggleFilter = (value: string, selected: string[], setter: (v: string[]) => void) => {
    setter(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedMealTypes([]);
    setSelectedDietaryTags([]);
    setSelectedOccasions([]);
    setSortBy("newest");
    setShowFavorites(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)] mb-3">
          Recipes
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg">
          Discover delicious recipes for every occasion
        </p>
      </div>

      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-sm"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={cn(
              "px-4 py-2 rounded-[var(--radius-sm)] border text-sm font-medium filter-pill",
              showFavorites
                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                : "border-[var(--color-border)] text-[var(--color-text-secondary)]"
            )}
          >
            {showFavorites ? "\u2665 Favorites" : "\u2661 Favorites"}
          </button>
        </div>
      </div>

      {/* Mobile filter toggle */}
      <button
        onClick={() => setFiltersOpen(!filtersOpen)}
        className="md:hidden flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] mb-4"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        <svg className={cn("w-4 h-4 transition-transform", filtersOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 4-Group Filter System */}
      <div className={cn("space-y-4 mb-8", !filtersOpen && "hidden md:block")}>
        <FilterGroup
          label="Category"
          items={RECIPE_CATEGORIES.map(c => ({ value: c.value, label: c.label }))}
          selected={selectedCategories}
          onToggle={(v) => toggleFilter(v, selectedCategories, setSelectedCategories)}
        />
        <FilterGroup
          label="Meal Type"
          items={MEAL_TYPES.map(m => ({ value: m.value, label: m.label }))}
          selected={selectedMealTypes}
          onToggle={(v) => toggleFilter(v, selectedMealTypes, setSelectedMealTypes)}
        />
        <FilterGroup
          label="Special Diet"
          items={DIETARY_TAGS.map(tag => ({ value: tag, label: tag }))}
          selected={selectedDietaryTags}
          onToggle={(v) => toggleFilter(v, selectedDietaryTags, setSelectedDietaryTags)}
        />
        <FilterGroup
          label="Special Occasion"
          items={SPECIAL_OCCASIONS.map(o => ({ value: o.value, label: o.label }))}
          selected={selectedOccasions}
          onToggle={(v) => toggleFilter(v, selectedOccasions, setSelectedOccasions)}
        />
      </div>

      {/* Active filters bar */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-[var(--color-text-secondary)]">
            {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""} active
          </span>
          <button
            onClick={clearFilters}
            className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-[var(--color-text-secondary)] mb-8">
        {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? "s" : ""} found
      </p>

      <RecipeGrid recipes={filteredRecipes} />
    </div>
  );
}

function FilterGroup({
  label,
  items,
  selected,
  onToggle,
}: {
  label: string;
  items: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => onToggle(item.value)}
            className={cn(
              "px-4 py-1.5 rounded-[var(--radius-badge)] text-sm font-medium whitespace-nowrap filter-pill",
              selected.includes(item.value)
                ? "bg-[var(--color-primary)] text-white border border-[var(--color-primary)]"
                : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
