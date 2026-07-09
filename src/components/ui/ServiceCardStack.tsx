import type { Service } from "@/lib/types";
import Button from "./Button";

interface ServiceCardStackProps {
  services: Service[];
}

// Fan angle per card, borrowed from the SS Component Library's
// CardStackHoverPricing (src/components/pricing/CardStackHoverPricing.tsx).
const ROTATIONS = [-3, 0, 3];

/**
 * Cards stacked with a slight rotation that fan out on hover/focus.
 * Adapted from the component library's token-based version (ink/border/
 * surface-raised) to Tyca's own brand tokens (foreground/primary/secondary)
 * defined in globals.css, and wired to real service data instead of the
 * library demo's hardcoded Basic/Pro/Enterprise tiers.
 */
export default function ServiceCardStack({ services }: ServiceCardStackProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-6 md:gap-2">
      {services.map((service, i) => (
        <div
          key={service.slug}
          style={{ transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)` }}
          className="group w-full max-w-xs rounded-3xl border border-foreground/10 bg-white p-6 shadow-md transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3 hover:z-10 focus-within:-translate-y-3 focus-within:z-10 sm:w-64"
        >
          <p className="font-heading text-lg font-bold text-foreground">{service.name}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
            {service.tagline}
          </p>
          <p className="mt-4 text-sm text-foreground/70">{service.shortDescription}</p>
          <p className="font-heading mt-6 text-xl font-bold text-foreground">{service.rate}</p>

          {/* CTA stays visible on touch devices (no reliable hover); reveals on hover/focus at md+ */}
          <Button
            href={service.cta.href}
            variant="primary"
            className="mt-6 w-full justify-center transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
          >
            {service.cta.label}
          </Button>
        </div>
      ))}
    </div>
  );
}
