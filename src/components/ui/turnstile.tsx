"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let loading: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    script.onload = () =>
      window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile missing"));
    script.onerror = () => {
      loading = null;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

type Props = {
  theme?: "light" | "dark";
  /** "interaction-only" stays invisible unless Cloudflare needs the visitor to click. */
  appearance?: "always" | "interaction-only";
  /** Change this (e.g. pass the form's action state) to get a fresh token after a submit. */
  resetKey?: unknown;
  className?: string;
};

/**
 * Cloudflare Turnstile, rendered explicitly so it works in forms that mount
 * after the script has loaded. It adds a hidden `cf-turnstile-response` input
 * to the surrounding <form>. Renders nothing when no site key is configured.
 */
export function Turnstile({ theme = "light", appearance = "always", resetKey, className }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const ref = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  useEffect(() => {
    if (!siteKey || !ref.current) return;
    const el = ref.current;
    let cancelled = false;
    loadTurnstile()
      .then((api) => {
        if (cancelled) return;
        widget.current = api.render(el, { sitekey: siteKey, theme, appearance, size: "flexible" });
      })
      .catch(() => {
        // The server rejects the submission with a clear message; nothing to do here.
      });
    return () => {
      cancelled = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, [siteKey, theme, appearance]);

  // Tokens are single-use: get a new one after every submission attempt.
  useEffect(() => {
    if (widget.current) window.turnstile?.reset(widget.current);
  }, [resetKey]);

  if (!siteKey) return null;
  return <div ref={ref} className={cn("min-h-0", className)} />;
}
