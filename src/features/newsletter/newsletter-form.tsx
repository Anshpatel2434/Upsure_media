"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Turnstile } from "@/components/ui/turnstile";
import { withBrowserDelivery } from "@/features/forms/deliver";
import { cn } from "@/lib/cn";

import { subscribe, type NewsletterState } from "@/features/newsletter/action";

const subscribeWithDelivery = withBrowserDelivery(subscribe);
const initial: NewsletterState = { status: "idle" };

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
      <p role="status" className={cn("text-body", paper ? "text-sun" : "text-teal")}>
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={placeholder}
          className={cn(
            "h-12 flex-1 rounded-md border px-4 text-body focus:ring-2 focus:outline-none",
            paper
              ? "border-paper/30 bg-paper/5 text-paper placeholder:text-paper/50 focus:border-sun focus:ring-sun/40"
              : "border-line-strong bg-white text-ink placeholder:text-muted/70 focus:border-teal focus:ring-teal/40",
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
        <Button type="submit" tone={paper ? "paper" : "ink"} size="lg" disabled={pending} withArrow>
          {pending ? "Sending…" : buttonLabel}
        </Button>
      </div>
      <Turnstile theme={paper ? "dark" : "light"} appearance="interaction-only" resetKey={state} />
      {state.status === "error" && (
        <p role="alert" className="text-small text-coral">
          {state.message}
        </p>
      )}
    </form>
  );
}
