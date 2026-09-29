import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  tone?: "ink" | "paper";
  className?: string;
};

const controlClass = (tone: "ink" | "paper", invalid: boolean) =>
  cn(
    "w-full rounded-md border px-4 py-3 text-body transition-[border-color,box-shadow] duration-(--duration-fast)",
    "placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-teal/40",
    tone === "ink"
      ? "bg-white border-line-strong text-ink focus:border-teal"
      : "bg-paper/5 border-paper/30 text-paper placeholder:text-paper/50 focus:border-sun focus:ring-sun/40",
    invalid && "border-coral focus:border-coral focus:ring-coral/30",
  );

function Label({ id, tone, children }: { id: string; tone: "ink" | "paper"; children: string }) {
  return (
    <label
      htmlFor={id}
      className={cn("text-small font-medium", tone === "ink" ? "text-ink-2" : "text-paper/80")}
    >
      {children}
    </label>
  );
}

function Messages({
  id,
  error,
  hint,
  tone,
}: {
  id: string;
  error?: string;
  hint?: string;
  tone: "ink" | "paper";
}) {
  if (!error && !hint) return null;
  return (
    <p
      id={`${id}-desc`}
      className={cn(
        "text-small",
        error ? "text-coral" : tone === "ink" ? "text-muted" : "text-paper/60",
      )}
      role={error ? "alert" : undefined}
    >
      {error ?? hint}
    </p>
  );
}

export function InputField({
  label,
  name,
  error,
  hint,
  tone = "ink",
  className,
  ...rest
}: BaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "className">) {
  const id = `field-${name}`;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label id={id} tone={tone}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${id}-desc` : undefined}
        className={controlClass(tone, Boolean(error))}
        {...rest}
      />
      <Messages id={id} error={error} hint={hint} tone={tone} />
    </div>
  );
}

export function TextareaField({
  label,
  name,
  error,
  hint,
  tone = "ink",
  className,
  ...rest
}: BaseProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "className">) {
  const id = `field-${name}`;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label id={id} tone={tone}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${id}-desc` : undefined}
        className={cn(controlClass(tone, Boolean(error)), "resize-y")}
        {...rest}
      />
      <Messages id={id} error={error} hint={hint} tone={tone} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  tone = "ink",
  className,
  options,
  ...rest
}: BaseProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "name" | "className"> & {
    options: { value: string; label: string }[];
  }) {
  const id = `field-${name}`;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label id={id} tone={tone}>
        {label}
      </Label>
      <select
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${id}-desc` : undefined}
        className={controlClass(tone, Boolean(error))}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Messages id={id} error={error} hint={hint} tone={tone} />
    </div>
  );
}
