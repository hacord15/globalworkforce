// "use client";

// import { images } from "@/lib/images";
// import { ArrowRight, Play } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function HeroSection() {
//   const [vis, setVis] = useState(false);
//   useEffect(() => {
//     const t = setTimeout(() => setVis(true), 80);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <section className="relative h-[71.6vh] min-h-[580px] overflow-hidden min-[601px]:max-[900px]:h-[80vh] min-[601px]:max-[900px]:min-h-[520px] max-[600px]:h-[100svh] max-[600px]:min-h-0">
//       {/* video */}
//       <video
//         className="absolute inset-0 h-full w-full object-cover object-center min-[601px]:max-[900px]:object-[60%_top] max-[600px]:object-[65%_top]"
//         autoPlay
//         muted
//         loop
//         playsInline
        
//       >
//         <source src={images.banners.hero} type="video/mp4" />
//       </video>

//       {/* gradient overlay: heavy left, lighter right */}
//       <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.72)_38%,rgba(0,0,0,0.38)_70%,rgba(0,0,0,0.18)_100%)] min-[601px]:max-[900px]:bg-[linear-gradient(115deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_50%,rgba(0,0,0,0.50)_100%)] max-[600px]:bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.65)_45%,rgba(0,0,0,0.20)_100%)]" />

//       {/* red left-edge glow */}
//       <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(200,16,46,0.22)_0%,transparent_32%)]" />

//       {/* animated fine grain texture */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[length:180px]"
//         style={{
//           backgroundImage:
//             "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
//         }}
//         aria-hidden
//       />

//       <div className="absolute inset-0 z-10 mx-auto w-full max-w-[1280px] px-10 max-[600px]:flex max-[600px]:flex-col max-[600px]:justify-center max-[600px]:px-0">
//         {/* TOP-LEFT: "Trusted Global Workforce Solution" */}
//         {/* <div
//           className={`absolute left-10 top-[2.2rem] transition-[opacity,transform] duration-[650ms] ease-[ease] delay-100 motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!transition-none min-[601px]:max-[900px]:left-[1.8rem] min-[601px]:max-[900px]:top-[1.8rem] max-[600px]:static max-[600px]:mb-[0.9rem] max-[600px]:px-5 max-[360px]:px-4 ${vis ? "translate-y-0 opacity-100" : "-translate-y-[14px] opacity-0"
//             }`}
//         >
//           <div className="mb-[0.7rem] h-14 w-1 rounded-[2px] bg-[linear-gradient(to_bottom,#C8102E,rgba(200,16,46,0.2))] min-[601px]:max-[900px]:h-11 max-[600px]:mb-[0.4rem] max-[600px]:h-8" />
//           <h2 className="m-0 font-[var(--font-display)] text-[clamp(1.9rem,3.8vw,3.4rem)] font-extrabold leading-[1.1] tracking-[-0.01em] text-white min-[601px]:max-[900px]:text-[clamp(1.5rem,3vw,2.2rem)] max-[600px]:text-[clamp(1.2rem,5vw,1.6rem)] max-[360px]:text-[1.1rem]">
//             Trusted Global<br />Workforce Solutions
//           </h2>
//         </div> */}

//         {/* CENTER-RIGHT: main headline block */}
//         <div className="absolute left-1/2 top-[42%] w-[52%] max-w-[640px] -translate-y-1/2 min-[601px]:max-[900px]:left-[1.8rem] min-[601px]:max-[900px]:top-1/2 min-[601px]:max-[900px]:w-4/5 min-[601px]:max-[900px]:max-w-[520px] max-[600px]:static max-[600px]:left-auto max-[600px]:top-auto max-[600px]:w-full max-[600px]:max-w-full max-[600px]:translate-y-0 max-[600px]:px-5 max-[360px]:px-4">
//           {/* eyebrow */}
//           <div
//             className={`mb-[0.45rem] flex items-center gap-[0.55rem] transition-[opacity,transform] duration-[550ms] ease-[ease] delay-[450ms] motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!transition-none max-[600px]:mb-[0.3rem] ${vis ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0"
//               }`}
//           >
//             <span className="h-0.5 w-7 flex-shrink-0 rounded-[1px] bg-[#C8102E]" />
//             <span className="font-[var(--font-display)] text-[0.82rem] font-bold tracking-[0.04em] text-[rgba(255,255,255,0.85)] max-[600px]:text-[0.75rem]">
//               Provider with Skilled
//             </span>
//           </div>

//           {/* headline */}
//           <h1
//             className={`mb-[1.2rem] font-[var(--font-display)] text-[clamp(2.6rem,4.8vw,4.4rem)] font-black uppercase leading-[0.96] tracking-[-0.02em] text-white transition-[opacity,transform] duration-[650ms] ease-[ease] delay-[600ms] motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!transition-none min-[601px]:max-[900px]:mb-4 min-[601px]:max-[900px]:text-[clamp(2.4rem,5.5vw,3.6rem)] max-[600px]:mb-3 max-[600px]:text-[clamp(2.2rem,9.5vw,2.8rem)] max-[600px]:leading-none max-[360px]:text-[2rem] ${vis ? "translate-y-0 opacity-100" : "translate-y-[18px] opacity-0"
//               }`}
//           >
//             {/* Industry <em className="relative not-italic text-[#C8102E] after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:rounded-[2px] after:bg-[linear-gradient(90deg,#C8102E,rgba(200,16,46,0.3))] after:content-['']">ready</em><br />Talent
//           </h1> */}
//           Industry <em className="relative not-italic text-[#C8102E] ">ready</em><br />Talent
//           </h1> 

//           {/* body */}
//           <p
//             className={`mb-8 max-w-[400px] text-[0.92rem] leading-[1.78] text-[rgba(255,255,255,0.65)] transition-[opacity,transform] duration-[550ms] ease-[ease] delay-[780ms] motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!transition-none min-[601px]:max-[900px]:max-w-full min-[601px]:max-[900px]:text-[0.88rem] min-[601px]:max-[900px]:leading-[1.7] max-[600px]:mb-5 max-[600px]:max-w-full max-[600px]:text-[0.84rem] max-[600px]:leading-[1.68] max-[600px]:text-[rgba(255,255,255,0.72)] ${vis ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0"
//               }`}
//           >
//             SIS Global Workforce Solutions empowers
//             businesses across the GCC, Europe, and
//             other international markets with
//             compliant, trained, and deployment-ready
//             workforce solutions from India, Nepal, and
//             Sri Lanka.
//           </p>

//           {/* CTAs */}
//           <div
//             className={`flex flex-wrap gap-[0.65rem] transition-[opacity,transform] duration-[550ms] ease-[ease] delay-[950ms] motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!transition-none min-[601px]:max-[900px]:gap-[0.55rem] max-[600px]:flex-col max-[600px]:gap-2 max-[600px]:pb-[max(1.5rem,env(safe-area-inset-bottom))] ${vis ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0"
//               }`}
//           >
//             <Link
//               href="/employers"
//               className="group relative inline-flex items-center gap-[0.45rem] overflow-hidden whitespace-nowrap rounded-[1px] border border-[#C8102E] bg-[#C8102E] px-6 py-[0.8rem] font-[var(--font-display)] text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-white no-underline transition-[background,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#a80d26] hover:shadow-[0_8px_24px_rgba(200,16,46,0.45)] max-[600px]:justify-center max-[600px]:px-[1.2rem] max-[600px]:py-[0.9rem] max-[600px]:text-[0.72rem]"
//             >
//               Partner with Us
//               <ArrowRight
//                 size={13}
//                 className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
//               />
//             </Link>
//             <Link
//               href="/jobs"
//               className="inline-flex items-center gap-[0.4rem] whitespace-nowrap rounded-[1px] border border-[rgba(255,255,255,0.22)] bg-[rgba(0,0,0,0.45)] px-[1.3rem] py-[0.8rem] font-[var(--font-display)] text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.88)] no-underline backdrop-blur-[6px] transition-[background,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.1)] max-[600px]:justify-center max-[600px]:px-[1.2rem] max-[600px]:py-[0.9rem] max-[600px]:text-[0.72rem]"
//             >
//               <span className="inline-flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.45)]">
//                 <Play size={7} fill="currentColor" />
//               </span>
//               Explore Jobs
//             </Link>
//             <Link
//               href="/contact"
//               className="inline-flex items-center gap-[0.4rem] whitespace-nowrap rounded-[1px] border border-[rgba(255,255,255,0.22)] bg-[rgba(0,0,0,0.45)] px-[1.3rem] py-[0.8rem] font-[var(--font-display)] text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.88)] no-underline backdrop-blur-[6px] transition-[background,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.1)] max-[600px]:justify-center max-[600px]:px-[1.2rem] max-[600px]:py-[0.9rem] max-[600px]:text-[0.72rem]"
//             >
//               <span className="inline-flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.45)]">
//                 <Play size={7} fill="currentColor" />
//               </span>
//               Speak to Our Team
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { images } from "@/lib/images";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[71.6vh] min-h-[580px] overflow-hidden min-[601px]:max-[900px]:h-[80vh] min-[601px]:max-[900px]:min-h-[520px] max-[600px]:h-[100svh] max-[600px]:min-h-0">
      {/* video */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center min-[601px]:max-[900px]:object-[60%_top] max-[600px]:object-[65%_top]"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={images.banners.hero} type="video/mp4" />
      </video>

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.72)_38%,rgba(0,0,0,0.38)_70%,rgba(0,0,0,0.18)_100%)] min-[601px]:max-[900px]:bg-[linear-gradient(115deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_50%,rgba(0,0,0,0.50)_100%)] max-[600px]:bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.65)_45%,rgba(0,0,0,0.20)_100%)]" />

      {/* red left-edge glow */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(200,16,46,0.22)_0%,transparent_32%)]" />

      {/* animated fine grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[length:180px]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="absolute inset-0 z-10 mx-auto w-full max-w-[1280px] px-10 max-[600px]:flex max-[600px]:flex-col max-[600px]:justify-center max-[600px]:px-0">
        {/* main headline block – left aligned */}
        <div className="absolute left-10 top-[42%] w-[55%] max-w-[640px] -translate-y-1/2 min-[601px]:max-[900px]:left-[1.8rem] min-[601px]:max-[900px]:w-4/5 min-[601px]:max-[900px]:max-w-[520px] max-[600px]:static max-[600px]:left-auto max-[600px]:top-auto max-[600px]:w-full max-[600px]:max-w-full max-[600px]:translate-y-0 max-[600px]:px-5 max-[360px]:px-4">
          {/* eyebrow */}
          <div
            className={`mb-[0.45rem] flex items-center gap-[0.55rem] transition-[opacity,transform] duration-[550ms] ease-[ease] delay-[450ms] motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!transition-none max-[600px]:mb-[0.3rem] ${
              vis ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0"
            }`}
          >
            <span className="h-0.5 w-7 flex-shrink-0 rounded-[1px] bg-[#C8102E]" />
            <span className="font-[var(--font-display)] text-[0.82rem] font-bold tracking-[0.04em] text-[rgba(255,255,255,0.85)] max-[600px]:text-[0.75rem]">
              Provider with Skilled
            </span>
          </div>

          {/* headline */}
          <h1
            className={`mb-[1.2rem] font-[var(--font-display)] text-[clamp(2.6rem,4.8vw,4.4rem)] font-black uppercase leading-[0.96] tracking-[-0.02em] text-white transition-[opacity,transform] duration-[650ms] ease-[ease] delay-[600ms] motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!transition-none min-[601px]:max-[900px]:mb-4 min-[601px]:max-[900px]:text-[clamp(2.4rem,5.5vw,3.6rem)] max-[600px]:mb-3 max-[600px]:text-[clamp(2.2rem,9.5vw,2.8rem)] max-[600px]:leading-none max-[360px]:text-[2rem] ${
              vis ? "translate-y-0 opacity-100" : "translate-y-[18px] opacity-0"
            }`}
          >
            Industry <em className="relative not-italic text-[#C8102E]">ready</em><br />Talent
          </h1>

          {/* body */}
          <p
            className={`mb-8 max-w-[400px] text-[0.92rem] leading-[1.78] text-[rgba(255,255,255,0.65)] transition-[opacity,transform] duration-[550ms] ease-[ease] delay-[780ms] motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!transition-none min-[601px]:max-[900px]:max-w-full min-[601px]:max-[900px]:text-[0.88rem] min-[601px]:max-[900px]:leading-[1.7] max-[600px]:mb-5 max-[600px]:max-w-full max-[600px]:text-[0.84rem] max-[600px]:leading-[1.68] max-[600px]:text-[rgba(255,255,255,0.72)] ${
              vis ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0"
            }`}
          >
            SIS Global Workforce Solutions empowers
            businesses across the GCC, Europe, and
            other international markets with
            compliant, trained, and deployment-ready
            workforce solutions from India, Nepal, and
            Sri Lanka.
          </p>

          {/* CTAs – buttons now have curved edges (rounded-lg) */}
          <div
            className={`flex flex-wrap gap-[0.65rem] transition-[opacity,transform] duration-[550ms] ease-[ease] delay-[950ms] motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!transition-none min-[601px]:max-[900px]:gap-[0.55rem] max-[600px]:flex-col max-[600px]:gap-2 max-[600px]:pb-[max(1.5rem,env(safe-area-inset-bottom))] ${
              vis ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0"
            }`}
          >
            <Link
              href="/employers"
              className="group relative inline-flex items-center gap-[0.45rem] overflow-hidden whitespace-nowrap border border-[#C8102E] bg-[#C8102E] px-6 py-[0.8rem] font-[var(--font-display)] text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-white no-underline transition-[background,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#a80d26] hover:shadow-[0_8px_24px_rgba(200,16,46,0.45)] rounded-lg max-[600px]:justify-center max-[600px]:px-[1.2rem] max-[600px]:py-[0.9rem] max-[600px]:text-[0.72rem]"
            >
              Partner with Us
              <ArrowRight
                size={13}
                className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-[0.4rem] whitespace-nowrap border border-[rgba(255,255,255,0.22)] bg-[rgba(0,0,0,0.45)] px-[1.3rem] py-[0.8rem] font-[var(--font-display)] text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.88)] no-underline backdrop-blur-[6px] transition-[background,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.1)] rounded-lg max-[600px]:justify-center max-[600px]:px-[1.2rem] max-[600px]:py-[0.9rem] max-[600px]:text-[0.72rem]"
            >
              <span className="inline-flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.45)]">
                <Play size={7} fill="currentColor" />
              </span>
              Explore Jobs
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-[0.4rem] whitespace-nowrap border border-[rgba(255,255,255,0.22)] bg-[rgba(0,0,0,0.45)] px-[1.3rem] py-[0.8rem] font-[var(--font-display)] text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.88)] no-underline backdrop-blur-[6px] transition-[background,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.1)] rounded-lg max-[600px]:justify-center max-[600px]:px-[1.2rem] max-[600px]:py-[0.9rem] max-[600px]:text-[0.72rem]"
            >
              <span className="inline-flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.45)]">
                <Play size={7} fill="currentColor" />
              </span>
              Speak to Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}