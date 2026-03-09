"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={cn("animate-on-scroll", isInView && "visible", className)}
    >
      {children}
    </div>
  );
}
