import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import ReelCard from "@/components/ui/ReelCard";
import ServiceCard from "@/components/ui/ServiceCard";
import { getHomePage, getServices, getSiteSettings } from "@/lib/content";
import { placeholderImage } from "@/lib/utils";
import type { CardsSection, CtaSection, ReelsSection, TextSection } from "@/lib/types";

export default function HomePage() {
  const { hero, sections } = getHomePage();
  const services = getServices();
  const siteSettings = getSiteSettings();

  const reelsSection = sections.find((s): s is ReelsSection => s.type === "video-grid");
  const aboutSection = sections.find((s): s is TextSection => s.type === "text");
  const cardsSection = sections.find((s): s is CardsSection => s.type === "cards");
  const contactSection = sections.find((s): s is CtaSection => s.type === "cta");

  return (
    <>
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-surface to-secondary/10" />
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 py-20 md:flex-row md:items-center md:py-28">
          <div className="max-w-xl">
            <SectionLabel>{siteSettings.contact.address}</SectionLabel>
            <h1 className="font-heading text-4xl font-extrabold leading-tight text-foreground md:text-6xl">
              {hero.headline}
            </h1>
            <p className="mt-6 text-lg text-foreground/70">{hero.subheadline}</p>
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

          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-foreground/5 md:ml-auto">
            <Image
              src={placeholderImage("tyca-hero", 640, 800)}
              alt={hero.imageAlt}
              fill
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {reelsSection && (
        <section id="reels" className="mx-auto max-w-6xl px-6 py-20">
          <SectionLabel>Recent Work</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">{reelsSection.heading}</h2>
          <p className="mt-3 max-w-2xl text-foreground/70">{reelsSection.subheading}</p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {reelsSection.items.map((reel, index) => (
              <ReelCard key={`${reel.platform}-${index}`} reel={reel} index={index} />
            ))}
          </div>
        </section>
      )}

      {aboutSection && (
        <section id="about" className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <SectionLabel>About</SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">{aboutSection.heading}</h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/70">{aboutSection.body}</p>
          </div>
        </section>
      )}

      {cardsSection && services.length > 0 && (
        <section id="rates" className="mx-auto max-w-6xl px-6 py-20">
          <SectionLabel>Services &amp; Rates</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">{cardsSection.heading}</h2>
          <p className="mt-3 max-w-2xl text-foreground/70">{cardsSection.subheading}</p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </section>
      )}

      {contactSection && (
        <section id="contact" className="bg-gradient-to-br from-primary to-secondary py-20 text-white">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">{contactSection.heading}</h2>
            <p className="mt-4 text-lg text-white/90">{contactSection.body}</p>
            <div className="mt-8">
              <Button
                href={contactSection.cta.href}
                variant="secondary"
                className="bg-white text-foreground hover:bg-white/90"
              >
                {contactSection.cta.label}
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
