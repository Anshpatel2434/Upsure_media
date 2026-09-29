import { BlockImage } from "@/components/blocks/block-image";
import type { BlockProps } from "@/components/blocks/render-blocks";
import { Container } from "@/components/ui/container";
import { LazyVideo } from "@/components/ui/lazy-video";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { imageProps, isVideo, mediaUrl } from "@/lib/media";

const aspectClass: Record<string, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
};

export function MediaBlock({ block }: BlockProps<"media">) {
  const tone = block.tone ?? "paper";
  const dark = tone === "teal-ink" || tone === "teal";
  const aspect = aspectClass[block.aspect ?? "16/9"] ?? "aspect-video";
  const video = isVideo(block.media) ? mediaUrl(block.media) : null;
  const poster = imageProps(block.poster, "large");

  return (
    <Section tone={tone} padding="tight">
      <Container className="flex flex-col gap-4">
        {video ? (
          <LazyVideo src={video} poster={poster?.src} className={cn("w-full rounded-xl", aspect)} />
        ) : (
          <BlockImage media={block.media} size="hero" aspect={aspect} className="rounded-xl" />
        )}
        {block.caption && (
          <p className={cn("text-small", dark ? "text-paper/60" : "text-muted")}>{block.caption}</p>
        )}
      </Container>
    </Section>
  );
}
