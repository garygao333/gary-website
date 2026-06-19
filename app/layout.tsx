import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gary Gao",
  description:
    "Gary Gao — co-founder of Chert. Writing on AI agents, trust, and building.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
