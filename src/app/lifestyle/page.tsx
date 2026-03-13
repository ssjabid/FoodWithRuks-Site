import type { Metadata } from "next";
import { LifestyleClient } from "./LifestyleClient";
import { getPublishedPosts } from "@/lib/firebase/lifestyle";
import { SAMPLE_LIFESTYLE_POSTS } from "@/lib/sampleData";

export const metadata: Metadata = {
  title: "Lifestyle",
  description: "Stories from the kitchen — tips, culture, and the joy of cooking.",
};

export default async function LifestylePage() {
  let posts;
  try {
    posts = await getPublishedPosts();
    if (posts.length === 0) posts = SAMPLE_LIFESTYLE_POSTS;
  } catch {
    posts = SAMPLE_LIFESTYLE_POSTS;
  }

  return <LifestyleClient initialPosts={posts} />;
}
