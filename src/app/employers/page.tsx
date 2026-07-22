"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
   Building2, ArrowRight, ChevronRight,
  Users, Clock, Shield, BarChart3, Briefcase, Star,
  Phone, Mail, Upload, AlertCircle, Loader2,
  Handshake,
} from "lucide-react";

import CountrySlider from "@/components/ui/CountrySlider";
import { images } from "@/lib/images";

// ── Config ─────────────────────────────────────────────────────────────────
// const LEAD_API_ENDPOINT = "https://sisglobalapi.neuralinfo.co.in/public/leads";
// const COUNTRIES_API_ENDPOINT = "https://sisglobalapi.neuralinfo.co.in/public/location/countries";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const LEAD_API_ENDPOINT = `${API_BASE_URL}/public/leads`;

const COUNTRIES_API_ENDPOINT = `${API_BASE_URL}/public/location/countries`;

// ── Types ──────────────────────────────────────────────────────────────────
interface PartnerFormData {
  lead_type: string;
  organisation_name: string;
  contact_name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  status: string;
  source: string;
  country_id: number | null;
}

interface Country {
  country_id: number;
  country_name: string;
}

const INITIAL_PARTNER_FORM: PartnerFormData = {
  lead_type: "EMPLOYER",
  organisation_name: "",
  contact_name: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
  status: "NEW",
  source: "Website",
  country_id: null,
};

// ── Static data ────────────────────────────────────────────────────────────
const WHY_CARDS = [
  { icon: <Users size={22} />, title: "Pre-Verified Talent", desc: "Every candidate is background-checked, skill-assessed, and document-verified before being presented to you." },
  { icon: <Clock size={22} />, title: "48-Hour Shortlisting", desc: "Our pre-built talent pools mean we shortlist qualified candidates within 48 hours of receiving your requirement." },
  { icon: <Shield size={22} />, title: "Full Compliance", desc: "We manage PF, ESI, TDS, labour law compliance and act as employer of record for all contract placements." },
  { icon: <BarChart3 size={22} />, title: "Real-Time Reporting", desc: "Dedicated account managers and weekly dashboards keep you fully informed on placement progress and SLA adherence." },
  { icon: <Briefcase size={22} />, title: "Replacement Guarantee", desc: "Free replacement within 60–90 days if a placed candidate exits for performance reasons." },
  { icon: <Star size={22} />, title: "Backed by SIS India", desc: "Leveraging 31+ years of operational excellence and 2,50,000+ workforce managed by SIS Group." },
];

const STEPS = [
  { id: 1, title: "Register", desc: "Fill the employer registration form. Our team verifies your account within 24 hours." },
  { id: 2, title: "Share Requirement", desc: "Describe your workforce need — role, skills, location, timeline, and volume." },
  { id: 3, title: "Review Candidates", desc: "Receive a shortlist of pre-verified, assessed candidates within 48 hours." },
  { id: 4, title: "Hire & Onboard", desc: "Conduct interviews, make your selection, and we handle onboarding and compliance." },
];

// ── Shared field components ────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-bold text-brand-grey-700 uppercase tracking-widest mb-2">
      {children}
    </label>
  );
}

function Input({ name, value, onChange, placeholder, type = "text" }: {
  name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; type?: string;
}) {
  return (
    <input
      type={type} name={name} value={value} onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-brand-grey-200 rounded-xl text-sm text-brand-grey-800 placeholder-brand-grey-400 focus:outline-none focus:border-brand-red transition-colors bg-white"
    />
  );
}

function TextArea({ name, value, onChange, placeholder, rows = 4 }: {
  name: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string; rows?: number;
}) {
  return (
    <textarea
      name={name} value={value} onChange={onChange} rows={rows}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-brand-grey-200 rounded-xl text-sm text-brand-grey-800 placeholder-brand-grey-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red resize-none transition-colors bg-white"
    />
  );
}

// ── API helper ─────────────────────────────────────────────────────────────
async function submitPartnerLead(formData: PartnerFormData) {
  const payload = {
    notes: formData.notes || "",
    status: formData.status || "NEW",
    source: formData.source || "Website",
    address: formData.address || "",
    country_id: formData.country_id,
    email: formData.email,
    phone: formData.phone,
    contact_name: formData.contact_name,
    organisation_name: formData.organisation_name || "Associate Partner",
    lead_type: formData.lead_type || "PARTNER",
  };

  const response = await fetch(LEAD_API_ENDPOINT, {
    method: "POST",
    headers: { accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = `Server responded with status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      errorMessage = `${errorMessage} - ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  return await response.json();
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function EmployersPage() {
  // ── Partner form state ────────────────────────────────────────────────
  const [partnerForm, setPartnerForm] = useState<PartnerFormData>(INITIAL_PARTNER_FORM);
  const [partnerLoading, setPartnerLoading] = useState(false);
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [partnerError, setPartnerError] = useState("");
  const [partnerCountries, setPartnerCountries] = useState<Country[]>([]);
  const [partnerCountriesLoading, setPartnerCountriesLoading] = useState(true);
  const [partnerCountriesError, setPartnerCountriesError] = useState("");

  // ── Effects ───────────────────────────────────────────────────────────
  useEffect(() => {
    async function loadPartnerCountries() {
      try {
        const res = await fetch(COUNTRIES_API_ENDPOINT, {
          headers: { accept: "application/json" },
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data: Country[] = await res.json();
        setPartnerCountries(data);
        const india = data.find((c) => c.country_name === "India");
        if (india) {
          setPartnerForm((prev) => ({ ...prev, country_id: india.country_id }));
        }
      } catch (err) {
        setPartnerCountriesError("Could not load countries. Please refresh.");
        console.error(err);
      } finally {
        setPartnerCountriesLoading(false);
      }
    }
    loadPartnerCountries();
  }, []);

  // ── Partner handlers ──────────────────────────────────────────────────
  const handlePartnerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPartnerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerError("");
    setPartnerLoading(true);
    try {
      await submitPartnerLead(partnerForm);
      setPartnerSubmitted(true);
      setPartnerForm(INITIAL_PARTNER_FORM);
    } catch (err) {
      setPartnerError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email partners@sisglobal.com."
      );
    } finally {
      setPartnerLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>

        {/* ══════════ HERO ══════════ */}
        {/* <CountrySlider /> */}
        {/* ══════════ HERO SECTION ══════════ */}
<section className="relative overflow-hidden bg-brand-grey-900 text-white">
  {/* Banner Image as background */}
  <div className="absolute inset-0">
    <img
      src={images.employer.banner}
      alt="Employer Workforce Solutions"
      className="w-full h-full object-cover"
    />
    {/* Dark gradient overlay so text stays readable */}
<div
  className="absolute inset-0"
  style={{
    background:
      "linear-gradient(100deg, rgba(17,17,17,0.75) 0%, rgba(17,17,17,0.6) 40%, rgba(17,17,17,0.3) 75%, rgba(17,17,17,0.1) 100%)",
  }}
/>
  </div>

  {/* Decorative elements */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-white/5" />
    <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-brand-red/10" />
    <div className="absolute right-0 top-0 w-1/2 h-full" style={{ background: "radial-gradient(ellipse 60% 80% at 90% 30%, rgba(200,16,46,0.16) 0%, transparent 70%)" }} />
  </div>

  <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
    <div className="flex items-center gap-1.5 text-xs text-white/40 mb-8">
      <Link href="/" className="hover:text-white transition-colors">Home</Link>
      <ChevronRight size={11} />
      <span className="text-white/70">For Employers</span>
    </div>

    <div className="grid md:grid-cols-2 gap-14 items-center">
      <div>
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full mb-6" style={{ background: "rgba(200,16,46,0.2)", color: "#FF6B7A", border: "1px solid rgba(200,16,46,0.3)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
          For Employers
        </span>
        <h1 className="text-5xl md:text-6xl font-bold leading-[1.04] mb-5" style={{ fontFamily: "var(--font-display)" }}>
          Hire Verified Talent, <span className="text-brand-red">Faster</span>
        </h1>
        <p className="text-white/60 text-lg leading-relaxed mb-8">
          Partner with SIS Global for pre-verified candidates, full compliance management, and 48-hour shortlisting — backed by 31+ years of workforce solutions expertise across India.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#partner-form" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white text-sm font-semibold rounded-full hover:bg-brand-red/90 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
            Post a Requirement <ArrowRight size={15} />
          </a>
          <a href="tel:01244171888" className="inline-flex items-center gap-2 px-5 py-3 border border-white/25 text-white/80 text-sm font-semibold rounded-full hover:border-white/60 hover:text-white transition-colors" style={{ fontFamily: "var(--font-display)" }}>
            <Phone size={14} /> Talk to Us
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* ══════════ WHY SIS ══════════ */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-brand-red mb-3 px-3 py-1.5 rounded-full" style={{ background: "rgba(200,16,46,0.08)" }}>Why Choose Us</span>
              <h2 className="text-4xl font-bold text-brand-grey-900" style={{ fontFamily: "var(--font-display)" }}>Why Top Employers Trust SIS Global</h2>
              <div className="section-divider mt-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_CARDS.map((c) => (
                <div key={c.title} className="group p-6 rounded-2xl border border-brand-grey-200 hover:border-brand-red/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-brand-red" style={{ background: "rgba(200,16,46,0.08)" }}>{c.icon}</div>
                  <h3 className="font-bold text-brand-grey-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>{c.title}</h3>
                  <p className="text-xs text-brand-grey-500 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ HOW IT WORKS ══════════ */}
        {/* <section className="py-16" style={{ background: "linear-gradient(135deg,#F9F9F9 0%,#F2F2F2 100%)" }}>
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-grey-900" style={{ fontFamily: "var(--font-display)" }}>How It Works</h2>
              <div className="section-divider mt-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((step, i) => (
                <div key={step.id} className="relative">
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-5 left-full w-full h-px z-0" style={{ background: "linear-gradient(90deg,#C8102E,transparent)" }} />
                  )}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mb-4 shadow-lg" style={{ background: "linear-gradient(135deg,#C8102E,#A00D25)", fontFamily: "var(--font-display)" }}>
                      {step.id}
                    </div>
                    <h3 className="font-bold text-brand-grey-900 mb-2 text-sm" style={{ fontFamily: "var(--font-display)" }}>{step.title}</h3>
                    <p className="text-xs text-brand-grey-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ══════════ ASSOCIATE PARTNER FORM ══════════ */}
        <section id="partner-form" className="py-20" style={{ background: "linear-gradient(160deg,#FAFAFA 0%,#F3F3F3 100%)" }}>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-brand-red mb-3 px-3 py-1.5 rounded-full" style={{ background: "rgba(200,16,46,0.08)" }}>Apply Now</span>
              {/* <h2 className="text-4xl font-bold text-brand-grey-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>Register Your Interest</h2> */}
              <p className="text-brand-grey-500 text-sm">Complete your application below. Our partnerships team reviews all applications within 48 hours.</p>
            </div>

            {partnerSubmitted ? (
              <div className="bg-white rounded-3xl border border-brand-grey-200 p-14 text-center shadow-lg" style={{ borderTop: "4px solid #C8102E" }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(200,16,46,0.08)" }}>
                  <Handshake size={36} className="text-brand-red" />
                </div>
                <h3 className="text-2xl font-bold text-brand-grey-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>Application Received!</h3>
                <p className="text-brand-grey-500 text-sm leading-relaxed max-w-md mx-auto mb-8">
                  Thank you for applying to the SIS Global Associate Partner Programme. Our partnerships team will review your application and contact you within <strong>48 hours</strong> to discuss next steps.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white text-sm font-semibold rounded-full hover:bg-brand-red/90 transition-colors">
                    Go to Homepage
                  </Link>
                  <button
                    onClick={() => { setPartnerForm(INITIAL_PARTNER_FORM); setPartnerSubmitted(false); }}
                    className="px-6 py-3 border border-brand-grey-300 text-brand-grey-700 text-sm font-semibold rounded-full hover:border-brand-red hover:text-brand-red transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handlePartnerSubmit}
                className="bg-white rounded-3xl border border-brand-grey-200 overflow-hidden shadow-xl"
                style={{ borderTop: "4px solid #C8102E" }}
              >
                <div className="px-8 py-8">
                  <div className="flex items-start gap-4 mb-6 pb-5 border-b border-brand-grey-100">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 text-white"
                      style={{ background: "linear-gradient(135deg,#C8102E,#A00D25)", fontFamily: "var(--font-display)" }}
                    >
                      <Handshake size={16} />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-grey-900 text-base" style={{ fontFamily: "var(--font-display)" }}>Employers Enquiry Form</h3>
                      <p className="text-xs text-brand-grey-400 mt-0.5">Please fill out the details below and we&apos;ll be in touch</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label>Contact Name</Label>
                      <Input
                        name="contact_name"
                        value={partnerForm.contact_name}
                        onChange={handlePartnerChange}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        name="phone"
                        value={partnerForm.phone}
                        onChange={handlePartnerChange}
                        placeholder="9876543210"
                        type="tel"
                      />
                    </div>

                    <div>
                      <Label>Organization Name</Label>
                      <Input
                        name="organisation_name"
                        value={partnerForm.organisation_name}
                        onChange={handlePartnerChange}
                        placeholder="Your company name"
                        type="text"
                      />
                    </div>

                    <div>
                      <Label>Email Address</Label>
                      <Input
                        name="email"
                        value={partnerForm.email}
                        onChange={handlePartnerChange}
                        placeholder="you@company.com"
                        type="email"
                      />
                    </div>

                    <div>
                      <Label>Country</Label>
                      {partnerCountriesLoading ? (
                        <div className="w-full px-4 py-3 border border-brand-grey-200 rounded-xl text-sm text-brand-grey-400 flex items-center gap-2 bg-white">
                          <Loader2 size={14} className="animate-spin" />
                          Loading countries…
                        </div>
                      ) : partnerCountriesError ? (
                        <div className="w-full px-4 py-3 border border-red-200 rounded-xl text-xs text-red-500 bg-red-50">
                          {partnerCountriesError}
                        </div>
                      ) : (
                        <select
                          value={partnerForm.country_id ?? ""}
                          onChange={(e) =>
                            setPartnerForm({ ...partnerForm, country_id: e.target.value ? Number(e.target.value) : null })
                          }
                          className="w-full px-4 py-3 border border-brand-grey-200 rounded-xl text-sm text-brand-grey-700 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors bg-white appearance-none cursor-pointer"
                        >
                          <option value="">Select your country</option>
                          {partnerCountries.map((country) => (
                            <option key={country.country_id} value={country.country_id}>
                              {country.country_name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    <div>
                      <Label>Address</Label>
                      <Input
                        name="address"
                        value={partnerForm.address}
                        onChange={handlePartnerChange}
                        placeholder="Your office address"
                      />
                    </div>

                    <div>
                      <Label>Additional Notes</Label>
                      <TextArea
                        name="notes"
                        value={partnerForm.notes}
                        onChange={handlePartnerChange}
                        placeholder="Any additional information you'd like to share about your business or partnership goals..."
                        rows={4}
                      />
                    </div>
                  </div>

                  {partnerError && (
                    <div
                      className="flex items-start gap-2 px-4 py-3 rounded-xl mt-6 text-sm"
                      style={{ background: "#FFF0F2", border: "1px solid rgba(200,16,46,0.2)", color: "#C8102E" }}
                    >
                      <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                      <span>{partnerError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={partnerLoading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-red text-white text-sm font-semibold rounded-xl hover:bg-brand-red/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-8"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {partnerLoading ? (
                      <><Loader2 size={18} className="animate-spin" /> Submitting...</>
                    ) : (
                      <><Upload size={18} /> Submit Application</>
                    )}
                  </button>

                  <p className="text-center text-xs text-brand-grey-400 mt-6">
                    By submitting this application, you agree to our{" "}
                    <Link href="/terms" className="text-brand-red hover:underline">Terms of Service</Link> and{" "}
                    <Link href="/privacy" className="text-brand-red hover:underline">Privacy Policy</Link>.
                  </p>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* ══════════ BOTTOM CTA ══════════ */}
        <section className="py-16 text-white text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg,#C8102E 0%,#A00D25 60%,#7A0A1C 100%)" }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full border border-white/10" />
            <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full border border-white/10" />
          </div>
          <div className="max-w-3xl mx-auto px-4 relative z-10">
            <Building2 size={34} className="mx-auto mb-4 opacity-70" />
            <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>Need Workforce Now?</h2>
            <p className="text-white/70 mb-8 text-base">Skip the form — talk to our sales team directly for same-day consultation.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+911149032418" className="btn-outline !text-white !border-white hover:!bg-white hover:!text-brand-red"><Phone size={15} /> 011-49032418</a>
              <a href="mailto:employers@sisglobal.com" className="btn-outline !text-white !border-white/50 hover:!bg-white/20"><Mail size={15} /> employers@sisglobal.com</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}