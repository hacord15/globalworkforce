"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import JobFilters from "@/components/ui/JobFilters";

// These params are NOT shown as filter chips
const EXCLUDED_PARAMS = ["page", "q"];

export default function MobileFilterToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Build active filter chips from URL params
  const activeChips: { key: string; value: string }[] = [];

  searchParams.forEach((value, key) => {
    if (EXCLUDED_PARAMS.includes(key)) return;
    value.split(",").filter(Boolean).forEach((v) => {
      activeChips.push({ key, value: v });
    });
  });

  const removeChip = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(key)?.split(",").filter(Boolean) || [];
    const next = current.filter((v) => v !== value);
    if (next.length === 0) {
      params.delete(key);
    } else {
      params.set(key, next.join(","));
    }
    params.delete("page");
    router.push(`/jobs?${params.toString()}`);
  };

  const clearAll = () => {
    // Keep only the search query if present
    const q = searchParams.get("q");
    router.push(q ? `/jobs?q=${encodeURIComponent(q)}` : "/jobs");
  };

  return (
    <>
      {/* ── Top bar: Filter button + chips — only below lg ── */}
      <div className="lg:hidden w-full flex flex-col gap-3">

        {/* Row: filter button + clear all */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-brand-grey-200 rounded-lg text-sm font-semibold text-brand-grey-700 bg-white hover:border-brand-red hover:text-brand-red transition-colors"
            aria-label="Open Filters"
          >
            <SlidersHorizontal size={16} className="text-brand-red" />
            Filters
            {activeChips.length > 0 && (
              <span
                className="ml-0.5 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center"
                style={{ background: "#C8102E", color: "white" }}
              >
                {activeChips.length}
              </span>
            )}
          </button>

          {activeChips.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs font-semibold text-brand-red hover:underline bg-transparent border-none cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeChips.map((chip) => (
              <span
                key={`${chip.key}-${chip.value}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                style={{
                  background: "#FFF0F2",
                  color: "#C8102E",
                  borderColor: "#F5C0C8",
                }}
              >
                {chip.value}
                <button
                  onClick={() => removeChip(chip.key, chip.value)}
                  className="flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-[#C8102E] hover:text-white transition-colors"
                  aria-label={`Remove ${chip.value}`}
                >
                  <X size={9} strokeWidth={3} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Sidebar Filter */}
      <JobFilters
        isMobile={true}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}