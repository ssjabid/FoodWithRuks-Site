"use client";

import { Button } from "@/components/ui/Button";

interface ServingsAdjusterProps {
  servings: number;
  onChange: (servings: number) => void;
}

export function ServingsAdjuster({ servings, onChange }: ServingsAdjusterProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(Math.max(1, servings - 1))}
        aria-label="Decrease servings"
      >
        -
      </Button>
      <span className="w-8 text-center font-medium">{servings}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(servings + 1)}
        aria-label="Increase servings"
      >
        +
      </Button>
    </div>
  );
}
