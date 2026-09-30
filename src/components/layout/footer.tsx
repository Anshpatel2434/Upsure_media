import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { LowDataToggle } from "@/components/layout/low-data-toggle";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { NewsletterForm } from "@/features/newsletter/newsletter-form";
import { getGlobals } from "@/lib/queries";

/**
 * Centred footer in the reference's order: a short description, a big "Get in
 * touch" with contact details and the main CTA, the newsletter, then every
 * link as an arrow list, and finally the logo with the legal line.
 */
export async function Footer() {
  const { footer, settings } = await getGlobals();
  const year = new Date().getFullYear();
  const links = [
    ...(footer.columns ?? []).flatMap((c) => c.links ?? []),
    ...(settings.socials ?? []).map((s) => ({ label: s.platform, href: s.url, newTab: true })),
  ].filter((l, i, all) => all.findIndex((x) => x.href === l.href) === i);
  const address = [settings.addressLine1, settings.addressLine2].filter(Boolean).join(", ");

  return (
    <footer className="bg-teal-ink text-paper">
      <div className="mx-auto max-w-(--container-site) px-gutter pt-[70px] pb-10 md:pt-[100px] xl:pt-[120px]">
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
            {settings.phone && settings.phoneHref && (
              <a
                href={`tel:${settings.phoneHref}`}
                className="underline-offset-4 hover:text-sun hover:underline"
              >
                {settings.phone}
              </a>
            )}
            {address && <span className="text-paper/75">{address}</span>}
          </address>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/start-a-project"
              className="inline-flex h-12 items-center rounded-pill bg-sun px-7 text-[15px] font-semibold text-ink transition-colors duration-(--duration-base) ease-(--ease-smooth) hover:bg-paper"
            >
              Start a project
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-pill border border-paper/30 px-7 text-[15px] font-medium transition-colors duration-(--duration-base) ease-(--ease-smooth) hover:border-paper hover:bg-paper hover:text-ink"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mx-auto mt-16 flex max-w-3xl flex-col gap-5 rounded-[22px] bg-paper/5 p-6 md:mt-20 md:flex-row md:items-center md:gap-8 md:p-8">
          <div className="flex flex-col gap-1.5 md:w-1/2">
            <h3 className="text-lg font-semibold">
              {footer.newsletter?.heading ?? "Subscribe to The Upshot"}
            </h3>
            {footer.newsletter?.text && (
              <p className="text-sm leading-[1.55] text-paper/70">{footer.newsletter.text}</p>
            )}
          </div>
          <div className="md:w-1/2">
            <NewsletterForm
              placeholder={footer.newsletter?.placeholder ?? undefined}
              buttonLabel={footer.newsletter?.buttonLabel ?? undefined}
              source="footer"
              tone="paper"
            />
          </div>
        </div>

        {/* Every link, as an arrow list */}
        <nav aria-label="Footer" className="mt-16 md:mt-24">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3 lg:grid-cols-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  target={l.newTab ? "_blank" : undefined}
                  rel={l.newTab ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-3 text-[17px] md:text-xl"
                >
                  <ArrowRightIcon
                    size={16}
                    className="shrink-0 text-sun transition-transform duration-300 ease-(--ease-smooth) group-hover:translate-x-1"
                  />
                  <span className="transition-colors duration-(--duration-base) group-hover:text-sun">
                    {l.label}
                  </span>
                  {l.newTab && <ArrowUpRightIcon size={14} className="text-paper/50" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-16 flex flex-col gap-6 border-t border-paper/15 pt-8 md:mt-20 md:flex-row md:items-end md:justify-between">
          <Link href="/" aria-label="Upsure home" className="w-fit">
            <Logo tone="paper" className="text-[2.25rem] md:text-[2.75rem]" />
          </Link>
          <div className="flex flex-col gap-2 text-small text-paper/60 md:items-end">
            <p>
              {settings.city} · {settings.hours}
            </p>
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
