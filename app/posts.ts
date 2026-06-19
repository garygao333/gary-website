export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  year: string;
  excerpt: string;
};

// Add a new post here and create app/writing/<slug>/page.tsx for the full text.
export const posts: Post[] = [
  {
    slug: "the-chert-thesis",
    title: "The Chert Thesis",
    date: "2025-09-01",
    year: "2025",
    excerpt:
      "Why AI agents need a layer of trust — and how that turns an 8B market into a 50B one.",
  },
];
