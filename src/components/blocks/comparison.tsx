import type { BlockProps } from "@/components/blocks/render-blocks";
import { SectionHeader } from "@/components/blocks/section-header";
import { Container } from "@/components/ui/container";
import { CheckIcon, CloseIcon } from "@/components/ui/icons";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/** "Upsure vs a typical agency". A real table, so it reads correctly with a screen reader. */
export function ComparisonBlock({ block, index }: BlockProps<"comparison">) {
  const tone = block.tone ?? "teal-ink";
  const dark = tone === "teal-ink" || tone === "teal";
  const rows = block.rows ?? [];
  const border = dark ? "border-paper/15" : "border-line";

  return (
    <Section tone={tone}>
      <Container>
        <Reveal self={false} className="flex flex-col gap-12">
          <SectionHeader
            index={index}
            eyebrow={block.eyebrow}
            heading={block.heading}
            tone={dark ? "paper" : "ink"}
            align="right"
          />
          <RevealItem index={2} direction="fade" className="-mx-gutter overflow-x-auto px-gutter">
            <table
              className={cn(
                "w-full min-w-[40rem] border-collapse text-left",
                dark ? "text-paper" : "text-ink",
              )}
            >
              <thead>
                <tr className={cn("border-b", border)}>
                  <th scope="col" className="w-1/3 py-4 pr-4" />
                  <th
                    scope="col"
                    className={cn("py-4 pr-4 text-h3", dark ? "text-sun" : "text-teal")}
                  >
                    {block.usLabel ?? "Upsure"}
                  </th>
                  <th
                    scope="col"
                    className={cn("py-4 text-h3", dark ? "text-paper/60" : "text-muted")}
                  >
                    {block.themLabel ?? "Typical agency"}
                  </th>
                </tr>
              </thead>
              <tbody className={cn("divide-y", dark ? "divide-paper/15" : "divide-line")}>
                {rows.map((row) => (
                  <tr
                    key={row.id ?? row.label}
                    className={cn(
                      "transition-colors",
                      dark ? "hover:bg-paper/5" : "hover:bg-paper-2",
                    )}
                  >
                    <th scope="row" className="py-5 pr-4 align-top font-medium">
                      {row.label}
                    </th>
                    <td className="py-5 pr-4 align-top">
                      <span className="flex items-start gap-2">
                        <CheckIcon
                          size={20}
                          className={cn("mt-0.5 shrink-0", dark ? "text-sun" : "text-teal")}
                        />
                        {row.us}
                      </span>
                    </td>
                    <td className={cn("py-5 align-top", dark ? "text-paper/60" : "text-muted")}>
                      <span className="flex items-start gap-2">
                        <CloseIcon size={20} className="mt-0.5 shrink-0 text-coral" />
                        {row.them}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </RevealItem>
        </Reveal>
      </Container>
    </Section>
  );
}
