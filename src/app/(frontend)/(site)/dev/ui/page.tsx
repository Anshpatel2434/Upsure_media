import { notFound } from "next/navigation";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel } from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { InputField, SelectField, TextareaField } from "@/components/ui/field";
import { Heading, Highlight } from "@/components/ui/heading";
import { Marquee } from "@/components/ui/marquee";
import { Section } from "@/components/ui/section";
import { Stat } from "@/components/ui/stat";
import { Sticker } from "@/components/ui/sticker";
import { Tag } from "@/components/ui/tag";

export const metadata = { title: "UI kit (dev)", robots: { index: false } };

const logos = ["Samsung", "Hyundai", "Lenskart", "Decathlon", "Vivo", "Titan", "Realme", "Waaree"];

/** Development-only gallery of every primitive. Returns 404 in production. */
export default function UiKitPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <Section grid>
        <Container className="flex flex-col gap-8">
          <Eyebrow index="00">UI kit</Eyebrow>
          <Heading as="h1" size="display">
            We design brands <Highlight>people love</Highlight>
          </Heading>
          <p className="max-w-2xl text-lead text-ink-2">
            Every primitive on one page. Resize to 360, 768 and 1280 px; tab through everything.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button withArrow>Start a project</Button>
            <Button variant="ghost">Our services</Button>
            <Button variant="link" withArrow>
              Read the story
            </Button>
            <Button tone="teal">Teal solid</Button>
            <Button href="/" variant="ghost" tone="teal">
              As link
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Tag>Identity</Tag>
            <Tag tone="teal">SEO</Tag>
            <Tag tone="coral">New</Tag>
            <Tag tone="sun">AI-first</Tag>
            <Sticker>Est. 20XX</Sticker>
            <Sticker tone="coral" rotate={5}>
              100+ brands
            </Sticker>
            <Sticker tone="teal" rotate={-2}>
              98% stay
            </Sticker>
          </div>
        </Container>
      </Section>

      <Section tone="white" padding="tight">
        <Container className="flex flex-col gap-10">
          <Eyebrow index="01">Type scale</Eyebrow>
          <Heading as="h2" size="h1">
            Heading one
          </Heading>
          <Heading as="h3" size="h2">
            Heading two
          </Heading>
          <Heading as="h4" size="h3">
            Heading three
          </Heading>
          <p className="max-w-2xl text-lead">
            Lead paragraph. We help ambitious brands cut through the noise through brand, content,
            and performance that compounds.
          </p>
          <p className="max-w-2xl text-ink-2">
            Body paragraph. Most agencies sell you hours. We sell you outcomes — for names like
            Samsung, Hyundai, Lenskart, and Decathlon.
          </p>
          <p className="text-small text-muted">Small muted text · Mon – Fri, 10:00 – 18:00 IST</p>
        </Container>
      </Section>

      <Section padding="tight">
        <Container className="flex flex-col gap-8">
          <Eyebrow index="02">Cards & stats</Eyebrow>
          <div className="grid gap-5 md:grid-cols-3">
            <Card href="/">
              <Tag tone="teal" className="mb-4">
                Branding
              </Tag>
              <Heading as="h3" size="h3">
                Linked card
              </Heading>
              <p className="mt-2 text-ink-2">Hover lifts it and the border turns teal.</p>
            </Card>
            <Card tone="paper">
              <Heading as="h3" size="h3">
                Static card
              </Heading>
              <p className="mt-2 text-ink-2">Paper tone, no hover.</p>
            </Card>
            <Card tone="teal-ink">
              <Heading as="h3" size="h3">
                Dark card
              </Heading>
              <p className="mt-2 text-paper/70">Teal-ink tone for contrast blocks.</p>
            </Card>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Stat value={100} suffix="+" label="brands served" />
            <Stat value={250} suffix="+" label="Projects delivered across brand & growth" />
            <Stat value={98} suffix="%" label="Client retention, year over year" />
          </div>
        </Container>
      </Section>

      <Section tone="teal-ink" padding="tight">
        <Container className="flex flex-col gap-8">
          <Eyebrow index="03" tone="paper">
            Dark band
          </Eyebrow>
          <Heading as="h2" size="h2">
            Buttons, tags and accordion on teal-ink
          </Heading>
          <div className="flex flex-wrap gap-4">
            <Button tone="paper" withArrow>
              Contact us
            </Button>
            <Button tone="paper" variant="ghost">
              View all work
            </Button>
            <Tag tone="paper">Growth</Tag>
          </div>
          <Accordion
            tone="paper"
            name="faq-dark"
            items={[
              { id: "a", title: "Do you work with US and EU clients?", content: "Absolutely." },
              {
                id: "b",
                title: "How long does a project take?",
                content: "4–6 weeks for strategy.",
              },
            ]}
          />
          <div className="grid gap-8 md:grid-cols-3">
            <Stat tone="paper" value={100} suffix="+" label="brands served" />
          </div>
        </Container>
      </Section>

      <Section padding="tight">
        <Container className="flex flex-col gap-8">
          <Eyebrow index="04">Accordion (native details)</Eyebrow>
          <Accordion
            name="faq"
            defaultOpenId="1"
            items={[
              {
                id: "1",
                title: "Do you only do strategy, or execution too?",
                content:
                  "Both. We handle strategy, creative, and performance marketing end-to-end. You work with senior people throughout.",
              },
              {
                id: "2",
                title: "What does it cost?",
                content:
                  "We offer fixed-scope project pricing and monthly retainers. Transparent upfront.",
              },
              {
                id: "3",
                title: "How do we get started?",
                content:
                  "Fill in the contact form. We'll schedule a free 30-minute discovery call.",
              },
            ]}
          />
        </Container>
      </Section>

      <Section tone="white" padding="tight">
        <Container className="flex flex-col gap-8">
          <Eyebrow index="05">Marquee & carousel</Eyebrow>
        </Container>
        <Marquee label="Client logos" duration={30}>
          {logos.map((l) => (
            <span key={l} className="text-h3 font-semibold text-muted">
              {l}
            </span>
          ))}
        </Marquee>
        <Container className="mt-10">
          <Carousel label="Testimonials">
            {[1, 2, 3, 4, 5].map((n) => (
              <Card key={n} padding="lg" className="h-full">
                <p className="text-lead">
                  “Upsure took our messy positioning and turned it into a story our entire team
                  rallies behind.”
                </p>
                <p className="mt-6 text-small text-muted">Akash · Founder · slide {n}</p>
              </Card>
            ))}
          </Carousel>
        </Container>
      </Section>

      <Section padding="tight">
        <Container size="narrow" className="flex flex-col gap-6">
          <Eyebrow index="06">Form fields</Eyebrow>
          <form className="grid gap-5 md:grid-cols-2" action="#">
            <InputField label="Name" name="name" placeholder="Your name" required />
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="you@company.com"
              error="Enter a valid email address"
            />
            <SelectField
              label="Budget"
              name="budget"
              className="md:col-span-2"
              options={[
                { value: "", label: "Select a range" },
                { value: "a", label: "Under ₹2L" },
                { value: "b", label: "₹2L – ₹10L" },
              ]}
            />
            <TextareaField
              label="Message"
              name="message"
              className="md:col-span-2"
              hint="Tell us about your brand and what you're looking for."
            />
            <Button type="submit" withArrow>
              Send message
            </Button>
          </form>
        </Container>
      </Section>
    </>
  );
}
