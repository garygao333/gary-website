"use client";

import { useState } from "react";

type Photo = {
  src: string;
  caption: string;
};

// Drop your images in public/photos/ with these filenames (or edit the list).
const photos: Photo[] = [
  { src: "/photos/p26-demo-day.jpg", caption: "YC Demo Day" },
  { src: "/photos/p26-batch.jpg", caption: "YC P26" },
  { src: "/photos/nodal.png", caption: "Nodal" },
  { src: "/photos/sherd.png", caption: "Sherd classification" },
];

function PhotoTile({ photo }: { photo: Photo }) {
  const [errored, setErrored] = useState(false);

  return (
    <figure className="group relative aspect-[3/2] overflow-hidden rounded-lg">
      {errored ? (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ backgroundColor: "var(--bg-card)" }}
        >
          <span
            className="text-xs tracking-wide"
            style={{ color: "var(--text-muted)" }}
          >
            {photo.caption}
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo.src}
          alt={photo.caption}
          loading="lazy"
          onError={() => setErrored(true)}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      )}
      <figcaption
        className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
        }}
      >
        {errored ? "" : photo.caption}
      </figcaption>
    </figure>
  );
}

export function Photos() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {photos.map((photo) => (
        <PhotoTile key={photo.src} photo={photo} />
      ))}
    </div>
  );
}
