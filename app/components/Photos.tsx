"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const photos = [
  { src: "/photos/nus-event.webp", caption: "NUS event" },
  { src: "/photos/sf-tech-week.webp", caption: "SF Tech Week" },
  { src: "/photos/beta-fund-hackathon.webp", caption: "Beta Fund x OpenAI x AWS Hackathon" },
  { src: "/photos/p26-demo-day.jpg", caption: "YC Demo Day" },
  { src: "/photos/p26-batch.jpg", caption: "YC P26" },
  { src: "/photos/nodal.png", caption: "Nodal" },
  { src: "/photos/sherd.png", caption: "Sherd classification" },
];

export function Photos() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);

  function move(direction: number) {
    setActive((current) => (current + direction + photos.length) % photos.length);
  }

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    let total = 0;
    let lastWheel = 0;
    let lockedUntil = 0;
    function onWheel(event: WheelEvent) {
      if (event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheel > 180) total = 0;
      lastWheel = now;
      if (now < lockedUntil) return;
      total += event.deltaX;
      if (Math.abs(total) > 45) {
        const direction = Math.sign(total);
        setActive((current) => (current + direction + photos.length) % photos.length);
        total = 0;
        lockedUntil = now + 650;
      }
    }
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Event photos">
      <div
        ref={stage}
        className="photo-stage"
        tabIndex={0}
        aria-label="Swipe or use left and right arrow keys to browse photos"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;
          pointerStart.current = { x: event.clientX, y: event.clientY };
          dragged.current = false;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const start = pointerStart.current;
          if (!start) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
            dragged.current = true;
            pointerStart.current = null;
            move(dx < 0 ? 1 : -1);
          }
        }}
        onPointerUp={() => { pointerStart.current = null; }}
        onPointerCancel={() => { pointerStart.current = null; }}
        onClick={(event) => {
          if (dragged.current) { dragged.current = false; return; }
          const bounds = event.currentTarget.getBoundingClientRect();
          move(event.clientX - bounds.left < bounds.width / 2 ? -1 : 1);
        }}
      >
        {photos.map((photo, index) => {
          let offset = (index - active + photos.length) % photos.length;
          if (offset > photos.length / 2) offset -= photos.length;
          return (
            <div
              key={photo.src}
              className="photo-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${photos.length}: ${photo.caption}`}
              aria-hidden={offset !== 0}
              style={{
                transform: `translateX(${offset * 76}%) translateZ(${-Math.abs(offset) * 120}px) rotateY(${offset * -16}deg)`,
                opacity: Math.abs(offset) > 1 ? 0 : offset === 0 ? 1 : 0.45,
                zIndex: photos.length - Math.abs(offset),
                visibility: Math.abs(offset) > 1 ? "hidden" : "visible",
              }}
            >
              <Image src={photo.src} alt={photo.caption} fill sizes="(max-width: 720px) 85vw, 560px" className="object-contain" draggable={false} />
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm">{photos[active].caption}</p>
          <p className="mt-1 text-xs tabular-nums" style={{ color: "var(--text-muted)" }}>{active + 1} / {photos.length}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" className="photo-arrow" onClick={() => move(-1)} aria-label="Previous photo">←</button>
          <button type="button" className="photo-arrow" onClick={() => move(1)} aria-label="Next photo">→</button>
        </div>
      </div>
    </div>
  );
}
