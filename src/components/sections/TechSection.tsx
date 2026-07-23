"use client";

import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
import {
  Activity, CalendarCheck, Database, LayoutDashboard,
  MessageCircle, Zap, BarChart3, RefreshCcw,
  Briefcase, Clock, CreditCard, ShieldCheck, TrendingUp, HeartHandshake,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const PLATFORM_FEATURES = [
  { icon: Activity,          label: "Real-time workforce tracking"    },
  { icon: CalendarCheck,     label: "Attendance management"           },
  { icon: Database,          label: "Candidate database management"   },
  { icon: LayoutDashboard,   label: "Employer dashboard"              },
  { icon: MessageCircle,     label: "Grievance management"            },
  { icon: Zap,               label: "Hiring visibility"        },
  { icon: BarChart3,         label: "Workforce analytics"             },
  { icon: RefreshCcw,        label: "Employee lifecycle management"   },
];

const EMPLOYER_BENEFITS = [
  { icon: Briefcase,      label: "Recruitment"                },
  { icon: Clock,          label: "Attendance"                 },
  { icon: CreditCard,     label: "Payroll"                    },
  { icon: ShieldCheck,    label: "Compliance"                 },
  { icon: TrendingUp,     label: "Retention"                  },
  { icon: HeartHandshake, label: "Grievance management" },
];

export default function TechSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#171717 0%,#1E1E1E 60%,#262626 100%)" }}
    >
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-white/5" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full border border-brand-red/10" />
        <div
          className="absolute right-0 top-0 w-1/2 h-full"
          style={{ background: "radial-gradient(ellipse 60% 80% at 90% 30%, rgba(200,16,46,0.10) 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(200,16,46,0.18)", color: "#FF6B7A", border: "1px solid rgba(200,16,46,0.28)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            Proprietary Platform
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5 max-w-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Technology-Driven{" "}
            <span className="text-brand-red">Workforce Management</span>
          </h2>
          <p className="text-white/55 text-base leading-relaxed max-w-2xl">
            SIS Global has built its proprietary workforce management platform —{" "}
            <span className="text-white font-semibold">SIS Global Connect</span> — designed
            to simplify and scale up global workforce sourcing and management.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left — platform features */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <p className="text-lg font-bold tracking-widest uppercase text-white/40 mb-5">
              The platform enables:
            </p>

            <div className="grid grid-cols-2 gap-3">
              {PLATFORM_FEATURES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 group transition-all duration-200 hover:border-brand-red/40"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-brand-red"
                    style={{ background: "rgba(200,16,46,0.20)", color: "#FF6B7A" }}
                  >
                    <Icon size={15} />
                  </div>
                  <span className="text-white/70 text-lg font-medium leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Employer Benefits card */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div
              className="rounded-3xl p-8 relative overflow-hidden h-full"
              style={{
                background: "rgba(200,16,46,0.07)",
                border: "1px solid rgba(200,16,46,0.22)",
              }}
            >
              {/* Glow */}
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(200,16,46,0.22) 0%, transparent 70%)" }}
              />

              <div className="relative z-10">
                <p className="text-lg font-bold tracking-widest uppercase text-brand-red/70 mb-2">
                  Employer Benefits
                </p>
                <h3
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                 You focus on your business — 
                </h3>
                <p className="text-white/50 text-sm mb-7">we handle the rest:</p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {EMPLOYER_BENEFITS.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center  gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(200,16,46,0.25)", color: "#FF6B7A" }}
                      >
                        <Icon size={13} />
                      </div>
                      <span className="text-white/70 text-lg font-medium">{label}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/employers"
                  className="inline-flex uppercase items-center gap-2 text-sm font-bold text-brand-red hover:gap-3 transition-all"
                >
                  Learn how it works <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
