"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Ingredient } from "@/types";

interface IngredientListProps {
  ingredients: Ingredient[];
  originalServings: number;
  currentServings: number;
}

export function IngredientList({ ingredients, originalServings, currentServings }: IngredientListProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const ratio = currentServings / originalServings;

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const adjustAmount = (amount: string): string => {
    const num = parseFloat(amount);
    if (isNaN(num)) return amount;
    const adjusted = num * ratio;
    // Round to nice fractions
    if (adjusted === Math.floor(adjusted)) return String(adjusted);
    return adjusted.toFixed(1).replace(/\.0$/, "");
  };

  // Group ingredients by group
  const grouped = ingredients.reduce<Record<string, Ingredient[]>>((acc, ing) => {
    const group = ing.group || "Ingredients";
    if (!acc[group]) acc[group] = [];
    acc[group].push(ing);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([group, items]) => (
        <div key={group}>
          {Object.keys(grouped).length > 1 && (
            <h4 className="font-bold tracking-tight text-lg mb-3 text-[var(--color-text-primary)]">
              {group}
            </h4>
          )}
          <ul className="space-y-2">
            {items.map((ing) => (
              <li key={ing.id}>
                <label
                  className={cn(
                    "flex items-start gap-3 cursor-pointer group py-1",
                    checked.has(ing.id) && "opacity-50"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked.has(ing.id)}
                    onChange={() => toggle(ing.id)}
                    className="mt-1 w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <span className={cn("text-[var(--color-text-primary)]", checked.has(ing.id) && "ingredient-checked")}>
                    <strong>{adjustAmount(ing.amount)} {ing.unit}</strong> {ing.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
