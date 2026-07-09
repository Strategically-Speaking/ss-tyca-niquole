import type { Service } from "@/lib/types";
import Button from "./Button";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-foreground/10 bg-white p-8 shadow-sm">
      <h3 className="font-heading text-xl font-bold text-foreground">{service.name}</h3>
      <p className="mt-2 text-sm font-medium text-primary">{service.tagline}</p>
      <p className="mt-4 flex-1 text-sm text-foreground/70">{service.shortDescription}</p>
      <p className="mt-6 text-lg font-semibold text-foreground">{service.rate}</p>
      <Button href={service.cta.href} variant="outline" className="mt-6">
        {service.cta.label}
      </Button>
    </div>
  );
}
