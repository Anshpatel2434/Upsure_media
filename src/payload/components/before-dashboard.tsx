import type { Payload } from "payload";

const placeholderCollections = [
  ["pages", "Pages"],
  ["services", "Services"],
  ["case-studies", "Case studies"],
  ["posts", "Posts"],
  ["testimonials", "Testimonials"],
  ["team-members", "Team members"],
  ["clients", "Clients"],
  ["faqs", "FAQs"],
] as const;

const quickLinks = [
  { href: "/admin/collections/pages/1", label: "Edit the Home page" },
  { href: "/admin/collections/posts/create", label: "Write a blog post" },
  { href: "/admin/collections/case-studies/create", label: "Add a case study" },
  { href: "/admin/collections/testimonials/create", label: "Add a testimonial" },
  { href: "/admin/collections/form-submissions", label: "Read enquiries" },
  { href: "/admin/globals/site-settings", label: "Contact details & settings" },
  { href: "/", label: "View the live site ↗", external: true },
];

/**
 * Rendered above the default dashboard: quick links plus a count of content
 * still flagged as placeholder, each linking to a pre-filtered list.
 */
export async function BeforeDashboard({ payload }: { payload: Payload }) {
  const counts = await Promise.all(
    placeholderCollections.map(async ([slug, label]) => {
      const { totalDocs } = await payload.count({
        collection: slug,
        where: { placeholder: { equals: true } },
      });
      return { slug, label, total: totalDocs };
    }),
  );
  const remaining = counts.filter((c) => c.total > 0);
  const total = remaining.reduce((s, c) => s + c.total, 0);

  return (
    <div
      style={{
        display: "grid",
        gap: "1.5rem",
        marginBottom: "2.5rem",
        padding: "1.5rem",
        border: "1px solid var(--theme-elevation-150)",
        borderRadius: "8px",
        background: "var(--theme-elevation-50)",
      }}
    >
      <div>
        <h2 style={{ margin: "0 0 0.25rem", fontSize: "1.25rem" }}>
          Welcome to the Upsure site editor
        </h2>
        <p style={{ margin: 0, color: "var(--theme-elevation-600)" }}>
          Anything you publish is live within a couple of seconds. Use Live Preview (the eye icon on
          any page) to check changes before publishing.
        </p>
      </div>

      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {quickLinks.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              style={{
                display: "inline-block",
                padding: "0.5rem 0.9rem",
                border: "1px solid var(--theme-elevation-200)",
                borderRadius: "999px",
                textDecoration: "none",
                color: "var(--theme-text)",
                background: "var(--theme-elevation-0)",
              }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div>
        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>
          Placeholder content remaining: {total}
        </h3>
        {remaining.length === 0 ? (
          <p style={{ margin: 0, color: "var(--theme-elevation-600)" }}>
            Everything has been replaced with real content. 🎉
          </p>
        ) : (
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem 1.25rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {remaining.map((c) => (
              <li key={c.slug}>
                <a
                  href={`/admin/collections/${c.slug}?where[placeholder][equals]=true`}
                  style={{ color: "var(--theme-text)" }}
                >
                  {c.label}: <strong>{c.total}</strong>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
