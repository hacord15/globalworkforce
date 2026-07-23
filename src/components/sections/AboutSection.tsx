"use client";

import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import image from "next/image";
import { images } from "@/lib/images";

const highlights = [
  "Quality-driven recruitment",
  "Workforce readiness training",
  "Compliance-first deployment",
  "Employee retention",
  "Technology-enabled workforce management (SIS Global Connect)",
  "Continuous upskilling and welfare support",
];

export default function AboutSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section className="py-12 md:py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 md:-translate-x-12"
              }`}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
              
                src={images.homepage.about}
                alt="SIS Global Office"
                className="w-full h-[250px] sm:h-[320px] md:h-[420px] object-cover"
              />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-brand-red text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded tracking-wider uppercase">
                Backed by SIS Limited
              </div>
            </div>
            {/* Decorative element - hidden on mobile */}
            <div className="absolute -bottom-6 -right-6 w-24 md:w-32 h-24 md:h-32 border-4 border-brand-red/20 rounded-lg -z-10 hidden md:block" />
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 md:translate-x-12"
              }`}
          >
            <p className="text-brand-red text-lg sm:text-xl font-semibold tracking-widest uppercase mb-1 sm:mb-2">
              WHY SIS GLOBAL?
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-grey-900 mb-3 sm:mb-4 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              We Are More Than a Recruitment Company
            </h2>
            <div className="section-divider section-divider-left mb-4 sm:mb-6" />

            <p className="text-brand-grey-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
              <strong className="text-brand-grey-800">With more than 50 years of workforce expertise,</strong>  SIS Global Workforce Solutions is
              led by industry veterans who have
              successfully built sustainable workforce
              ecosystems for global businesses.

            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
              {highlights.map((h) => (
                <div key={h} className="flex items-start sm:items-center gap-2">
                  <CheckCircle size={16} className="text-brand-red flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-xs sm:text-sm text-brand-grey-700 font-medium">{h}</span>
                </div>
              ))}
            </div>

            <p className="text-brand-grey-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
              We combine the deep legacy of SIS Group
enterprises with advanced workforce
technology and ethical recruitment
practices to create scalable workforce
solutions for employers worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="/sis-global" className="btn-primary text-center justify-center">
                Learn More <ArrowRight size={16} />
              </a>
             <Link
  href="/contact"
  className="px-6 py-3 border border-brand-grey-300 text-brand-grey-700 text-sm font-semibold tracking-wider uppercase hover:border-brand-red hover:text-brand-red transition-colors text-center rounded-lg"
  style={{ fontFamily: "var(--font-display)" }}
>
  Contact Us
</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}