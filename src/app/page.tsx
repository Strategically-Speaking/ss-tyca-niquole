import Image from "next/image";
import { Camera, Clapperboard, Sparkles, TrendingUp } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import ReelCard from "@/components/ui/ReelCard";
import ServiceCard from "@/components/ui/ServiceCard";
import ContactForm from "@/components/ui/ContactForm";
import { getHomePage, getServices, getSiteSettings } from "@/lib/content";
import { placeholderImage } from "@/lib/utils";
import type {
  CardsSection,
  CtaSection,
  ReelsSection,
  TextSection,
} from "@/lib/types";

export default function HomePage() {
  const { hero, sections } = getHomePage();
  const services = getServices();
  const siteSettings = getSiteSettings();

  const reelsSection = sections.find(
    (s): s is ReelsSection => s.type === "video-grid",
  );
  const aboutSection = sections.find(
    (s): s is TextSection => s.type === "text",
  );
  const cardsSection = sections.find(
    (s): s is CardsSection => s.type === "cards",
  );
  const contactSection = sections.find(
    (s): s is CtaSection => s.type === "cta",
  );

  return (
    <>
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

        <div className="section-shell mx-auto grid max-w-6xl gap-10 overflow-hidden px-6 py-12 md:grid-cols-[1fr_0.95fr] md:gap-12 md:px-10 md:py-14">
          <div className="reveal-up max-w-xl">
            <SectionLabel className="text-primary">
              {siteSettings.contact.address}
            </SectionLabel>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              Creator Portfolio
            </p>

            <h1 className="font-heading text-4xl font-extrabold leading-[1.05] text-foreground md:text-6xl">
              {hero.headline}
              <span className="shine-text mt-2 block">
                makes content people actually watch.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-foreground/70">
              {hero.subheadline}
            </p>

            <div className="mt-8 grid w-full max-w-md grid-cols-3 gap-3 text-center">
              <div className="glass-panel rounded-xl px-3 py-4">
                <p className="font-heading text-2xl font-bold text-foreground">
                  UGC
                </p>
                <p className="mt-1 text-xs text-foreground/60">
                  Story-led cuts
                </p>
              </div>
              <div className="glass-panel rounded-xl px-3 py-4">
                <p className="font-heading text-2xl font-bold text-foreground">
                  Reels
                </p>
                <p className="mt-1 text-xs text-foreground/60">
                  Vertical-first
                </p>
              </div>
              <div className="glass-panel rounded-xl px-3 py-4">
                <p className="font-heading text-2xl font-bold text-foreground">
                  Shorts
                </p>
                <p className="mt-1 text-xs text-foreground/60">
                  Scroll-stopping
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={hero.ctaPrimary.href} variant="primary">
                {hero.ctaPrimary.label}
              </Button>
              {hero.ctaSecondary && (
                <Button href={hero.ctaSecondary.href} variant="outline">
                  {hero.ctaSecondary.label}
                </Button>
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="glass-panel relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/50">
              <Image
                src={placeholderImage("tyca-hero", 640, 800)}
                alt={hero.imageAlt}
                fill
                sizes="(min-width: 768px) 420px, 90vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 rounded-xl bg-white/88 px-4 py-3 text-sm font-medium text-foreground backdrop-blur">
                <p className="flex items-center gap-2">
                  <Clapperboard
                    className="h-4 w-4 text-primary"
                    aria-hidden="true"
                  />
                  On-set + social-ready edits
                </p>
              </div>
            </div>

            <div className="float-fast absolute -right-4 top-8 rounded-2xl border border-foreground/10 bg-white px-4 py-3 shadow-xl md:-right-8">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <TrendingUp
                  className="h-4 w-4 text-primary"
                  aria-hidden="true"
                />
                Growth-focused pacing
              </p>
            </div>

            <div className="float-slow absolute -left-4 bottom-8 rounded-2xl border border-foreground/10 bg-white px-4 py-3 shadow-xl md:-left-10">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Camera className="h-4 w-4 text-secondary" aria-hidden="true" />
                Shot for vertical attention
              </p>
            </div>
          </div>
        </div>
      </section>

      {reelsSection && (
        <section id="reels" className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-to-br from-secondary to-secondary/80 px-6 py-12 text-white md:px-8">
            <SectionLabel className="text-white/60">Recent Work</SectionLabel>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              {reelsSection.heading}
            </h2>
            <p className="mt-3 max-w-2xl text-white/75">
              {reelsSection.subheading}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {reelsSection.items.map((reel, index) => (
                <ReelCard
                  key={`${reel.platform}-${index}`}
                  reel={reel}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {aboutSection && (
        <section id="about" className="px-6 py-16 md:py-20">
          <div className="section-shell mx-auto max-w-5xl px-6 py-12 text-center md:px-12">
            <SectionLabel className="text-primary">About</SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              {aboutSection.heading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/70">
              {aboutSection.body}
            </p>
          </div>
        </section>
      )}

      {cardsSection && services.length > 0 && (
        <section id="rates" className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-primary/20 bg-gradient-to-br from-white via-white to-primary/10 px-6 py-12 md:px-8">
            <SectionLabel className="text-primary">
              Services &amp; Rates
            </SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              {cardsSection.heading}
            </h2>
            <p className="mt-3 max-w-2xl text-foreground/70">
              {cardsSection.subheading} Choose a package and I will tailor the
              style, pacing, and delivery to your brand voice.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </section>
      )}

      {contactSection && (
        <section id="contact" className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-3xl rounded-[2rem] bg-gradient-to-br from-foreground via-foreground to-primary/95 px-6 py-12 text-white shadow-2xl md:px-8">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              {contactSection.heading}
            </h2>
            <p className="mt-4 text-lg text-white/90">{contactSection.body}</p>
            <ContactForm />
          </div>
        </section>
      )}
    </>
  );
}
