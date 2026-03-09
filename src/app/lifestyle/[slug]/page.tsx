import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ShareButtons } from "@/components/recipe/ShareButtons";
import { Card } from "@/components/ui/Card";
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
    <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-3xl">
        {/* Header */}
        <header className="mb-8 sm:mb-10">
          <Badge variant="accent" className="mb-3">{post.category}</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
            <span>{formatDate(post.publishedAt)}</span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>

        {/* Article content */}
        <div
          className="prose mb-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share */}
        <div className="py-6 border-t border-[var(--color-border)]">
          <ShareButtons title={post.title} slug={`lifestyle/${post.slug}`} />
        </div>
      </div>

      {/* More articles */}
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-bold tracking-tight text-2xl text-[var(--color-text-primary)] mb-8">
            More Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {relatedPosts.map((p) => (
              <Link key={p.slug} href={`/lifestyle/${p.slug}`} className="group block">
                <Card>
                  <div className="p-4">
                    <Badge variant="accent" className="mb-2">{p.category}</Badge>
                    <h3 className="text-base font-bold tracking-tight text-[var(--color-text-primary)] mb-1 line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-tertiary)]">
                      {p.readingTime} min read
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
