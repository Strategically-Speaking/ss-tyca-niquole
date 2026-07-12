"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import ReelCard from "./ReelCard";
import type { ReelCategory, ReelItem, ReelPlatform } from "@/lib/types";

interface ReelGalleryProps {
  items: ReelItem[];
}

const PLATFORM_LABEL: Record<ReelPlatform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  "youtube-shorts": "YouTube Shorts",
  capcut: "CapCut",
};

type PlatformFilter = "All" | ReelPlatform;
type CategoryFilter = "All" | ReelCategory;

/**
 * Filterable-by-category gallery grid, adapted from the SS Component
 * Library's FilterableCategoryGalleryGallery (src/components/gallery/
 * FilterableCategoryGalleryGallery.tsx). Swapped the library's generic
 * Web/Brand/Print categories for a second, independent filter dimension
 * on top of reel platform: platform (Instagram/TikTok/YouTube Shorts) and
 * content category (Campus Content/Personal/Brand Concept), combined with
 * AND logic — this reads more like a curated portfolio than a flat feed.
 * Reused Tyca's existing ReelCard for each grid item instead of the
 * library's bare placeholder <img>, and restyled the filter pills for the
 * reels section's colored background instead of the library's ink/
 * ink-soft/bg-ink tokens.
 */
export default function ReelGallery({ items }: ReelGalleryProps) {
  const platforms = Array.from(new Set(items.map((item) => item.platform))) as ReelPlatform[];
  const categories = Array.from(new Set(items.map((item) => item.category))) as ReelCategory[];

  const platformFilters: PlatformFilter[] = ["All", ...platforms];
  const categoryFilters: CategoryFilter[] = ["All", ...categories];

  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("All");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");

  const indexed = items.map((item, index) => ({ item, index }));
  const filtered = indexed.filter(({ item }) => {
    const matchesPlatform = platformFilter === "All" || item.platform === platformFilter;
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    return matchesPlatform && matchesCategory;
  });

  return (
    <div>
      <div className="mb-3 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter reels by platform">
        {platformFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setPlatformFilter(f)}
            aria-pressed={platformFilter === f}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5",
              platformFilter === f
                ? "bg-white text-secondary shadow-lg shadow-black/10"
                : "bg-white/8 text-white/75 hover:bg-white/14 hover:text-white",
            )}
          >
            {f === "All" ? "All platforms" : PLATFORM_LABEL[f]}
          </button>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter reels by category">
        {categoryFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setCategoryFilter(f)}
            aria-pressed={categoryFilter === f}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300",
              categoryFilter === f
                ? "border-white bg-white/20 text-white"
                : "border-white/25 text-white/60 hover:border-white/50 hover:text-white/90",
            )}
          >
            {f === "All" ? "All content" : f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-white/70">No reels match that combination yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 transition-opacity duration-300 md:grid-cols-3 md:gap-6">
          {filtered.map(({ item, index }) => (
            <div key={`${item.platform}-${index}`} className={cn("reveal-pop", `stagger-${(index % 4) + 1}`)}>
              <ReelCard reel={item} index={index} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
