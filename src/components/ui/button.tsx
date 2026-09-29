import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type Variant = "solid" | "ghost" | "link";
type Size = "md" | "lg";
/** `ink` for light sections, `paper` for dark (teal-ink) sections. */
type Tone = "ink" | "paper" | "teal";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & { href: string; external?: boolean };
type NativeProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

export type ButtonProps = LinkProps | NativeProps;

const baseClass =
  "group inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap " +
  "transition-[background-color,color,border-color,transform,box-shadow] duration-(--duration-base) ease-(--ease-out) " +
  "disabled:pointer-events-none disabled:opacity-50";

const sizeClass: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem] rounded-md",
  lg: "h-13 px-7 text-base rounded-md",
};

const variantClass: Record<Variant, Record<Tone, string>> = {
  solid: {
    ink: "bg-ink text-paper hover:bg-teal active:translate-y-px",
    paper: "bg-paper text-ink hover:bg-sun active:translate-y-px",
    teal: "bg-teal text-white hover:bg-ink active:translate-y-px",
  },
  ghost: {
    ink: "border border-line-strong text-ink hover:border-ink hover:bg-white",
    paper: "border border-paper/30 text-paper hover:border-paper hover:bg-paper/10",
    teal: "border border-teal text-teal hover:bg-teal-soft",
  },
  link: {
    ink: "h-auto rounded-none px-0 text-ink underline-offset-4 hover:text-teal hover:underline",
    paper: "h-auto rounded-none px-0 text-paper underline-offset-4 hover:text-sun hover:underline",
    teal: "h-auto rounded-none px-0 text-teal underline-offset-4 hover:underline",
  },
};

export function Button(props: ButtonProps) {
  const {
    variant = "solid",
    size = "md",
    tone = "ink",
    withArrow = false,
    className,
    children,
  } = props;

  const classes = cn(
    baseClass,
    variant !== "link" && sizeClass[size],
    variantClass[variant][tone],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRightIcon
          size={18}
          className="shrink-0 transition-transform duration-(--duration-base) ease-(--ease-out) group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (props.href !== undefined) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    tone: _t,
    withArrow: _a,
    className: _c,
    children: _ch,
    href: _h,
    ...native
  } = props;
  return (
    <button type="button" {...native} className={classes}>
      {content}
    </button>
  );
}
