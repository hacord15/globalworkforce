"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight, ChevronRight, Globe,
  TrendingUp, Users, Handshake, Award, Shield,
  Phone, Mail, Upload, AlertCircle, Star, DollarSign, Loader2,
} from "lucide-react";
import { images } from "@/lib/images";

// ── Configuration ─────────────────────────────────────────────────────────
// const LEAD_API_ENDPOINT = 'https://sisglobalapi.neuralinfo.co.in/public/leads';
// const COUNTRIES_API_ENDPOINT = 'https://sisglobalapi.neuralinfo.co.in/public/location/countries';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const LEAD_API_ENDPOINT = `${API_BASE_URL}/public/leads`;

const COUNTRIES_API_ENDPOINT = `${API_BASE_URL}/public/location/countries`;

// ── Types ──────────────────────────────────────────────────────────────────
interface Country {
  country_id: number;
  country_name: string;
}

interface LeadFormData {
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

const INITIAL_FORM: LeadFormData = {
  lead_type: "ASSOCIATE",
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
const BENEFITS = [
  { icon: <DollarSign size={22} />, title: "Revenue Sharing", desc: "Earn competitive commissions on every successful placement or service delivered through the SIS Global network." },
  { icon: <Globe size={22} />, title: "National Network", desc: "Tap into SIS Global's pan-India presence across 22+ states and reach clients you couldn't access independently." },
  { icon: <TrendingUp size={22} />, title: "Business Growth", desc: "Co-branded marketing materials, joint pitching support, and lead sharing to grow your business faster." },
  { icon: <Award size={22} />, title: "SIS Certification", desc: "Gain official SIS Associate Partner certification — a mark of trust recognised by 5,000+ enterprise clients." },
  { icon: <Users size={22} />, title: "Training & Support", desc: "Access onboarding training, SOPs, compliance resources, and a dedicated partner success manager." },
  { icon: <Shield size={22} />, title: "Compliance Umbrella", desc: "Operate under SIS Group's compliance framework, reducing your legal and operational risk." },
];

const TESTIMONIALS = [
  { name: "Pradeep Nair", org: "Nair Staffing Solutions, Kochi", quote: "Partnering with SIS Global doubled our client base in 8 months. The co-branded credibility opened doors we never could before.", rating: 5 },
  { name: "Meera Joshi", org: "TalentFirst HR, Pune", quote: "The compliance support alone was worth it. We stopped worrying about PF and ESI and focused entirely on recruitment.", rating: 5 },
  { name: "Aarav Malhotra", org: "GulfConnect Recruiters, Dubai", quote: "As an international partner, SIS Global gave us access to Indian employers who needed Gulf-ready talent. Excellent collaboration.", rating: 5 },
];

// ── API Function ───────────────────────────────────────────────────────────
async function submitLead(formData: LeadFormData) {
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
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
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

// ── Shared UI Components ────────────────────────────────────────────────────
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-bold text-brand-grey-700 uppercase tracking-widest mb-2">
      {children}{required && <span className="text-brand-red ml-0.5">*</span>}
    </label>
  );
}

function Input({ name, value, onChange, placeholder, type = "text", required = false }: {
  name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; type?: string; required?: boolean;
}) {
  return (
    <input
      type={type} name={name} value={value} onChange={onChange}
      placeholder={placeholder} required={required}
      className="w-full px-4 py-3 border border-brand-grey-200 rounded-xl text-sm text-brand-grey-800 placeholder-brand-grey-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors bg-white"
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

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-6 pb-5 border-b border-brand-grey-100">
      <h3 className="font-bold text-brand-grey-900 text-lg mb-1" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
      <p className="text-xs text-brand-grey-400">{desc}</p>
    </div>
  );
}

// ── Main Page Component ───────────────────────────────────────────────────
export default function LeadPage() {
  const [form, setForm] = useState<LeadFormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Countries state
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesError, setCountriesError] = useState("");

  // Fetch countries on mount
  // useEffect(() => {
  //   async function fetchCountries() {
  //     try {
  //       const res = await fetch(COUNTRIES_API_ENDPOINT, {
  //         headers: { accept: "application/json" },
  //       });
  //       if (!res.ok) throw new Error(`Status ${res.status}`);
  //       const data: Country[] = await res.json();
  //       setCountries(data);
  //     } catch (err) {
  //       setCountriesError("Could not load countries. Please refresh.");
  //       console.error("Countries fetch error:", err);
  //     } finally {
  //       setCountriesLoading(false);
  //     }
  //   }
  //   fetchCountries();
  // }, []);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(COUNTRIES_API_ENDPOINT, {
          headers: { accept: "application/json" },
        });

        if (!res.ok) throw new Error(`Status ${res.status}`);

        const data: Country[] = await res.json();

        setCountries(data);

        const india = data.find(
          (country) => country.country_name === "India"
        );

        if (india) {
          setForm((prev) => ({
            ...prev,
            country_id: india.country_id,
          }));
        }
      } catch (err) {
        setCountriesError("Could not load countries. Please refresh.");
        console.error(err);
      } finally {
        setCountriesLoading(false);
      }
    }

    fetchCountries();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ── Submit Handler ─────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    setLoading(true);

    try {
      await submitLead(form);
      setSubmitted(true);
      setForm(INITIAL_FORM);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email partners@sisglobal.com."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* ══════════ HERO SECTION ══════════ */}
        {/* ══════════ HERO SECTION ══════════ */}
        <section className="relative overflow-hidden bg-brand-grey-900 text-white">
          {/* Banner Image as background */}
          <div className="absolute inset-0">
            <img
              src={images.associate.banner}
              alt="Associate Partner Programme"
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay so text stays readable */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, rgba(17,17,17,0.94) 0%, rgba(17,17,17,0.82) 40%, rgba(17,17,17,0.45) 75%, rgba(17,17,17,0.2) 100%)",
              }}
            />
          </div>

          {/* Decorative elements — stays on top of image + overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-white/5" />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-brand-red/10" />
            <div className="absolute right-0 top-0 w-1/2 h-full" style={{ background: "radial-gradient(ellipse 60% 80% at 90% 30%, rgba(200,16,46,0.16) 0%, transparent 70%)" }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
            <div className="flex items-center gap-1.5 text-xs text-white/40 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={11} />
              <span className="text-white/70">Associate Partner Programme</span>
            </div>

            <div className="grid md:grid-cols-2 gap-14 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full mb-6" style={{ background: "rgba(200,16,46,0.2)", color: "#FF6B7A", border: "1px solid rgba(200,16,46,0.3)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                  Grow Together
                </span>
                <h1 className="text-5xl md:text-6xl font-bold leading-[1.04] mb-5" style={{ fontFamily: "var(--font-display)" }}>
                  Become an <span className="text-brand-red">Associate Partner</span>
                </h1>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Join India&apos;s largest workforce solutions network. Co-brand with SIS Global, expand your reach, earn competitive commissions, and grow your business under a trusted 31-year legacy.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#lead-form" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white text-sm font-semibold rounded-full hover:bg-brand-red/90 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    Apply Now <ArrowRight size={15} />
                  </a>
                  <a href="tel:01244171888" className="inline-flex items-center gap-2 px-5 py-3 border border-white/25 text-white/80 text-sm font-semibold rounded-full hover:border-white/60 hover:text-white transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    <Phone size={14} /> Talk to Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ BENEFITS SECTION ══════════ */}
        <section className="py-20" style={{ background: "linear-gradient(135deg,#F9F9F9 0%,#F2F2F2 100%)" }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-brand-red mb-3 px-3 py-1.5 rounded-full" style={{ background: "rgba(200,16,46,0.08)" }}>Partner Benefits</span>
              <h2 className="text-4xl font-bold text-brand-grey-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>What You Get as a Partner</h2>
              <div className="w-16 h-0.5 bg-brand-red mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BENEFITS.map((b) => (
                <div key={b.title} className="group p-6 rounded-2xl bg-white border border-brand-grey-200 hover:border-brand-red/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-brand-red" style={{ background: "rgba(200,16,46,0.08)" }}>{b.icon}</div>
                  <h3 className="font-bold text-brand-grey-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>{b.title}</h3>
                  <p className="text-xs text-brand-grey-500 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ TESTIMONIALS SECTION ══════════ */}
        {/* <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-grey-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>What Our Partners Say</h2>
              <div className="w-16 h-0.5 bg-brand-red mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="p-6 rounded-2xl border border-brand-grey-200 hover:border-brand-red/20 hover:shadow-md transition-all">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-brand-red fill-brand-red" />
                    ))}
                  </div>
                  <p className="text-sm text-brand-grey-600 leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white" style={{ background: "#C8102E", fontFamily: "var(--font-display)" }}>
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-brand-grey-900">{t.name}</p>
                      <p className="text-[11px] text-brand-grey-400">{t.org}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ══════════ LEAD FORM SECTION ══════════ */}
        <section id="lead-form" className="py-20" style={{ background: "linear-gradient(160deg,#FAFAFA 0%,#F3F3F3 100%)" }}>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-brand-red mb-3 px-3 py-1.5 rounded-full" style={{ background: "rgba(200,16,46,0.08)" }}>Apply Now</span>
              <h2 className="text-4xl font-bold text-brand-grey-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>Register Your Interest</h2>
              <p className="text-brand-grey-500 text-sm">Complete your application below. Our partnerships team reviews all applications within 48 hours.</p>
            </div>

            {submitted ? (
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
                    onClick={() => { setForm(INITIAL_FORM); setSubmitted(false); }}
                    className="px-6 py-3 border border-brand-grey-300 text-brand-grey-700 text-sm font-semibold rounded-full hover:border-brand-red hover:text-brand-red transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-brand-grey-200 overflow-hidden shadow-xl" style={{ borderTop: "4px solid #C8102E" }}>
                <div className="px-8 py-8">
                  <SectionHeader title="Enquiry Form" desc="Please fill out the form below" />

                  <div className="space-y-6">
                    {/* Contact Name */}
                    <div>
                      <Label>Contact Name</Label>
                      <Input
                        name="contact_name"
                        value={form.contact_name}
                        onChange={handleChange}
                        placeholder="Your full name"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        type="tel"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <Label>Email Address</Label>
                      <Input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        type="email"
                      />
                    </div>

                    {/* Country Dropdown */}
                    <div>
                      <Label>Country</Label>
                      {countriesLoading ? (
                        <div className="w-full px-4 py-3 border border-brand-grey-200 rounded-xl text-sm text-brand-grey-400 flex items-center gap-2 bg-white">
                          <Loader2 size={14} className="animate-spin" />
                          Loading countries…
                        </div>
                      ) : countriesError ? (
                        <div className="w-full px-4 py-3 border border-red-200 rounded-xl text-xs text-red-500 bg-red-50">
                          {countriesError}
                        </div>
                      ) : (
                        <select
                          value={form.country_id ?? ""}
                          onChange={(e) => setForm({ ...form, country_id: Number(e.target.value) })}
                          className="w-full px-4 py-3 border border-brand-grey-200 rounded-xl text-sm text-brand-grey-700 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors bg-white appearance-none cursor-pointer"
                        >
                          <option value="">Select your country</option>
                          {countries.map((country) => (
                            <option key={country.country_id} value={country.country_id}>
                              {country.country_name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <Label>Address</Label>
                      <Input
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Your office address"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <Label>Additional Notes</Label>
                      <TextArea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Any additional information you'd like to share about your business or partnership goals..."
                        rows={4}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 px-4 py-3 rounded-xl mt-6 text-sm" style={{ background: "#FFF0F2", border: "1px solid rgba(200,16,46,0.2)", color: "#C8102E" }}>
                      <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-red text-white text-sm font-semibold rounded-xl hover:bg-brand-red/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-8"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {loading ? (
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

        {/* ══════════ CTA SECTION ══════════ */}
        <section className="py-16 text-white text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg,#C8102E 0%,#A00D25 60%,#7A0A1C 100%)" }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full border border-white/10" />
            <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full border border-white/10" />
          </div>
          <div className="max-w-3xl mx-auto px-4 relative z-10">
            <Handshake size={34} className="mx-auto mb-4 opacity-70" />
            <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>Ready to Grow Together?</h2>
            <p className="text-white/70 mb-8 text-base">Call our partnerships team for a direct conversation — we&apos;ll find the right model for your business.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+911149032418"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white text-sm font-semibold rounded-full hover:bg-white hover:text-brand-red transition-colors"
              >
                <Phone size={15} />
                011-49032418
              </a>
              <a href="mailto:partners@sisglobal.com" className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/50 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-colors">
                <Mail size={15} /> partners@sisglobal.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}