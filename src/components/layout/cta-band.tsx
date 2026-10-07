import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getGlobals } from "@/lib/queries";

/** Global "Ready to move forward?" band: two full-width display lines (the second indented, in sun) and the call to action. */
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
            <h2 className="text-[12vw] leading-[1.05] font-semibold tracking-[-0.035em] md:text-[8vw] 2xl:text-[123px]">
              <span className="block">{ctaBand.heading}</span>
              {ctaBand.subheading && (
                <span className="block text-sun md:pl-[19vw] 2xl:pl-[292px]">
                  {ctaBand.subheading}
                </span>
              )}
            </h2>
          </RevealItem>
          <RevealItem index={2} className="flex flex-wrap items-center gap-6 lg:ml-[40%]">
            <Button href={ctaBand.link.href} tone="paper" size="lg" withArrow>
              {ctaBand.link.label}
            </Button>
            {ctaBand.note && (
              <span className="text-white/75">
                {ctaBand.note.split(/(\S+@\S+\.\w+)/).map((part, i) =>
                  part.includes("@") ? (
                    <a
                      key={i}
                      href={`mailto:${part}`}
                      className="font-semibold text-white underline-offset-4 hover:underline"
                    >
                      {part}
                    </a>
                  ) : (
                    part
                  ),
                )}
              </span>
            )}
          </RevealItem>
        </Reveal>
      </Container>
    </Section>
  );
}
