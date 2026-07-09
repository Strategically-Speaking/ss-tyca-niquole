"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";

interface HeaderProps {
  siteSettings: SiteSettings;
}

export default function Header({ siteSettings }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const sectionIds = siteSettings.nav.map((item) =>
      item.href.replace("#", ""),
    );
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [siteSettings.nav]);

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="#top"
          onClick={() => setIsOpen(false)}
          className="font-heading text-3xl font-bold tracking-tight text-foreground"
        >
          {siteSettings.logo.text}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8" aria-label="Primary">
            {siteSettings.nav.map((item) => {
              const id = item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    activeId === id ? "text-primary" : "text-foreground/70",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {(siteSettings.social.instagram || siteSettings.social.tiktok || siteSettings.social.youtube) && (
            <div className="flex items-center gap-4 border-l border-foreground/10 pl-6" aria-label="Social links">
              {siteSettings.social.instagram && (
                <a
                  href={siteSettings.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase tracking-wide text-foreground/50 transition-colors hover:text-primary"
                >
                  IG
                </a>
              )}
              {siteSettings.social.tiktok && (
                <a
                  href={siteSettings.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase tracking-wide text-foreground/50 transition-colors hover:text-primary"
                >
                  TT
                </a>
              )}
              {siteSettings.social.youtube && (
                <a
                  href={siteSettings.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase tracking-wide text-foreground/50 transition-colors hover:text-primary"
                >
                  YT
                </a>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {isOpen && (
        <nav
          className="border-t border-foreground/10 bg-surface px-6 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-4">
            {siteSettings.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-medium text-foreground/80 hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {(siteSettings.social.instagram || siteSettings.social.tiktok || siteSettings.social.youtube) && (
            <div className="mt-4 flex items-center gap-5 border-t border-foreground/10 pt-4">
              {siteSettings.social.instagram && (
                <a
                  href={siteSettings.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-foreground/60 hover:text-primary"
                >
                  Instagram
                </a>
              )}
              {siteSettings.social.tiktok && (
                <a
                  href={siteSettings.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-foreground/60 hover:text-primary"
                >
                  TikTok
                </a>
              )}
              {siteSettings.social.youtube && (
                <a
                  href={siteSettings.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-foreground/60 hover:text-primary"
                >
                  YouTube
                </a>
              )}
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
