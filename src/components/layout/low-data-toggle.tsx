"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const KEY = "upsure:motion";

/**
 * Footer switch for "low data mode": turns off all animation and video.
 * Auto-enabled when the browser reports Save-Data, reduced motion or ≤2 GB RAM.
 * Persisted per browser in localStorage.
 */
const subscribe = () => () => {};

function detectLowData(): boolean {
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(KEY);
  } catch {
    /* storage unavailable */
  }
  if (stored) return stored === "off";
  return (
    Boolean(nav.connection?.saveData) ||
    (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function LowDataToggle() {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [off, setOff] = useState<boolean | null>(null);
  if (mounted && off === null) setOff(detectLowData());

  useEffect(() => {
    if (off === null) return;
    document.documentElement.dataset.motion = off ? "off" : "on";
  }, [off]);

  if (off === null) return null;

  const toggle = () => {
    const next = !off;
    setOff(next);
    try {
      localStorage.setItem(KEY, next ? "off" : "on");
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={off}
      onClick={toggle}
      className="inline-flex items-center gap-2 text-small text-paper/60 underline-offset-4 hover:text-paper hover:underline"
    >
      <span
        aria-hidden
        className={`inline-block size-2 rounded-pill ${off ? "bg-sun" : "bg-paper/30"}`}
      />
      Low data mode {off ? "on" : "off"}
    </button>
  );
}
