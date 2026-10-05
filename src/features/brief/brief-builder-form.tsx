"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";

import type { Form } from "@/content/types";

import { Button } from "@/components/ui/button";
import { InputField, SelectField } from "@/components/ui/field";
import { CheckIcon } from "@/components/ui/icons";
import { submitForm, type FormState } from "@/features/forms/action";
import { cn } from "@/lib/cn";

type Need = { label: string; slug: string; tags: string[] };

const initial: FormState = { status: "idle" };
const STEPS = ["What you need", "Budget & timing", "Your details"] as const;

/**
 * Three-step brief. One <form> the whole way through: earlier steps stay
 * mounted (hidden) so their values submit together. Pre-fills from ?need=.
 */
export function BriefBuilderForm({ form, needs }: { form: Form; needs: Need[] }) {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [custom, setCustom] = useState(() => params.get("need") ?? "");
  const [business, setBusiness] = useState("");
  const [state, action, pending] = useActionState(submitForm, initial);

  const field = (name: string) => form.fields?.find((f) => "name" in f && f.name === name);
  const options = (name: string) => {
    const f = field(name);
    return f && f.blockType === "select"
      ? (f.options ?? []).map((o) => ({ value: o.value, label: o.label }))
      : [];
  };
  const needsValue = [...selected, custom.trim()].filter(Boolean).join("; ");
  const canContinue = step === 0 ? needsValue.length > 0 && business !== "" : true;

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border border-teal bg-teal-soft p-8">
        <p className="text-h3">{state.message}</p>
        <p className="mt-2 text-ink-2">
          We&rsquo;ve received your brief. Check your inbox for a note from us.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-8" noValidate>
      <input type="hidden" name="__form" value={form.id} />
      <input type="hidden" name="needs" value={needsValue} />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      {/* Stepper */}
      <ol className="grid grid-cols-3 gap-2" aria-label="Progress">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-col gap-2">
            <span className={cn("h-1 rounded-pill", i <= step ? "bg-teal" : "bg-line")} />
            <span
              className={cn("text-small", i === step ? "font-semibold text-ink" : "text-muted")}
              aria-current={i === step ? "step" : undefined}
            >
              {i + 1}. {label}
            </span>
          </li>
        ))}
      </ol>

      {/* Step 1 */}
      <fieldset className={cn("flex flex-col gap-5", step !== 0 && "hidden")}>
        <legend className="text-h3">What do you need?</legend>
        <p className="text-ink-2">Pick as many as apply.</p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {needs.map((n) => {
            const on = selected.includes(n.label);
            return (
              <li key={n.slug}>
                <button
                  type="button"
                  onClick={() =>
                    setSelected((s) => (on ? s.filter((x) => x !== n.label) : [...s, n.label]))
                  }
                  aria-pressed={on}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-colors",
                    on
                      ? "border-teal bg-teal-soft"
                      : "border-line bg-white hover:border-line-strong",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border",
                      on ? "border-teal bg-teal text-white" : "border-line-strong",
                    )}
                  >
                    {on && <CheckIcon size={14} />}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-medium">{n.label}</span>
                    {n.tags.length > 0 && (
                      <span className="text-small text-muted">{n.tags.join(" · ")}</span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <SelectField
          label="Your business"
          name="business"
          required
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          options={[{ value: "", label: "Select…" }, ...options("business")]}
          error={state.errors?.business}
        />
        <InputField
          label="Anything else? (optional)"
          name="needs_custom"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="e.g. We need to sharpen our positioning"
        />
      </fieldset>

      {/* Step 2 */}
      <fieldset className={cn("grid gap-5 sm:grid-cols-2", step !== 1 && "hidden")}>
        <legend className="mb-4 text-h3 sm:col-span-2">Budget and timing</legend>
        <SelectField
          label="Budget per month"
          name="budget"
          required
          options={[{ value: "", label: "Select…" }, ...options("budget")]}
          error={state.errors?.budget}
        />
        <SelectField
          label="When"
          name="timeline"
          required
          options={[{ value: "", label: "Select…" }, ...options("timeline")]}
          error={state.errors?.timeline}
        />
      </fieldset>

      {/* Step 3 */}
      <fieldset className={cn("grid gap-5 sm:grid-cols-2", step !== 2 && "hidden")}>
        <legend className="mb-4 text-h3 sm:col-span-2">Where should we reply?</legend>
        <InputField
          label="Name"
          name="name"
          required
          autoComplete="name"
          error={state.errors?.name}
        />
        <InputField
          label="Work email"
          name="email"
          type="email"
          required
          autoComplete="email"
          error={state.errors?.email}
        />
        <InputField label="Company" name="company" autoComplete="organization" />
        <InputField
          label="Website or Instagram link"
          name="website_url"
          type="url"
          placeholder="https://"
        />
      </fieldset>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <Button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canContinue}
            withArrow
          >
            Continue
          </Button>
        ) : (
          <Button type="submit" size="lg" disabled={pending} withArrow>
            {pending ? "Sending…" : form.submitButtonLabel || "Send brief"}
          </Button>
        )}
      </div>
      {state.status === "error" && (
        <p role="alert" className="text-small text-coral">
          {state.message}
        </p>
      )}
    </form>
  );
}
