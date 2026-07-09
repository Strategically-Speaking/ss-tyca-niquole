"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import ReelCard from "./ReelCard";
import type { ReelItem, ReelPlatform } from "@/lib/types";

interface ReelGalleryProps {
  items: ReelItem[];
}

const PLATFORM_LABEL: Record<ReelPlatform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  "youtube-shorts": "YouTube Shorts",
};

type FilterValue = "All" | ReelPlatform;

/**
 * Filterable-by-category gallery grid, adapted from the SS Component
 * Library's FilterableCategoryGalleryGallery (src/components/gallery/
 * FilterableCategoryGalleryGallery.tsx). Swapped the library's generic
 * Web/Brand/Print categories for reel platform (Instagram/TikTok/YouTube
 * Shorts), reused Tyca's existing ReelCard for each grid item instead of
 * the library's bare placeholder <img>, and restyled the filter pills for
 * the reels section's colored background (bg-white active pill instead of
 * bg-ink) instead of the library's ink/ink-soft tokens.
 */
export default function ReelGallery({ items }: ReelGalleryProps) {
  const platforms = Array.from(new Set(items.map((item) => item.platform))) as ReelPlatform[];
  const filters: FilterValue[] = ["All", ...platforms];
  const [filter, setFilter] = useState<FilterValue>("All");

  const indexed = items.map((item, index) => ({ item, index }));
  const filtered = filter === "All" ? indexed : indexed.filter(({ item }) => item.platform === filter);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter reels by platform">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              filter === f ? "bg-white text-secondary" : "text-white/70 hover:text-white"
            )}
          >
            {f === "All" ? "All" : PLATFORM_LABEL[f]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 transition-opacity duration-300 md:grid-cols-3 md:gap-6">
        {filtered.map(({ item, index }) => (
          <ReelCard key={`${item.platform}-${index}`} reel={item} index={index} />
        ))}
      </div>
    </div>
  );
}
