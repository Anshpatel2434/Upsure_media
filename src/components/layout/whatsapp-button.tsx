import { WHATSAPP, WHATSAPP_MESSAGE } from "@/content/data";

import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Floating WhatsApp button, bottom-right on every page. Renders nothing until
 * WHATSAPP is filled in (see src/content/data.ts), so the site never shows a
 * chat button that goes nowhere.
 *
 * A plain link, not a widget: no third-party script, nothing to consent to.
 */
export function WhatsAppButton() {
  if (!WHATSAPP) return null;
  const number = WHATSAPP.replace(/[^\d]/g, "");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Upsure Media on WhatsApp"
      className="fixed right-5 bottom-5 z-40 inline-flex size-14 items-center justify-center rounded-pill bg-[#25d366] text-white shadow-lift transition-transform duration-(--duration-base) ease-(--ease-smooth) hover:scale-105 focus-visible:scale-105 md:right-8 md:bottom-8"
    >
      <WhatsAppIcon width={28} height={28} />
    </a>
  );
}
