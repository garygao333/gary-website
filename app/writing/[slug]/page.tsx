import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, postDateLong } from "../../lib/posts";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found — Gary Gao" };
  return {
    title: `${post.title} — Gary Gao`,
    description: post.excerpt ?? undefined,
  };
}

export default async function Post({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-[640px] px-6 pt-20 pb-24 md:px-8 md:pt-28">
        <Link
          href="/writing"
          className="text-sm transition-colors hover:text-[var(--accent)]"
          style={{ color: "var(--text-muted)" }}
        >
          &larr; Writing
        </Link>

        <p className="mt-10 text-sm tabular-nums" style={{ color: "var(--text-muted)" }}>
          {postDateLong(post)}
        </p>
        <h1 className="mt-2 font-display text-4xl font-light tracking-tight md:text-5xl">
          {post.title}
        </h1>

        <article
          className="post-body mt-12"
          dangerouslySetInnerHTML={{ __html: post.body_html }}
        />
      </main>
    </div>
  );
}
