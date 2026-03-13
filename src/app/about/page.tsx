import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Ruks — the home cook behind FoodWithRuks. Learn about my cooking journey and passion for food.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
