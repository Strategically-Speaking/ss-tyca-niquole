import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p className={cn("mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary", className)}>
      {children}
    </p>
  );
}
