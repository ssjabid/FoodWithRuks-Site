"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SAMPLE_LIFESTYLE_POSTS } from "@/lib/sampleData";
import { LIFESTYLE_CATEGORIES } from "@/lib/constants";
import { formatDate, cn } from "@/lib/utils";

export function LifestyleClient() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return SAMPLE_LIFESTYLE_POSTS;
    return SAMPLE_LIFESTYLE_POSTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
          Lifestyle
        </h1>
        <p className="text-[var(--color-text-secondary)] text-base sm:text-lg">
          Stories from the kitchen — tips, culture, and the joy of cooking
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
        <button
          onClick={() => setSelectedCategory("")}
          className={cn(
            "h-9 px-4 rounded-full text-sm font-medium filter-pill",
            !selectedCategory
              ? "bg-[var(--color-primary)] text-white border border-[var(--color-primary)]"
              : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]"
          )}
        >
          All
        </button>
        {LIFESTYLE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "h-9 px-4 rounded-full text-sm font-medium filter-pill",
              selectedCategory === cat
                ? "bg-[var(--color-primary)] text-white border border-[var(--color-primary)]"
                : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredPosts.map((post) => (
          <Link key={post.slug} href={`/lifestyle/${post.slug}`} className="group block h-full">
            <Card className="h-full">
              <div className="placeholder-icon w-full aspect-[4/3]">
                <svg className="w-8 h-8 text-[var(--color-text-tertiary)] opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="p-4">
                <Badge variant="accent" className="mb-2">{post.category}</Badge>
                <h2 className="text-base font-bold tracking-tight text-[var(--color-text-primary)] mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-[var(--color-text-tertiary)]">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <h3 className="font-bold tracking-tight text-xl text-[var(--color-text-primary)] mb-2">No articles found</h3>
          <p className="text-[var(--color-text-secondary)]">Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
}
