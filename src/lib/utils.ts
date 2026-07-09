import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Dev/placeholder image helper. Uses a fixed seed so the same slot always
 * renders the same image across reloads. Swap for real assets before launch.
 */
export function placeholderImage(seed: string, width = 800, height = 600) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}
