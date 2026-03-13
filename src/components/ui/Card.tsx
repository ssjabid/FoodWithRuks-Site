"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { motion } from "framer-motion";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = true, children, ...props }: CardProps) {
  if (!hover) {
    return (
      <div
        className={cn(
          "bg-[var(--color-elevated)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden",
          "shadow-[var(--shadow-sm)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 16px 40px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "bg-[var(--color-elevated)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden",
        "shadow-[var(--shadow-sm)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
}
