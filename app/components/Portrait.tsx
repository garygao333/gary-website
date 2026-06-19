"use client";

import { useState } from "react";

// Drop a portrait at public/photos/profile_picture.png to replace the placeholder.
export function Portrait() {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-32"
      style={{ backgroundColor: "var(--bg-card)" }}
    >
      {errored ? (
        <div
          className="flex h-full w-full items-center justify-center font-display text-4xl"
          style={{ color: "var(--accent)" }}
        >
          G
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/photos/profile_picture.png"
          alt="Gary Gao"
          onError={() => setErrored(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
