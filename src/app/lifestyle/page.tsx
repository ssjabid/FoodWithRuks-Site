import type { Metadata } from "next";
import { LifestyleClient } from "./LifestyleClient";

export const metadata: Metadata = {
  title: "Lifestyle",
  description: "Stories from the kitchen — tips, culture, and the joy of cooking.",
};

export default function LifestylePage() {
  return <LifestyleClient />;
}
