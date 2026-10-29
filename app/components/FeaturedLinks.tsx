import Image from "next/image";
import { featuredLinks } from "../lib/featured-links";

export function FeaturedLinks() {
  return (
    <ul className="mt-2">
      {featuredLinks.map((item) => (
        <li key={item.href} className="border-b py-5" style={{ borderColor: "var(--border)" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <a href={item.href} target="_blank" rel="noreferrer" className="min-w-0 flex-1 basis-72 font-display text-lg leading-snug transition-colors hover:text-[var(--accent)]">
              {item.title}
            </a>
            <a href={item.href} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1.5 text-xs transition-colors hover:text-[var(--accent)]" style={{ color: "var(--text-muted)" }} aria-label={`Read ${item.title} on ${item.source}`}>
              <Image src={`/site-icons/${new URL(item.href).hostname}.png`} alt="" width={16} height={16} unoptimized className="rounded-sm" />
              ({new URL(item.href).hostname.replace(/^www\./, "")}) <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            ({item.source}) {item.subtitle}
          </p>
        </li>
      ))}
    </ul>
  );
}
