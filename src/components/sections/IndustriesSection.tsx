// "use client";

// import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
// import { industries } from "@/data";
// import Link from "next/link";
// import { ArrowRight, BriefcaseBusiness, HardHat, Wrench } from "lucide-react";

// const WORKFORCE_CATEGORIES = [
//   {
//     icon: BriefcaseBusiness,
//     label: "White-collar",
//     color: "#0A65CC",
//     bg: "#E8F1FB",
//     description: "Managers, analysts, consultants, HR professionals, and corporate specialists.",
//     roles: ["HR Managers", "Finance Analysts", "IT Consultants", "Project Managers", "Admin Executives"],
//   },
//   {
//     icon: HardHat,
//     label: "Grey-collar",
//     color: "#C8102E",
//     bg: "#FFF0F2",
//     description: "Skilled technicians and supervisors who bridge field and office operations.",
//     roles: ["Site Supervisors", "QA/QC Inspectors", "Lab Technicians", "Nurses", "Electricians"],
    
//   },
//   {
//     icon: Wrench,
//     label: "Blue-collar",
//     color: "#0BA02C",
//     bg: "#E7F9ED",
//     description: "Trained tradespeople and operators who power industries on the ground.",
//     roles: ["Welders", "Forklift Operators", "Steel Fixers","Housekeeping Staff", "Pipe Fitters"],
//   },
// ];

// export default function IndustriesSection() {
//   const { ref, isVisible } = useIntersectionObserver();
//   const { ref: ref2, isVisible: isVisible2 } = useIntersectionObserver();

//   return (
//     <>
//       {/* ── Industries ──────────────────────────────────────────── */}
//       <section
//         className="py-20 grey-gradient-section relative"
//         ref={ref}
//         style={{
//           backgroundImage: "url('/assets/industries_bg.png')",
//           backgroundSize: "cover",
//           backgroundPosition: "center top",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {/* Overlay so cards remain readable */}
//         <div className="absolute inset-0 bg-white/80 pointer-events-none" />

//         <div className="max-w-7xl mx-auto px-4 relative z-10">
//           {/* Header */}
//           <div
//             className={`text-center mb-14 transition-all duration-700 ${
//               isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//             }`}
//           >
//             <p className="text-brand-red text-sm font-semibold tracking-widest uppercase mb-2">
//               What We Cover
//             </p>
//             <h2
//               className="text-4xl font-bold text-brand-grey-900"
//               style={{ fontFamily: "var(--font-display)" }}
//             >
//               INDUSTRIES WE SERVE
//             </h2>
//             <div className="section-divider mt-4" />
//           </div>

//           {/* Cards Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {industries.map((industry, i) => {
//               const Icon = industry.icon;
//               return (
//                 <Link
//                   key={industry.id}
//                   href={industry.href}
//                   className={`industry-card bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-700 block group ${
//                     isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
//                   }`}
//                   style={{ transitionDelay: `${i * 0.1}s` }}
//                 >
//                   {/* Image */}
//                   <div className="relative h-44 overflow-hidden">
//                     <img
//                       src={industry.image}
//                       alt={industry.title}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                     />
//                     <div className="industry-overlay absolute inset-0" />
//                     <div className="absolute top-3 left-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
//                       <Icon size={20} className="text-brand-red" />
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="p-5">
//                     <h3
//                       className="text-lg font-bold text-brand-grey-900 mb-2"
//                       style={{ fontFamily: "var(--font-display)" }}
//                     >
//                       {industry.title}
//                     </h3>
//                     <p className="text-brand-grey-500 text-sm leading-relaxed mb-4">
//                       {industry.description}
//                     </p>
//                     <ul className="list-disc list-inside text-brand-grey-500 text-sm leading-relaxed mb-4 columns-2">
//                       {(industry.bulletpoints || []).map((point, j) => (
//                         <li key={j} className="break-inside-avoid">{point}</li>
//                       ))}
//                     </ul>
//                     {/* <div className="flex items-center gap-2 text-brand-red text-sm font-semibold group-hover:gap-3 transition-all">
//                       <span>Learn More</span>
//                       <ArrowRight size={14} />
//                     </div> */}
//                   </div>

//                   <div className="h-0.5 bg-gradient-to-r from-brand-red to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ── Workforce Categories ─────────────────────────────────── */}
//       <section className="py-20 bg-white" ref={ref2}>
//         <div className="max-w-7xl mx-auto px-4">
//           {/* Header */}
//           <div
//             className={`text-center mb-14 transition-all duration-700 ${
//               isVisible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//             }`}
//           >
//             <p className="text-brand-red text-sm font-semibold tracking-widest uppercase mb-2">
//               Workforce We Deploy
//             </p>
//             <h2
//               className="text-4xl font-bold text-brand-grey-900"
//               style={{ fontFamily: "var(--font-display)" }}
//             >
//               WORKFORCE CATEGORIES
//             </h2>
//             <div className="section-divider mt-4" />
//             <p className="text-brand-grey-500 text-sm mt-5 max-w-xl mx-auto">
//               From the boardroom to the shop floor, we
// source, screen, and place talent across
// every level of your organisation.
//             </p>
//           </div>

//           {/* Category cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {WORKFORCE_CATEGORIES.map((cat, i) => {
//               const Icon = cat.icon;
//               return (
//                 <div
//                   key={cat.label}
//                   className={`rounded-2xl border border-brand-grey-100 p-7 group hover:shadow-lg hover:border-transparent transition-all duration-300 ${
//                     isVisible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//                   }`}
//                   style={{ transitionDelay: `${i * 0.12}s` }}
//                 >
//                   {/* Icon + label row */}
//                   <div className="flex items-center gap-3 mb-5">
//                     <div
//                       className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
//                       style={{ background: cat.bg, color: cat.color }}
//                     >
//                       <Icon size={22} />
//                     </div>
//                     <h3
//                       className="text-xl font-bold text-brand-grey-900"
//                       style={{ fontFamily: "var(--font-display)", color: cat.color }}
//                     >
//                       {cat.label}
//                     </h3>
//                   </div>

//                   {/* Description */}
//                   <p className="text-brand-grey-500 text-sm leading-relaxed mb-5">
//                     {cat.description}
//                   </p>

//                   {/* Role pills */}
//                   <div className="flex flex-wrap gap-2">
//                     {cat.roles.map((role) => (
//                       <span
//                         key={role}
//                         className="text-xs font-medium px-3 py-1 rounded-full"
//                         style={{ background: cat.bg, color: cat.color }}
//                       >
//                         {role}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Bottom accent */}
//                   <div
//                     className="h-0.5 mt-6 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
//                     style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }





"use client";

import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
import { industries } from "@/data";
import { BriefcaseBusiness, HardHat, Wrench } from "lucide-react";
import { images } from "@/lib/images";

const WORKFORCE_CATEGORIES = [
  {
    icon: BriefcaseBusiness,
    label: "White-collar",
    color: "#0A65CC",
    bg: "#E8F1FB",
    description: "Managers, analysts, consultants, HR professionals, and corporate specialists.",
    roles: ["HR Managers", "Finance Analysts", "IT Consultants", "Project Managers", "Admin Executives"],
  },
  {
    icon: HardHat,
    label: "Grey-collar",
    color: "#C8102E",
    bg: "#FFF0F2",
    description: "Skilled technicians and supervisors who bridge field and office operations.",
    roles: ["Site Supervisors", "QA/QC Inspectors", "Lab Technicians", "Nurses", "Electricians"],
  },
  {
    icon: Wrench,
    label: "Blue-collar",
    color: "#0BA02C",
    bg: "#E7F9ED",
    description: "Trained tradespeople and operators who power industries on the ground.",
    roles: ["Welders", "Forklift Operators", "Steel Fixers","Housekeeping Staff", "Pipe Fitters"],
  },
];

export default function IndustriesSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const { ref: ref2, isVisible: isVisible2 } = useIntersectionObserver();

  return (
    <>
      {/* ── Industries ──────────────────────────────────────────── */}
      <section
        className="py-20 grey-gradient-section relative"
        ref={ref}
        style={{
          backgroundImage: `url(${images.industries.bgbanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white/80 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div
            className={`text-center mb-14 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-brand-red text-sm font-semibold tracking-widest uppercase mb-2">
              What We Cover
            </p>
            <h2
              className="text-4xl font-bold text-brand-grey-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              INDUSTRIES WE SERVE
            </h2>
            <div className="section-divider mt-4" />
          </div>

          {/* Cards Grid – अब सिर्फ div, clickable नहीं */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.id}
                  className="industry-card bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-700 block group"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="industry-overlay absolute inset-0" />
                    <div className="absolute top-3 left-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                      <Icon size={20} className="text-brand-red" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3
                      className="text-lg font-bold text-brand-grey-900 mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {industry.title}
                    </h3>
                    <p className="text-brand-grey-500 text-sm leading-relaxed mb-4">
                      {industry.description}
                    </p>
                    <ul className="list-disc list-inside text-brand-grey-500 text-sm leading-relaxed mb-4 columns-2">
                      {(industry.bulletpoints || []).map((point, j) => (
                        <li key={j} className="break-inside-avoid">{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="h-0.5 bg-gradient-to-r from-brand-red to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Workforce Categories ─────────────────────────────────── */}
      <section className="py-20 bg-white" ref={ref2}>
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={`text-center mb-14 transition-all duration-700 ${
              isVisible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-brand-red text-sm font-semibold tracking-widest uppercase mb-2">
              Workforce We Deploy
            </p>
            <h2
              className="text-4xl font-bold text-brand-grey-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WORKFORCE CATEGORIES
            </h2>
            <div className="section-divider mt-4" />
            <p className="text-brand-grey-500 text-sm mt-5 max-w-xl mx-auto">
              From the boardroom to the shop floor, we
              source, screen, and place talent across
              every level of your organisation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WORKFORCE_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.label}
                  className={`rounded-2xl border border-brand-grey-100 p-7 group hover:shadow-lg hover:border-transparent transition-all duration-300 ${
                    isVisible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: cat.bg, color: cat.color }}
                    >
                      <Icon size={22} />
                    </div>
                    <h3
                      className="text-xl font-bold text-brand-grey-900"
                      style={{ fontFamily: "var(--font-display)", color: cat.color }}
                    >
                      {cat.label}
                    </h3>
                  </div>

                  <p className="text-brand-grey-500 text-sm leading-relaxed mb-5">
                    {cat.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {cat.roles.map((role) => (
                      <span
                        key={role}
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{ background: cat.bg, color: cat.color }}
                      >
                        {role}
                      </span>
                    ))}
                  </div>

                  <div
                    className="h-0.5 mt-6 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}