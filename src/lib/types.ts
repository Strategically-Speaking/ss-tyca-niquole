export interface NavItem {
  label: string;
  href: string;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  mission: string;
  logo: {
    text: string;
    hasImage: boolean;
    imageAlt: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
  social: {
    instagram: string;
    tiktok: string;
    youtube: string;
    linkedin: string;
    facebook: string;
    twitter: string;
  };
  nav: NavItem[];
  footer: {
    tagline: string;
    copyright: string;
  };
  brand: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    headingFont: string;
    bodyFont: string;
  };
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface Hero {
  headline: string;
  subheadline: string;
  ctaPrimary: CtaLink;
  ctaSecondary?: CtaLink;
  imageAlt: string;
}

export type ReelPlatform = "instagram" | "tiktok" | "youtube-shorts";

export type ReelCategory = "Campus Content" | "Personal" | "Brand Concept";

export interface ReelItem {
  platform: ReelPlatform;
  category: ReelCategory;
  url: string;
  caption: string;
}

export interface ReelsSection {
  id: string;
  type: "video-grid";
  heading: string;
  subheading: string;
  items: ReelItem[];
}

export interface TextSection {
  id: string;
  type: "text";
  heading: string;
  body: string;
}

export interface CardsSection {
  id: string;
  type: "cards";
  heading: string;
  subheading: string;
  items: string; // "ref:services"
}

export interface CtaSection {
  id: string;
  type: "cta";
  heading: string;
  body: string;
  cta: CtaLink;
}

export type HomeSection = ReelsSection | TextSection | CardsSection | CtaSection;

export interface SeoMeta {
  title: string;
  description: string;
}

export interface HomePage {
  hero: Hero;
  sections: HomeSection[];
  seo: SeoMeta;
}

export interface Pages {
  home: HomePage;
}

export interface Service {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  rate: string;
  cta: CtaLink;
  imageAlt: string;
}

export interface SiteContent {
  siteSettings: SiteSettings;
  pages: Pages;
  services: Service[];
}
