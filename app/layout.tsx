import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gary Gao",
  description:
    "Gary Gao, co-founder and CEO at Chert (YC P26). We build infra that lets AI agents use FaceTime and iMessage.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
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
