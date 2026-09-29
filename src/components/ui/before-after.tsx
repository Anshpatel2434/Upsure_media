"use client";

import Image from "next/image";
import { useId, useState } from "react";

import type { ImageProps } from "@/lib/media";

/**
 * Before/after comparison driven by a native range input: keyboard accessible,
 * touch friendly, no library. The "after" image is clipped to the slider value.
 */
export function BeforeAfter({
  before,
  after,
  caption,
}: {
  before: ImageProps;
  after: ImageProps;
  caption?: string | null;
}) {
  const [value, setValue] = useState(50);
  const id = useId();
  return (
    <figure className="flex flex-col gap-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-paper-2 select-none">
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover"
          placeholder={before.blurDataURL ? "blur" : "empty"}
          blurDataURL={before.blurDataURL}
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
          <Image
            src={after.src}
            alt={after.alt}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
            placeholder={after.blurDataURL ? "blur" : "empty"}
            blurDataURL={after.blurDataURL}
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-y-0 w-0.5 bg-paper shadow-lift"
          style={{ left: `${value}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill bg-paper text-ink shadow-lift">
            ⇔
          </span>
        </div>
        <span
          aria-hidden
          className="absolute top-4 left-4 rounded-sm bg-ink/70 px-2 py-1 text-small text-paper"
        >
          After
        </span>
        <span
          aria-hidden
          className="absolute top-4 right-4 rounded-sm bg-ink/70 px-2 py-1 text-small text-paper"
        >
          Before
        </span>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label="Reveal after image"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      {caption && <figcaption className="text-small text-muted">{caption}</figcaption>}
    </figure>
  );
}
