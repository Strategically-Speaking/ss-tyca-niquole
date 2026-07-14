import Link from "next/link";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import type { SiteSettings } from "@/lib/types";

interface FooterProps {
  siteSettings: SiteSettings;
}

export default function Footer({ siteSettings }: FooterProps) {
  const { social, footer, contact, logo } = siteSettings;

  return (
    <footer className="mt-24 border-t border-foreground/10 bg-white/80 backdrop-blur">
      <NewsletterSignup />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-lg font-bold text-foreground">
            {logo.text}
          </p>
          <p className="mt-1 text-sm text-foreground/60">{footer.tagline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          {social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
            >
              Instagram
            </a>
          )}
          {social.tiktok && (
            <a
              href={social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
            >
              TikTok
            </a>
          )}
          {social.youtube && (
            <a
              href={social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
            >
              YouTube
            </a>
          )}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
            >
              {contact.email}
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 border-t border-black/5 px-6 py-4 text-center text-xs text-foreground/50 md:flex-row md:justify-between">
        <p>{footer.copyright}</p>
        <Link href="/privacy" className="hover:text-primary">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
