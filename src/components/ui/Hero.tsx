import Image from "next/image";
import { Clapperboard, Sparkles, TrendingUp } from "lucide-react";
import Button from "./Button";
import { cn, placeholderImage } from "@/lib/utils";
import type { CtaLink } from "@/lib/types";

interface HeroProps {
  eyebrow: string;
  lines: string[];
  subhead: string;
  ctaPrimary: CtaLink;
  ctaSecondary?: CtaLink;
  imageSeed: string;
  imageAlt: string;
  imageCaption?: string;
}

/**
 * Typography-as-hero: stacked oversized headline lines, adapted from the SS
 * Component Library's OversizedTypeStackHero (src/components/hero/
 * OversizedTypeStackHero.tsx). The library version is intentionally
 * imageless ("no imagery needed" per its own comment) and full-width; this
 * adds a right-side image slot back in (two-column on desktop, image stacks
 * below the type on mobile) since Tyca's portfolio benefits from showing her
 * work, and swaps the library's ink/accent/border tokens for Tyca's own
 * foreground/primary/secondary tokens already defined in globals.css.
 */
export default function Hero({
  eyebrow,
  lines,
  subhead,
  ctaPrimary,
  ctaSecondary,
  imageSeed,
  imageAlt,
  imageCaption,
}: HeroProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-12 pt-10 md:pb-20 md:pt-16"
    >
      <span
        className="hero-orb float-slow -left-8 top-28 -z-10 h-44 w-44 bg-primary/25"
        aria-hidden="true"
      />
      <span
        className="hero-orb float-fast right-4 top-10 -z-10 h-36 w-36 bg-secondary/25"
        aria-hidden="true"
      />
      <span
        className="hero-orb drift-diagonal bottom-10 left-1/3 -z-10 h-24 w-24 bg-white/60"
        aria-hidden="true"
      />

      <div className="section-shell pulse-glow mx-auto grid max-w-6xl items-center gap-10 overflow-hidden px-6 py-12 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:px-10 md:py-16 lg:py-20">
        <div className="reveal-soft">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-secondary backdrop-blur">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {eyebrow}
          </p>

          <h1 className="font-heading text-5xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-6xl lg:text-7xl">
            {lines.map((line, i) => (
              <span
                key={line}
                className={cn(
                  "block reveal-pop",
                  i === lines.length - 1 && "shine-text animated-outline",
                  i === 0 && "stagger-1",
                  i === 1 && "stagger-2",
                )}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="reveal-soft stagger-3 mt-8 max-w-lg text-lg text-foreground/70">
            {subhead}
          </p>

          <div className="reveal-soft stagger-4 mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-foreground/10 bg-white/80 px-4 py-2 text-sm font-medium text-foreground/70 backdrop-blur">
              Reels that hook fast
            </span>
            <span className="rounded-full border border-foreground/10 bg-white/80 px-4 py-2 text-sm font-medium text-foreground/70 backdrop-blur">
              Edits with energy
            </span>
          </div>

          <div className="reveal-soft stagger-4 mt-10 flex flex-wrap gap-4">
            <Button href={ctaPrimary.href} variant="primary">
              {ctaPrimary.label}
            </Button>
            {ctaSecondary && (
              <Button href={ctaSecondary.href} variant="outline">
                {ctaSecondary.label}
              </Button>
            )}
          </div>
        </div>

        <div className="reveal-pop stagger-3 relative mx-auto w-full max-w-md">
          <div className="glass-panel hover-shine relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/50 transition-transform duration-500 hover:-translate-y-1">
            <Image
              src={placeholderImage(imageSeed, 640, 800)}
              alt={imageAlt}
              fill
              sizes="(min-width: 768px) 420px, 90vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent" />

            {imageCaption && (
              <div className="absolute bottom-5 left-5 rounded-xl bg-white/88 px-4 py-3 text-sm font-medium text-foreground backdrop-blur">
                <p className="flex items-center gap-2">
                  <Clapperboard
                    className="h-4 w-4 text-primary"
                    aria-hidden="true"
                  />
                  {imageCaption}
                </p>
              </div>
            )}
          </div>

          <div className="float-fast absolute -right-3 top-8 rounded-2xl border border-primary/15 bg-white/85 px-4 py-3 text-sm font-semibold text-foreground shadow-lg backdrop-blur md:-right-8">
            <p className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
              Scroll-stopping pacing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
