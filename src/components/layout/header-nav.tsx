"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon, ChevronRightIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type NavChild = { label: string; href: string; description?: string | null };
export type NavItem = { label: string; href: string; children?: NavChild[] | null };
export type NavLink = { label: string; href: string; newTab?: boolean | null };

type Props = {
  items: NavItem[];
  cta: { label: string; href: string };
  secondary: NavLink[];
  contact: { email: string; phone?: string | null; phoneHref?: string | null };
};

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/**
 * Sticky header. Desktop: inline links with a sliding underline and
 * fade/slide dropdowns. Mobile: native <dialog> drawer that slides in from the
 * right with staggered links. Compacts with a blur once the page is scrolled.
 */
export function HeaderNav({ items, cta, secondary, contact }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const sentinel = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const id = useId();

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!(e?.isIntersecting ?? true)), {
      rootMargin: "-1px 0px 0px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Close dropdowns and the drawer on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
  }
  useEffect(() => {
    dialog.current?.close();
  }, [pathname]);

  // Close dropdown on outside click / Esc.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div ref={sentinel} aria-hidden className="h-px w-full" />
      <header
        data-scrolled={scrolled || undefined}
        className={cn(
          "sticky top-0 z-40 transition-[background-color,box-shadow] duration-(--duration-slow) ease-(--ease-smooth)",
          scrolled
            ? "bg-paper/80 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <nav
          ref={navRef}
          aria-label="Primary"
          className={cn(
            "mx-auto flex max-w-(--container-site) items-center justify-between gap-6 px-gutter transition-[height] duration-(--duration-slow) ease-(--ease-smooth)",
            scrolled ? "h-16" : "h-22",
          )}
        >
          <Link href="/" className="rounded-sm" aria-label="Upsure home">
            <Logo />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {items.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const active = isActive(pathname, item.href);
              const menuId = `${id}-${item.label.toLowerCase().replace(/\s+/g, "-")}`;
              const isOpen = open === item.label;
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && setOpen(item.label)}
                  onMouseLeave={() => hasChildren && setOpen((o) => (o === item.label ? null : o))}
                >
                  <span className="flex items-center">
                    <Link
                      href={item.href}
                      className={cn(
                        "group relative rounded-md px-3 py-2 text-[0.95rem] font-medium text-ink-2 hover:text-ink",
                        active && "text-ink",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-teal transition-transform duration-(--duration-base) ease-(--ease-smooth) group-hover:scale-x-100",
                          active && "scale-x-100",
                        )}
                      />
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        className="-ml-2 rounded-md p-1 text-muted hover:text-ink"
                        aria-expanded={isOpen}
                        aria-controls={menuId}
                        aria-label={`${item.label} menu`}
                        onClick={() => setOpen((o) => (o === item.label ? null : item.label))}
                      >
                        <ChevronRightIcon
                          size={16}
                          className={cn(
                            "transition-transform duration-(--duration-fast)",
                            isOpen ? "-rotate-90" : "rotate-90",
                          )}
                        />
                      </button>
                    )}
                  </span>

                  {hasChildren && (
                    <div
                      id={menuId}
                      role="group"
                      aria-hidden={!isOpen}
                      className={cn(
                        "absolute top-full left-0 z-50 w-[22rem] pt-3 transition-[opacity,transform,visibility] duration-(--duration-base) ease-(--ease-smooth)",
                        isOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0",
                      )}
                    >
                      <ul className="grid gap-1 rounded-lg bg-white/95 p-2 shadow-lift ring-1 ring-line backdrop-blur-md">
                        {item.children!.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              tabIndex={isOpen ? 0 : -1}
                              className="group/item flex items-center justify-between gap-3 rounded-md px-3 py-2.5 hover:bg-paper-2 focus-visible:bg-paper-2"
                            >
                              <span className="flex flex-col gap-0.5">
                                <span className="font-medium text-ink">{child.label}</span>
                                {child.description && (
                                  <span className="text-small text-muted">{child.description}</span>
                                )}
                              </span>
                              <ChevronRightIcon
                                size={16}
                                className="shrink-0 text-muted transition-transform group-hover/item:translate-x-1 group-hover/item:text-teal"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Button href={cta.href} size="md" withArrow className="hidden sm:inline-flex">
              {cta.label}
            </Button>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-pill border border-line-strong text-ink hover:bg-ink hover:text-paper lg:hidden"
              aria-label="Open menu"
              onClick={() => dialog.current?.showModal()}
            >
              <MenuIcon />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <dialog
        ref={dialog}
        className="drawer m-0 ml-auto h-dvh max-h-none w-full max-w-md bg-teal-ink text-paper backdrop:bg-ink/60 backdrop:backdrop-blur-sm open:flex open:flex-col"
        aria-label="Navigation menu"
      >
        <div className="flex h-22 items-center justify-between px-gutter">
          <Link href="/" aria-label="Upsure home" onClick={() => dialog.current?.close()}>
            <Logo tone="paper" />
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-pill border border-paper/30 hover:bg-paper hover:text-ink"
            aria-label="Close menu"
            onClick={() => dialog.current?.close()}
          >
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col overflow-y-auto px-gutter pb-10">
          <ul className="divide-y divide-paper/15 border-y border-paper/15">
            {items.map((item, i) =>
              item.children?.length ? (
                <li key={item.label} data-stagger style={{ "--i": i } as CSSProperties}>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-h3 font-medium">
                      {item.label}
                      <ChevronRightIcon className="transition-transform group-open:rotate-90" />
                    </summary>
                    <ul className="mb-3 grid gap-1 pl-2">
                      <li>
                        <Link href={item.href} className="block py-2 text-lead text-sun">
                          All {item.label.toLowerCase()}
                        </Link>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="block py-2 text-lead text-paper/85">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={item.label} data-stagger style={{ "--i": i } as CSSProperties}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between py-4 text-h3 font-medium"
                  >
                    {item.label}
                    <ArrowUpRightIcon className="text-paper/40 transition-transform group-hover:translate-x-1 group-hover:text-sun" />
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div
            className="mt-8 flex flex-col gap-4"
            data-stagger
            style={{ "--i": items.length } as CSSProperties}
          >
            <Button href={cta.href} tone="paper" size="lg" withArrow>
              {cta.label}
            </Button>
            <a
              href={`mailto:${contact.email}`}
              className="text-lead underline-offset-4 hover:underline"
            >
              {contact.email}
            </a>
            {contact.phone && contact.phoneHref && (
              <a
                href={`tel:${contact.phoneHref}`}
                className="text-lead underline-offset-4 hover:underline"
              >
                {contact.phone}
              </a>
            )}
            <ul className="mt-2 flex flex-wrap gap-4 text-small text-paper/70">
              {secondary.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target={l.newTab ? "_blank" : undefined}
                    rel={l.newTab ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1 hover:text-paper"
                  >
                    {l.label}
                    {l.newTab && <ArrowUpRightIcon size={14} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </dialog>
    </>
  );
}
