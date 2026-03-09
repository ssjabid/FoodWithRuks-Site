import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedRecipes } from "@/components/home/FeaturedRecipes";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { AboutSnippet } from "@/components/home/AboutSnippet";
import { LifestyleTeaser } from "@/components/home/LifestyleTeaser";
import { ShopTeaser } from "@/components/home/ShopTeaser";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedRecipes />
      <CategoriesSection />
      <AboutSnippet />
      <LifestyleTeaser />
      <ShopTeaser />
      <NewsletterSection />
    </>
  );
}
