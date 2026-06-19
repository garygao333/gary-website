import { unstable_cache } from "next/cache";
import { supabase } from "./supabase";

export type Post = {
  slug: string;
  title: string;
  excerpt: string | null;
  body_html: string;
  published_at: string;
};

export type PostMeta = Omit<Post, "body_html">;

function yearOf(iso: string): string {
  return new Date(iso).getUTCFullYear().toString();
}

export function postYear(post: { published_at: string }): string {
  return yearOf(post.published_at);
}

export function postDateLong(post: { published_at: string }): string {
  return new Date(post.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

// Cached list of published posts. Invalidated instantly via revalidateTag("posts")
// from the inbound-email webhook when a new post is published.
export const getPosts = unstable_cache(
  async (): Promise<PostMeta[]> => {
    const { data, error } = await supabase
      .from("posts")
      .select("slug, title, excerpt, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error) throw new Error(`Failed to load posts: ${error.message}`);
    return data ?? [];
  },
  ["posts-list"],
  { tags: ["posts"] },
);

export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    const { data, error } = await supabase
      .from("posts")
      .select("slug, title, excerpt, body_html, published_at")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw new Error(`Failed to load post: ${error.message}`);
    return data ?? null;
  },
  ["post-by-slug"],
  { tags: ["posts"] },
);
