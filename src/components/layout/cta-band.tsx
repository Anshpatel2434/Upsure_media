import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getGlobals } from "@/lib/cms/queries";

/** Global "Ready to move forward?" band. Pages can hide it with `showCtaBand`. */
export async function CtaBand() {
  const { ctaBand } = await getGlobals();
  return (
    <Section tone="teal" padding="default" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-sun/20 blur-3xl"
      />
      <Container className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          {ctaBand.emoji && (
            <span className="text-4xl" role="img" aria-label="Waving hand">
              {ctaBand.emoji}
            </span>
          )}
          <h2 className="text-h1">
            {ctaBand.heading}
            {ctaBand.subheading && (
              <>
                <br />
                <span className="text-sun">{ctaBand.subheading}</span>
              </>
            )}
          </h2>
        </div>
        <Button href={ctaBand.link.href} tone="paper" size="lg" withArrow>
          {ctaBand.link.label}
        </Button>
      </Container>
    </Section>
  );
}
