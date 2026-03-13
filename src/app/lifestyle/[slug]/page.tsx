import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SAMPLE_LIFESTYLE_POSTS } from "@/lib/sampleData";
import { LifestylePostClient } from "./LifestylePostClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SAMPLE_LIFESTYLE_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = SAMPLE_LIFESTYLE_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function LifestylePostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = SAMPLE_LIFESTYLE_POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  const relatedPosts = SAMPLE_LIFESTYLE_POSTS
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return <LifestylePostClient post={post} relatedPosts={relatedPosts} />;
}
