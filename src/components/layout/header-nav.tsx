"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChevronRightIcon,
  CloseIcon,
  MenuIcon,
} from "@/components/ui/icons";
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
 * Desktop: the logo sits in the page flow while a frosted navigation pill stays
 * fixed to the top right. Mobile: a floating frosted bar (logo, CTA, menu) and
 * a native <dialog> drawer that slides in from the right with staggered links.
 */
export function HeaderNav({ items, cta, secondary, contact }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const id = useId();

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

  const expanded = items.some((i) => i.label === open && i.children?.length);

  return (
    <>
      <header className="sticky top-0 z-40 px-[15px] pt-[15px] md:px-[25px] md:pt-[25px] lg:static lg:p-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {/* Below lg: a floating frosted bar. From lg: just the logo, in the page flow. */}
        <div className="mx-auto flex max-w-(--container-site) items-center justify-between gap-4 rounded-[28px] bg-[rgb(233_233_233/0.6)] p-[5px] pl-5 backdrop-blur-[8px] lg:h-[126px] lg:items-end lg:rounded-none lg:bg-transparent lg:p-0 lg:px-gutter lg:backdrop-blur-none">
          <Link
            href="/"
            className="rounded-sm lg:flex lg:h-[76px] lg:items-center"
            aria-label="Upsure home"
          >
            <Logo />
          </Link>

          <div className="flex items-center gap-1.5 lg:hidden">
            <Link
              href={cta.href}
              className="inline-flex h-11 items-center rounded-pill bg-sun px-5 text-[13px] font-semibold text-ink transition-colors duration-(--duration-base) hover:bg-ink hover:text-paper"
            >
              {cta.label}
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-pill bg-ink text-sun transition-transform duration-(--duration-base) hover:scale-105"
              aria-label="Open menu"
              onClick={() => dialog.current?.showModal()}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/*
        Desktop: a frosted pill fixed to the top right. Items share the width
        equally; hovering an item with children grows the pill downwards and
        reveals its sub-links in a row.
      */}
      <div className="pointer-events-none fixed inset-x-0 top-[50px] z-50 hidden lg:block">
        <div className="mx-auto flex max-w-(--container-site) justify-end px-gutter">
          <nav
            ref={navRef}
            aria-label="Primary"
            onMouseLeave={() => setOpen(null)}
            className={cn(
              "pointer-events-auto relative w-[66%] overflow-hidden rounded-[38px] bg-white/70 p-[15px] backdrop-blur-[9px] xl:w-[64%]",
              "transition-[height,box-shadow] duration-(--duration-base) ease-(--ease-smooth)",
              expanded ? "h-[152px] shadow-[0_0_25px_rgb(0_0_0/0.06)]" : "h-[76px]",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 top-[76px] h-[76px] rounded-b-[38px] bg-[rgb(235_235_235/0.5)] transition-opacity duration-(--duration-base) ease-(--ease-smooth)",
                expanded ? "opacity-100" : "opacity-0",
              )}
            />
            <ul className="flex gap-[3px]">
              {items.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const active = isActive(pathname, item.href);
                const menuId = `${id}-${item.label.toLowerCase().replace(/\s+/g, "-")}`;
                const isOpen = open === item.label;
                return (
                  <li
                    key={item.label}
                    className="flex-1"
                    onMouseEnter={() => setOpen(hasChildren ? item.label : null)}
                    onFocus={() => setOpen(hasChildren ? item.label : null)}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={hasChildren ? isOpen : undefined}
                      aria-controls={hasChildren ? menuId : undefined}
                      className={cn(
                        "group/nav relative flex h-[46px] items-center justify-center overflow-hidden rounded-[33px] px-2.5 text-[13px] font-medium text-ink",
                        "transition-colors duration-(--duration-base) ease-(--ease-smooth) hover:bg-[#e9e9e9] focus-visible:bg-[#e9e9e9]",
                        (active || isOpen) && "bg-[#f1f1f1]",
                      )}
                    >
                      <span className="transition-transform duration-(--duration-base) ease-(--ease-smooth) xl:group-hover/nav:-translate-x-2.5">
                        {item.label}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "absolute right-2.5 hidden size-[18px] translate-x-[200%] items-center justify-center rounded-pill bg-sun opacity-0 transition-[transform,opacity] duration-(--duration-base) ease-(--ease-smooth) xl:flex",
                          "group-hover/nav:translate-x-0 group-hover/nav:opacity-100",
                          isOpen && "translate-x-0 opacity-100",
                        )}
                      >
                        <ArrowRightIcon
                          size={11}
                          className={cn(
                            "transition-transform duration-(--duration-base) ease-(--ease-smooth)",
                            hasChildren && isOpen && "rotate-90",
                          )}
                        />
                      </span>
                    </Link>

                    {hasChildren && (
                      <ul
                        id={menuId}
                        aria-label={`${item.label} pages`}
                        className={cn(
                          "absolute inset-x-0 top-[61px] no-scrollbar flex h-[91px] items-center gap-x-6 overflow-x-auto px-[28px] pt-[15px]",
                          "transition-[opacity,visibility] duration-150 ease-(--ease-smooth)",
                          isOpen ? "visible opacity-100" : "invisible opacity-0",
                        )}
                      >
                        {item.children!.map((child) => (
                          <li key={child.href} className="shrink-0">
                            <Link
                              href={child.href}
                              tabIndex={isOpen ? 0 : -1}
                              className="group/sub flex items-center gap-2 text-[13px] font-medium whitespace-nowrap text-ink hover:text-black"
                            >
                              <ArrowRightIcon
                                size={13}
                                aria-hidden
                                className="shrink-0 transition-transform duration-300 ease-(--ease-smooth) group-hover/sub:translate-x-1"
                              />
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
              <li className="flex-1" onMouseEnter={() => setOpen(null)}>
                <Link
                  href={cta.href}
                  className="flex h-[46px] items-center justify-center rounded-[33px] bg-sun px-3 text-[13px] font-semibold whitespace-nowrap text-ink transition-colors duration-(--duration-base) ease-(--ease-smooth) hover:bg-ink hover:text-paper"
                >
                  {cta.label}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

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
