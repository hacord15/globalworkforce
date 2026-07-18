// src/app/cookies/page.tsx
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronRight, Cookie, Mail, Globe } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | SIS Global Workforce Solutions",
  description: "Cookie Policy for SIS Global Workforce Solutions — how we use cookies and how to manage them.",
};

const TOC = [
  { id: "what",      label: "What Are Cookies?"         },
  { id: "we-use",    label: "Cookies We Use"            },
  { id: "table",     label: "Cookie Details"            },
  { id: "third",     label: "Third-Party Cookies"       },
  { id: "manage",    label: "Managing Cookies"          },
  { id: "consent",   label: "Your Consent"              },
  { id: "changes",   label: "Changes to This Policy"   },
  { id: "contact",   label: "Contact Us"                },
];

const COOKIE_TYPES = [
  {
    type:    "Strictly Necessary",
    icon:    "🔒",
    color:   "#0BA02C",
    bg:      "#E7F9ED",
    border:  "rgba(11,160,44,0.2)",
    canOpt:  false,
    desc:    "Essential for the website to function. They enable core features such as logging in, account security, and remembering your session. These cannot be disabled.",
    examples:["Session cookies", "CSRF protection tokens", "Login state cookies"],
  },
  {
    type:    "Functional",
    icon:    "⚙️",
    color:   "#0A65CC",
    bg:      "#E8F1FB",
    border:  "rgba(10,101,204,0.2)",
    canOpt:  true,
    desc:    "Allow us to remember choices you make (such as language preferences, region, and saved job searches) to provide a more personalised experience.",
    examples:["Language preference", "Region / country selection", "Saved search filters"],
  },
  {
    type:    "Analytics",
    icon:    "📊",
    color:   "#FFB836",
    bg:      "#FFF8EC",
    border:  "rgba(255,184,54,0.25)",
    canOpt:  true,
    desc:    "Help us understand how visitors use our website so we can improve performance, identify popular pages, and fix errors. Data collected is aggregated and anonymised.',",
    examples:["Google Analytics", "Page views & session duration", "Error tracking"],
  },
  {
    type:    "Marketing",
    icon:    "📣",
    color:   "#C8102E",
    bg:      "rgba(200,16,46,0.06)",
    border:  "rgba(200,16,46,0.2)",
    canOpt:  true,
    desc:    "Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns. These may be set by third-party advertising partners.',",
    examples:["Remarketing pixels", "Ad performance tracking", "Social media cookies"],
  },
];

const COOKIE_TABLE = [
  { name: "_session",           type: "Necessary",  duration: "Session",  purpose: "Maintains user login session"                  },
  { name: "_csrf",              type: "Necessary",  duration: "Session",  purpose: "Cross-Site Request Forgery protection"         },
  { name: "lang_pref",          type: "Functional", duration: "1 year",   purpose: "Stores language/region preference"             },
  { name: "saved_filters",      type: "Functional", duration: "30 days",  purpose: "Remembers job search filter settings"          },
  { name: "_ga",                type: "Analytics",  duration: "2 years",  purpose: "Google Analytics — distinguishes unique users" },
  { name: "_gid",               type: "Analytics",  duration: "24 hours", purpose: "Google Analytics — session tracking"           },
  { name: "_fbp",               type: "Marketing",  duration: "90 days",  purpose: "Facebook pixel — ad targeting"                 },
  { name: "cookie_consent",     type: "Necessary",  duration: "1 year",   purpose: "Stores your cookie consent preference"         },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <h2 className="text-2xl font-bold text-brand-grey-900 mb-4 pb-3 border-b border-brand-grey-100" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
      <div className="space-y-4 text-sm text-brand-grey-600 leading-relaxed">{children}</div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 py-0.5">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg,#171717 0%,#262626 100%)" }}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-white/5" />
            <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full border border-brand-red/10" />
            <div className="absolute right-0 top-0 w-1/2 h-full" style={{ background: "radial-gradient(ellipse 60% 80% at 90% 30%, rgba(200,16,46,0.12) 0%, transparent 70%)" }} />
          </div>
          <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
            <div className="flex items-center gap-1.5 text-xs text-white/40 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={11} />
              <span className="text-white/70">Cookie Policy</span>
            </div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full mb-5" style={{ background: "rgba(200,16,46,0.2)", color: "#FF6B7A", border: "1px solid rgba(200,16,46,0.3)" }}>
              <Cookie size={12} /> Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Cookie <span className="text-brand-red">Policy</span>
            </h1>
            <p className="text-white/50 text-sm">Last updated: June 12, 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16" style={{ background: "linear-gradient(160deg,#FAFAFA 0%,#F3F3F3 100%)" }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">

              {/* Sidebar */}
              <aside className="lg:sticky lg:top-24 hidden lg:block">
                <div className="bg-white rounded-2xl border border-brand-grey-200 overflow-hidden shadow-sm">
                  <div className="px-4 py-3 border-b border-brand-grey-100" style={{ background: "#FFF5F6" }}>
                    <p className="text-xs font-bold text-brand-red tracking-widest uppercase">On This Page</p>
                  </div>
                  <nav className="p-2">
                    {TOC.map((item) => (
                      <a key={item.id} href={`#${item.id}`} className="block px-3 py-2 rounded-lg text-xs font-medium text-brand-grey-600 hover:text-brand-red hover:bg-brand-grey-50 transition-colors">
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="mt-5 rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg,#C8102E 0%,#900B20 100%)" }}>
                  <p className="font-bold text-sm mb-1" style={{ fontFamily: "var(--font-display)" }}>Manage Cookies</p>
                  <p className="text-white/70 text-xs leading-relaxed mb-4">You can update your cookie preferences at any time through your browser settings.</p>
                  <Link href="/contact" className="block w-full py-2.5 rounded-lg bg-white text-center text-sm font-bold text-brand-red hover:bg-brand-grey-50 transition-colors">
                    Contact Us →
                  </Link>
                </div>
              </aside>

              {/* Body */}
              <div className="bg-white rounded-3xl border border-brand-grey-200 p-6 sm:p-10 shadow-sm" style={{ borderTop: "4px solid #C8102E" }}>

                {/* Intro */}
                <div className="mb-10 pb-8 border-b border-brand-grey-100">
                  <p className="text-sm text-brand-grey-600 leading-relaxed">
                    This Cookie Policy explains how SIS Global Workforce Solutions Private Limited (&quot;we&quot;, &quot;us&quot;, or &quot;Company&quot;) uses cookies and similar tracking technologies when you visit our website at <a href="https://sisglobalworkforce.com" className="text-brand-red hover:underline">sisglobalworkforce.com</a>. It explains what these technologies are, why we use them, and your rights to control our use of them.
                  </p>
                </div>

                <Section id="what" title="1. What Are Cookies?">
                  <p>Cookies are small text files placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently, to remember your preferences, and to provide information to website owners.</p>
                  <p>Cookies can be &quot;first-party&quot; (set by us) or &quot;third-party&quot; (set by services we use, such as Google Analytics). They may also be:</p>
                  <ul className="mt-2 space-y-2">
                    <Bullet><strong className="text-brand-grey-800">Session Cookies</strong> — deleted automatically when you close your browser.</Bullet>
                    <Bullet><strong className="text-brand-grey-800">Persistent Cookies</strong> — remain on your device for a set period or until you delete them manually.</Bullet>
                  </ul>
                </Section>

                <Section id="we-use" title="2. Cookies We Use">
                  <p>We use four categories of cookies. Below is a summary of each:</p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    {COOKIE_TYPES.map((c) => (
                      <div key={c.type} className="rounded-2xl p-5 border" style={{ background: c.bg, borderColor: c.border }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{c.icon}</span>
                          <p className="font-bold text-brand-grey-900 text-sm" style={{ fontFamily: "var(--font-display)" }}>{c.type}</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mb-3 inline-block" style={{ background: c.canOpt ? "#FFF0F2" : "#F0FFF4", color: c.canOpt ? "#C8102E" : "#0BA02C" }}>
                          {c.canOpt ? "Optional — can be disabled" : "Required — cannot be disabled"}
                        </span>
                        <p className="text-xs text-brand-grey-600 leading-relaxed mb-2">{c.desc}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {c.examples.map((e) => (
                            <span key={e} className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-brand-grey-200 text-brand-grey-500">{e}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section id="table" title="3. Cookie Details">
                  <p>The following table lists specific cookies used on our Platform:</p>
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr style={{ background: "#FFF5F6" }}>
                          <th className="text-left px-4 py-3 font-bold text-brand-grey-800 text-xs uppercase tracking-wider rounded-tl-lg">Cookie Name</th>
                          <th className="text-left px-4 py-3 font-bold text-brand-grey-800 text-xs uppercase tracking-wider">Type</th>
                          <th className="text-left px-4 py-3 font-bold text-brand-grey-800 text-xs uppercase tracking-wider">Duration</th>
                          <th className="text-left px-4 py-3 font-bold text-brand-grey-800 text-xs uppercase tracking-wider rounded-tr-lg">Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {COOKIE_TABLE.map((row, i) => (
                          <tr key={i} className="border-b border-brand-grey-100 last:border-0">
                            <td className="px-4 py-3 font-mono text-brand-grey-700">{row.name}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{
                                background: row.type === "Necessary" ? "#F0FFF4" : row.type === "Analytics" ? "#FFF8EC" : row.type === "Marketing" ? "#FFF0F2" : "#E8F1FB",
                                color:      row.type === "Necessary" ? "#0BA02C" : row.type === "Analytics" ? "#FFB836" : row.type === "Marketing" ? "#C8102E" : "#0A65CC",
                              }}>
                                {row.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-brand-grey-500">{row.duration}</td>
                            <td className="px-4 py-3 text-brand-grey-500">{row.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Section>

                <Section id="third" title="4. Third-Party Cookies">
                  <p>Some cookies are placed by third-party services that appear on our pages. We do not control these cookies and they are subject to the privacy policies of the respective third parties:</p>
                  <ul className="mt-2 space-y-2">
                    <Bullet><strong className="text-brand-grey-800">Google Analytics</strong> — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">policies.google.com/privacy</a></Bullet>
                    <Bullet><strong className="text-brand-grey-800">Google Maps</strong> — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">policies.google.com/privacy</a></Bullet>
                    <Bullet><strong className="text-brand-grey-800">Facebook Pixel</strong> — <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">facebook.com/privacy/policy</a></Bullet>
                    <Bullet><strong className="text-brand-grey-800">LinkedIn Insight Tag</strong> — <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">linkedin.com/legal/privacy-policy</a></Bullet>
                  </ul>
                </Section>

                <Section id="manage" title="5. Managing Your Cookies">
                  <p>You have several options to manage or disable cookies:</p>
                  <p className="font-semibold text-brand-grey-800 mt-4 mb-1">Browser Settings</p>
                  <p>Most browsers allow you to control cookies through their settings. The links below explain how to manage cookies in common browsers:</p>
                  <ul className="mt-2 space-y-2">
                    <Bullet><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">Google Chrome</a></Bullet>
                    <Bullet><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">Mozilla Firefox</a></Bullet>
                    <Bullet><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">Apple Safari</a></Bullet>
                    <Bullet><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">Microsoft Edge</a></Bullet>
                  </ul>
                  <p className="mt-4">Please note that disabling certain cookies may affect the functionality of our website, and some features may not work as intended.</p>
                </Section>

                <Section id="consent" title="6. Your Consent">
                  <p>When you first visit our website, we display a cookie consent banner. By clicking &quot;Accept All&quot;, you consent to all categories of cookies. You may also click &quot;Manage Preferences&quot; to accept only selected categories.</p>
                  <p>Where required by law, we only deploy non-essential cookies (analytics, functional, marketing) with your explicit consent. You may withdraw or update your consent at any time by clearing cookies in your browser and revisiting our website.</p>
                </Section>

                <Section id="changes" title="7. Changes to This Policy">
                  <p>We may update this Cookie Policy from time to time to reflect changes in technology, law, or our data practices. We will notify you of significant changes by posting a notice on our website or, where appropriate, by email. The &quot;Last updated&quot; date at the top shows when it was last revised.</p>
                </Section>

                <Section id="contact" title="8. Contact Us">
                  <p>If you have questions about our use of cookies or wish to exercise your rights, contact us:</p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-5">
                    <a href="mailto:info@sisglobalworkforce.com" className="flex items-center gap-3 p-4 rounded-xl border border-brand-grey-200 hover:border-brand-red/30 hover:shadow-sm transition-all group">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(200,16,46,0.08)" }}>
                        <Mail size={16} className="text-brand-red" />
                      </div>
                      <div>
                        <p className="text-xs text-brand-grey-400 font-semibold uppercase tracking-widest mb-0.5">Email</p>
                        <p className="text-sm font-bold text-brand-grey-800 group-hover:text-brand-red transition-colors break-all">info@sisglobalworkforce.com</p>
                      </div>
                    </a>
                    <a href="https://sisglobalworkforce.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-brand-grey-200 hover:border-brand-red/30 hover:shadow-sm transition-all group">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(200,16,46,0.08)" }}>
                        <Globe size={16} className="text-brand-red" />
                      </div>
                      <div>
                        <p className="text-xs text-brand-grey-400 font-semibold uppercase tracking-widest mb-0.5">Website</p>
                        <p className="text-sm font-bold text-brand-grey-800 group-hover:text-brand-red transition-colors">sisglobalworkforce.com</p>
                      </div>
                    </a>
                  </div>
                </Section>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}