"use client";

import { useActionState } from "react";

import type { Form } from "@/content/types";

import { Button } from "@/components/ui/button";
import { InputField, SelectField, TextareaField } from "@/components/ui/field";
import { Turnstile } from "@/components/ui/turnstile";
import { submitForm, type FormState } from "@/features/forms/action";
import { cn } from "@/lib/cn";

const initial: FormState = { status: "idle" };

type Props = {
  form: Form;
  tone?: "ink" | "paper";
  /** Pre-filled values, e.g. from ?need= on the URL. */
  defaults?: Record<string, string>;
  className?: string;
};

/**
 * Renders any Form Builder form. Progressive enhancement: it is a normal
 * <form> posting to a server action, so it works before hydration too.
 */
export function LeadForm({ form, tone = "ink", defaults = {}, className }: Props) {
  const [state, action, pending] = useActionState(submitForm, initial);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "rounded-lg border p-6",
          tone === "ink"
            ? "border-teal bg-teal-soft text-ink"
            : "border-sun/50 bg-paper/10 text-paper",
        )}
      >
        <p className="text-lead font-medium">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className={cn("grid gap-5 sm:grid-cols-2", className)} noValidate>
      <input type="hidden" name="__form" value={form.key} />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      {(form.fields ?? []).map((field) => {
        if (!("name" in field) || !field.name) return null;
        const width = "width" in field && field.width && field.width <= 50 ? "" : "sm:col-span-2";
        const common = {
          name: field.name,
          label: ("label" in field && field.label) || field.name,
          required: "required" in field ? Boolean(field.required) : false,
          error: state.errors?.[field.name],
          tone,
          className: width,
          defaultValue:
            defaults[field.name] ??
            ("defaultValue" in field ? (field.defaultValue as string | undefined) : undefined),
        };
        switch (field.blockType) {
          case "textarea":
            return <TextareaField key={field.id ?? field.name} {...common} rows={5} />;
          case "select":
            return (
              <SelectField
                key={field.id ?? field.name}
                {...common}
                options={[
                  { value: "", label: "Select…" },
                  ...(field.options ?? []).map((o) => ({ value: o.value, label: o.label })),
                ]}
              />
            );
          case "email":
            return (
              <InputField
                key={field.id ?? field.name}
                {...common}
                type="email"
                autoComplete="email"
              />
            );
          case "number":
            return <InputField key={field.id ?? field.name} {...common} type="number" />;
          case "checkbox":
            return (
              <label
                key={field.id ?? field.name}
                className={cn("flex items-center gap-3 text-body", width)}
              >
                <input
                  type="checkbox"
                  name={field.name}
                  className="size-4 accent-teal"
                  defaultChecked={Boolean(field.defaultValue)}
                />
                {common.label}
              </label>
            );
          default:
            return (
              <InputField
                key={field.id ?? field.name}
                {...common}
                type={field.name === "phone" ? "tel" : "text"}
                autoComplete={
                  field.name === "name"
                    ? "name"
                    : field.name === "phone"
                      ? "tel"
                      : field.name === "company"
                        ? "organization"
                        : undefined
                }
              />
            );
        }
      })}

      <Turnstile
        theme={tone === "ink" ? "light" : "dark"}
        resetKey={state}
        className="sm:col-span-2"
      />

      <div className="flex flex-col gap-3 sm:col-span-2">
        <Button type="submit" size="lg" tone={tone} disabled={pending} withArrow className="w-fit">
          {pending ? "Sending…" : form.submitButtonLabel || "Send"}
        </Button>
        {state.status === "error" && (
          <p role="alert" className="text-small text-coral">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
