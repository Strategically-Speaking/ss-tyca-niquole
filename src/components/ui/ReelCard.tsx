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

export default function ReelCard({ reel, index }: ReelCardProps) {
  const isPlaceholder = reel.url.startsWith("PLACEHOLDER");

  return (
    <div className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/15 bg-foreground/20">
      <Image
        src={placeholderImage(`tyca-reel-${index}`, 450, 800)}
        alt={
          isPlaceholder
            ? `Placeholder — ${platformLabel[reel.platform]} coming soon`
            : reel.caption
        }
        fill
        sizes="(min-width: 768px) 30vw, 45vw"
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4">
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground">
          {platformLabel[reel.platform]}
        </span>
        <span className="flex items-center gap-1 text-sm font-medium text-white">
          <Play className="h-4 w-4" aria-hidden="true" />
          {isPlaceholder ? "Coming soon" : reel.caption}
        </span>
      </div>
    </div>
  );
}
