"use client";

import { images } from "@/lib/images";
import Link from "next/link";
import {
  FaLinkedin, FaFacebook, FaInstagram,
  FaBriefcase, FaBuilding, FaFileAlt, FaQuestionCircle,
  FaHandshake, FaInfoCircle, FaEnvelope, FaFileContract,
  FaShieldAlt, FaCookie, FaChevronRight, FaHome,
  FaCommentAlt, FaGlobe, FaMapMarkerAlt, FaUserNurse,
  FaHardHat, FaConciergeBell,
} from "react-icons/fa";

// ── Footer link data ────────────────────────────────────────────────────────
// For job seeker links: use search params to pre-filter the jobs page
// location=Dubai   → filters by country_name
// category=Healthcare → filters by category_name (exact match, case-insensitive)

const footerLinks = {
  Company: [
    { label: "Home", href: "/", icon: FaHome },
    { label: "About Us", href: "/sis-global", icon: FaInfoCircle },
    { label: "Feedback", href: "/feedback", icon: FaCommentAlt },
    { label: "Contact Us", href: "/contact", icon: FaEnvelope },
  ],
  "For Employers": [
    { label: "Countries", href: "/countries", icon: FaGlobe },
    { label: "Industries", href: "/industries", icon: FaBuilding },
    { label: "FAQs", href: "/faq", icon: FaQuestionCircle },
    { label: "Enquiry Form", href: "/contact", icon: FaFileAlt },
  ],
  // ↓ href values use query params so the jobs page filters automatically
  "For Job Seekers": [
    { label: "Find Jobs", href: "/jobs", icon: FaBriefcase },
    { label: "Jobs in Dubai", href: "/jobs?location=United+Arab+Emirates", icon: FaMapMarkerAlt },
    { label: "Jobs in Qatar", href: "/jobs?location=Qatar", icon: FaMapMarkerAlt },
    { label: "Nursing Jobs", href: "/jobs?category=Healthcare", icon: FaUserNurse },
    { label: "Civil Engineer Jobs", href: "/jobs?category=Engineering", icon: FaHardHat },
    { label: "Hotel Jobs", href: "/jobs?category=Hospitality+%26+Tourism", icon: FaConciergeBell },
    { label: "Sales Jobs", href: "/jobs?category=Sales", icon: FaHandshake },
  ],
  "Quick Links": [
    { label: "Privacy Policy", href: "/privacy-policy", icon: FaShieldAlt },
    { label: "Terms of Use", href: "/terms-conditions", icon: FaFileContract },
    { label: "Cookie Policy", href: "/cookies-policy", icon: FaCookie },
  ],
};

const socialLinks = [
  { icon: FaLinkedin, href: "https://www.linkedin.com/company/sisglobalworkforcesolutions", label: "LinkedIn", color: "hover:bg-[#0077B5]" },
  { icon: FaFacebook, href: "https://www.facebook.com/people/SIS-Global-Workforce-Solutions/61589420021952/", label: "Facebook", color: "hover:bg-[#4267B2]" },
  { icon: FaInstagram, href: "https://www.instagram.com/sisglobalworkforce/", label: "Instagram", color: "hover:bg-[#E4405F]" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-brand-grey-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="text-center">
              <Link href="/" className="inline-block">
                <img
                  src={images.logos.secondary}
                  alt="SIS Global"
                  className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto object-contain transition-transform hover:scale-105 duration-300"
                  style={{ maxHeight: "160px" }}
                />
              </Link>
            </div>
            <p className="text-brand-grey-400 text-sm leading-relaxed mb-6">
              A global workforce solutions partner connecting
              skilled, verified talent with trusted employers
              worldwide.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-brand-grey-800 flex items-center justify-center text-brand-grey-300 hover:text-white transition-all duration-300 ${s.color} hover:scale-110`}
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="sm:col-span-1">
              <h4 className="text-xs font-semibold text-brand-grey-300 uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-brand-grey-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      <link.icon className="w-3.5 h-3.5 text-brand-grey-500 group-hover:text-brand-red transition-colors flex-shrink-0" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-grey-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-brand-grey-500 text-xs sm:text-sm order-2 md:order-1">
              © {new Date().getFullYear()} SIS Global Workforce Solutions. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 order-1 md:order-2">
              <Link href="/privacy-policy" className="text-brand-grey-500 hover:text-white text-xs sm:text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms-conditions" className="text-brand-grey-500 hover:text-white text-xs sm:text-sm transition-colors">Terms of Use</Link>
              <Link href="/cookies-policy" className="text-brand-grey-500 hover:text-white text-xs sm:text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top — mobile */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-brand-red text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-110 z-50 md:hidden"
        aria-label="Back to top"
      >
        <FaChevronRight className="w-5 h-5 transform -rotate-90" />
      </button>
    </footer>
  );
}