import { HeaderNav } from "@/components/layout/header-nav";
import { getGlobals } from "@/lib/queries";

export async function Header() {
  const { header, settings } = await getGlobals();
  return (
    <HeaderNav
      items={(header.items ?? []).map((i) => ({
        label: i.label,
        href: i.href,
        children: (i.children ?? []).map((c) => ({
          label: c.label,
          href: c.href,
          description: c.description,
          group: c.group,
        })),
      }))}
      cta={{
        label: header.cta?.label ?? "Book a free strategy call",
        href: header.cta?.href ?? "/start-a-project",
      }}
      secondary={(header.secondary ?? []).map((l) => ({
        label: l.label,
        href: l.href,
        newTab: l.newTab,
      }))}
      contact={{ email: settings.email, location: settings.city }}
    />
  );
}
