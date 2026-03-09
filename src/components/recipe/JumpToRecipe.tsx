"use client";

import { Button } from "@/components/ui/Button";

export function JumpToRecipe() {
  const scrollToIngredients = () => {
    document.getElementById("ingredients")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sticky top-20 z-30 md:relative md:top-0 no-print">
      <Button onClick={scrollToIngredients} size="sm" className="pulse-gentle">
        Jump to Recipe
      </Button>
    </div>
  );
}
