import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "font-bold tracking-tight hover:opacity-80 transition-opacity duration-200",
        sizeStyles[size],
        className
      )}
    >
      <span className="text-[var(--color-text-primary)]">FoodWith</span>
      <span className="text-[var(--color-primary)]">Ruks</span>
    </Link>
  );
}
