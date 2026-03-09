import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-extrabold tracking-tight text-6xl sm:text-8xl text-[var(--color-primary)] mb-4">404</h1>
        <h2 className="font-bold tracking-tight text-2xl sm:text-3xl text-[var(--color-text-primary)] mb-4">
          Oops! This page doesn&apos;t exist
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-8">
          Looks like this recipe got lost in the kitchen. Let&apos;s get you back on track.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
          <Link href="/recipes">
            <Button variant="outline">Browse Recipes</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
