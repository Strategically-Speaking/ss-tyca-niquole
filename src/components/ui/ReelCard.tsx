import Image from "next/image";
import { Play } from "lucide-react";
import { placeholderImage } from "@/lib/utils";
import type { ReelItem } from "@/lib/types";

interface ReelCardProps {
  reel: ReelItem;
  index: number;
}

const platformLabel: Record<ReelItem["platform"], string> = {
  instagram: "Instagram Reel",
  tiktok: "TikTok",
  "youtube-shorts": "YouTube Shorts",
};

function extractEmbedUrl(reel: ReelItem): string | null {
  if (reel.url.startsWith("PLACEHOLDER")) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(reel.url);
  } catch {
    return null;
  }

  const path = parsed.pathname;

  if (reel.platform === "tiktok") {
    const videoMatch = path.match(/\/video\/(\d+)/);
    if (!videoMatch) {
      return null;
    }

    return `https://www.tiktok.com/player/v1/${videoMatch[1]}`;
  }

  if (reel.platform === "instagram") {
    const instaMatch = path.match(/\/(reel|p)\/([^/?#]+)/);
    if (!instaMatch) {
      return null;
    }

    return `https://www.instagram.com/${instaMatch[1]}/${instaMatch[2]}/embed`;
  }

  if (reel.platform === "youtube-shorts") {
    const shortsMatch = path.match(/\/shorts\/([^/?#]+)/);
    if (shortsMatch) {
      return `https://www.youtube.com/embed/${shortsMatch[1]}`;
    }

    if (parsed.hostname === "youtu.be") {
      const id = path.replace(/^\//, "").split("/")[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (path === "/watch") {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
  }

  return null;
}

export default function ReelCard({ reel, index }: ReelCardProps) {
  const isPlaceholder = reel.url.startsWith("PLACEHOLDER");
  const embedUrl = extractEmbedUrl(reel);

  return (
    <div className="group tilt-card relative aspect-9/16 overflow-hidden rounded-2xl border border-white/15 bg-foreground/20 shadow-lg shadow-black/10">
      {embedUrl ? (
        <>
          <iframe
            src={embedUrl}
            title={`${platformLabel[reel.platform]}: ${reel.caption}`}
            className="absolute inset-0 block h-full w-full border-0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-start p-3">
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground">
              {platformLabel[reel.platform]}
            </span>
          </div>
        </>
      ) : (
        <>
          <Image
            src={placeholderImage(`tyca-reel-${index}`, 450, 800)}
            alt={
              isPlaceholder
                ? `Placeholder — ${platformLabel[reel.platform]} coming soon`
                : reel.caption
            }
            fill
            sizes="(min-width: 768px) 30vw, 45vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex flex-col justify-between bg-linear-to-t from-black/75 via-black/5 to-transparent p-4 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground">
              {platformLabel[reel.platform]}
            </span>
            <span className="translate-y-1 flex items-center gap-1 text-sm font-medium text-white transition-transform duration-300 group-hover:translate-y-0">
              <Play className="h-4 w-4" aria-hidden="true" />
              {isPlaceholder ? "Coming soon" : reel.caption}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
