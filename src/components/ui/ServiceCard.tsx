import type { Service } from "@/lib/types";
import Button from "./Button";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="flex flex-col rounded-3xl border border-primary/20 bg-gradient-to-br from-white via-white to-primary/10 p-8 shadow-[0_16px_42px_rgba(22,21,28,0.1)] transition-transform duration-300 hover:-translate-y-1">
      <h3 className="font-heading text-xl font-bold text-foreground">
        {service.name}
      </h3>
      <p className="mt-2 inline-flex w-fit rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
        {service.tagline}
      </p>
      <p className="mt-4 flex-1 text-sm text-foreground/70">
        {service.shortDescription}
      </p>
      <p className="mt-6 rounded-xl bg-white/80 px-3 py-2 text-lg font-semibold text-foreground">
        {service.rate}
      </p>
      <Button href={service.cta.href} variant="primary" className="mt-6">
        {service.cta.label}
      </Button>
    </div>
  );
}
