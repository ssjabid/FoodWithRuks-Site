"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FilterPill } from "@/components/ui/FilterPill";
import { SAMPLE_PRODUCTS } from "@/lib/sampleData";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { PageTransition } from "@/components/shared/PageTransition";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerReveal";

export function ShopClient() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return SAMPLE_PRODUCTS;
    return SAMPLE_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Shop
          </h1>
          <p className="text-[var(--color-text-secondary)] text-base sm:text-lg">
            Handpicked products from my kitchen to yours
          </p>
        </div>

        <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 mb-8 sm:mb-10">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-[var(--color-primary)]/10 shrink-0">
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

        <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
          <FilterPill label="All" selected={!selectedCategory} onClick={() => setSelectedCategory("")} />
          {PRODUCT_CATEGORIES.map((cat) => (
            <FilterPill key={cat} label={cat} selected={selectedCategory === cat} onClick={() => setSelectedCategory(cat)} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredProducts.map((product) => (
                <StaggerItem key={product.slug}>
                  <Card className="relative">
                    <div className="absolute top-3 right-3 z-10">
                      <span className="coming-soon-pulse px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-medium">
                        Coming Soon
                      </span>
                    </div>
                    <div className="overflow-hidden">
                      <motion.div
                        className="placeholder-icon w-full aspect-[4/3]"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <svg className="w-12 h-12 text-[var(--color-text-tertiary)] opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </motion.div>
                    </div>
                    <div className="p-4">
                      <Badge variant="accent" className="mb-2">{product.category}</Badge>
                      <h3 className="text-base font-bold tracking-tight text-[var(--color-text-primary)] mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="font-semibold text-[var(--color-text-primary)]">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
