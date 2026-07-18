// src/app/contact/page.tsx  ← SERVER COMPONENT (no "use client")
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactClient from "./ContactClient";

// ── Static data lives here so it never ships to the browser bundle ─────────

export const OFFICE = {
  name:    "SIS Global Workforce Solutions Pvt. Ltd.",
  address: "A-28 & 29, Phase-1, Okhla Industrial Area, New Delhi – 110020",
  phone:   "+91-11-49032418",
  email:   "info@sisglobalworkforce.com",
  hours:   "Monday to Saturday: 9:00 AM to 6:30 PM",
  mapUrl:  "https://maps.google.com/?q=A-28+Okhla+Industrial+Area+Phase+1+New+Delhi",
  socials: {
    linkedin:  "https://www.linkedin.com/company/sisglobalworkforcesolutions/",
    instagram: "https://www.instagram.com/sisglobalworkforce/",
    facebook:  "https://www.facebook.com/sisglobalworkforce",
  },
} as const;

export const FAQS = [
  { q: "How quickly can you deploy workforce?",   a: "For most roles we can shortlist candidates within 48 hours and deploy within 5–7 working days, depending on documentation." },
  { q: "What industries do you specialise in?",   a: "We serve Healthcare, Hospitality, Oil & Gas, Logistics, Engineering & MEP, IT, and more across India and internationally." },
  { q: "Do you provide payroll management?",      a: "Yes — our end-to-end payroll services cover salary processing, statutory compliance, and full-and-final settlement." },
  { q: "Which countries do you operate in?",      a: "India (pan-India), UAE, Singapore, UK, Australia, and the USA. We are actively expanding to more geographies." },
  { q: "How are candidates verified?",            a: "All candidates undergo background checks, reference verification, skill assessments, and document validation before placement." },
  { q: "Can I hire contract staff through you?",  a: "Absolutely. We offer flexible contract and temporary staffing with complete legal and statutory compliance managed by us." },
] as const;

// ── SEO metadata (server-only) ─────────────────────────────────────────────

export const metadata: Metadata = {
  title:       "Contact Us | SIS Global Workforce Solutions",
  description: "Get in touch with SIS Global Workforce Solutions. Reach our office in New Delhi or send us your hiring requirement or job application.",
  openGraph: {
    title:       "Contact SIS Global Workforce Solutions",
    description: "Hire skilled workforce or find international jobs. Office in Okhla Industrial Area, New Delhi.",
    url:         "https://sisglobalworkforce.com/contact",
    siteName:    "SIS Global Workforce Solutions",
    type:        "website",
  },
};

// ── Server Component shell ─────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactClient office={OFFICE} faqs={FAQS} />
      <Footer />
    </>
  );
}