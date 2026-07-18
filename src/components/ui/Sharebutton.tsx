// src/components/ui/ShareButton.tsx
"use client";

import { useState } from "react";
import {
  Share2, Copy, Check,
  Linkedin, Facebook, Twitter, MessageCircle,
} from "lucide-react";

interface ShareButtonProps {
  url:      string;        // can be relative or absolute
  title:    string;
  variant?: "icon" | "expanded";
}

const PLATFORMS = [
  {
    name:  "LinkedIn",
    icon:  <Linkedin      size={18} />,
    color: "#0077B5",
    href:  (url: string, title: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name:  "Facebook",
    icon:  <Facebook      size={18} />,
    color: "#1877F2",
    href:  (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name:  "Twitter",
    icon:  <Twitter       size={18} />,
    color: "#1DA1F2",
    href:  (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name:  "WhatsApp",
    icon:  <MessageCircle size={18} />,
    color: "#25D366",
    href:  (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
  },
];

export default function ShareButton({ url, title, variant = "icon" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  // Helper to get absolute URL
  const getFullUrl = () => {
    if (typeof window === "undefined") return url; // fallback for SSR
    return new URL(url, window.location.origin).href;
  };

  const copyLink = async () => {
    const fullUrl = getFullUrl();
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silent */ }
  };

  const handleShare = async () => {
    const fullUrl = getFullUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title, url: fullUrl });
      } catch {
        // user cancelled or unsupported – do nothing
      }
    } else {
      await copyLink(); // fallback to copy
    }
  };

  // ── Expanded variant (sidebar card) ──────────────────────────────────
  if (variant === "expanded") {
    const fullUrl = getFullUrl();
    return (
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          {PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.href(fullUrl, title)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: p.color }}
            >
              {p.icon}
              {p.name}
            </a>
          ))}
        </div>

        <button
          onClick={copyLink}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors w-full"
          style={{
            background:  copied ? "rgba(200,16,46,0.06)" : "#F5F5F5",
            borderColor: copied ? "rgba(200,16,46,0.3)"  : "#E5E5E5",
            color:       copied ? "#C8102E"               : "#525252",
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    );
  }

  // ── Icon variant — single button (native share / copy fallback) ────
  return (
    <div className="relative">
      <button
        onClick={handleShare}
        aria-label={copied ? "Link copied" : "Share this job"}
        title={copied ? "Link copied" : "Share"}
        className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
          copied
            ? "border-brand-red text-brand-red bg-red-50"
            : "border-brand-grey-200 bg-white text-brand-grey-600 hover:border-brand-red hover:text-brand-red"
        }`}
      >
        {copied ? <Check size={15} /> : <Share2 size={15} />}
      </button>
    </div>
  );
}