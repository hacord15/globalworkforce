"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { whyCards } from "@/data";
import { images } from "@/lib/images";

// Card-level imagery mapped by index — replace with your own assets as needed
const CARD_IMAGES = [
  images.homepage.whySISCard1, // team / temp staffing
  images.homepage.whySISCard2, // direct hire / permanent
  images.homepage.whySISCard3, // executive search
  images.homepage.whySISCard4, // on-site managed
];


export default function WhySISSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const cardEls = sectionRef.current?.querySelectorAll(".shuffle-card");
    if (!cardEls) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(
              (entry.target as HTMLElement).dataset.idx || "0"
            );
            setTimeout(() => {
              setVisibleCards((prev) => new Set(Array.from(prev).concat(idx)));
            }, idx * 120);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <p className="text-brand-red text-sm font-semibold tracking-widest uppercase mb-2">
            Staffing Offerings
          </p>
          <h2
            className="text-4xl font-bold text-brand-grey-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Flexible Staffing Solutions for Every Business Need
          </h2>
          <div className="section-divider mt-4" />
        </div>

        {/* ── Hero Banner Image ───────────────────────────────────── */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-14 shadow-md">
          <Image
            src={images.homepage.whySISMCard}
            alt="A diverse team collaborating in a modern office environment"
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover object-center"
            priority
          />
          {/* Gradient overlay so any copy on top stays legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-grey-900/60 via-brand-grey-900/20 to-transparent" />

          {/* Optional pull-quote overlay */}
          <div className="absolute inset-0 flex items-center px-8 sm:px-12">
            <div className="max-w-md">
              <p
                className="text-white text-xl sm:text-3xl font-bold leading-snug drop-shadow"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The right talent at the right time — every time.

              </p>
              <div className="w-10 h-0.5 bg-brand-red mt-4" />
            </div>
          </div>
        </div>

        {/* ── Cards Grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyCards.map((card, i) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                data-idx={i}
                className={`shuffle-card bg-white border border-brand-grey-200 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                  visibleCards.has(i) ? "visible" : ""
                }`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {/* Card thumbnail */}
                <div className="relative w-full h-36 overflow-hidden">
                  <Image
                    src={CARD_IMAGES[i % CARD_IMAGES.length]}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle red tint at the bottom edge to tie into brand */}
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent" />
                </div>

                {/* Card body */}
                <div className="p-7 pt-5">
                  {/* Icon Circle */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-grey-100 to-brand-grey-200 flex items-center justify-center mb-5 shadow-sm -mt-10 relative z-10 border-2 border-white">
                    <Icon className="w-7 h-7 text-brand-red" />
                  </div>

                  {/* Accent Line */}
                  <div className="w-8 h-0.5 bg-brand-red mb-4" />

                  {/* Title */}
                  <h3
                    className="text-lg font-bold text-brand-grey-900 mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-brand-grey-500 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}