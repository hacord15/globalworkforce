// src/app/not-found.tsx
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Home, Briefcase, Phone, Search } from "lucide-react";

export const metadata = {
  title: "404 — Page Not Found | SIS Global Workforce Solutions",
};

const QUICK_LINKS = [
  { label: "Browse Jobs",       href: "/find-jobs",         icon: <Briefcase size={15} /> },
  { label: "For Employers",     href: "/employers",         icon: <Search size={15} /> },
  { label: "Partner with Us",   href: "/associate-partner", icon: <Search size={15} /> },
  { label: "Contact Us",        href: "/contact",           icon: <Phone size={15} /> },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        className="relative overflow-hidden flex items-center justify-center min-h-[80vh]"
        style={{ background: "linear-gradient(160deg,#171717 0%,#2D0A0F 60%,#1A0505 100%)" }}
      >
        {/* Decorative rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-white/5" />
          <div className="absolute top-20 -right-20 w-96 h-96 rounded-full border border-white/5" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full border border-brand-red/10" />
          <div className="absolute right-0 top-0 w-1/2 h-full"
            style={{ background: "radial-gradient(ellipse 60% 80% at 90% 30%, rgba(200,16,46,0.14) 0%, transparent 70%)" }}
          />
          <div className="absolute left-0 bottom-0 w-1/3 h-full"
            style={{ background: "radial-gradient(ellipse 50% 60% at 0% 80%, rgba(200,16,46,0.08) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 py-20 text-center">

          {/* Big 404 */}
          <div className="relative mb-6 select-none">
            <span
              className="block font-bold leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(120px,25vw,200px)",
                background: "linear-gradient(135deg, rgba(200,16,46,0.9) 0%, rgba(160,13,37,0.25) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              404
            </span>
            {/* Badge */}
            {/* <span
              className="absolute top-6 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{
                background: "rgba(200,16,46,0.2)",
                color: "#FF6B7A",
                border: "1px solid rgba(200,16,46,0.3)",
              }}
            >
              Page Not Found
            </span> */}
          </div>

          {/* Heading */}
          <h1
            className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Oops! You&apos;ve Taken a{" "}
            <span className="text-brand-red">Wrong Turn</span>
          </h1>

          <p className="text-white/55 text-base leading-relaxed mb-10 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            Let&apos;s get you back on track.
          </p>

          {/* Primary CTA */}
          <Link href="/" className="btn-primary inline-flex items-center gap-2 mb-10">
            <Home size={16} />
            Back to Home
            <ArrowRight size={15} />
          </Link>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            <span className="text-xs text-white/30 font-semibold uppercase tracking-widest">
              Or explore
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Quick links — pure CSS hover via group classes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col items-center gap-2 px-3 py-4 rounded-2xl text-xs font-semibold text-white/60 transition-all duration-200 hover:text-white hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span className="text-xl leading-none">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Sub-note */}
          <p className="text-white/25 text-xs mt-10">
            Error 404 &mdash; SIS Global Workforce Solutions
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}