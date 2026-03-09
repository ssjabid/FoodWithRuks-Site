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
    <section className="py-20 sm:py-28 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-bold tracking-tight text-3xl sm:text-4xl text-[var(--color-text-primary)] mb-4">
              Stay Connected
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg mb-8">
              Join the FoodWithRuks family and get new recipes delivered straight to your inbox.
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

            <p className="text-xs text-[var(--color-text-secondary)] mt-3">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
