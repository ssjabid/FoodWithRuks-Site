"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { isFavorited, toggleFavorite } from "@/lib/favorites";

interface FavoriteButtonProps {
  slug: string;
  className?: string;
}

export function FavoriteButton({ slug, className }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false);
  const [mounted, setMounted] = useState(false);

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
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative p-2 rounded-full transition-all duration-200",
        "hover:bg-[var(--color-secondary)]",
        className
      )}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      {/* Glow ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[var(--color-primary)]/20"
        animate={favorited ? { scale: [1, 2], opacity: [0.6, 0] } : { scale: 1, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
      <motion.svg
        className={cn("w-5 h-5", favorited ? "text-[var(--color-error)]" : "text-[var(--color-text-secondary)]")}
        fill={favorited ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        animate={favorited ? { scale: [1, 1.4, 0.9, 1.1, 1] } : { scale: 1 }}
        transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </motion.svg>
    </button>
  );
}
