// src/components/sections/ClientsSection.tsx

import { images } from "@/lib/images";

const LOGOS = [
  { src: images.logos.client1, alt: "Client 1" },
  { src: images.logos.client2, alt: "Client 2" },
  { src: images.logos.client3, alt: "Client 3" },
  { src: images.logos.client4, alt: "Client 4" },
  // { src: images.logos.client5, alt: "Client Name" },
];

export default function ClientsSection() {
  return (
    <section className="py-8 md:py-10" style={{ background: "#F7F7F7" }}>
      {/* Heading */}
      <div className="flex items-center justify-center gap-3 sm:gap-5 mb-8 md:mb-10">
        <div className="h-px w-6 sm:w-8 md:w-10 bg-brand-red" />
        <p
          className="text-base sm:text-lg md:text-xl font-bold tracking-[0.2em] sm:tracking-[0.28em] uppercase text-brand-grey-700 text-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          SIS owned companies
        </p>
        <div className="h-px w-6 sm:w-8 md:w-10 bg-brand-red" />
      </div>

      {/* Logos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 items-center justify-items-center">
          {LOGOS.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center w-full"
              style={{
                height: "clamp(120px, 14vh, 140px)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="w-auto object-contain transition-all duration-300 hover:scale-105"
                style={{
                  maxHeight: "clamp(70px, 12vh, 140px)",
                  maxWidth: "clamp(160px, 40vw, 280px)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}