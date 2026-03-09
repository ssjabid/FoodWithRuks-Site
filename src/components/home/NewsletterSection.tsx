"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="py-16 sm:py-20 bg-[var(--color-surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Stay Connected
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg mb-6">
              Get new recipes delivered straight to your inbox.
            </p>

            {status === "success" ? (
              <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-success)]/10 text-[var(--color-success)]">
                Thanks for subscribing! You&apos;ll hear from us soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" size="md">
                  Subscribe
                </Button>
              </form>
            )}

            <p className="text-xs text-[var(--color-text-tertiary)] mt-3">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
