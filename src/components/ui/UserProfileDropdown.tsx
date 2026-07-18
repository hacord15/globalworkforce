// Install: npm install @headlessui/react  (or use the useState approach below — no extra deps)

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { User, ChevronDown, Lock, ShieldCheck } from "lucide-react";

export function UserProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    // ✅ "hidden lg:block" hataya → "block" kiya taaki mobile par bhi dikhe
    <div ref={ref} className="block relative">
      {/* Trigger */}
      {/* Small mobile only (< 768px): sirf icon */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex items-center justify-center w-9 h-9 border-[1.5px] border-brand-red text-brand-red rounded-lg hover:bg-red-50 transition-colors"
      >
        <User size={18} />
      </button>

      {/* Tablet + Desktop (>= 768px): icon + USER text + chevron */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="hidden md:flex items-center gap-2 px-4 py-2 border-[1.5px] border-brand-red text-brand-red rounded-lg text-[13px] font-semibold tracking-wide hover:bg-red-50 transition-colors"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "0.06em" }}
      >
        <User size={15} />
        USER
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown card */}
      {open && (
        <div
          // ✅ Mobile par right-0 se left-0 bhi handle kiya taaki screen se bahar na jaye
          className="absolute right-0 top-[calc(100%+8px)] w-[272px] bg-white border border-brand-grey-200 rounded-2xl shadow-lg z-50 overflow-hidden"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
        >
          <div className="px-6 pt-7 pb-5 text-center">

            <hr className="border-brand-grey-100 mb-4" />

            {/* Login */}
            <Link
              href="https://sisglobalapp.neuralinfo.co.in/portal/login/auth?portal=candidate"
              target="_blank"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full h-11 bg-brand-red text-white text-[13px] font-semibold rounded-lg mb-2.5 hover:opacity-90 transition-opacity"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
            >
              <User size={15} /> Login
            </Link>

            {/* Register */}
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full h-11 border-[1.5px] border-brand-red text-brand-red text-[13px] font-semibold rounded-lg hover:bg-red-50 transition-colors"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
            >
              <Lock size={14} /> Register
            </Link>

            {/* Footer */}
            <div className="flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-brand-grey-100">
              <ShieldCheck size={13} className="text-brand-grey-400" />
              <span className="text-[11px] text-brand-grey-400">Secure &amp; Trusted Access</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}