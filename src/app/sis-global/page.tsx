// src/app/about/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight, CheckCircle, Target, Cpu, BarChart3,
  Users, Globe, Shield, Heart, Lightbulb, MessageSquare, Eye, Rocket,
  Handshake,
  Award,
} from "lucide-react";
import { images } from "@/lib/images";

const STATS = [
  { value: 15982,  suffix: " cr", label: "REVENUE"   },
  { value: 22329,  suffix: "",    label: "CUSTOMERS"  },
  { value: 357028, suffix: "",    label: "EMPLOYEES"  },
  { value: 446,    suffix: "",    label: "OFFICES"    },
  { value: 78154,  suffix: "",    label: "SITES"      },
  { value: 790,    suffix: "",    label: "DISTRICTS"  },
];

const FEATURES = [
  { icon: <Target size={20} />,    title: "Smart Matching",     desc: "AI-powered job recommendations tailored to your skills and experience." },
  { icon: <Shield size={20} />,    title: "Verified Employers", desc: "Every company is thoroughly vetted before listing jobs on our platform." },
  { icon: <BarChart3 size={20} />, title: "Salary Insights",    desc: "Real-time salary benchmarking data to help candidates negotiate better." },
  { icon: <Cpu size={20} />,       title: "Technology-driven",  desc: "Our proprietary platform connects verified workforce talent with employer requirements at scale." },
];

const MISSION_POINTS = [
  "To provide skilled, industry-ready workforce solutions globally.",
  "To uplift workers and their families through international career opportunities.",
  "To maintain ethical and compliant recruitment practices",
  "To build long-term workforce partnerships with global employers",
];

const VALUES = [
  { icon: <Handshake size={22} />,         title: "Trust",               desc: "We build lasting relationships through integrity, transparency, and accountability in every interaction. Our clients, candidates, and partners can rely on us to deliver on our commitments with consistency and professionalism." },
  { icon: <Award size={22} />,     title: "Outstanding Service",     desc: "We go beyond expectations by delivering responsive, high-quality workforce solutions tailored to our clients' evolving needs. Our commitment to excellence ensures exceptional service at every stage of the talent journey." },
  { icon: <Users size={22} />, title: "People Centric",            desc: "People are at the heart of everything we do, and we are committed to helping individuals build meaningful global careers. By investing in our people and fostering a culture of respect, growth, and inclusion, we create lasting value for clients, candidates, and communities alike." },
  
];



function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return count;
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 2200, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="text-4xl font-bold mb-1 tabular-nums" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
        {count.toLocaleString("en-IN") + suffix}
      </div>
      <div className="text-white/90 text-sm font-semibold">{label}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#FFF5F6 0%,#FFF0F2 50%,#F5F5F5 100%)" }}>
          <div className="absolute right-0 top-0 w-1/2 h-full hidden md:block">
            <Image src={images.sisglobal.IMG_HERO} alt="SIS Global diverse workforce team" fill className="object-cover object-center" priority />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #FFF5F6 0%, transparent 40%)" }} />
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none overflow-hidden">
            <div className="absolute right-0 top-0 w-full h-full" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 40%, rgba(200,16,46,0.06) 0%, transparent 70%)" }} />
          </div>
          <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
            <div className="flex items-center gap-2 text-xs text-brand-grey-500 mb-8">
              <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
              <span>/</span>
              <span className="text-brand-grey-800 font-medium">About Us</span>
            </div>
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold text-brand-grey-900 leading-[1.06] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                About <span className="text-brand-red">SIS Group</span>
              </h1>
              <p className="text-brand-grey-500 text-lg leading-relaxed mb-8 max-w-xl">
                SIS Group is one of Asia-Pacific’s leading security and
workforce management organisations.
              </p>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section style={{ background: "linear-gradient(90deg,#C8102E 0%,#A00D25 50%,#8B0B1F 100%)" }}>
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center text-white">
              {STATS.map((s, i) => (
                <div key={s.label} className="relative">
                  {i < STATS.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/20" />
                  )}
                  <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO WE ARE ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-brand-red mb-4 px-3 py-1.5 rounded-full" style={{ background: "rgba(200,16,46,0.08)" }}>
                  Who We Are
                </span>
                <h2 className="text-4xl font-bold text-brand-grey-900 leading-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
                  About SIS Global Workforce Solutions
                </h2>
                <div className="section-divider section-divider-left mb-6" />
                <p className="text-brand-grey-500 leading-relaxed mb-4">
                  SIS Global Workforce Solutions is the international
workforce deployment arm of the Group, focused on
solving global workforce shortages with compliant,
scalable, and industry-ready talent.

                </p>
                <div className="space-y-3">
                  {["Overseas workforce deployment", "Skilled manpower sourcing", "Workforce lifecycle management", "Compliance support", "Payroll outsourcing", "Workforce scalability solutions"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-brand-red flex-shrink-0" />
                      <span className="text-sm font-medium text-brand-grey-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-lg mb-4">
                  <Image src={images.sisglobal.IMG_WHO_WE_ARE} alt="SIS Global workforce solutions team meeting" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-grey-900/30 to-transparent" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {FEATURES.map((f, i) => (
                    <div key={f.title} className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ background: i % 2 === 0 ? "#FFF5F6" : "#FAFAFA", borderColor: i % 2 === 0 ? "rgba(200,16,46,0.15)" : "#E5E5E5" }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: i % 2 === 0 ? "rgba(200,16,46,0.1)" : "#F0F0F0", color: "#C8102E" }}>
                        {f.icon}
                      </div>
                      <h3 className="font-bold text-brand-grey-900 text-base mb-2" style={{ fontFamily: "var(--font-display)" }}>{f.title}</h3>
                      <p className="text-sm text-brand-grey-500 leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VISION & MISSION ── */}
        <section className="py-20 relative" style={{ background: "linear-gradient(135deg,#171717 0%,#262626 100%)" }}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-white/5" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border border-brand-red/10" />
          </div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="rounded-3xl overflow-hidden relative" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="relative w-full h-48">
                  <Image src={images.sisglobal.IMG_VISION} alt="Vision" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(23,23,23,0.3) 0%, rgba(23,23,23,0.85) 100%)" }} />
                  <div className="absolute top-5 left-5 w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(200,16,46,0.80)", color: "#fff" }}>
                    <Eye size={24} />
                  </div>
                  <span className="absolute bottom-4 left-6 text-xs font-bold tracking-[0.2em] uppercase text-brand-red/90">Our Vision</span>
                </div>
                <div className="p-10 relative z-10">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,16,46,0.18) 0%, transparent 70%)" }} />
                  <h2 className="text-3xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>Vision</h2>
                  <div className="w-10 h-0.5 bg-brand-red mb-6 rounded-full" />
                  <p className="text-white/65 text-base leading-relaxed">
                   To become the world’s most trusted global workforce
solutions company by creating sustainable employment
opportunities and enabling business growth through
ethical, technology-driven workforce deployment.

                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="rounded-3xl overflow-hidden relative" style={{ background: "rgba(200,16,46,0.08)", border: "1px solid rgba(200,16,46,0.20)" }}>
                <div className="relative w-full h-48">
                  <Image src={images.sisglobal.IMG_MISSION} alt="Mission" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(23,23,23,0.3) 0%, rgba(160,13,37,0.80) 100%)" }} />
                  <div className="absolute top-5 left-5 w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(200,16,46,0.90)", color: "#fff" }}>
                    <Rocket size={24} />
                  </div>
                  <span className="absolute bottom-4 left-6 text-xs font-bold tracking-[0.2em] uppercase text-white/80">Our Mission</span>
                </div>
                <div className="p-10 relative z-10">
                  <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />
                  <h2 className="text-3xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>Mission</h2>
                  <div className="w-10 h-0.5 bg-brand-red mb-6 rounded-full" />
                  <ul className="space-y-4">
                    {MISSION_POINTS.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(200,16,46,0.30)" }}>
                          <CheckCircle size={12} className="text-brand-red" />
                        </div>
                        <span className="text-white/70 text-sm leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="py-20" style={{ background: "linear-gradient(135deg,#F9F9F9 0%,#F2F2F2 100%)" }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-5xl font-bold text-brand-grey-900" style={{ fontFamily: "var(--font-display)" }}>Core Values</h2>
              <div className="section-divider mt-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {VALUES.map((v, i) => (
                <div key={v.title} className="group bg-white rounded-2xl p-8 text-center border border-brand-grey-200 hover:border-brand-red/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110" style={{ background: i % 2 === 0 ? "rgba(200,16,46,0.08)" : "#F0F0F0", color: "#C8102E" }}>
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-brand-grey-900 mb-3 text-lg" style={{ fontFamily: "var(--font-display)" }}>{v.title}</h3>
                  <p className="text-sm text-brand-grey-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="py-20 text-white text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg,#C8102E 0%,#A00D25 60%,#7A0A1C 100%)" }}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full border border-white/10" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full border border-white/10" />
            <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full border border-white/5" />
          </div>
          <div className="max-w-3xl mx-auto px-4 relative z-10">
            <Users size={36} className="mx-auto mb-4 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Ready to Work With Us?
            </h2>
            <p className="text-white/75 text-lg mb-10 leading-relaxed">
              Whether you are looking for your next opportunity or
building your next great team, SIS Global Workforce
Solutions is your trusted partner.
            </p>

            {/* ── Buttons — centered on mobile ── */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/jobs"
                className="btn-outline !text-white !border-white hover:!bg-white hover:!text-brand-red w-full sm:w-auto justify-center"
              >
                Browse Jobs <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="btn-outline !text-white !border-white/50 hover:!bg-white/20 w-full sm:w-auto justify-center"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}