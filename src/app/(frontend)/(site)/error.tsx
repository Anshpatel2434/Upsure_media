"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section grid className="flex flex-1 items-center">
      <Container className="flex flex-col items-start gap-6">
        <Eyebrow index="500">Something broke</Eyebrow>
        <Heading as="h1" size="h1">
          That wasn&rsquo;t supposed to happen.
        </Heading>
        <p className="max-w-xl text-lead text-ink-2">
          We&rsquo;ve logged it. Try again, or head back to the homepage.
          {error.digest && (
            <span className="block text-small text-muted">Reference: {error.digest}</span>
          )}
        </p>
        <div className="flex flex-wrap gap-4">
          <Button onClick={reset} withArrow>
            Try again
          </Button>
          <Button href="/" variant="ghost">
            Home
          </Button>
        </div>
      </Container>
    </Section>
  );
}
