import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { LowDataToggle } from "@/components/layout/low-data-toggle";
import { ArrowRightIcon, ArrowUpRightIcon, SocialIcon } from "@/components/ui/icons";
import { NewsletterForm } from "@/features/newsletter/newsletter-form";
import { getGlobals } from "@/lib/queries";

/**
 * Centred footer in the reference's order: a short description, a big "Get in
 * touch" with location and email and the main CTA, the newsletter, then the
 * link columns (Services, Industries, Company, Legal, Social), and finally the
 * logo with the legal line. No phone, street address or hours, by design.
 */
export async function Footer() {
  const { footer, settings } = await getGlobals();
  const year = new Date().getFullYear();
  const columns = (footer.columns ?? []).filter((c) => (c.links ?? []).length > 0);

  return (
    <footer className="bg-teal-ink text-paper">
      <div className="mx-auto max-w-(--container-site) px-gutter pt-16 pb-8 md:pt-[100px] md:pb-10 xl:pt-[120px]">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center md:gap-10">
          <p className="max-w-xl text-base leading-[1.6] text-paper/75 md:text-[17px]">
            {footer.description}
          </p>
          <h2 className="text-[40px] leading-none font-semibold tracking-[-0.03em] md:text-[53px] xl:text-[64px]">
            Get in touch
          </h2>
          <address className="flex flex-col items-center gap-2 text-[17px] not-italic md:flex-row md:flex-wrap md:justify-center md:gap-x-6 md:text-lg">
            <a
              href={`mailto:${settings.email}`}
              className="font-semibold underline-offset-4 hover:text-sun hover:underline"
            >
              {settings.email}
            </a>
            <span className="text-paper/75">{settings.city}</span>
          </address>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/start-a-project"
              className="inline-flex h-12 items-center rounded-pill bg-sun px-7 text-[15px] font-semibold text-ink transition-colors duration-(--duration-base) ease-(--ease-smooth) hover:bg-paper"
            >
              Book a free strategy call
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-pill border border-paper/30 px-7 text-[15px] font-medium transition-colors duration-(--duration-base) ease-(--ease-smooth) hover:border-paper hover:bg-paper hover:text-ink"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Newsletter: a full-width row on the same edges as the link columns */}
        <div className="mt-14 grid gap-5 border-y border-paper/15 py-8 md:mt-20 md:grid-cols-[minmax(0,1fr)_minmax(0,480px)] md:items-center md:gap-12 md:py-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-[22px] leading-tight font-semibold tracking-[-0.01em] md:text-[26px]">
              {footer.newsletter?.heading ?? "Subscribe to The Upshot"}
            </h3>
            {footer.newsletter?.text && (
              <p className="max-w-md text-[15px] leading-[1.55] text-paper/70 md:text-base">
                {footer.newsletter.text}
              </p>
            )}
          </div>
          <NewsletterForm
            placeholder={footer.newsletter?.placeholder ?? undefined}
            buttonLabel={footer.newsletter?.buttonLabel ?? undefined}
            source="footer"
            tone="paper"
          />
        </div>

        {/* Link columns */}
        <nav
          aria-label="Footer"
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-16 md:grid-cols-3 lg:grid-cols-[2fr_repeat(4,1fr)]"
        >
          {columns.map((col) => (
            <div
              key={col.heading}
              className={col.heading === "Services" ? "col-span-2 md:col-span-1" : undefined}
            >
              <h3 className="mb-4 text-[11px] font-semibold tracking-[0.12em] text-paper/50 uppercase">
                {col.heading}
              </h3>
              <ul
                className={
                  col.heading === "Services"
                    ? "grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1 xl:grid-cols-2"
                    : "flex flex-col gap-2.5"
                }
              >
                {(col.links ?? []).map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      target={l.newTab ? "_blank" : undefined}
                      rel={l.newTab ? "noopener noreferrer" : undefined}
                      className="group inline-flex items-center gap-2 text-[15px] leading-snug"
                    >
                      {col.heading === "Social" ? (
                        <SocialIcon platform={l.label} size={18} className="shrink-0 text-sun" />
                      ) : (
                        <ArrowRightIcon
                          size={14}
                          className="shrink-0 text-sun transition-transform duration-300 ease-(--ease-smooth) group-hover:translate-x-1"
                        />
                      )}
                      <span className="transition-colors duration-(--duration-base) group-hover:text-sun">
                        {l.label}
                      </span>
                      {l.newTab && <ArrowUpRightIcon size={13} className="text-paper/50" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-12 flex flex-col gap-5 border-t border-paper/15 pt-7 md:mt-20 md:flex-row md:items-end md:justify-between md:pt-8">
          <Link href="/" aria-label="Upsure Media home" className="w-fit">
            <Logo tone="paper" className="text-[2.25rem] md:text-[2.75rem]" />
          </Link>
          <div className="flex flex-col gap-2 text-small text-paper/60 md:items-end">
            <p>{settings.city}</p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <li>
                © {year} {footer.copyright ?? settings.name}
                {settings.registrationNumbers ? ` · ${settings.registrationNumbers}` : ""}
              </li>
              {(footer.legal ?? []).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="underline-offset-4 hover:text-paper hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <LowDataToggle />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
