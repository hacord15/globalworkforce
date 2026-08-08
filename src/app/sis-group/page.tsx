"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import {
  ArrowRight,
  Shield,
  Users,
  Globe,
  TrendingUp,
  Building2,
  Award,
  ChevronRight,
  Star,
  CheckCircle,
  Phone,
  BriefcaseBusiness,
  Landmark,
  Cpu,
  GraduationCap,
} from "lucide-react";
import { images } from "@/lib/images";


// ── useCountUp hook (inline — no extra file needed) ───────────────────────

function useCountUp(target: number, duration = 1800, delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === 0) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);

        timeoutId = setTimeout(() => {
          let start: number | null = null;
          const tick = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(eased * target));
            if (progress < 1) raf.current = requestAnimationFrame(tick);
          };
          raf.current = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf.current);
      clearTimeout(timeoutId);
    };
  }, [target, duration, delay]);

  return { ref, count };
}

// ── Data ──────────────────────────────────────────────────────────────────

const GROUP_STATS = [
  {
    raw: "₹15,982 Cr",
    numeric: null,
    suffix: "",
    prefix: "₹",
    label: "Annual Revenue",
    sub: "FY 2023–24",
  },
  {
    raw: "357,022",
    numeric: 357022,
    suffix: "",
    prefix: "",
    label: "Employees",
    sub: "Across all verticals",
  },
  {
    raw: "78,154",
    numeric: 78154,
    suffix: "",
    prefix: "",
    label: "Sites",
    sub: "Founded in 1992",
  },
  {
    raw: "25",
    numeric: 25,
    suffix: "",
    prefix: "",
    label: "Training Academies",
    sub: "Diversified portfolio",
  },
  {
    raw: "446+",
    numeric: 446,
    suffix: "",
    prefix: "",
    label: "Offices",
    sub: "Pan-India presence",
  },
  {
    raw: "790",
    numeric: 790,
    suffix: "",
    prefix: "",
    label: "Districts",
    sub: "International operations",
  },
];

const PRESENCE_STATS = [
  {
    icon: <Shield size={22} />,
    numeric: 5000,
    suffix: "+",
    label: "Enterprise Clients",
    bg: "rgba(200,16,46,0.06)",
    border: "rgba(200,16,46,0.15)",
  },
  {
    icon: <Users size={22} />,
    numeric: 250000,
    suffix: "+",
    label: "Employees",
    bg: "#F5F5F5",
    border: "#E5E5E5",
  },
  {
    icon: <Globe size={22} />,
    numeric: 22,
    suffix: "+",
    label: "Indian States",
    bg: "#F5F5F5",
    border: "#E5E5E5",
  },
  {
    icon: <Building2 size={22} />,
    numeric: 10,
    suffix: "+",
    label: "Business Verticals",
    bg: "rgba(200,16,46,0.06)",
    border: "rgba(200,16,46,0.15)",
  },
  {
    icon: <Award size={22} />,
    numeric: 31,
    suffix: "+",
    label: "Years of Excellence",
    bg: "rgba(200,16,46,0.06)",
    border: "rgba(200,16,46,0.15)",
  },
  {
    icon: <Star size={22} />,
    numeric: null,
    suffix: "NSE·BSE",
    label: "Listed Entity",
    bg: "#F5F5F5",
    border: "#E5E5E5",
  },
];

const BUSINESSES = [
  {
    id: "security",
    icon: <Shield size={30} />,
    color: "#C8102E",
    title: "SIS Security",
    category: "Security Solutions",
    desc: "India's largest security solutions company providing manned guarding, electronic security, and integrated security solutions to 5,000+ clients.",
    highlights: [
      "Manned Guarding",
      "CCTV & Surveillance",
      "Access Control",
      "Crisis Management",
    ],
    href: "https://www.sisindia.com",
  },
  {
    id: "workforce",
    icon: <Users size={30} />,
    color: "#C8102E",
    title: "SIS Global Workforce",
    category: "Workforce Solutions",
    desc: "Technology-enabled workforce outsourcing that connects skilled, verified talent with trusted employers across industries and geographies.",
    highlights: [
      "Permanent Staffing",
      "Contract Staffing",
      "Payroll Management",
      "HR Consulting",
    ],
    href: "/",
    isActive: true,
  },
  {
    id: "cash",
    icon: <Landmark size={30} />,
    color: "#C8102E",
    title: "SIS Cash Services",
    category: "Cash Management",
    desc: "End-to-end cash management services including ATM management, cash-in-transit, cash processing, and vault management for banks and enterprises.",
    highlights: [
      "ATM Management",
      "Cash-in-Transit",
      "Cash Processing",
      "Vault Services",
    ],
    href: "#",
  },
  {
    id: "facility",
    icon: <Building2 size={30} />,
    color: "#C8102E",
    title: "Terminix SIS",
    category: "Facility Management",
    desc: "Comprehensive facility management and pest control services for residential complexes, commercial spaces, and large industrial facilities.",
    highlights: [
      "Pest Control",
      "Housekeeping",
      "Soft Services",
      "Technical Services",
    ],
    href: "#",
  },
  {
    id: "tech",
    icon: <Cpu size={30} />,
    color: "#C8102E",
    title: "SIS Tech",
    category: "Technology Services",
    desc: "Cutting-edge technology solutions including AI-powered surveillance, smart access management, and digital transformation for enterprise clients.",
    highlights: [
      "AI Surveillance",
      "Smart Access",
      "Digital Platform",
      "IoT Integration",
    ],
    href: "#",
  },
  {
    id: "training",
    icon: <GraduationCap size={30} />,
    color: "#C8102E",
    title: "SIS Academy",
    category: "Training & Development",
    desc: "Skill development and workforce training programme empowering thousands of individuals with industry-certified qualifications annually.",
    highlights: [
      "Skill Development",
      "Certification Programme",
      "Leadership Training",
      "Compliance Training",
    ],
    href: "#",
  },
];

const LEADERSHIP = [
  {
    name: "Ravindra Kishore Sinha",
    role: "Founder & Chairman",
    avatar: "RKS",
    color: "#C8102E",
    quote:
      "Our vision is to be the most trusted integrated services company in Asia.",
  },
  {
    name: "Rituraj Kishore Sinha",
    role: "Group CEO & Managing Director",
    avatar: "RJS",
    color: "#C8102E",
    quote: "Technology and talent together define the future of services.",
  },
  {
    name: "Uday Singh",
    role: "Group CFO",
    avatar: "US",
    color: "#C8102E",
    quote: "Financial discipline enables us to invest in people and growth.",
  },
  {
    name: "A. Venkataraman",
    role: "President Security Division",
    avatar: "AV",
    color: "#C8102E",
    quote: "Safety is not a product, it is a culture we build together.",
  },
];

const AWARDS = [
  { year: "2024", title: "India's Best Employer", org: "Economic Times" },
  {
    year: "2023",
    title: "Top Staffing Company",
    org: "NASSCOM Workforce Report",
  },
  {
    year: "2023",
    title: "Best Security Services Brand",
    org: "Asia Business Awards",
  },
  {
    year: "2022",
    title: "Great Place to Work Certified",
    org: "Great Place to Work® India",
  },
  { year: "2022", title: "Forbes India Top 100", org: "Forbes India" },
  {
    year: "2021",
    title: "CII Award for Business Excellence",
    org: "Confederation of Indian Industry",
  },
];

const PRESENCE_REGIONS = [
  {
    region: "North India",
    states: ["Delhi NCR", "Haryana", "Punjab", "UP", "Rajasthan"],
    color: "#C8102E",
  },
  {
    region: "West India",
    states: ["Maharashtra", "Gujarat", "Goa", "MP"],
    color: "#A00D25",
  },
  {
    region: "South India",
    states: ["Karnataka", "Tamil Nadu", "Kerala", "Andhra", "Telangana"],
    color: "#C8102E",
  },
  {
    region: "East India",
    states: ["West Bengal", "Odisha", "Bihar", "Jharkhand"],
    color: "#7A0A1C",
  },
  {
    region: "International",
    states: ["Singapore", "UAE", "Australia", "UK", "USA"],
    color: "#404040",
  },
];

// ── Small counter display components ──────────────────────────────────────

// Hero stat card with count-up
function HeroStatCard({
  stat,
  delay,
}: {
  stat: (typeof GROUP_STATS)[0];
  delay: number;
}) {
  const { ref, count } = useCountUp(stat.numeric ?? 0, 2000, delay);

  const display =
    stat.numeric === null
      ? stat.raw
      : `${stat.prefix}${count.toLocaleString("en-IN")}${stat.suffix}`;

  return (
    <div
      ref={ref}
      className="bg-brand-grey-50 rounded-2xl p-5 text-center border border-brand-grey-100 hover:border-brand-red/20 transition-colors"
    >
      <p
        className="text-2xl font-bold text-brand-grey-900 tabular-nums"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {display}
      </p>
      <p className="text-brand-grey-500 text-xs mt-0.5">{stat.label}</p>
    </div>
  );
}

// Presence section stat card with count-up
function PresenceStatCard({
  item,
  delay,
}: {
  item: (typeof PRESENCE_STATS)[0];
  delay: number;
}) {
  const { ref, count } = useCountUp(item.numeric ?? 0, 1800, delay);

  const display =
    item.numeric === null
      ? item.suffix // "NSE·BSE"
      : `${count.toLocaleString("en-IN")}${item.suffix}`;

  return (
    <div
      ref={ref}
      className="rounded-2xl p-5 text-center hover:-translate-y-1 transition-transform duration-300"
      style={{ background: item.bg, border: `1px solid ${item.border}` }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 text-brand-red"
        style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        {item.icon}
      </div>
      <div
        className="text-2xl font-bold text-brand-grey-900 mb-1 tabular-nums"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {display}
      </div>
      <div className="text-xs text-brand-grey-500 font-medium">
        {item.label}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function SISIndiaGroupPage() {
  const [openToggles, setOpenToggles] = useState<Record<string, boolean>>({});

  return (
    <>
      <Navbar />
      <main>

       <section className="relative overflow-hidden h-[4cm]">
  {/* Background Image */}
  <Image
    src={images.sisgroup.banner}
    alt="SIS Group diverse workforce team"
    fill
    priority
    className="object-cover object-center"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/45" />

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto h-full px-4 flex flex-col justify-center">
    <div className="flex items-center gap-2 text-xs text-white/80">
      <Link href="/" className="hover:text-white transition-colors">
        Home
      </Link>
      <span>/</span>
      <span className="text-white font-medium">About SIS Group Enterprises</span>
    </div>

    {/* Add your heading/content here */}
    {/* <h1 className="text-4xl font-bold text-white mt-4">SIS Group</h1> */}
  </div>
</section>
        {/* ══════════ HERO ══════════ */}
        <section className="relative overflow-hidden bg-white">
          {/* ── Decorations ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-brand-grey-100/60" />
            <div className="absolute top-20 -right-20 w-[400px] h-[400px] rounded-full border border-brand-grey-100/60" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border border-brand-grey-100/60" />
            <div
              className="absolute top-0 right-0 w-1/2 h-full"
              style={{
                background:
                  "radial-gradient(ellipse 70% 80% at 90% 30%, rgba(200,16,46,0.06) 0%, transparent 70%)",
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
            {/* ── Breadcrumb (commented out) ── */}
            {/* <div className="flex items-center gap-1.5 text-xs text-black/40 mb-10">
              <Link href="/" className="hover:text-black transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <span className="text-black/70">SIS Group</span>
            </div> */}

            {/* ── Main Row: Left = Text+CTA | Right = Rankings+Stats ── */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* ── LEFT COLUMN ── Text + CTA */}
              <div>
                <h1
                  className="text-5xl md:text-6xl font-bold leading-[1.04] mb-6 text-brand-grey-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  SIS <span className="text-brand-red">Group</span>
                </h1>

                <p className="text-brand-grey-600 text-lg leading-relaxed mb-4">
                  SIS Group Enterprises commenced operations as a two-member company in 1974
                  and has since transformed into one of the market leaders in the Asia Pacific
                  region, in Security, Facility Management and Cash Logistics segments, all of
                  which are essential to the functioning of a healthy economy.
                </p>
                <p className="text-brand-grey-500 text-base leading-relaxed mb-8">
                  SIS Limited is a <strong className="text-brand-grey-800">US$ 1.5 billion</strong> Indian
                  multinational business solutions company with market-leading positions in
                  Security Solutions, Facility Management and Cash Logistics. With operations
                  across India, Australia, New Zealand, and Singapore, SIS delivers integrated
                  solutions powered by technology, analytics, and highly trained personnel.
                </p>
                <p className="text-brand-grey-500 text-base leading-relaxed mb-4">
                  With over five decades of operational experience, SIS has built a strong
                  foundation of trained manpower, disciplined processes and technology-enabled
                  delivery systems. The company operates across diverse industries including
                  infrastructure, manufacturing, healthcare, logistics and government.
                </p>
                <p className="text-brand-grey-500 text-base leading-relaxed mb-8">
                  At SIS, people remain central to service delivery. Technology is deployed to
                  enhance visibility, coordination and response, enabling consistent and
                  reliable outcomes across large and complex operations.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="/" className="btn-primary">
                    Explore Workforce Solutions <ArrowRight size={15} />
                  </Link>
                  <a
                    href="https://www.sisindia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 border border-brand-grey-300 text-brand-grey-600 text-sm font-semibold rounded hover:border-brand-red/50 hover:text-brand-grey-900 transition-colors"
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Visit SIS India.com ↗
                  </a>
                </div>
              </div>

              {/* ── RIGHT COLUMN ── Rankings + Stats (directly below) */}
              <div>
                <h2
                  className="text-3xl font-bold text-brand-grey-900 mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  SIS – <span className="text-brand-red">A Billion Dollar Indian MNC</span>
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-baseline gap-3 text-brand-grey-700 text-sm">
                    <span className="text-brand-red font-bold text-base min-w-[40px]">#1</span>
                    <span>In Security Solutions in India</span>
                  </li>
                  <li className="flex items-baseline gap-3 text-brand-grey-700 text-sm">
                    <span className="text-brand-red font-bold text-base min-w-[40px]">#1</span>
                    <span>In Security Solutions in Australia</span>
                  </li>
                  <li className="flex items-baseline gap-3 text-brand-grey-700 text-sm">
                    <span className="text-brand-red font-bold text-base min-w-[40px]">#3</span>
                    <span>Among the top 3 Security Solutions provider in New Zealand</span>
                  </li>
                  <li className="flex items-baseline gap-3 text-brand-grey-700 text-sm">
                    <span className="text-brand-red font-bold text-base min-w-[40px]">Top 5</span>
                    <span>Among the top 5 Security Solutions providers in Singapore</span>
                  </li>
                  <li className="flex items-baseline gap-3 text-brand-grey-700 text-sm">
                    <span className="text-brand-red font-bold text-base min-w-[40px]">#1</span>
                    <span>In Facility Management Solutions in India</span>
                  </li>
                  <li className="flex items-baseline gap-3 text-brand-grey-700 text-sm">
                    <span className="text-brand-red font-bold text-base min-w-[40px]">#2</span>
                    <span>In Cash Logistics Solutions in India</span>
                  </li>
                </ul>

                {/* ── Stats cards ── directly under the rankings */}
                {/* ── Stats cards ── directly under the rankings */}
                <div className="mt-10 pt-8 border-t border-brand-grey-200">
                  <div className="grid grid-cols-2 gap-4">
                    {GROUP_STATS.map((stat, i) => (
                      <HeroStatCard key={stat.label} stat={stat} delay={i * 100} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Bottom stats row ── REMOVED as per request ── */}
          </div>
        </section>

        {/* ══════════ RED ACCENT STRIP ══════════ */}
        <div
          style={{
            background:
              "linear-gradient(90deg,#C8102E 0%,#A00D25 50%,#7A0A1C 100%)",
            padding: "16px 0",
          }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <TrendingUp size={18} className="text-white/70 flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  Listed on the<strong className="text-white"> NSE and BSE </strong>
                  one of India&apos;smost trusted integrated services
                  conglomerates.

                </span>
              </div>
              <a
                href="https://www.sisindia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xs font-bold tracking-widest uppercase hover:underline flex items-center gap-1.5"
              >
                Investor Relations ↗
              </a>
            </div>
          </div>
        </div>

        {/* companies png here */}

        {/* market-leader2.png */}

        <section className="py-16 bg-white">
          <div className="text-center mb-10">     {/* 👈 also reduced margin below title for tighter layout */}
            <h2
              className="text-3xl md:text-4xl font-bold text-brand-grey-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SIS Group <span className="text-brand-red">At A Glance</span>
            </h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="max-w-7xl mx-auto px-4 space-y-10">
            <img
              src={images.sisgroup.companies}
              alt="SIS Group Companies"
              className="w-full h-auto object-contain"
            />

            <img
              src={images.sisgroup.market}
              alt="SIS Group Market Leader"
              className="w-full max-w-4xl mx-auto h-auto object-contain rounded-xl"
            />
          </div>
        </section>

        {/* ══════════ BUSINESS VERTICALS ══════════ */}
        {/* <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span
                className="inline-block text-sm font-bold tracking-[0.2em] uppercase text-brand-red mb-3 px-4 py-2 rounded-full"
                style={{ background: "rgba(200,16,46,0.08)" }}
              >
                Business Portfolio
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-brand-grey-900"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our Business Verticals
              </h2>
              <p className="text-brand-grey-500 mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                A diversified portfolio of world-class
                service businesses, united by a
                commitment to excellence.
              </p>
              <div className="section-divider mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BUSINESSES.map((biz) => (
                <div
                  key={biz.id}
                  className={`relative group rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${biz.isActive ? "border-brand-red/30 shadow-md" : "border-brand-grey-200"}`}
                >
                  {biz.isActive && (
                    <div
                      className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full z-10"
                      style={{ background: "#C8102E", color: "white" }}
                    >
                      ★ YOU ARE HERE
                    </div>
                  )}
                  <div
                    className="h-1.5 w-full"
                    style={{
                      background: biz.isActive
                        ? "#C8102E"
                        : "linear-gradient(90deg,#E5E5E5,#D0D0D0)",
                    }}
                  />
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: biz.isActive
                            ? "rgba(200,16,46,0.08)"
                            : "#F5F5F5",
                          color: biz.color,
                        }}
                      >
                        {biz.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold tracking-widest uppercase text-brand-grey-400">
                          {biz.category}
                        </p>
                        <h3
                          className="font-bold text-brand-grey-900 text-xl leading-tight"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {biz.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-brand-grey-500 text-base leading-relaxed mb-6">
                      {biz.desc}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {biz.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2">
                          <CheckCircle
                            size={14}
                            className="text-brand-red flex-shrink-0"
                          />
                          <span className="text-sm text-brand-grey-600">
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={biz.href}
                      target={biz.href.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm font-bold transition-colors ${biz.isActive ? "text-brand-red" : "text-brand-grey-500 hover:text-brand-red"}`}
                    >
                      {biz.isActive
                        ? "Explore Workforce Solutions"
                        : "Learn More"}
                      <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        {/* ══════════ LEGACY TIMELINE ══════════ */}
        {/* <section
          className="py-20"
          style={{
            background: "linear-gradient(160deg,#171717 0%,#262626 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span
                className="inline-block text-sm font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-3"
                style={{
                  background: "rgba(200,16,46,0.2)",
                  color: "#FF6B7A",
                  border: "1px solid rgba(200,16,46,0.25)",
                }}
              >
                Our Legacy
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Three Decades of Trust
              </h2>
              <p className="text-white/40 mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                From a single-office security firm to India&apos;s largest
                integrated services group
              </p>
            </div>

            <div className="relative">
              <div
                className="absolute top-5 left-0 right-0 h-px hidden md:block"
                style={{ background: "rgba(200,16,46,0.3)" }}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 text-center">
                {[
                  { year: "1992", event: "Founded in Patna, Bihar" },
                  { year: "1997", event: "Expanded to 5 states" },
                  { year: "2003", event: "Launched Cash Services" },
                  { year: "2008", event: "Pan-India operations" },
                  { year: "2014", event: "International expansion" },
                  { year: "2017", event: "Listed on NSE & BSE" },
                  { year: "2021", event: "₹10,000 Cr revenue milestone" },
                  { year: "2024", event: "2,50,000+ employees" },
                ].map((item, i) => (
                  <div
                    key={item.year}
                    className="relative flex flex-col items-center"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-3 z-10 flex-shrink-0"
                      style={{
                        background:
                          i % 2 === 0
                            ? "linear-gradient(135deg,#C8102E,#A00D25)"
                            : "rgba(255,255,255,0.08)",
                        border:
                          i % 2 !== 0
                            ? "1px solid rgba(255,255,255,0.12)"
                            : "none",
                        fontFamily: "var(--font-display)",
                        fontSize: 13,
                      }}
                    >
                      {item.year.slice(-2)}
                    </div>
                    <p
                      className="text-sm font-bold mb-1.5"
                      style={{
                        fontFamily: "var(--font-display)",
                        color:
                          i % 2 === 0 ? "#C8102E" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {item.year}
                    </p>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {item.event}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* ══════════ LEADERSHIP ══════════ */}
        {/* <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span
                className="inline-block text-sm font-bold tracking-[0.2em] uppercase text-brand-red mb-4 px-4 py-2 rounded-full"
                style={{ background: "rgba(200,16,46,0.08)" }}
              >
                Leadership
              </span>
              <h2
                className="text-5xl md:text-6xl font-bold text-brand-grey-900"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Group Leadership Team
              </h2>
              <p className="text-brand-grey-500 mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                Visionary leaders with decades of experience in services,
                technology, and business transformation
              </p>
              <div className="section-divider mt-6" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {LEADERSHIP.map((person) => (
                <div
                  key={person.name}
                  className="group bg-white border border-brand-grey-200 rounded-2xl p-8 text-center hover:border-brand-red/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative inline-block mb-6">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto"
                      style={{
                        background: `linear-gradient(135deg,${person.color} 0%,${person.color}BB 100%)`,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {person.avatar}
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-brand-red scale-0 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3
                    className="font-bold text-brand-grey-900 mb-1.5 leading-tight text-lg"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {person.name}
                  </h3>
                  <p className="text-brand-red text-sm font-semibold tracking-wide mb-5">
                    {person.role}
                  </p>
                  <blockquote className="text-sm text-brand-grey-400 leading-relaxed italic border-l-2 border-brand-red/30 pl-4 text-left">
                    &ldquo;{person.quote}&rdquo;
                  </blockquote>
                  <div className="flex justify-center gap-3 mt-5">
                    {["in", "tw"].map((s) => (
                      <a
                        key={s}
                        href="#"
                        className="w-8 h-8 rounded-lg bg-brand-grey-100 flex items-center justify-center text-sm font-bold text-brand-grey-600 hover:bg-brand-red hover:text-white transition-all"
                      >
                        {s}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* /// The presence section is currently commented out as we are still finalizing the content and design. It will be added back in the next update. */}
        <div>
          {/* ══════════ PRESENCE ══════════ */}
          {/* <section className="py-20" style={{ background: "linear-gradient(135deg,#F9F9F9 0%,#F2F2F2 100%)" }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-brand-red mb-4 px-3 py-1.5 rounded-full" style={{ background: "rgba(200,16,46,0.08)" }}>
                  Our Presence
                </span>
                <h2 className="text-4xl font-bold text-brand-grey-900 leading-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
                  Pan-India & Global Footprint
                </h2>
                <div className="section-divider section-divider-left mb-6" />
                <p className="text-brand-grey-500 leading-relaxed mb-4">
                  With operations spanning every major state in India and a growing international presence, SIS India Group is uniquely positioned to serve businesses at any scale.
                </p>
                <p className="text-brand-grey-500 leading-relaxed mb-8">
                  Our distributed network of regional offices, training centres, and operations hubs ensures rapid deployment and consistent service quality across all geographies.
                </p>
                <div className="space-y-3">
                  {PRESENCE_REGIONS.map((r) => (
                    <div key={r.region} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-brand-grey-200 hover:border-brand-red/30 transition-colors">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: r.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-brand-grey-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>{r.region}</p>
                        <p className="text-xs text-brand-grey-500">{r.states.join(" · ")}</p>
                      </div>
                      <span className="text-xs font-bold text-brand-red flex-shrink-0">{r.states.length} regions</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Presence stat cards with count-up ── */}
          {/* <div className="grid grid-cols-2 gap-4">
                {PRESENCE_STATS.map((item, i) => (
                  <PresenceStatCard key={item.label} item={item} delay={i * 100} />
                ))}
              </div>
            </div>
          </div>
        </section> */}
        </div>

        {/* ══════════ AWARDS ══════════ */}
        {/* <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span
                className="inline-block text-sm font-bold tracking-[0.2em] uppercase text-brand-red mb-4 px-4 py-2 rounded-full"
                style={{ background: "rgba(200,16,46,0.08)" }}
              >
                Recognition
              </span>
              <h2
                className="text-5xl md:text-6xl font-bold text-brand-grey-900"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Awards & Accolades
              </h2>
              <div className="section-divider mt-6" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {AWARDS.map((a) => (
                <div
                  key={a.title}
                  className="group flex items-start gap-5 p-6 bg-white border border-brand-grey-200 rounded-xl hover:border-brand-red/30 hover:shadow-md transition-all duration-300"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-red"
                    style={{ background: "rgba(200,16,46,0.08)" }}
                  >
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-brand-red font-bold tracking-widest uppercase mb-1.5">
                      {a.year}
                    </p>
                    <h3
                      className="font-bold text-brand-grey-900 text-base leading-tight mb-1.5"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {a.title}
                    </h3>
                    <p className="text-sm text-brand-grey-400">{a.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}


        {/*** Global Footprints Section ***/}
        {/*** Global Footprints Section ***/}
        {/* ══════════ GLOBAL FOOTPRINTS ══════════ */}
        <section className="pt-8 pb-20 bg-white">   {/* 👈 reduced top padding */}
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-10">     {/* 👈 also reduced margin below title for tighter layout */}
              <h2
                className="text-3xl md:text-4xl font-bold text-brand-grey-900"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our <span className="text-brand-red">Global Footprints</span>
              </h2>
              <div className="section-divider mt-6" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start mt-8">
              {/* Map Column */}
              <div>
                <div className="relative rounded-2xl overflow-hidden border border-brand-grey-200 shadow-sm bg-white p-4 flex justify-center">
                  <img
                    src={images.sisgroup.footprints}
                    alt="SIS Group Global Footprints Map"
                    className="w-3/4 h-auto mx-auto"
                  />
                </div>
                <p className="text-xs text-brand-grey-400 mt-3 text-right italic">
                  *Map not to scale
                </p>
              </div>

              {/* Toggles Column */}
              <div className="space-y-3">
                {[
                  {
                    label: "India",
                    content: [
                      { name: "SIS", url: "https://sisindia.com/" },
                      { name: "SISCO", url: "https://siscosecurity.com/" },
                      { name: "VProtect", url: "https://vprotectindia.com/" },
                      { name: "Tech SIS", url: "https://techsisindia.com/" },
                      { name: "SMC-India", url: "https://smc-india.com/" },
                      { name: "DTSS", url: "https://dtss.in/" },
                      { name: "RARE", url: "https://www.raregrp.com/" },
                      { name: "SIS Prosegur", url: "https://www.sisprosegur.com/" },
                      { name: "PestX", url: "https://sispestx.com/" },
                      { name: "AP Securitas", url: "https://sisindia.com/contact-us/" },
                    ],
                  },
                  {
                    label: "Australia",
                    content: [
                      { name: "MSS Security", url: "https://msssecurity.com.au/" },
                      {
                        name: "Southern Cross Protection",
                        url: "https://sxprotection.com.au/",
                      },
                    ],
                  },
                  {
                    label: "New Zealand",
                    content: [
                      { name: "P4G Security", url: "https://www.platform4.co.nz/" },
                    ],
                  },
                  {
                    label: "Singapore",
                    content: [
                      { name: "Henderson", url: "https://hendersonsecurity.com.sg/" },
                    ],
                  },
                ].map((country) => {
                  const isOpen = openToggles[country.label] || false;
                  return (
                    <div
                      key={country.label}
                      className="border border-brand-grey-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <button
                        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-brand-grey-50 transition-colors text-left"
                        onClick={() =>
                          setOpenToggles((prev) => ({
                            ...prev,
                            [country.label]: !prev[country.label],
                          }))
                        }
                      >
                        <span
                          className="font-bold text-brand-grey-900 text-base"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {country.label}
                        </span>
                        <ChevronRight
                          size={20}
                          className={`text-brand-red transition-transform duration-300 ${isOpen ? "rotate-90" : ""
                            }`}
                        />
                      </button>
                      <div
                        className={`px-5 pb-5 transition-all duration-300 ${isOpen ? "block" : "hidden"
                          }`}
                      >
                        <div className="flex flex-wrap gap-2 pt-1">
                          {country.content.map((item) => (
                            <a
                              key={item.name}
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-brand-grey-700 bg-brand-grey-100 rounded-full hover:bg-brand-red hover:text-white transition-colors duration-200"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>


        {/* ══════════ CTA DUAL PANEL ══════════ */}
        <section className="py-0">
          <div className="grid md:grid-cols-2">
            <div
              className="flex flex-col justify-center px-12 py-16 text-white relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#171717 0%,#262626 100%)",
              }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full border border-white/5 translate-x-1/2 -translate-y-1/2" />
              <p
                className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: "rgba(200,16,46,0.8)" }}
              >
                SIS Group
              </p>
              <h3
                className="text-3xl font-bold mb-4 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Partner with India&apos;s Most Trusted Services Group
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                We are the Market Leader in each of our verticals – Security, Facility Management and Cash Logistics by providing Essential Solutions with Trust, People Focus and Service Spirit.
              </p>
              <a
                href="https://www.sisindia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-fit"
              >
                Visit SIS India ↗
              </a>
            </div>

            <div
              className="flex flex-col justify-center px-12 py-16 text-white relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg,#C8102E 0%,#A00D25 60%,#7A0A1C 100%)",
              }}
            >
              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full border border-white/10 translate-x-1/4 translate-y-1/4" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3 text-white/60">
                SIS Global Workforce
              </p>
              <h3
                className="text-3xl font-bold mb-4 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Looking specifically for workforce
                solutions?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                Hire skilled, verified talent across all industries with our
                end-to-end recruitment and staffing services.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/jobs"
                  className="btn-outline !text-white !border-white hover:!bg-white hover:!text-brand-red"
                >
                  Hire Workforce <ArrowRight size={14} />
                </Link>
                <a
                  href="tel:01244171888"
                  className="flex items-center gap-2 px-4 py-2.5 border border-white/40 text-white/80 text-sm font-semibold rounded hover:border-white hover:text-white transition-colors"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.05em",
                  }}
                >
                  <Phone size={14} /> Call Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
