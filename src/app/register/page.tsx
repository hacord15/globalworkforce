// src/app/register/page.tsx
"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  User, Mail, Phone, FileText, MapPin,
  Calendar, ChevronDown, CheckCircle,
  AlertCircle, ArrowRight, ChevronLeft, Globe, Briefcase,
} from "lucide-react";

const API_BASE = "https://sisglobalapi.neuralinfo.co.in/public";

interface Country  { country_id: number; country_name: string; country_code: string; iso_code: string }
interface StateRow { state_id:   number; state_name:   string; country_id:  number  }
interface CityRow  { city_id:    number; city_name:    string; state_id:    number  }

interface SignupResponse {
  candidate_id: number; username: string; emailed: boolean;
  user_created: boolean; existing_user_used: boolean; auth_error?: string | null;
}

type Form = {
  first_name: string; last_name: string; phone: string; email: string;
  passport_number: string; dob: string; gender: string;
  country_id: number | ""; state_id: number | ""; city_id: number | "";
  experience: string; international_experience: string;
  
};


type FieldErrors = { phone?: string; email?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;
const emptyForm: Form = {
  first_name: "", last_name: "", phone: "", email: "",
  passport_number: "", dob: "", gender: "",
  country_id: "", state_id: "", city_id: "",
  experience: "", international_experience: "",
};

const fetchJson = <T,>(url: string): Promise<T> =>
  fetch(url).then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() as Promise<T>; });

const listCountries = () => fetchJson<Country[]>(`${API_BASE}/location/countries`);
const listStates    = (cid: number) => fetchJson<StateRow[]>(`${API_BASE}/location/states?country_id=${cid}`);
const listCities    = (sid: number) => fetchJson<CityRow[]>(`${API_BASE}/location/cities?state_id=${sid}`);

const candidateSignup = (payload: Record<string, unknown>): Promise<SignupResponse> =>
  fetch(`${API_BASE}/candidate-signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(async (r) => {
    if (!r.ok) throw new Error(await r.text().catch(() => `HTTP ${r.status}`));
    return r.json() as Promise<SignupResponse>;
  });

// ── Shared field label ────────────────────────────────────────────────────
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-grey-500 mb-1">
      {children}{required && <span className="text-brand-red ml-0.5">*</span>}
    </label>
  );
}

// ── Input ─────────────────────────────────────────────────────────────────
function Input({
  icon, type = "text", placeholder, value, onChange, onBlur,
  error, name, required = false, min,
}: {
  icon?: React.ReactNode; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; onBlur?: () => void;
  error?: string; name?: string; required?: boolean; min?: string;
}) {
  return (
    <div>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-grey-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          type={type} name={name} value={value} required={required} min={min}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`w-full ${icon ? "pl-9" : "pl-3.5"} pr-3.5 h-[38px] border rounded-lg text-[13px] text-brand-grey-800 placeholder-brand-grey-400 bg-white transition-colors focus:outline-none ${
            error
              ? "border-brand-red focus:border-brand-red"
              : "border-brand-grey-200 focus:border-brand-grey-400"
          }`}
        />
      </div>
      {error && (
        <p className="flex items-center gap-1 mt-1 text-[11px] text-brand-red">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );
}

// ── Select ────────────────────────────────────────────────────────────────
// function Select({
//   icon, placeholder, value, onChange, options, disabled = false,
// }: {
//   icon?: React.ReactNode; placeholder: string;
//   value: number | string; onChange: (v: number | string) => void;
//   options: { value: number | string; label: string }[];
//   disabled?: boolean;
// }) {
//   return (
//     <div className="relative">
//       {icon && (
//         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-grey-400 pointer-events-none z-10">
//           {icon}
//         </span>
//       )}
//       <select
//         value={value} disabled={disabled}
//         onChange={(e) => { const v = e.target.value; onChange(v === "" ? "" : Number(v)); }}
//         className={`w-full ${icon ? "pl-9" : "pl-3.5"} pr-8 h-[38px] border border-brand-grey-200 rounded-lg text-[13px] bg-white appearance-none cursor-pointer transition-colors focus:outline-none focus:border-brand-grey-400 disabled:bg-brand-grey-50 disabled:cursor-not-allowed disabled:text-brand-grey-400 ${
//           value === "" ? "text-brand-grey-400" : "text-brand-grey-800"
//         }`}
//       >
//         <option value="">{placeholder}</option>
//         {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
//       </select>
//       <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-grey-400 pointer-events-none" />
//     </div>
//   );
// }

function Select({
  icon,
  placeholder,
  value,
  onChange,
  options,
  disabled = false,
}: {
  icon?: React.ReactNode;
  placeholder: string;
  value: number | string;
  onChange: (v: number | string) => void;
  options: { value: number | string; label: string }[];
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-grey-400 pointer-events-none z-10">
          {icon}
        </span>
      )}

      <select
        value={value}
        disabled={disabled}
        onChange={(e) => {
          const v = e.target.value;

          // Gender options ko string hi rehne do
          if (v === "Male" || v === "Female" || v === "Other") {
            onChange(v);
          } else {
            onChange(v === "" ? "" : Number(v));
          }
        }}
        className={`w-full ${
          icon ? "pl-9" : "pl-3.5"
        } pr-8 h-[38px] border border-brand-grey-200 rounded-lg text-[13px] bg-white appearance-none cursor-pointer transition-colors focus:outline-none focus:border-brand-grey-400 disabled:bg-brand-grey-50 disabled:cursor-not-allowed disabled:text-brand-grey-400 ${
          value === "" ? "text-brand-grey-400" : "text-brand-grey-800"
        }`}
      >
        <option value="">{placeholder}</option>

        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={13}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-grey-400 pointer-events-none"
      />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const [form,        setForm]        = useState<Form>(emptyForm);
  const [countries,   setCountries]   = useState<Country[]>([]);
  const [states,      setStates]      = useState<StateRow[]>([]);
  const [cities,      setCities]      = useState<CityRow[]>([]);
  const [submitting,  setSubmitting]  = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [signup,      setSignup]      = useState<SignupResponse | null>(null);

  const set = useCallback(<K extends keyof Form>(k: K, v: Form[K]) =>
    setForm((prev) => ({ ...prev, [k]: v })), []);

  useEffect(() => { listCountries().then(setCountries).catch(() => {}); }, []);

  useEffect(() => {
    if (typeof form.country_id !== "number") {
      setStates([]); setCities([]);
      setForm((f) => ({ ...f, state_id: "", city_id: "" })); return;
    }
    let live = true;
    listStates(form.country_id)
      .then((r) => { if (live) { setStates(r); setCities([]); setForm((f) => ({ ...f, state_id: "", city_id: "" })); }})
      .catch(() => { if (live) { setStates([]); setCities([]); }});
    return () => { live = false; };
  }, [form.country_id]);

  useEffect(() => {
    if (typeof form.state_id !== "number") {
      setCities([]); setForm((f) => ({ ...f, city_id: "" })); return;
    }
    let live = true;
    listCities(form.state_id)
      .then((r) => { if (live) { setCities(r); setForm((f) => ({ ...f, city_id: "" })); }})
      .catch(() => { if (live) setCities([]); });
    return () => { live = false; };
  }, [form.state_id]);

  const validateField = (name: "phone" | "email", value: string) => {
    if (name === "phone") {
      if (!value.trim()) return "Mobile number is required";
      if (!PHONE_RE.test(value.trim())) return "Enter a valid 10-digit number";
    } else {
      if (!value.trim()) return "Email is required";
      if (!EMAIL_RE.test(value.trim())) return "Enter a valid email address";
    }
  };

  const canSubmit = useMemo(
    () => Boolean(
      form.first_name.trim() && form.last_name.trim() &&
      form.phone.trim() && form.email.trim() 
    ),
    [form.first_name, form.last_name, form.phone, form.email, form.passport_number, form.experience]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    const errs: FieldErrors = {
      phone: validateField("phone", form.phone),
      email: validateField("email", form.email),
    };
    setFieldErrors(errs);
    if (errs.phone || errs.email) return;
    setSubmitting(true); setServerError(null);
    try {
      const res = await candidateSignup({
        first_name:               form.first_name.trim(),
        last_name:                form.last_name.trim(),
        phone:                    form.phone.trim(),
        email:                    form.email.trim(),
        passport_number:          form.passport_number.trim(),
        dob:                      form.dob || null,
        gender:                   form.gender || null,
        country_id:               typeof form.country_id === "number" ? form.country_id : null,
        state_id:                 typeof form.state_id   === "number" ? form.state_id   : null,
        city_id:                  typeof form.city_id    === "number" ? form.city_id    : null,
        experience: form.experience.trim() || null,
        // international_experience: form.international_experience ? Number(form.international_experience) : null,
      });
      setSignup(res);
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success ──
  if (signup) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-20" style={{ background: "linear-gradient(160deg,#FAFAFA 0%,#F3F3F3 100%)" }}>
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="bg-white border border-brand-grey-200 rounded-2xl p-10 shadow-sm">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(200,16,46,0.08)" }}>
                <CheckCircle size={34} className="text-brand-red" />
              </div>
              <h2 className="text-xl font-bold text-brand-grey-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                Registration Successful!
              </h2>
              <div className="bg-brand-grey-50 rounded-lg p-3.5 mb-5 text-left border border-brand-grey-200">
                <p className="text-sm text-brand-grey-700 mb-1.5">
                  <span className="font-semibold">Username:</span>{" "}
                  <span className="font-bold text-brand-red">{signup.username}</span>
                </p>
                <p className="text-xs text-brand-grey-500">
                  {signup.user_created
                    ? signup.emailed
                      ? "✅ Account created and password emailed to you."
                      : "✅ Account created. Password could not be emailed — please contact support."
                    : signup.existing_user_used
                    ? "✅ Your profile was linked to an existing account."
                    : "⚠️ Profile saved but login account is pending — contact support."}
                </p>
                {signup.auth_error && (
                  <p className="text-xs text-brand-red mt-2 flex items-center gap-1">
                    <AlertCircle size={10} /> {signup.auth_error}
                  </p>
                )}
              </div>
              <p className="text-[13px] text-brand-grey-500 leading-relaxed mb-7">
                Your candidate profile has been created. Log in to complete document uploads and apply for jobs.
              </p>
              <div className="flex flex-col gap-2.5">
                <Link href="https://sisglobalapp.neuralinfo.co.in/portal/login/auth?portal=candidate"
                target="_blank"
                className="btn-primary justify-center">
                  Login & Complete Profile <ArrowRight size={14} />
                </Link>
                <Link
                  href="/jobs"
                  
                  className="flex items-center justify-center gap-2 px-5 py-2.5 border border-brand-grey-300 text-brand-grey-700 text-[13px] font-semibold rounded-lg hover:border-brand-red hover:text-brand-red transition-colors"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
                >
                  Browse Jobs
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ── Form ──
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12" style={{ background: "linear-gradient(160deg,#FAFAFA 0%,#F3F3F3 100%)" }}>
        <div className="max-w-2xl mx-auto px-4">

          {/* Intro text */}
          <p className="text-[13px] text-brand-grey-500 leading-relaxed mb-5">
            Complete your registration here. After login, you can finish document uploads inside the portal.
          </p>

          {/* Server error */}
          {serverError && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg mb-4 text-[13px]" style={{ background: "#FFF0F2", border: "1px solid rgba(200,16,46,0.22)", color: "#C8102E" }}>
              <AlertCircle size={14} className="flex-shrink-0" /> {serverError}
            </div>
          )}

          {/* Card */}
          <div className="bg-white border border-brand-grey-200 rounded-2xl p-7 shadow-sm">
            <h2 className="text-[17px] font-bold text-brand-grey-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>
              Registration
            </h2>
            <hr className="border-brand-grey-100 my-4" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">

              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label required>First Name</Label>
                  <Input placeholder="First name" value={form.first_name} onChange={(v) => set("first_name", v)} required />
                </div>
                <div>
                  <Label required>Last Name</Label>
                  <Input placeholder="Last name" value={form.last_name} onChange={(v) => set("last_name", v)} required />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label required>Mobile</Label>
                  <Input
                    icon={<Phone size={14} />} type="tel" placeholder="10-digit number"
                    value={form.phone}
                    onChange={(v) => {
                      const clean = v.replace(/\D/g, "").slice(0, 10);
                      set("phone", clean);
                      if (PHONE_RE.test(clean)) setFieldErrors((e) => ({ ...e, phone: undefined }));
                    }}
                    onBlur={() => setFieldErrors((e) => ({ ...e, phone: validateField("phone", form.phone) }))}
                    error={fieldErrors.phone}
                    required
                  />
                </div>
                <div>
                  <Label required>Email</Label>
                  <Input
                    icon={<Mail size={14} />} type="email" placeholder="your@email.com"
                    value={form.email}
                    onChange={(v) => {
                      set("email", v);
                      if (EMAIL_RE.test(v.trim())) setFieldErrors((e) => ({ ...e, email: undefined }));
                    }}
                    onBlur={() => setFieldErrors((e) => ({ ...e, email: validateField("email", form.email) }))}
                    error={fieldErrors.email}
                    required
                  />
                </div>
              </div>

              {/* Row 3 — Experience */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label >Experience (Years)</Label>
                  <Input
                    icon={<Briefcase size={14} />}
                    type="number"
                    placeholder="e.g. 3"
                    min="0"
                    value={form.experience}
                    onChange={(v) => set("experience", v)}
                    
                  />
                </div>
                <div>
                  <Label>International Experience (Years)</Label>
                  <Input
                    icon={<Globe size={14} />}
                    type="number"
                    placeholder="e.g. 1"
                    min="0"
                    value={form.international_experience}
                    onChange={(v) => set("international_experience", v)}
                  />
                </div>

              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label required>Passport No.</Label>
                  <Input icon={<FileText size={14} />} placeholder="A1234567" value={form.passport_number} onChange={(v) => set("passport_number", v)} />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-grey-400 pointer-events-none" />
                    <input
                      type="date" value={form.dob}
                      onChange={(e) => set("dob", e.target.value)}
                      className="w-full pl-9 pr-3 h-[38px] border border-brand-grey-200 rounded-lg text-[13px] text-brand-grey-700 bg-white focus:outline-none focus:border-brand-grey-400 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select
                    placeholder="Gender"
                    value={form.gender}
                    onChange={(v) => set("gender", String(v))}
                    options={[
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                      { value: "Other", label: "Other" },
                    ]}
                  />
                  
                </div>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Country</Label>
                  <Select
                    icon={<Globe size={14} />} placeholder="Country"
                    // value={form.country_id} onChange={(v) => set("country_id", v)}
                    value={form.country_id}
onChange={(v) => set("country_id", v as number | "")}
                    options={countries.map((c) => ({ value: c.country_id, label: c.country_name }))}
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Select
                    icon={<MapPin size={14} />} placeholder="State"
                    // value={form.state_id} onChange={(v) => set("state_id", v)}
                    value={form.state_id}
onChange={(v) => set("state_id", v as number | "")}
                    options={states.map((s) => ({ value: s.state_id, label: s.state_name }))}
                    disabled={typeof form.country_id !== "number"}
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Select
                    icon={<MapPin size={14} />} placeholder="City"
                    // value={form.city_id} onChange={(v) => set("city_id", v)}
                    value={form.city_id}
onChange={(v) => set("city_id", v as number | "")}
                    options={cities.map((c) => ({ value: c.city_id, label: c.city_name }))}
                    disabled={typeof form.state_id !== "number"}
                  />
                </div>
              </div>

              {/* Notice */}
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-[12px]" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.18)", color: "#1D4ED8" }}>
                <AlertCircle size={13} className="flex-shrink-0" />
                Document uploads are completed after login from the candidate portal.
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-0.5">
                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className="flex items-center justify-center gap-2 h-10 rounded-lg text-[13px] font-semibold text-white transition-opacity"
                  style={{ background: "linear-gradient(135deg,#C8102E,#A00D25)", opacity: !canSubmit || submitting ? 0.6 : 1, fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
                >
                  {submitting
                    ? <><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting…</>
                    : <>Submit <ArrowRight size={14} /></>}
                </button>
                <Link
                  href="https://sisglobalapp.neuralinfo.co.in/portal/login/auth?portal=candidate"
                  target="_blank"
                  className="flex items-center justify-center gap-2 h-10 border-[1.5px] border-brand-red text-brand-red text-[13px] font-semibold rounded-lg hover:bg-red-50 transition-colors"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
                >
                  Sign In
                </Link>
              </div>

              <Link href="/jobs" className="inline-flex items-center gap-1.5 text-[12px] text-brand-red hover:underline">
                <ChevronLeft size={13} /> Back to Jobs
              </Link>

            </form>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}