"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SAMPLE_LIFESTYLE_POSTS } from "@/lib/sampleData";
import { formatDate } from "@/lib/utils";

export function LifestyleTeaser() {
  const posts = SAMPLE_LIFESTYLE_POSTS.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="font-bold tracking-tight text-3xl sm:text-4xl text-[var(--color-text-primary)] mb-3">
              From the Kitchen Journal
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg">
              Stories, tips, and the joy of cooking
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} className={`stagger-${i + 1}`}>
              <Link href={`/lifestyle/${post.slug}`} className="group block h-full">
                <Card className="h-full">
                  <div className="placeholder-icon w-full aspect-[16/9]">
                    <svg className="w-8 h-8 text-[var(--color-text-tertiary)] opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <CardContent>
                    <Badge variant="accent" className="mb-2">{post.category}</Badge>
                    <h3 className="font-bold tracking-tight text-lg text-[var(--color-text-primary)] mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[var(--color-text-tertiary)]">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-10">
            <Link
              href="/lifestyle"
              className="link-arrow text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
            >
              Read more articles <span className="arrow">&rarr;</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
