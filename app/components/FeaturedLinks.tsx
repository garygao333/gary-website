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
            <a href={item.href} target="_blank" rel="noreferrer" className="shrink-0 text-xs transition-colors hover:text-[var(--accent)]" style={{ color: "var(--text-muted)" }} aria-label={`Read ${item.title} on ${item.source}`}>
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
