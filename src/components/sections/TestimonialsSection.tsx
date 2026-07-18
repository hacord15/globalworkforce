"use client";

import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "SIS Global helped us deploy skilled workforce in record time while maintaining quality and compliance standards.",
    name:    "Operations Director",
    company: "Leading Healthcare Group, UAE",
    initial: "O",
    color:   "#C8102E",
  },
  {
    quote:
      "Their trained workforce and deployment support significantly improved our operational continuity.",
    name:    "HR Manager",
    company: "Engineering & MEP Contractor, Qatar",
    initial: "H",
    color:   "#404040",
  },
  {
    quote:
      "SIS Global Connect gives excellent visibility into workforce management and attendance.",
    name:    "General Manager",
    company: "Hospitality Chain, Saudi Arabia",
    initial: "G",
    color:   "#C8102E",
  },
];

export default function TestimonialsSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      ref={ref}
      className="py-20"
      style={{ background: "linear-gradient(160deg,#FAFAFA 0%,#F3F3F3 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-brand-red text-sm font-semibold tracking-widest uppercase mb-2">
            Client Stories
          </p>
          <h2
            className="text-4xl font-bold text-brand-grey-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What Our Clients Say
          </h2>
          <div className="section-divider mt-4" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`group bg-white rounded-2xl p-8 border border-brand-grey-200 hover:border-brand-red/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Quote icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 flex-shrink-0"
                style={{ background: "rgba(200,16,46,0.08)", color: "#C8102E" }}
              >
                <Quote size={18} />
              </div>

              {/* Quote text */}
              <p className="text-brand-grey-600 text-lg leading-relaxed flex-1 mb-7 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-brand-grey-100 mb-5" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.color} 0%, ${t.color}BB 100%)`,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-brand-grey-900 text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {t.name}
                  </p>
                  <p className="text-brand-grey-400 text-xs mt-0.5">{t.company}</p>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="h-0.5 bg-gradient-to-r from-brand-red to-transparent mt-5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
