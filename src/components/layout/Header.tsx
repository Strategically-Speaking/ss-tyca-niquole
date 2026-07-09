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
          className="font-heading text-xl font-bold tracking-tight text-foreground"
        >
          {siteSettings.logo.text}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
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
        </nav>
      )}
    </header>
  );
}
