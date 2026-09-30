import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getGlobals } from "@/lib/queries";

/** Global "Ready to move forward?" band: giant two lines, button hanging off the line end. */
export async function CtaBand() {
  const { ctaBand } = await getGlobals();
  return (
    <Section tone="teal" padding="default" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-sun/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-[-10%] size-[30rem] rounded-full bg-teal-ink/30 blur-3xl"
      />
      <Container>
        <Reveal self={false} className="flex flex-col gap-8">
          {ctaBand.emoji && (
            <RevealItem index={0}>
              <span className="text-4xl" role="img" aria-label="Waving hand">
                {ctaBand.emoji}
              </span>
            </RevealItem>
          )}
          <RevealItem index={1}>
            <h2 className="max-w-5xl text-display">
              {ctaBand.heading}
              {ctaBand.subheading && (
                <>
                  <br />
                  <span className="text-sun">{ctaBand.subheading}</span>
                </>
              )}
            </h2>
          </RevealItem>
          <RevealItem index={2} className="flex flex-wrap items-center gap-6 lg:ml-[40%]">
            <Button href={ctaBand.link.href} tone="paper" size="lg" withArrow>
              {ctaBand.link.label}
            </Button>
            <span className="text-white/75">
              Free 30-minute discovery call · reply within one business day
            </span>
          </RevealItem>
        </Reveal>
      </Container>
    </Section>
  );
}
