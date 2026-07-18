"use client";

import { images } from "@/lib/images";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
import {
  ClipboardCheck, Languages, Globe2, FileCheck,
  HardHat, Brain, Briefcase, PlaneTakeoff,
  Rocket, Clock3, TrendingUp, Users, ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TRAINING_MODULES = [
  { icon: ClipboardCheck, label: "Trade testing"              },
  { icon: Languages,      label: "Language familiarisation"   },
  { icon: Globe2,         label: "Cultural awareness"         },
  { icon: FileCheck,      label: "Visa & compliance training" },
  { icon: HardHat,        label: "Safety orientation"         },
  { icon: Brain,          label: "Behavioural assessment"      },
  { icon: Briefcase,      label: "Workplace readiness"        },
  { icon: PlaneTakeoff,   label: "Pre-departure orientation"  },
];

const CLIENT_BENEFITS = [
  {
    icon: Rocket,
    title: "Deployment-Ready Workforce",
    desc:  "Candidates arrive fully prepared — zero ramp-up time needed on your end.",
  },
  {
    icon: Clock3,
    title: "Reduced Training Time",
    desc:  "Structured pre-deployment evaluation cuts on-site induction costs significantly.",
  },
  {
    icon: TrendingUp,
    title: "Higher Productivity from Day One",
    desc:  "Trained, assessed, and oriented workers hit the ground running from the first shift.",
  },
  {
    icon: Users,
    title: "Lower Attrition & Better Stability",
    desc:  "Readiness programs build commitment and reduce early-stage dropouts across all roles.",
  },
];




export default function WorkforceReadinessSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#FAFAFA 0%,#F3F3F3 100%)" }}
    >
      {/* Subtle red accent */}
      <div
        className="absolute left-0 top-0 w-1/3 h-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 0% 50%, rgba(200,16,46,0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* ── Header ───────────────────────────────────────────── */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-brand-red text-sm font-semibold tracking-widest uppercase mb-2">
            Pre-Deployment Training
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-brand-grey-900 leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            International Workforce{" "}
            <span className="text-brand-red">Readiness Program</span>
          </h2>
          <div className="section-divider mt-4" />
          <p className="text-brand-grey-500 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Every candidate placed through SIS Global
undergoes structured training and
readiness evaluation before international
deployment — so your operations never
miss a beat.
          </p>
        </div>

        {/* ── Hero Banner Image ─────────────────────────────────── */}
        <div
          className={`relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-14 shadow-lg transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <Image
            src={images.homepage.HERO_IMG}
            alt="Candidates undergoing structured pre-deployment training"
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-grey-900/65 via-brand-grey-900/20 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 sm:px-14">
            <div className="max-w-lg">
              <p
                className="text-white text-2xl sm:text-3xl font-bold leading-snug drop-shadow"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Trained before they arrive. Productive from day one.
              </p>
              <div className="w-10 h-0.5 bg-brand-red mt-4" />
            </div>
          </div>
        </div>

        {/* ── Two-column body ───────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Left — training modules ───────────────────────── */}
          <div
            className={`transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Small contextual image */}
            <div className="relative w-full h-44 rounded-xl overflow-hidden mb-6 shadow-sm">
              <Image
                src={images.homepage.MODULE_IMG}
                alt="Team briefing session before international deployment"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-grey-900/40 to-transparent" />
              <p className="absolute bottom-3 left-4 text-white text-lg font-semibold drop-shadow">
                Structured module-based training
              </p>
            </div>

            <p className="text-sm font-bold tracking-widest uppercase text-brand-grey-400 mb-5">
              Our training includes
            </p>

            <div className="grid grid-cols-2 gap-3">
              {TRAINING_MODULES.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className={`group flex items-center gap-3 bg-white rounded-xl px-4 py-4 border border-brand-grey-100 hover:border-brand-red/30 hover:shadow-sm transition-all duration-300 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${0.15 + i * 0.06}s` }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-brand-red"
                    style={{ background: "rgba(200,16,46,0.08)", color: "#C8102E" }}
                  >
                    <Icon size={16} />
                  </div>
                  <span className="text-brand-grey-700 text-sm font-semibold leading-snug">{label}</span>
                </div>
              ))}
            </div>

            {/* Step indicator */}
            <div
              className="mt-8 flex items-center gap-3 px-5 py-4 rounded-2xl"
              style={{ background: "rgba(200,16,46,0.06)", border: "1px solid rgba(200,16,46,0.12)" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-base"
                style={{ background: "linear-gradient(135deg,#C8102E,#A00D25)", fontFamily: "var(--font-display)" }}
              >
                8
              </div>
              <div>
                <p className="text-brand-grey-900 text-base font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  Training modules completed
                </p>
                <p className="text-brand-grey-500 text-sm mt-0.5">before every international deployment</p>
              </div>
            </div>
          </div>

          {/* ── Right — client benefit cards ─────────────────── */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {/* Small contextual image */}
            <div className="relative w-full h-44 rounded-xl overflow-hidden mb-6 shadow-sm">
              <Image
                src={images.homepage.DEPLOY_IMG}
                alt="Skilled worker confidently on the job after SIS readiness training"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-grey-900/40 to-transparent" />
              <p className="absolute bottom-3 left-4 text-white text-lg font-semibold drop-shadow">
                Productive from the first day on-site
              </p>
            </div>

            <p className="text-sm font-bold tracking-widest uppercase text-brand-grey-400 mb-5">
              This ensures our clients receive
            </p>

            <div className="flex flex-col gap-4">
              {CLIENT_BENEFITS.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className={`relative group flex items-start gap-4 bg-white rounded-2xl p-5 border border-brand-grey-100 hover:border-brand-red/30 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${0.2 + i * 0.08}s` }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors group-hover:bg-brand-red"
                    style={{ background: "rgba(200,16,46,0.08)", color: "#C8102E" }}
                  >
                    <Icon size={19} />
                  </div>
                  <div>
                    <h4
                      className="font-bold text-brand-grey-900 text-base mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {title}
                    </h4>
                    <p className="text-brand-grey-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                  {/* left accent bar */}
                  <div
                    className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-brand-red scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
        {/* ── CTA Button — centered below both columns ── */}
        <div className="mt-10 flex justify-center">
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Hire a Trained Workforce <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}