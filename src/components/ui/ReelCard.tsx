"use client";

import { useRef, useState } from "react";
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
  iphone: "iPhone",
};

// Instagram's public embed page renders a fixed layout — a profile header,
// then a 4:5 media box (`padding-bottom: 125%`), then a likes/share footer —
// regardless of the iframe's own height. To make the reel fill a 9:16 card
// we scale the iframe up until the 4:5 media box's height matches the card's
// full height, then shift up by the header's rendered height so the media
// box's top lands at the card's top (its bottom then lands past the card's
// bottom, cropped away by the card's `overflow-hidden`).
// scale = cardAspect(16/9) / mediaAspect(1.25) — see extractEmbedUrl().
const INSTAGRAM_EMBED_SCALE = 1.43;
const INSTAGRAM_EMBED_HEADER_OFFSET_PX = 54;

function isLocalVideo(reel: ReelItem): boolean {
  return reel.url.startsWith("/");
}

function extractEmbedUrl(reel: ReelItem): string | null {
  if (reel.url.startsWith("PLACEHOLDER") || isLocalVideo(reel)) {
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

// Matches the play button TikTok's own embed renders: a dark translucent
// circle with a solid white triangle, optically centered (nudged right a
// touch since a triangle's visual center sits left of its bounding box).
function PlayButtonGlyph() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/45 ring-1 ring-white/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
      <Play
        className="h-6 w-6 translate-x-0.5 text-white"
        fill="white"
        aria-hidden="true"
      />
    </span>
  );
}

function Badges({ reel }: { reel: ReelItem }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground">
        {platformLabel[reel.platform]}
      </span>
      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-secondary/90 px-3 py-1 text-xs font-semibold text-white">
        {reel.category}
      </span>
    </div>
  );
}

export default function ReelCard({ reel, index }: ReelCardProps) {
  const embedUrl = extractEmbedUrl(reel);
  const local = isLocalVideo(reel);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (local) {
    return (
      <div className="group tilt-card relative aspect-9/16 overflow-hidden rounded-2xl border border-white/15 bg-foreground/20 shadow-lg shadow-black/10">
        <video
          ref={videoRef}
          src={reel.url}
          poster={reel.poster}
          className="absolute inset-0 h-full w-full object-cover"
          controls={isPlaying}
          controlsList="nodownload"
          playsInline
          preload="metadata"
          onPause={() => setIsPlaying(false)}
        >
          <track kind="captions" />
        </video>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap justify-start gap-1.5 p-3">
          <Badges reel={reel} />
        </div>

        {!isPlaying && (
          <button
            type="button"
            onClick={() => {
              videoRef.current?.play();
              setIsPlaying(true);
            }}
            aria-label={`Play ${reel.caption}`}
            className="absolute inset-0 flex items-center justify-center"
          >
            <PlayButtonGlyph />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="group tilt-card relative aspect-9/16 overflow-hidden rounded-2xl border border-white/15 bg-foreground/20 shadow-lg shadow-black/10">
      {embedUrl ? (
        <>
          <iframe
            src={embedUrl}
            title={`${platformLabel[reel.platform]}: ${reel.caption}`}
            className="absolute inset-0 block h-full w-full border-0"
            style={
              reel.platform === "instagram"
                ? {
                    transformOrigin: "top center",
                    transform: `scale(${INSTAGRAM_EMBED_SCALE}) translateY(-${INSTAGRAM_EMBED_HEADER_OFFSET_PX}px)`,
                  }
                : undefined
            }
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap justify-start gap-1.5 p-3">
            <Badges reel={reel} />
          </div>
        </>
      ) : (
        <>
          <Image
            src={placeholderImage(`tyca-reel-${index}`, 450, 800)}
            alt={`Placeholder — ${platformLabel[reel.platform]} coming soon`}
            fill
            sizes="(min-width: 768px) 30vw, 45vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex flex-col justify-between bg-linear-to-t from-black/75 via-black/5 to-transparent p-4 transition-opacity duration-300 group-hover:opacity-100">
            <Badges reel={reel} />
            <span className="flex items-center text-sm font-medium text-white">
              Coming soon
            </span>
          </div>

          <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70">
            <PlayButtonGlyph />
          </span>
        </>
      )}
    </div>
  );
}
