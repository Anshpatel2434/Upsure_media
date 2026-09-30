import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { LowDataToggle } from "@/components/layout/low-data-toggle";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { NewsletterForm } from "@/features/newsletter/newsletter-form";
import { getGlobals } from "@/lib/queries";

export async function Footer() {
  const { footer, settings } = await getGlobals();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-teal-ink text-paper">
      <div className="mx-auto max-w-(--container-site) px-gutter py-section">
        {/* Newsletter first — it's the one thing we want every visitor to see. */}
        <div className="grid gap-10 border-b border-paper/15 pb-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-4">
            <p className="text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) text-sun uppercase">
              The Upshot
            </p>
            <h2 className="text-h2">{footer.newsletter?.heading ?? "Subscribe to The Upshot"}</h2>
            <p className="max-w-md text-paper/70">{footer.newsletter?.text}</p>
          </div>
          <div className="flex flex-col justify-end">
            <NewsletterForm
              placeholder={footer.newsletter?.placeholder ?? undefined}
              buttonLabel={footer.newsletter?.buttonLabel ?? undefined}
              source="footer"
              tone="paper"
            />
          </div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Upsure home" className="w-fit">
              <Logo tone="paper" className="text-[1.75rem]" />
            </Link>
            <p className="max-w-sm text-paper/70">{footer.description}</p>
          </div>

          {(footer.columns ?? []).map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-3">
              <h3 className="text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) text-paper/50 uppercase">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {(col.links ?? []).map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      target={l.newTab ? "_blank" : undefined}
                      rel={l.newTab ? "noopener noreferrer" : undefined}
                      className="text-paper/85 underline-offset-4 hover:text-sun hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) text-paper/50 uppercase">
                Studio
              </h3>
              <address className="flex flex-col gap-1 text-paper/85 not-italic">
                {settings.addressLine1 && <span>{settings.addressLine1}</span>}
                {settings.addressLine2 && <span>{settings.addressLine2}</span>}
                <span>{settings.city}</span>
                <span className="text-paper/60">{settings.hours}</span>
              </address>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) text-paper/50 uppercase">
                New business
              </h3>
              <a
                href={`mailto:${settings.email}`}
                className="text-paper/85 underline-offset-4 hover:text-sun hover:underline"
              >
                {settings.email}
              </a>
              {settings.phone && settings.phoneHref && (
                <a
                  href={`tel:${settings.phoneHref}`}
                  className="text-paper/85 underline-offset-4 hover:text-sun hover:underline"
                >
                  {settings.phone}
                </a>
              )}
            </div>
            {(settings.socials?.length ?? 0) > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) text-paper/50 uppercase">
                  Connect
                </h3>
                <ul className="flex flex-wrap gap-4">
                  {settings.socials!.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-paper/85 underline-offset-4 hover:text-sun hover:underline"
                      >
                        {s.platform}
                        <ArrowUpRightIcon size={14} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-paper/15 pt-8 text-small text-paper/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {footer.copyright ?? settings.name}
            {settings.registrationNumbers ? ` · ${settings.registrationNumbers}` : ""}
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center gap-5">
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
          </nav>
        </div>
      </div>
    </footer>
  );
}
