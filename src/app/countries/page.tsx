// src/app/countries/page.tsx
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ChevronRight, CheckCircle, Shield, Globe,
  ArrowRight, Phone, Mail, Users
} from "lucide-react";
import { images } from "@/lib/images";

// ── Data ──────────────────────────────────────────────────────────────────

const DESTINATION_REGIONS = [
  {
    id: "europe",
    region: "Europe",
    badge: "🇪🇺",
    tagline: "Skilled workforce for European markets",
    desc: "SIS Global deploys verified, AUG-compliant workforce across major European economies through licenced partnerships and regulated recruitment frameworks.",
    countries: [
      { name: "Germany", flag: "🇩🇪", detail: "AUG-licensed deployment" },
      { name: "Finland", flag: "🇫🇮", detail: "Nordic market specialist" },
      { name: "Italy", flag: "🇮🇹", detail: "Southern Europe hub" },
      { name: "Poland", flag: "🇵🇱", detail: "Central Europe gateway" },
      { name: "Romania", flag: "🇷🇴", detail: "Emerging markets partner" },
      { name: "Spain", flag: "🇪🇸", detail: "Iberian Peninsula hub" },
    ],
    image: images.countries.europe,
    accentColor: "#1D4ED8",
    lightBg: "rgba(29,78,216,0.05)",
    lightBorder: "rgba(29,78,216,0.15)",
  },
  {
    id: "gcc",
    region: "GCC & Middle East",
    badge: "🌍",
    tagline: "Trusted workforce partner across the Gulf",
    desc: "A primary destination for SIS Global's workforce deployment. We operate with full MOHRE compliance and MEA licensing across all GCC member states.",
    countries: [
      { name: "UAE", flag: "🇦🇪", detail: "MOHRE Compliant — Regional Hub" },
      { name: "Oman", flag: "🇴🇲", detail: "Sultanate-approved partner" },
      { name: "Qatar", flag: "🇶🇦", detail: "World Cup legacy workforce" },
    ],
    image: images.countries.gcc,
    accentColor: "#C8102E",
    lightBg: "rgba(200,16,46,0.05)",
    lightBorder: "rgba(200,16,46,0.18)",
  },
];

const SOURCE_COUNTRIES = [
  {
    name: "India",
    flag: "🇮🇳",
    desc: "Our primary talent origin. Pre-trained, MEA-compliant and properly documented workers across healthcare, engineering, hospitality, and skilled trades.",
    strength: "250,000+ workforce deployed",
    img: images.countries.india,
  },
  {
    name: "Nepal",
    flag: "🇳🇵",
    desc: "Hardworking and disciplined workforce, particularly strong in construction, facility management, and industrial roles.",
    strength: "Specialist trade skills",
    img: images.countries.nepal, 
  },
  {
    name: "Sri Lanka",
    flag: "🇱🇰",
    desc: "An English-proficient, well-educated talent pool excelling in healthcare, hospitality, and domestic services globally.",
    strength: "High compliance standards",
    img: images.countries.sriLanka,
  },
];

const LICENSES = [
  {
    code: "MEA",
    full: "Ministry of External Affairs Licence",
    country: "Government of India",
    flag: "🇮🇳",
    desc: "An authorised overseas manpower recruitment agent registered with India’s Ministry of External Affairs, enabling legal international workforce deployment.",
    color: "#C8102E",
  },
  {
    code: "MOHRE",
    full: "Ministry of Human Resources & Emiratisation",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    desc: "Full compliance with UAE's MOHRE framework ensuring ethical recruitment, worker rights protection, and regulated employment contracts for all Gulf deployments.",
    color: "#C8102E",
  },
  {
    code: "AUG",
    full: "AUG Licence",
    country: "Federal Republic of Germany",
    flag: "🇩🇪",
    desc: "German statutory licence for lawful temporary staffing and workforce leasing under the German Temporary Employment Act — enabling compliant EU deployments.",
    color: "#1D4ED8",
  },
  {
    code: "ILC",
    full: "International Legal & Compliance Partnerships",
    country: "Multi-Jurisdiction",
    flag: "🌐",
    desc: "Network of in-country legal partners ensuring adherence to destination-country labour law, visa compliance, and ethical recruitment standards across all markets.",
    color: "#059669",
  },
];

const STATS = [
  { value: "9", label: "Countries", sub: "Active deployments" },
  { value: "3", label: "Licences", sub: "MEA · MOHRE · AUG" },
  { value: "3", label: "Source Countries", sub: "India · Nepal · Sri Lanka" },
  { value: "100%", label: "Compliance Rate", sub: "Zero violations record" },
];

// ── Page ──────────────────────────────────────────────────────────────────
export default function CountriesPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ══════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg,#171717 0%,#2D0A0F 60%,#1A0505 100%)" }}>
          {/* Decorative rings */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-white/5" />
            <div className="absolute top-16 -right-20 w-96 h-96 rounded-full border border-white/5" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border border-brand-red/10" />
            <div className="absolute right-0 top-0 w-1/2 h-full" style={{ background: "radial-gradient(ellipse 60% 80% at 90% 30%, rgba(200,16,46,0.14) 0%, transparent 70%)" }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-white/40 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={11} />
              <span className="text-white/70">Countries We Serve</span>
            </div>

            <div className="grid md:grid-cols-2 gap-14 items-center">
              <div>
                <span
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full mb-6"
                  style={{ background: "rgba(200,16,46,0.2)", color: "#FF6B7A", border: "1px solid rgba(200,16,46,0.3)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                  Global Workforce Deployment
                </span>

                <h1
                  className="text-5xl md:text-6xl font-bold text-white leading-[1.04] mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Countries <span className="text-brand-red">We Serve</span>
                </h1>

                <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
                  SIS Global Workforce Solutions provides skilled workforce deployment across GCC and European markets through trusted international partnerships and compliant workforce frameworks.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a href="#destinations" className="btn-primary">
                    View Destinations <ArrowRight size={15} />
                  </a>
                  {/* <a href="#" className="flex items-center gap-2 px-5 py-3 border border-white/25 text-white/80 text-sm font-semibold rounded hover:border-white/60 hover:text-white transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    <Shield size={15} /> Our Licences
                  </a> */}
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-6 border transition-all hover:border-brand-red/40"
                    style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="text-3xl font-bold text-white mb-1"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-white/70 text-xs font-semibold">{s.label}</div>
                    <div className="text-white/35 text-[10px] mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            RED ACCENT BAR
        ══════════════════════════════════════════════════ */}
        <div style={{ background: "linear-gradient(90deg,#C8102E 0%,#A00D25 50%,#7A0A1C 100%)", padding: "14px 0" }}>
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Globe size={16} className="text-white/70 flex-shrink-0" />
              <span className="text-white/80 text-sm">
               Deploying workforce to <strong className="text-white"> Europe and the GCC</strong> — sourcing from <strong className="text-white"> India, Nepal, and Sri Lanka.</strong>
              </span>
            </div>
            {/* <Link href="/contact" className="text-white text-xs font-bold tracking-widest uppercase hover:underline flex items-center gap-1.5">
              Enquire About Deployment →
            </Link> */}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            DESTINATION COUNTRIES
        ══════════════════════════════════════════════════ */}
        <section id="destinations" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-brand-red mb-3 px-3 py-1.5 rounded-full" style={{ background: "rgba(200,16,46,0.08)" }}>
                Deployment Markets
              </span>
              <h2 className="text-4xl font-bold text-brand-grey-900" style={{ fontFamily: "var(--font-display)" }}>
                Destination Countries
              </h2>
              <p className="text-brand-grey-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
                We deploy across two primary international markets — the European Union and the GCC — backed by the requisite licences and compliance frameworks in each jurisdiction.
              </p>
              <div className="section-divider mt-5" />
            </div>

            <div className="flex flex-col gap-12">
              {DESTINATION_REGIONS.map((region) => (
                <div
                  key={region.id}
                  className="grid md:grid-cols-2 gap-10 items-start"
                >
                  {/* Left — image + title */}
                  <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={region.image}
                      alt={region.region}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.70) 0%, transparent 50%)" }} />
                    {/* Region badge */}
                    <div className="absolute bottom-5 left-5 right-5">
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-2 text-white"
                        style={{ background: `${region.accentColor}CC`, border: `1px solid ${region.accentColor}` }}
                      >
                        <span>{region.badge}</span> {region.region}
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">{region.tagline}</p>
                    </div>
                  </div>

                  {/* Right — country list */}
                  <div>
                    <p className="text-brand-grey-500 text-sm leading-relaxed mb-6">{region.desc}</p>

                    <div className="grid grid-cols-1 gap-2.5">
                      {region.countries.map((c) => (
                        <div
                          key={c.name}
                          className="flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-sm"
                          style={{
                            background: region.lightBg,
                            borderColor: region.lightBorder,
                          }}
                        >
                          <span className="text-2xl flex-shrink-0 leading-none">{c.flag}</span>
                          <div className="flex-1 min-w-0">
                            <p
                              className="font-bold text-brand-grey-900 text-sm"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {c.name}
                            </p>
                            <p className="text-xs text-brand-grey-400 mt-0.5">{c.detail}</p>
                          </div>
                          <CheckCircle size={15} style={{ color: region.accentColor }} className="flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            SOURCE COUNTRIES
        ══════════════════════════════════════════════════ */}


        <section className="py-20" style={{ background: "linear-gradient(135deg,#F9F9F9 0%,#F2F2F2 100%)" }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-brand-red mb-3 px-3 py-1.5 rounded-full" style={{ background: "rgba(200,16,46,0.08)" }}>
                Talent Origin
              </span>
              <h2 className="text-4xl font-bold text-brand-grey-900" style={{ fontFamily: "var(--font-display)" }}>
                Source Countries
              </h2>
              <p className="text-brand-grey-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
                Skilled workforce available through our trusted sourcing and training partners in:
              </p>
              <div className="section-divider mt-5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {SOURCE_COUNTRIES.map((c) => (
                <div
                  key={c.name}
                  className="group bg-white rounded-2xl overflow-hidden border border-brand-grey-200 hover:border-brand-red/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.img}
                      alt={c.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Static bottom gradient overlay (always visible) */}
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)" }}
                    />

                    {/* Hover gradient overlay - appears on card hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-350"
                      style={{ background: "linear-gradient(#0000 0%, #c8102e66 40%, #c8102ed9 100%)" }}
                    />

                    {/* Flag + name */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                      <span className="text-2xl">{c.flag}</span>
                      <span
                        className="text-white font-bold text-lg"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {c.name}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div
                      className="inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3"
                      style={{ background: "rgba(200,16,46,0.08)", color: "#C8102E" }}
                    >
                      {c.strength}
                    </div>
                    <p className="text-sm text-brand-grey-500 leading-relaxed">{c.desc}</p>
                    {/* Red bottom bar */}
                    <div
                      className="h-0.5 mt-5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                      style={{ background: "linear-gradient(90deg,#C8102E,transparent)" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Partner note */}
            <div
              className="mt-10 flex items-start gap-4 px-6 py-5 rounded-2xl border"
              style={{ background: "rgba(200,16,46,0.04)", borderColor: "rgba(200,16,46,0.15)" }}
            >
              <Users size={20} className="text-brand-red flex-shrink-0 mt-0.5" />
              <p className="text-sm text-brand-grey-600 leading-relaxed">
                All sourcing is conducted through <strong className="text-brand-grey-800">government-registered recruitment partners</strong>, certified training centres, and skill development institutes in each origin country — ensuring workers are properly trained, documented, and oriented before deployment.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            COMPLIANCE & LICENSING
        ══════════════════════════════════════════════════ */}
        {/* <section id="compliance" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-brand-red mb-3 px-3 py-1.5 rounded-full" style={{ background: "rgba(200,16,46,0.08)" }}>
                Regulatory Framework
              </span>
              <h2 className="text-4xl font-bold text-brand-grey-900" style={{ fontFamily: "var(--font-display)" }}>
                Compliance & Licensing
              </h2>
              <p className="text-brand-grey-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
                SIS Global follows a compliance-first approach and
holds the requisite licences across the jurisdictions in
which it operates
              </p>
              <div className="section-divider mt-5" />
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {LICENSES.map((lic) => (
                <div
                  key={lic.code}
                  className="group flex items-start gap-5 p-6 rounded-2xl border border-brand-grey-200 hover:shadow-md hover:border-opacity-60 transition-all duration-300"
                  style={{ "--hover-border": lic.color } as React.CSSProperties}
                >
                
                  <div
                    className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 text-white transition-transform duration-300 group-hover:scale-105"
                    style={{ background: `linear-gradient(135deg,${lic.color} 0%,${lic.color}AA 100%)`, boxShadow: `0 8px 20px ${lic.color}30` }}
                  >
                    <span className="text-xl mb-0.5">{lic.flag}</span>
                    <span
                      className="text-[10px] font-bold tracking-wider"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {lic.code}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[10px] font-bold tracking-widest uppercase mb-1"
                      style={{ color: lic.color }}
                    >
                      {lic.country}
                    </p>
                    <h3
                      className="font-bold text-brand-grey-900 text-sm mb-2 leading-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {lic.full}
                    </h3>
                    <p className="text-xs text-brand-grey-500 leading-relaxed">{lic.desc}</p>
                  </div>
                </div>
              ))}
            </div>

           
            <div
              className="relative overflow-hidden rounded-2xl p-8 text-white"
              style={{ background: "linear-gradient(135deg,#171717 0%,#2D0A0F 100%)" }}
            >
             
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute -left-8 -bottom-8 w-48 h-48 rounded-full border border-brand-red/10 pointer-events-none" />

              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Shield size={18} className="text-brand-red" />
                    <span className="text-xs font-bold tracking-widest uppercase text-brand-red">Our Commitment</span>
                  </div>
                  <h3
                    className="text-2xl font-bold text-white mb-4 leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Ethical Recruitment, Every Time
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    We ensure all workforce deployment activities follow destination-country labour regulations and ethical recruitment standards — protecting both employers and workers at every step of the journey.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Zero tolerance for forced or bonded labour",
                    "No recruitment fees charged to workers",
                    "Transparent contracts in worker&apos;s native languages",
                    "Destination-country labour law compliance",
                    "Regular third-party compliance audits",
                    "Worker welfare and grievance mechanisms",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle size={14} className="text-brand-red flex-shrink-0" />
                      <span
                        className="text-sm text-white/70"
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* ══════════════════════════════════════════════════
            PROCESS STRIP
        ══════════════════════════════════════════════════ */}
        <section className="py-16" style={{ background: "linear-gradient(135deg,#F9F9F9 0%,#F2F2F2 100%)" }}>
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-grey-900" style={{ fontFamily: "var(--font-display)" }}>
                How International Deployment Works
              </h2>
              <div className="section-divider mt-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Requirement",     desc: "The employer shares workforce requirements, destination country, and deployment timeline." },
                { step: "02", title: "Sourcing",        desc: "We identify, screen, and pre-qualify candidates from our source country networks." },
                { step: "03", title: "Documentation",   desc: "Visa documents, medical records, skill certificates, and MEA documentation are handled end-to-end." },
                { step: "04", title: "Deployment",      desc: "Workers deployed with full contracts, insurance, and on-arrival orientation." },
              ].map((s, i) => (
                <div key={s.step} className="relative">
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-5 left-full w-full h-px z-0" style={{ background: "linear-gradient(90deg,#C8102E,transparent)" }} />
                  )}
                  <div className="relative z-10 bg-white rounded-2xl p-6 border border-brand-grey-200 hover:border-brand-red/30 hover:shadow-md transition-all text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-4 shadow-md"
                      style={{ background: "linear-gradient(135deg,#C8102E,#A00D25)", fontFamily: "var(--font-display)" }}
                    >
                      {s.step}
                    </div>
                    <h3 className="font-bold text-brand-grey-900 text-sm mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      {s.title}
                    </h3>
                    <p className="text-xs text-brand-grey-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            DUAL CTA
        ══════════════════════════════════════════════════ */}
        <section className="py-0">
          <div className="grid md:grid-cols-2">
            {/* Employer CTA */}
            <div
              className="flex flex-col justify-center px-12 py-16 text-white relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#C8102E 0%,#A00D25 60%,#7A0A1C 100%)" }}
            >
              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full border border-white/10 translate-x-1/4 translate-y-1/4" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3 text-white/60">For Employers</p>
              <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                Need Workforce in Europe or GCC?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                Get a compliant, pre-verified workforce deployed to
your international locations within agreed timelines.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/employers" className="btn-outline !text-white !border-white hover:!bg-white hover:!text-brand-red">
                  Register as Employer <ArrowRight size={14} />
                </Link>
                <a href="tel:01244171888" className="flex items-center gap-2 px-4 py-2.5 border border-white/40 text-white/80 text-sm font-semibold rounded hover:border-white hover:text-white transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  <Phone size={14} /> Call Us
                </a>
              </div>
            </div>

            {/* Partner CTA */}
            <div
              className="flex flex-col justify-center px-12 py-16 text-white relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#171717 0%,#262626 100%)" }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full border border-white/5 translate-x-1/2 -translate-y-1/2" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "rgba(200,16,46,0.8)" }}>
                For Sourcing Partners
              </p>
              <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                Partner with Us for International Placement
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Recruitment agencies and training centres in India, Nepal, and Sri Lanka — join our certified partner network.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/associate-partner" className="btn-primary w-fit">
                  Become a Partner <ArrowRight size={14} />
                </Link>
                <a href="mailto:partners@sisglobal.com" className="flex items-center gap-2 px-4 py-2.5 border border-white/25 text-white/70 text-sm font-semibold rounded hover:border-white/60 hover:text-white transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  <Mail size={14} /> Email Partners Team
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