import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Ruks — the home cook behind FoodWithRuks. Learn about my cooking journey and passion for food.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)] mb-8">
        Hi, I&apos;m Ruks!
      </h1>

      <div className="space-y-5 text-[var(--color-text-secondary)] text-lg leading-relaxed mb-10">
        <p>
          Welcome to FoodWithRuks — my little corner of the internet where food meets love.
          I&apos;m a home cook, food enthusiast, and the person behind the camera (and the stove!).
        </p>
        <p>
          My cooking journey started in my family&apos;s kitchen, watching my mom create magic with
          simple ingredients. Every dish had a story, every spice had a purpose, and every meal
          brought the family together.
        </p>
        <p>
          Today, I share my recipes with the same love and intention. Whether it&apos;s a comforting
          weeknight dinner or a show-stopping biryani for a special occasion, every recipe here is
          tested, tasted, and approved by my family first.
        </p>
        <p>
          My goal is simple: to help you create delicious, flavorful meals that bring joy to your
          table. No complicated techniques, no hard-to-find ingredients — just real food, made
          with love.
        </p>
      </div>

      <div className="flex gap-4 mb-12">
        <Link href="/recipes">
          <Button>Browse Recipes</Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline">Get in Touch</Button>
        </Link>
      </div>

      {/* Social Links */}
      <div className="pt-8 border-t border-[var(--color-border)]">
        <h3 className="font-bold tracking-tight text-xl text-[var(--color-text-primary)] mb-4">Follow Along</h3>
        <div className="flex gap-4">
          <a href="https://instagram.com/foodwithruks" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors">
            Instagram
          </a>
          <a href="https://tiktok.com/@foodwithruks" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors">
            TikTok
          </a>
          <a href="https://pinterest.com/foodwithruks" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors">
            Pinterest
          </a>
        </div>
      </div>
    </div>
  );
}
