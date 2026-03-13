import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/firebase/lifestyle";
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
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch { /* fallback */ }
  if (!post) post = SAMPLE_LIFESTYLE_POSTS.find((p) => p.slug === slug) || null;
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function LifestylePostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch { /* fallback */ }
  if (!post) post = SAMPLE_LIFESTYLE_POSTS.find((p) => p.slug === slug) || null;
  if (!post) notFound();

  let relatedPosts;
  try {
    const allPosts = await getPublishedPosts();
    relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);
    if (relatedPosts.length === 0) throw new Error("empty");
  } catch {
    relatedPosts = SAMPLE_LIFESTYLE_POSTS.filter((p) => p.slug !== slug).slice(0, 3);
  }

  return <LifestylePostClient post={post} relatedPosts={relatedPosts} />;
}
