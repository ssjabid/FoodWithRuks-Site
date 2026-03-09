import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ShareButtons } from "@/components/recipe/ShareButtons";
import { Card, CardContent } from "@/components/ui/Card";
import { SAMPLE_LIFESTYLE_POSTS } from "@/lib/sampleData";
import { formatDate } from "@/lib/utils";

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

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Header */}
      <header className="mb-12">
        <Badge variant="accent" className="mb-4">{post.category}</Badge>
        <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)] mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readingTime} min read</span>
        </div>
      </header>

      {/* Article content */}
      <div
        className="prose mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Share */}
      <div className="py-6 border-t border-[var(--color-border)]">
        <ShareButtons title={post.title} slug={`lifestyle/${post.slug}`} />
      </div>

      {/* More articles */}
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-bold tracking-tight text-2xl text-[var(--color-text-primary)] mb-8">
            More Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <Link key={p.slug} href={`/lifestyle/${p.slug}`} className="group block">
                <Card>
                  <CardContent>
                    <Badge variant="accent" className="mb-2">{p.category}</Badge>
                    <h3 className="font-bold tracking-tight text-base text-[var(--color-text-primary)] mb-1 line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-tertiary)]">
                      {p.readingTime} min read
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
