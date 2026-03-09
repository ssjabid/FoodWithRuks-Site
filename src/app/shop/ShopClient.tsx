"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SAMPLE_PRODUCTS } from "@/lib/sampleData";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ShopClient() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return SAMPLE_PRODUCTS;
    return SAMPLE_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)] mb-3">
          Shop
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg">
          Handpicked products from my kitchen to yours
        </p>
      </div>

      {/* Coming Soon Banner */}
      <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 mb-12">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-[var(--color-primary)]/10">
            <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">Online shop launching soon!</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Follow us on Instagram to be the first to know when products become available.
            </p>
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setSelectedCategory("")}
          className={cn(
            "px-4 py-2 rounded-[var(--radius-badge)] text-sm font-medium filter-pill",
            !selectedCategory
              ? "bg-[var(--color-primary)] text-white"
              : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]"
          )}
        >
          All
        </button>
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-[var(--radius-badge)] text-sm font-medium filter-pill",
              selectedCategory === cat
                ? "bg-[var(--color-primary)] text-white"
                : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.slug} className="relative">
            {/* Coming Soon overlay badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="coming-soon-pulse px-3 py-1 rounded-[var(--radius-badge)] bg-[var(--color-primary)] text-white text-xs font-medium">
                Coming Soon
              </span>
            </div>

            <div className="placeholder-icon w-full aspect-square">
              <svg className="w-12 h-12 text-[var(--color-text-tertiary)] opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>

            <CardContent>
              <Badge variant="accent" className="mb-2">{product.category}</Badge>
              <h3 className="font-bold tracking-tight text-lg text-[var(--color-text-primary)] mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                {product.description}
              </p>
              <p className="font-semibold text-[var(--color-text-primary)]">
                ${product.price.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
