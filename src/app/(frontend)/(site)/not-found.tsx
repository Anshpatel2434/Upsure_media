import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Sticker } from "@/components/ui/sticker";

export default function NotFound() {
  return (
    <Section grid className="flex flex-1 items-center">
      <Container className="flex flex-col items-start gap-6">
        <Eyebrow index="404">Not found</Eyebrow>
        <Heading as="h1" size="display">
          This page moved, or never <span className="highlight">existed</span>.
        </Heading>
        <p className="max-w-xl text-lead text-ink-2">
          The link may be old, or there could be a typo. Try the homepage, or tell us what you were
          looking for.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/" withArrow>
            Back to home
          </Button>
          <Button href="/contact" variant="ghost">
            Contact us
          </Button>
          <Sticker tone="coral" rotate={5}>
            Lost?
          </Sticker>
        </div>
      </Container>
    </Section>
  );
}
