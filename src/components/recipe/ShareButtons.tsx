"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://foodwithruks.com/recipes/${slug}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap gap-2 share-buttons">
      <Button variant="ghost" size="sm" onClick={copyLink}>
        {copied ? "Copied!" : "Copy Link"}
      </Button>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="ghost" size="sm">WhatsApp</Button>
      </a>
      <a
        href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="ghost" size="sm">Pinterest</Button>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="ghost" size="sm">X / Twitter</Button>
      </a>
    </div>
  );
}
