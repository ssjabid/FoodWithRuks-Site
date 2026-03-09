"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { isFavorited, toggleFavorite } from "@/lib/favorites";

interface FavoriteButtonProps {
  slug: string;
  className?: string;
}

export function FavoriteButton({ slug, className }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false);
  const [mounted, setMounted] = useState(false);
  const heartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setMounted(true);
    setFavorited(isFavorited(slug));
  }, [slug]);

  if (!mounted) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = toggleFavorite(slug);
    setFavorited(next);
    // Trigger bounce animation
    if (heartRef.current) {
      heartRef.current.classList.remove("heart-bounce");
      void heartRef.current.getBoundingClientRect(); // force reflow
      heartRef.current.classList.add("heart-bounce");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "p-2 rounded-full transition-all duration-200",
        "hover:bg-[var(--color-secondary)]",
        className
      )}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        ref={heartRef}
        className={cn("w-5 h-5 transition-colors duration-200", favorited ? "text-[var(--color-error)] fill-current" : "text-[var(--color-text-secondary)]")}
        fill={favorited ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
}
