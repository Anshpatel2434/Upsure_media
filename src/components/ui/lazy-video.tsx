"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Muted looping video that only loads once near the viewport, pauses when
 * off-screen or the tab is hidden, and shows just the poster when the user
 * prefers reduced motion, has Save-Data on, or is on a low-memory device.
 */
export function LazyVideo({
  src,
  poster,
  className,
  label = "Video",
}: {
  src: string;
  poster?: string;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    const lowData =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "off" ||
      Boolean(nav.connection?.saveData) ||
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2);
    if (lowData) return;

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setEnabled(true);
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    const onVisibility = () => (document.hidden ? el.pause() : void el.play().catch(() => {}));
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={cn("bg-paper-2 object-cover", className)}
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
      aria-label={label}
    >
      {enabled && <source src={src} />}
    </video>
  );
}
