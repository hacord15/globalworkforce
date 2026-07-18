// src/app/terms/page.tsx
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronRight, FileText, Mail, Phone, Globe } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | SIS Global Workforce Solutions",
  description: "Terms and Conditions governing use of SIS Global Workforce Solutions platform and services.",
};

const TOC = [
  { id: "acceptance",    label: "Acceptance of Terms"         },
  { id: "definitions",   label: "Definitions"                 },
  { id: "services",      label: "Our Services"                },
  { id: "eligibility",   label: "Eligibility"                 },
  { id: "accounts",      label: "User Accounts"               },
  { id: "employers",     label: "Employer Obligations"        },
  { id: "candidates",    label: "Candidate Obligations"       },
  { id: "prohibited",    label: "Prohibited Conduct"          },
  { id: "ip",            label: "Intellectual Property"       },
  { id: "disclaimer",    label: "Disclaimer of Warranties"    },
  { id: "liability",     label: "Limitation of Liability"     },
  { id: "indemnity",     label: "Indemnification"             },
  { id: "termination",   label: "Termination"                 },
  { id: "governing",     label: "Governing Law"               },
  { id: "changes",       label: "Changes to Terms"            },
  { id: "contact",       label: "Contact Us"                  },
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

function Sub({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-bold text-brand-grey-800 mt-5 mb-2" style={{ fontFamily: "var(--font-display)" }}>{children}</h3>;
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 py-0.5">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}

export default function TermsPage() {
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
              <span className="text-white/70">Terms &amp; Conditions</span>
            </div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full mb-5" style={{ background: "rgba(200,16,46,0.2)", color: "#FF6B7A", border: "1px solid rgba(200,16,46,0.3)" }}>
              <FileText size={12} /> Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Terms &amp; <span className="text-brand-red">Conditions</span>
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
                  <nav className="p-2 max-h-[70vh] overflow-y-auto">
                    {TOC.map((item) => (
                      <a key={item.id} href={`#${item.id}`} className="block px-3 py-2 rounded-lg text-xs font-medium text-brand-grey-600 hover:text-brand-red hover:bg-brand-grey-50 transition-colors">
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="mt-5 rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg,#C8102E 0%,#900B20 100%)" }}>
                  <p className="font-bold text-sm mb-1" style={{ fontFamily: "var(--font-display)" }}>Questions?</p>
                  <p className="text-white/70 text-xs leading-relaxed mb-4">Contact our legal team for any queries.</p>
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
                    Please read these Terms &amp; Conditions carefully before using the SIS Global Workforce Solutions platform. By accessing or using our services, you agree to be bound by these terms. If you do not agree, please do not use our platform.
                  </p>
                </div>

                <Section id="acceptance" title="1. Acceptance of Terms">
                  <p>By accessing or using the SIS Global Workforce Solutions website at <a href="https://sisglobalworkforce.com" className="text-brand-red hover:underline">sisglobalworkforce.com</a> and all related services (collectively, the &quot;Platform&quot;), you confirm that you have read, understood, and agree to be bound by these Terms &amp; Conditions and our Privacy Policy.</p>
                  <p>If you are using the Platform on behalf of an organisation, you represent and warrant that you have the authority to bind that organisation to these Terms.</p>
                </Section>

                <Section id="definitions" title="2. Definitions">
                  <ul className="space-y-2 mt-2">
                    <Bullet><strong className="text-brand-grey-800">&quot;Platform&quot;</strong> — the SIS Global Workforce Solutions website, mobile application, and all related services.</Bullet>
                    <Bullet><strong className="text-brand-grey-800">&quot;Company&quot;</strong> — SIS Global Workforce Solutions Private Limited, A-28 &amp; 29, Phase-1, Okhla Industrial Area, New Delhi – 110020.</Bullet>
                    <Bullet><strong className="text-brand-grey-800">&quot;Employer&quot;</strong> — any company or individual using the Platform to source, hire, or manage workforce.</Bullet>
                    <Bullet><strong className="text-brand-grey-800">&quot;Candidate&quot;</strong> — any individual using the Platform to find employment opportunities.</Bullet>
                    <Bullet><strong className="text-brand-grey-800">&quot;Services&quot;</strong> — all staffing, recruitment, payroll, compliance, and workforce management services provided by the Company.</Bullet>
                    <Bullet><strong className="text-brand-grey-800">&quot;Content&quot;</strong> — all text, data, graphics, images, and other materials on the Platform.</Bullet>
                  </ul>
                </Section>

                <Section id="services" title="3. Our Services">
                  <p>SIS Global Workforce Solutions provides technology-enabled workforce outsourcing and recruitment services. Our services include but are not limited to:</p>
                  <ul className="mt-2 space-y-2">
                    <Bullet>Permanent and contract staffing</Bullet>
                    <Bullet>International workforce deployment</Bullet>
                    <Bullet>Payroll management and statutory compliance</Bullet>
                    <Bullet>Background verification and candidate assessment</Bullet>
                    <Bullet>HR consulting and workforce advisory</Bullet>
                  </ul>
                  <p className="mt-3">The Company reserves the right to modify, suspend, or discontinue any aspect of the Services at any time with or without notice.</p>
                </Section>

                <Section id="eligibility" title="4. Eligibility">
                  <p>By using the Platform, you represent that you are at least 18 years of age and legally capable of entering into binding contracts under applicable law. The Platform is not intended for use by minors.</p>
                  <p>Employers must be legally registered entities with valid business credentials. Candidates must provide truthful, accurate, and up-to-date information regarding their qualifications, experience, and documents.</p>
                </Section>

                <Section id="accounts" title="5. User Accounts">
                  <Sub>Registration</Sub>
                  <p>To access certain features, you must create an account. You agree to provide accurate, current, and complete information during registration and to keep your account information updated.</p>
                  <Sub>Account Security</Sub>
                  <p>You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. Notify us immediately at <a href="mailto:info@sisglobalworkforce.com" className="text-brand-red hover:underline">info@sisglobalworkforce.com</a> if you suspect unauthorised access.</p>
                  <Sub>Account Termination</Sub>
                  <p>The Company may suspend or terminate your account at any time if you breach these Terms, provide false information, or engage in prohibited conduct.</p>
                </Section>

                <Section id="employers" title="6. Employer Obligations">
                  <p>As an Employer using our Platform, you agree to:</p>
                  <ul className="mt-2 space-y-2">
                    <Bullet>Provide accurate and complete job descriptions and company information</Bullet>
                    <Bullet>Comply with all applicable labour laws, including those of the destination country for international deployments</Bullet>
                    <Bullet>Not discriminate against candidates based on caste, religion, gender, age, disability, or any other protected characteristic</Bullet>
                    <Bullet>Pay all agreed fees and charges within stipulated timelines</Bullet>
                    <Bullet>Provide a safe and lawful working environment for placed candidates</Bullet>
                    <Bullet>Not charge recruitment fees or costs to workers placed through SIS Global</Bullet>
                  </ul>
                </Section>

                <Section id="candidates" title="7. Candidate Obligations">
                  <p>As a Candidate using our Platform, you agree to:</p>
                  <ul className="mt-2 space-y-2">
                    <Bullet>Provide truthful and accurate information in your profile, CV, and application documents</Bullet>
                    <Bullet>Not misrepresent qualifications, experience, or identity documents</Bullet>
                    <Bullet>Not apply for positions you are not genuinely interested in or qualified for</Bullet>
                    <Bullet>Respond promptly to communications from the Company or prospective employers</Bullet>
                    <Bullet>Comply with all pre-departure requirements including medical checks and visa documentation</Bullet>
                    <Bullet>Abide by the employment contract and destination-country laws upon deployment</Bullet>
                  </ul>
                </Section>

                <Section id="prohibited" title="8. Prohibited Conduct">
                  <p>You agree not to:</p>
                  <ul className="mt-2 space-y-2">
                    <Bullet>Use the Platform for any unlawful purpose or in violation of any applicable laws</Bullet>
                    <Bullet>Post false, misleading, or fraudulent job listings or candidate profiles</Bullet>
                    <Bullet>Harvest or collect personal data of other users without their consent</Bullet>
                    <Bullet>Attempt to gain unauthorised access to any part of the Platform or its systems</Bullet>
                    <Bullet>Upload malware, viruses, or any malicious code</Bullet>
                    <Bullet>Engage in spamming, phishing, or deceptive communications through the Platform</Bullet>
                    <Bullet>Circumvent the Company to contact candidates or employers directly to avoid platform fees</Bullet>
                    <Bullet>Use automated tools (bots, scrapers) to access the Platform without prior written consent</Bullet>
                  </ul>
                </Section>

                <Section id="ip" title="9. Intellectual Property">
                  <p>All content on the Platform including but not limited to text, graphics, logos, images, data compilations, and software is the property of SIS Global Workforce Solutions Private Limited or its licensors and is protected by applicable intellectual property laws.</p>
                  <p>You may not reproduce, distribute, modify, or create derivative works from any content on the Platform without the prior written consent of the Company.</p>
                  <p>By submitting content (profile data, job listings, resumes) to the Platform, you grant the Company a non-exclusive, royalty-free licence to use such content for the purposes of providing the Services.</p>
                </Section>

                <Section id="disclaimer" title="10. Disclaimer of Warranties">
                  <p>The Platform and Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. The Company makes no warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
                  <p>The Company does not guarantee that:</p>
                  <ul className="mt-2 space-y-2">
                    <Bullet>The Platform will be uninterrupted, error-free, or secure at all times</Bullet>
                    <Bullet>Job listings are accurate or that placements will be made within a specific timeframe</Bullet>
                    <Bullet>Candidate information is truthful or that background verifications will detect all discrepancies</Bullet>
                  </ul>
                </Section>

                <Section id="liability" title="11. Limitation of Liability">
                  <p>To the maximum extent permitted by applicable law, the Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform or Services, including but not limited to loss of profits, data, or goodwill.</p>
                  <p>The Company&apos;s total aggregate liability for any claim arising from these Terms shall not exceed the total fees paid by you to the Company in the three months preceding the claim.</p>
                </Section>

                <Section id="indemnity" title="12. Indemnification">
                  <p>You agree to indemnify, defend, and hold harmless the Company, its officers, directors, employees, agents, licensors, and service providers from any claims, liabilities, damages, judgements, awards, losses, costs, or expenses (including legal fees) arising from:</p>
                  <ul className="mt-2 space-y-2">
                    <Bullet>Your breach of these Terms</Bullet>
                    <Bullet>Your use of the Platform or Services</Bullet>
                    <Bullet>Your violation of any applicable law or third-party rights</Bullet>
                    <Bullet>Any content you submit to the Platform that is false, misleading, or infringes third-party rights</Bullet>
                  </ul>
                </Section>

                <Section id="termination" title="13. Termination">
                  <p>Either party may terminate the use of the Platform at any time. The Company may terminate or suspend your access immediately, without notice, for conduct that the Company believes violates these Terms or is harmful to other users, the Company, or third parties.</p>
                  <p>Upon termination, your right to use the Platform ceases immediately. Provisions that by their nature should survive termination (including intellectual property, disclaimers, indemnity, and limitations of liability) shall survive.</p>
                </Section>

                <Section id="governing" title="14. Governing Law &amp; Dispute Resolution">
                  <p>These Terms shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.</p>
                  <p>Before initiating any legal proceedings, parties shall attempt to resolve disputes through good-faith negotiation for a period of 30 days.</p>
                </Section>

                <Section id="changes" title="15. Changes to Terms">
                  <p>The Company reserves the right to update these Terms at any time. We will notify users of material changes by posting a notice on the Platform or by email. Your continued use of the Platform after changes become effective constitutes acceptance of the revised Terms.</p>
                  <p>We recommend reviewing these Terms periodically. The &quot;Last updated&quot; date at the top indicates when the Terms were last revised.</p>
                </Section>

                <Section id="contact" title="16. Contact Us">
                  <p>For any questions, concerns, or notices regarding these Terms, please contact:</p>
                  <div className="grid sm:grid-cols-3 gap-4 mt-5">
                    <a href="mailto:info@sisglobalworkforce.com" className="flex items-center gap-3 p-4 rounded-xl border border-brand-grey-200 hover:border-brand-red/30 hover:shadow-sm transition-all group">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(200,16,46,0.08)" }}>
                        <Mail size={16} className="text-brand-red" />
                      </div>
                      <div>
                        <p className="text-xs text-brand-grey-400 font-semibold uppercase tracking-widest mb-0.5">Email</p>
                        <p className="text-sm font-bold text-brand-grey-800 group-hover:text-brand-red transition-colors break-all">info@sisglobalworkforce.com</p>
                      </div>
                    </a>
                    <a href="tel:+911149032418" className="flex items-center gap-3 p-4 rounded-xl border border-brand-grey-200 hover:border-brand-red/30 hover:shadow-sm transition-all group">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(200,16,46,0.08)" }}>
                        <Phone size={16} className="text-brand-red" />
                      </div>
                      <div>
                        <p className="text-xs text-brand-grey-400 font-semibold uppercase tracking-widest mb-0.5">Phone</p>
                        <p className="text-sm font-bold text-brand-grey-800 group-hover:text-brand-red transition-colors">+91-11-49032418</p>
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