"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Send, CheckCircle, MessageSquare } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ── Sub-components ─────────────────────────────────────────────────────────

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
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
        className="w-full px-4 py-3 border border-brand-grey-200 rounded-xl text-sm text-brand-grey-800 placeholder-brand-grey-400 focus:outline-none focus:border-brand-red transition-colors bg-white"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
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
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
  required = false,
  rows = 4,
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-brand-grey-700 uppercase tracking-widest mb-2">
        {label}
      </label>
      <textarea
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-brand-grey-200 rounded-xl text-sm text-brand-grey-800 placeholder-brand-grey-400 focus:outline-none focus:border-brand-red resize-none transition-colors"
      />
    </div>
  );
}

function CheckboxField({
  label,
  name,
  required = false,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        name={name}
        required={required}
        className="mt-1 w-4 h-4 border border-brand-grey-300 rounded text-brand-red focus:ring-brand-red focus:ring-1 focus:ring-offset-0"
      />
      <label className="text-sm text-brand-grey-600 leading-relaxed">
        {label}{" "}
        <Link href="/privacy" className="text-brand-red hover:underline">
          Privacy Policy
        </Link>
      </label>
    </div>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="btn-primary w-full justify-center text-sm"
      style={{ opacity: loading ? 0.85 : 1 }}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Submitting…
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Send size={15} />
          {label}
        </span>
      )}
    </button>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-14">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
        style={{ background: "rgba(200,16,46,0.08)" }}
      >
        <CheckCircle size={38} className="text-brand-red" />
      </div>
      <h3
        className="text-2xl font-bold text-brand-grey-900 mb-3"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Thank You for Your Feedback!
      </h3>
      <p className="text-brand-grey-500 text-sm leading-relaxed max-w-sm mb-8">
        Your response has been recorded. We read every submission and use it to make
        SIS Global better for everyone.
      </p>
      <button onClick={onReset} className="btn-primary text-sm">
        Submit Another Response
      </button>
    </div>
  );
}

// ── Main page client component ─────────────────────────────────────────────

export default function FeedbackClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1600);
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* ── HERO ── */}
        <section
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg,#171717 0%,#262626 100%)" }}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-white/5" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full border border-brand-red/10" />
            <div
              className="absolute right-0 top-0 w-1/2 h-full"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 90% 40%, rgba(200,16,46,0.12) 0%, transparent 70%)",
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 py-20 relative z-10 text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-white/40 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight size={11} />
              <span className="text-white/70">Feedback</span>
            </div>

            <span
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(200,16,46,0.18)",
                color: "#FF6B7A",
                border: "1px solid rgba(200,16,46,0.28)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
              We Value Your Opinion
            </span>

            <h1
              className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Share Your <span className="text-brand-red">Experience</span>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed max-w-xl mx-auto">
              Your feedback helps us improve every aspect of our service — from the first
              application to post-deployment support. Every response is read and acted on.
            </p>
          </div>
        </section>

        {/* ── FORM SECTION ── */}
        <section
          className="py-20"
          style={{ background: "linear-gradient(160deg,#FAFAFA 0%,#F3F3F3 100%)" }}
        >
          <div className="max-w-3xl mx-auto px-4">
            {/* Form card */}
            <div
              className="bg-white rounded-3xl overflow-hidden shadow-xl"
              style={{ border: "1px solid #E5E5E5", borderTop: "4px solid #C8102E" }}
            >
              <div className="px-8 pt-8 pb-6 border-b border-brand-grey-100">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "#C8102E15", color: "#C8102E" }}
                  >
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h2
                      className="text-xl font-bold text-brand-grey-900"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Send Feedback
                    </h2>
                    <p className="text-xs text-brand-grey-500 mt-0.5">
                      We‘d love to hear from you – please fill out the form below.
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-8 py-8">
                {submitted ? (
                  <SuccessState onReset={handleReset} />
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <InputField
                        label="Full Name *"
                        name="fullName"
                        placeholder="Your full name"
                        required
                      />
                      <InputField
                        label="Email Address *"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <SelectField
                        label="Feedback Type *"
                        name="feedbackType"
                        options={["Employer", "Candidate", "Platform", "Other"]}
                        required
                      />
                      <InputField
                        label="Subject *"
                        name="subject"
                        placeholder="Brief subject"
                        required
                      />
                    </div>

                    <TextAreaField
                      label="Message *"
                      name="message"
                      placeholder="Please provide your detailed feedback…"
                      required
                      rows={5}
                    />

                    <CheckboxField
                      label="I consent to the processing of my personal data as described in the"
                      name="privacyConsent"
                      required
                    />

                    <SubmitButton loading={loading} label="Submit Feedback" />
                  </form>
                )}
              </div>
            </div>

            {/* Privacy note */}
            <p className="text-center text-xs text-brand-grey-400 mt-5 leading-relaxed">
              Your feedback is confidential and used only to improve our services.{" "}
              <Link href="/privacy" className="text-brand-red hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section
          className="py-14 text-white text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,#C8102E 0%,#A00D25 60%,#7A0A1C 100%)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full border border-white/10" />
          </div>
          <div className="max-w-2xl mx-auto px-4 relative z-10">
            <MessageSquare size={32} className="mx-auto mb-4 opacity-70" />
            <h2
              className="text-3xl font-bold mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Have a Specific Concern?
            </h2>
            <p className="text-white/70 text-sm mb-7 leading-relaxed">
              For urgent queries, complaints, or service requests — our team is
              available directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="btn-outline !text-white !border-white hover:!bg-white hover:!text-brand-red text-sm"
              >
                Contact Us Directly
              </Link>
              <Link
                href="/jobs"
                className="btn-outline !text-white !border-white/50 hover:!bg-white/20 text-sm"
              >
                Browse Jobs
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}