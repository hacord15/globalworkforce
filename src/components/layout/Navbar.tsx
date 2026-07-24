"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Phone, Mail, Menu, X } from "lucide-react";
import { navItems } from "@/data";
import { UserProfileDropdown } from "../ui/UserProfileDropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { images } from "@/lib/images";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const toggleMobileDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      {/* Top bar */}
      {/* <div className="bg-white border-b border-gray-200 py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="mailto:info@sisglobalworkforce.com" className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors">
              <Mail size={14} />
              info@sisglobalworkforce.com
            </a>
            <a
              href="tel:+911149032418"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              <Phone size={14} />
              011-49032418
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Follow Us:</span>
            {[
              {
                icon: faLinkedinIn,
                href: "https://www.linkedin.com/company/sisglobalworkforcesolutions",
                key: "linkedin",
              },
              {
                icon: faFacebookF,
                href: "https://www.facebook.com/people/SIS-Global-Workforce-Solutions/61589420021952/",
                key: "facebook",
              },
              {
                icon: faInstagram,
                href: "https://www.instagram.com/sisglobalworkforce/",
                key: "instagram",
              },
            ].map((social) => (
              <a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.key}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-all"
              >
                <FontAwesomeIcon icon={social.icon} className="text-xs" />
              </a>
            ))}
          </div>
        </div>
      </div> */}

      {/* Main nav */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-22">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src={images.logos.primary}
              alt="SIS Global"
              // className="h-[75px] md:h-[85px] lg:h-[95px] w-auto object-contain"
              // className="h-[68px] md:h-[74px] lg:h-[80px] w-auto object-contain"
              className="h-[72px] md:h-[80px] lg:h-[88px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 transition-colors whitespace-nowrap"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {item.children && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-md border-t-2 border-red-600 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA buttons - Desktop only */}
          <div className="hidden lg:flex items-center gap-3">
            <UserProfileDropdown />
          </div>

          {/* Mobile: UserProfileDropdown (left) + Hamburger (right) */}
          <div className="lg:hidden flex items-center gap-3">
            <UserProfileDropdown />
            <button
              className="p-2 text-gray-700 hover:text-red-600 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Slide down */}
        <div className={`lg:hidden fixed inset-x-0 top-[72px] z-40 bg-white shadow-xl border-t border-gray-200 transition-all duration-300 ease-in-out overflow-y-auto ${mobileOpen ? 'max-h-[calc(100vh-72px)] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}>
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-gray-100 last:border-0">
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleMobileDropdown(item.label)}
                      className="w-full flex items-center justify-between py-3 px-2 text-base font-medium text-gray-700 hover:text-red-600 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div className={`overflow-hidden transition-all duration-200 ${openDropdown === item.label ? 'max-h-96' : 'max-h-0'}`}>
                      <div className="pl-4 pb-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block py-2 px-3 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-3 px-2 text-base font-medium text-gray-700 hover:text-red-600 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Contact Info */}
            <div className="pt-4 mt-2 space-y-3">
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href="tel:+911149032418"
                  className="flex items-center gap-3 py-2 px-2 text-sm text-gray-700 hover:text-red-600"
                >
                  <Phone size={16} />
                 +91-11-4903-2418
                </a>
                <a
                  href="mailto:info@sisglobalworkforce.com"
                  className="flex items-center gap-3 py-2 px-2 text-sm text-gray-700 hover:text-red-600"
                >
                  <Mail size={16} />
                  info@sisglobalworkforce.com
                </a>
              </div>

              {/* Mobile Social Links */}
              <div className="flex items-center gap-3 pt-4 px-2">
                <span className="text-sm text-gray-500">Follow Us:</span>
                <div className="flex gap-2">
                  {[
                    { icon: faLinkedinIn, key: "linkedin" },
                    { icon: faFacebookF, key: "facebook" },
                    { icon: faInstagram, key: "instagram" },
                    { icon: faYoutube, key: "youtube" },
                  ].map((social) => (
                    <a
                      key={social.key}
                      href="#"
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-all"
                    >
                      <FontAwesomeIcon icon={social.icon} className="text-xs" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}