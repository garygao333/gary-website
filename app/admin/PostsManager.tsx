"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePost, updatePost } from "./actions";

type Post = {
  slug: string;
  title: string;
  body_html: string;
  status: string;
  created_at: string;
};

export function PostsManager({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        No posts yet.
      </p>
    );
  }
  return (
    <ul
      className="overflow-hidden rounded-lg border"
      style={{ borderColor: "var(--border)" }}
    >
      {posts.map((p) => (
        <li
          key={p.slug}
          className="border-b last:border-0"
          style={{ borderColor: "var(--border)" }}
        >
          <PostRow post={p} />
        </li>
      ))}
    </ul>
  );
}

function PostRow({ post }: { post: Post }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body_html);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function save() {
    setError(null);
    start(async () => {
      try {
        await updatePost(post.slug, title, body);
        setEditing(false);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Save failed");
      }
    });
  }

  function remove() {
    if (!confirm(`Delete "${post.title}"? This can't be undone.`)) return;
    setError(null);
    start(async () => {
      try {
        await deletePost(post.slug);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Delete failed");
      }
    });
  }

  return (
    <div className="px-4 py-3.5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate font-medium">{post.title}</span>
            {post.status !== "published" && (
              <span
                className="rounded px-1.5 py-0.5 text-[11px]"
                style={{
                  backgroundColor: "var(--bg-card)",
                  color: "var(--text-muted)",
                }}
              >
                {post.status || "draft"}
              </span>
            )}
          </div>
          <a
            href={`/writing/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] hover:text-[var(--accent)]"
            style={{ color: "var(--text-muted)" }}
          >
            /writing/{post.slug} &nearr;
          </a>
        </div>
        <div className="flex shrink-0 gap-3 text-sm">
          <button
            onClick={() => setEditing((v) => !v)}
            disabled={pending}
            className="transition-colors hover:text-[var(--accent)] disabled:opacity-50"
            style={{ color: "var(--text-muted)" }}
          >
            {editing ? "Close" : "Edit"}
          </button>
          <button
            onClick={remove}
            disabled={pending}
            className="transition-colors hover:text-[#b91c1c] disabled:opacity-50"
            style={{ color: "var(--text-muted)" }}
          >
            Delete
          </button>
        </div>
      </div>

      {editing && (
        <div className="mt-4">
          <label
            className="block text-[12px] uppercase tracking-wide"
            style={{ color: "var(--text-muted)" }}
          >
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-[15px] outline-none focus:border-[var(--accent)]"
            style={{ borderColor: "var(--border)" }}
          />
          <label
            className="mt-3 block text-[12px] uppercase tracking-wide"
            style={{ color: "var(--text-muted)" }}
          >
            Body (HTML)
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={12}
            spellCheck={false}
            className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 font-mono text-[13px] leading-relaxed outline-none focus:border-[var(--accent)]"
            style={{ borderColor: "var(--border)" }}
          />
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={save}
              disabled={pending}
              className="rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {pending ? "Saving…" : "Save"}
            </button>
            <button
              onClick={() => {
                setTitle(post.title);
                setBody(post.body_html);
                setEditing(false);
                setError(null);
              }}
              disabled={pending}
              className="text-sm disabled:opacity-50"
              style={{ color: "var(--text-muted)" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm" style={{ color: "#b91c1c" }}>
          {error}
        </p>
      )}
    </div>
  );
}
