import SectionLabel from "@/components/ui/SectionLabel";
import Hero from "@/components/ui/Hero";
import ReelGallery from "@/components/ui/ReelGallery";
import ServiceCardStack from "@/components/ui/ServiceCardStack";
import ContactForm from "@/components/ui/ContactForm";
import { getHomePage, getServices, getSiteSettings } from "@/lib/content";
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
      <Hero
        eyebrow={siteSettings.contact.address}
        lines={["Let's makes content", "People actually watch."]}
        subhead={hero.subheadline}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
        imageSeed="tyca-hero"
        imageAlt={hero.imageAlt}
        imageCaption="On-set + social-ready edits"
      />

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

            <div className="mt-10">
              <ReelGallery items={reelsSection.items} />
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

            <div className="mt-10">
              <ServiceCardStack services={services} />
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
