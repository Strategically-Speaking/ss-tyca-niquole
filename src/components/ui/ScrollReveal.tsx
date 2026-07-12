"use client";

import {
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: ElementType;
}

export default function ScrollReveal({
  children,
  className,
  delayMs = 0,
  as: Component = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (isVisible) {
      return;
    }

    const node = ref.current;

    if (!node) {
      return;
    }

    // On mobile's shorter viewport, requiring 18% of a section visible plus
    // an 8%-shrunk bottom margin means users have to scroll well past a
    // section before it reveals. Trigger earlier there so content keeps
    // pace with the scroll instead of lagging behind it.
    const isNarrowViewport = window.matchMedia("(max-width: 767px)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: isNarrowViewport ? 0.01 : 0.18,
        rootMargin: isNarrowViewport ? "0px 0px 15% 0px" : "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <Component
      ref={ref}
      className={cn("scroll-reveal", isVisible && "is-visible", className)}
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
    >
      {children}
    </Component>
  );
}
