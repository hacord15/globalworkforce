"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone, Mail, MapPin, Clock, Send, ChevronRight,
  CheckCircle, Briefcase, Users, Upload, Linkedin,
  Instagram, Facebook,
} from "lucide-react";

import type { OFFICE, FAQS } from "./page";
import { images } from "@/lib/images";

// ── Types ──────────────────────────────────────────────────────────────────

type OfficeType = typeof OFFICE;
type Faq        = (typeof FAQS)[number];

interface Props {
  office: OfficeType;
  faqs:   readonly Faq[];
}

// ── Sub-component: SuccessState ────────────────────────────────────────────

function SuccessState({ onReset, message }: { onReset: () => void; message: string }) {
  return (
    <div className="flex flex-col items-center text-center py-10">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
        style={{ background: "rgba(200,16,46,0.08)" }}
      >
        <CheckCircle size={36} className="text-brand-red" />
      </div>
      <h3
        className="text-2xl font-bold text-brand-grey-900 mb-3"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {message}
      </h3>
      <p className="text-brand-grey-500 text-sm leading-relaxed max-w-sm mb-8">
        Thank you for reaching out. Our team will get back to you shortly.
      </p>
      <button onClick={onReset} className="btn-primary text-sm">
        Submit Another
      </button>
    </div>
  );
}

// ── Sub-component: InputField ──────────────────────────────────────────────

function InputField({
  label, name, type = "text", placeholder, required = false,
}: {
  label: string; name: string; type?: string; placeholder: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-brand-grey-700 uppercase tracking-widest mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 border border-brand-grey-200 rounded-xl text-sm text-brand-grey-800 placeholder-brand-grey-400 focus:outline-none focus:border-brand-red transition-colors"
      />
    </div>
  );
}

function SelectField({
  label, name, options, required = false,
}: {
  label: string; name: string; options: string[]; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-brand-grey-700 uppercase tracking-widest mb-2">
        {label}
      </label>
      <select
        name={name}
        required={required}
        className="w-full px-4 py-3 border border-brand-grey-200 rounded-xl text-sm text-brand-grey-700 focus:outline-none focus:border-brand-red transition-colors bg-white appearance-none cursor-pointer"
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ── Sub-component: EmployerForm ────────────────────────────────────────────

function EmployerForm({
  loading, onSubmit,
}: {
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Company Name *"    name="company"  placeholder="Your company name"    required />
        <InputField label="Contact Person *"  name="contact"  placeholder="Your full name"        required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField
          label="Country *"
          name="country"
          required
          options={["India", "UAE", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain", "Singapore", "UK", "Australia", "USA", "Other"]}
        />
        <InputField label="Number of Workers Required
 *" name="workers" type="number" placeholder="e.g. 50" required />
      </div>
      <div>
        <label className="block text-xs font-bold text-brand-grey-700 uppercase tracking-widest mb-2">
          Requirement *
        </label>
        <textarea
          name="requirement"
          required
          rows={3}
          placeholder="Describe the roles, skills, and any specific requirements…"
          className="w-full px-4 py-3 border border-brand-grey-200 rounded-xl text-sm text-brand-grey-800 placeholder-brand-grey-400 focus:outline-none focus:border-brand-red resize-none transition-colors"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Email *"        name="email" type="email" placeholder="you@company.com"   required />
        <InputField label="Phone Number *" name="phone" type="tel"   placeholder="+91 XXXXX XXXXX"   required />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center text-sm"
        style={{ opacity: loading ? 0.85 : 1 }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send size={15} />
            Submit Requirement
          </span>
        )}
      </button>
    </form>
  );
}

// ── Sub-component: CandidateForm ───────────────────────────────────────────

function CandidateForm({
  loading, onSubmit,
}: {
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Full Name *"     name="name"  placeholder="Your full name"   required />
        <InputField label="Mobile Number *" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Trade / Skill *" name="trade"      placeholder="e.g. Electrician, Nurse" required />
        <InputField label="Experience *"    name="experience" placeholder="e.g. 3 years"            required />
      </div>
      <SelectField
        label="Preferred Country *"
        name="country"
        required
        options={["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain", "Singapore", "UK", "Australia", "USA", "Other"]}
      />

      {/* Resume Upload */}
      <div>
        <label className="block text-xs font-bold text-brand-grey-700 uppercase tracking-widest mb-2">
          Resume / CV *
        </label>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full px-4 py-4 border-2 border-dashed border-brand-grey-200 rounded-xl flex items-center justify-center gap-3 text-sm transition-colors hover:border-brand-red/40 cursor-pointer"
          style={{ background: "#FAFAFA" }}
        >
          <Upload size={16} className="text-brand-red flex-shrink-0" />
          <span className="text-brand-grey-600">
            {fileName
              ? <span className="text-brand-grey-800 font-semibold">{fileName}</span>
              : <><span className="text-brand-red font-semibold">Choose file</span> or drag &amp; drop</>
            }
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          required
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
        <p className="text-[11px] text-brand-grey-400 mt-1.5 pl-1">Accepted formats: PDF, DOC, DOCX · Max 5MB</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center text-sm"
        style={{ opacity: loading ? 0.85 : 1 }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send size={15} />
            Apply Now
          </span>
        )}
      </button>
    </form>
  );
}

// ── Sub-component: OfficeInfoSidebar ──────────────────────────────────────

function OfficeInfoSidebar({ office }: { office: OfficeType }) {
  return (
    <div className="flex flex-col gap-5 h-full">

      {/* Contact details card */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "linear-gradient(135deg,#1A1A1A 0%,#262626 100%)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p className="text-xs font-bold tracking-[0.16em] uppercase text-white/35 mb-4">Our Office</p>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: "rgba(200,16,46,0.20)" }}
            >
              <MapPin size={15} className="text-brand-red" />
            </span>
            <p className="text-white/75 text-sm leading-relaxed">{office.address}</p>
          </div>

          <a
            href={`tel:${office.phone.replace(/[\s-]/g, "")}`}
            className="flex items-center gap-3 group"
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(200,16,46,0.20)" }}
            >
              <Phone size={15} className="text-brand-red" />
            </span>
            <span className="text-white/75 text-sm group-hover:text-white transition-colors">{office.phone}</span>
          </a>

          <a
            href={`mailto:${office.email}`}
            className="flex items-center gap-3 group"
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(200,16,46,0.20)" }}
            >
              <Mail size={15} className="text-brand-red" />
            </span>
            <span className="text-white/75 text-sm group-hover:text-white transition-colors break-all">{office.email}</span>
          </a>

          <div className="flex items-center gap-3">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(200,16,46,0.20)" }}
            >
              <Clock size={15} className="text-brand-red" />
            </span>
            <span className="text-white/60 text-sm">{office.hours}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 my-5" />

        {/* Social links */}
        <p className="text-xs font-bold tracking-[0.16em] uppercase text-white/35 mb-3">Follow Us</p>
        <div className="flex items-center gap-2">
          {[
            { href: office.socials.linkedin,  icon: <Linkedin  size={16} />, label: "LinkedIn"  },
            { href: office.socials.instagram, icon: <Instagram size={16} />, label: "Instagram" },
            { href: office.socials.facebook,  icon: <Facebook  size={16} />, label: "Facebook"  },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-brand-red"
              style={{ background: "rgba(200,16,46,0.22)", color: "#FF6B7A" }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Embedded Google Map */}
      <div
        className="rounded-2xl overflow-hidden flex-1 min-h-[220px]"
        style={{ border: "1px solid #E5E5E5" }}
      >
        {/*
          Replace the src below with your actual Google Maps embed URL.
          Go to maps.google.com → search your address → Share → Embed a map → copy the src.
          Example format:
          https://www.google.com/maps/embed?pb=!1m18!...your_embed_key...
        */}
        <iframe
          title="Office Location"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(office.address)}&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: "220px", display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function ContactClient({ office, faqs }: Props) {
  const [activeTab,          setActiveTab]          = useState<"employer" | "candidate">("employer");
  const [employerSubmitted,  setEmployerSubmitted]  = useState(false);
  const [candidateSubmitted, setCandidateSubmitted] = useState(false);
  const [employerLoading,    setEmployerLoading]    = useState(false);
  const [candidateLoading,   setCandidateLoading]   = useState(false);

  const handleEmployerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmployerLoading(true);
    setTimeout(() => { setEmployerLoading(false); setEmployerSubmitted(true); }, 1600);
  };

  const handleCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCandidateLoading(true);
    setTimeout(() => { setCandidateLoading(false); setCandidateSubmitted(true); }, 1600);
  };

  return (
    <main>

      {/* ════════════════════════════════════════════════════════
          HERO — with image on the right
      ════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#171717 0%,#262626 100%)" }}
      >
        {/* Decorative rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-white/5" />
          <div className="absolute top-10 -right-20 w-80 h-80 rounded-full border border-white/5" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full border border-brand-red/10" />
          <div
            className="absolute right-0 top-0 w-1/2 h-full"
            style={{ background: "radial-gradient(ellipse 60% 80% at 90% 40%, rgba(200,16,46,0.12) 0%, transparent 70%)" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={11} />
            <span className="text-white/70">Contact Us</span>
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* LEFT — Heading + quick office info + socials */}
            <div>
              <span
                className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(200,16,46,0.18)", color: "#FF6B7A", border: "1px solid rgba(200,16,46,0.28)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                Get In Touch
              </span>
              <h1
                className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Let Us Build Your{" "}
                <span className="text-brand-red">Global Workforce Together</span>
              </h1>
              <p className="text-white/55 text-lg leading-relaxed max-w-md mb-8">
                Whether you are looking to hire skilled workers
or find an international job, our team is ready
to help.
              </p>

              {/* Quick contact chips */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:${office.phone.replace(/[\s-]/g, "")}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white transition-colors hover:bg-brand-red"
                  style={{ background: "rgba(200,16,46,0.20)", border: "1px solid rgba(200,16,46,0.35)" }}
                >
                  <Phone size={14} className="text-brand-red" />
                  {office.phone}
                </a>
                <a
                  href={`mailto:${office.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <Mail size={14} className="text-white/60" />
                  {office.email}
                </a>
              </div>
            </div>

            {/* RIGHT — Hero image */}
            <div className="relative">
              {/* Glow behind image */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,16,46,0.18) 0%, transparent 70%)", transform: "scale(1.1)" }}
              />

              <div
                className="relative rounded-3xl overflow-hidden aspect-[4/3]"
                style={{ border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 64px rgba(0,0,0,0.45)" }}
              >
               
                <Image
                  src={images.contact.banner}
                  alt="Diverse professional team collaborating — SIS Global Workforce Solutions"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />

                {/* Subtle red gradient overlay at bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(140,8,28,0.45) 0%, transparent 55%)" }}
                />

                {/* Floating stat badge */}
                {/* <div
                  className="absolute bottom-5 left-5 px-4 py-3 rounded-xl backdrop-blur-md"
                  style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <p className="text-white font-bold text-lg leading-none">10,000+</p>
                  <p className="text-white/55 text-xs mt-0.5">Workers Placed Globally</p>
                </div> */}

                {/* Second stat badge */}
                <div
                  className="absolute bottom-5 right-5 px-4 py-3 rounded-xl backdrop-blur-md"
                  style={{ background: "rgba(200,16,46,0.70)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <p className="text-white font-bold text-lg leading-none">15</p>
                  <p className="text-white/80 text-xs mt-0.5">Countries Served</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FORM + SIDEBAR (2-col layout)
      ════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "linear-gradient(160deg,#FAFAFA 0%,#F3F3F3 100%)" }}>
        <div className="max-w-7xl mx-auto px-4">

          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">

            {/* ── LEFT: Form card ─────────────────────────────── */}
            <div
              className="bg-white rounded-3xl overflow-hidden shadow-xl"
              style={{ border: "1px solid #E5E5E5", borderTop: "4px solid #C8102E" }}
            >
              {/* Card header + tab toggle */}
              <div className="px-8 pt-8 pb-0">
                <h2
                  className="text-2xl font-bold text-brand-grey-900 mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Contact Us
                </h2>
                <p className="text-sm text-brand-grey-500 mb-5">
                  Tell us who you are, and we will take it from
there.
                </p>

                {/* Toggle pill */}
                <div
                  className="flex gap-1.5 rounded-xl p-1 w-fit"
                  style={{ background: "#F3F3F3" }}
                >
                  {(["employer", "candidate"] as const).map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                        style={{
                          background: isActive ? "#C8102E" : "transparent",
                          color:      isActive ? "#fff"    : "#6B6B6B",
                        }}
                      >
                        {tab === "employer" ? <Briefcase size={15} /> : <Users size={15} />}
                        {tab === "employer" ? "Partner with Us" : "Apply for Job"}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-brand-grey-100 mt-5" />
              </div>

              {/* Form body */}
              <div className="px-8 py-7">
                {activeTab === "employer" ? (
                  <>
                    <p className="text-sm text-brand-grey-500 mb-5">
                      Tell us your requirements, and we will match
you with the right talent
                    </p>
                    {employerSubmitted ? (
                      <SuccessState message="Requirement Submitted!" onReset={() => setEmployerSubmitted(false)} />
                    ) : (
                      <EmployerForm loading={employerLoading} onSubmit={handleEmployerSubmit} />
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-sm text-brand-grey-500 mb-5">
                      Submit your profile and we&apos;ll connect you with the right opportunity.
                    </p>
                    {candidateSubmitted ? (
                      <SuccessState message="Application Received!" onReset={() => setCandidateSubmitted(false)} />
                    ) : (
                      <CandidateForm loading={candidateLoading} onSubmit={handleCandidateSubmit} />
                    )}
                  </>
                )}
              </div>
            </div>

            {/* ── RIGHT: Address details + map ─────────────────── */}
            <div className="lg:sticky lg:top-6">
              <OfficeInfoSidebar office={office} />
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          BOTTOM CTA
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-16 text-white text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#C8102E 0%,#A00D25 60%,#7A0A1C 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full border border-white/10" />
        </div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Empowering Global Businesses.<br />
            <span className="text-white/80">Transforming Worker Lives.</span>
          </h2>
          <p className="text-white/70 text-base mb-8">
            Our team is available Monday to Saturday, 9:00
AM to 6:30 PM IST

          </p>
          <div className="flex flex-col items-center sm:flex-row gap-4 justify-center">

            <a href={`tel:${office.phone.replace(/[\s-]/g, "")}`} className="btn-outline !text-white !border-white hover:!bg-white hover:!text-brand-red justify-center">
              <Phone size={15} />
              {office.phone}
            </a>
            <a href={`mailto:${office.email}`} className="btn-outline !text-white !border-white/50 hover:!bg-white/20 justify-center">
              <Mail size={15} />
              {office.email}
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}