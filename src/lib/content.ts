// The ONLY file that touches the raw content JSON.
// Pages and components must go through these accessors — never import the JSON directly.

import rawContent from "@/data/tyca-strong-content.json";
import type { HomePage, Service, SiteContent, SiteSettings } from "./types";

const content = rawContent as unknown as SiteContent;

export function getSiteSettings(): SiteSettings {
  return content.siteSettings;
}

export function getHomePage(): HomePage {
  return content.pages.home;
}

export function getServices(): Service[] {
  return content.services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return content.services.find((service) => service.slug === slug);
}
