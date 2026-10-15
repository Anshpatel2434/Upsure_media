"use client";

import { useActionState } from "react";

import { ArrowRightIcon } from "@/components/ui/icons";
import { Turnstile } from "@/components/ui/turnstile";
import { withBrowserDelivery } from "@/features/forms/deliver";
import { cn } from "@/lib/cn";

import { subscribe, type NewsletterState } from "@/features/newsletter/action";

const subscribeWithDelivery = withBrowserDelivery(subscribe);
const initial: NewsletterState = { status: "idle" };

/**
 * Email field and button joined in one pill, so they always share a height
 * and an edge. `paper` is for dark sections, `ink` for light ones.
 */
export function NewsletterForm({
  placeholder = "Enter your email",
  buttonLabel = "Subscribe",
  source,
  tone = "paper",
  className,
}: {
  placeholder?: string;
  buttonLabel?: string;
  source?: string;
  tone?: "ink" | "paper";
  className?: string;
}) {
  const [state, action, pending] = useActionState(subscribeWithDelivery, initial);
  const paper = tone === "paper";

  if (state.status === "success") {
    return (
      <p role="status" className={cn("text-body", paper ? "text-sun" : "text-teal", className)}>
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className={cn("flex w-full flex-col gap-2", className)}>
      <div
        className={cn(
          "flex w-full items-center gap-1.5 rounded-pill border p-1.5 transition-colors duration-(--duration-base)",
          paper
            ? "border-paper/25 bg-paper/5 focus-within:border-sun"
            : "border-line-strong bg-white focus-within:border-teal",
        )}
      >
        <label htmlFor={`newsletter-email-${source ?? "form"}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-email-${source ?? "form"}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={placeholder}
          className={cn(
            "h-11 min-w-0 flex-1 bg-transparent pl-4 text-[15px] outline-none md:h-12 md:pl-5 md:text-body",
            paper ? "text-paper placeholder:text-paper/45" : "text-ink placeholder:text-muted/70",
          )}
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
        />
        <input type="hidden" name="source" value={source ?? ""} />
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "group inline-flex h-11 shrink-0 items-center gap-2 rounded-pill px-5 text-sm font-semibold transition-colors duration-(--duration-base) disabled:opacity-60 md:h-12 md:px-6 md:text-[15px]",
            paper ? "bg-sun text-ink hover:bg-paper" : "bg-ink text-paper hover:bg-teal",
          )}
        >
          {pending ? "Sending…" : buttonLabel}
          <ArrowRightIcon
            size={16}
            className="transition-transform duration-(--duration-base) group-hover:translate-x-0.5"
          />
        </button>
      </div>
      <Turnstile theme={paper ? "dark" : "light"} appearance="interaction-only" resetKey={state} />
      {state.status === "error" && (
        <p role="alert" className="pl-5 text-small text-coral">
          {state.message}
        </p>
      )}
    </form>
  );
}
