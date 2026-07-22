// src/app/jobs/page.tsx
import Link from "next/link";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JobFilters from "@/components/ui/JobFilters";
import MobileFilterToggle from "@/components/ui/MobileFilterToggle";
import { buildJobSlug, formatLocation } from "@/lib/utils";
import {
  MapPin, Clock, DollarSign, Briefcase, Search,
  ArrowRight, ShieldCheck, Star, BookOpen, FileText,
  HeartPulse, Users, TrendingUp, Headphones,
} from "lucide-react";
import { images } from "@/lib/images";

// ── Types ──────────────────────────────────────────────────────────────────
interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  logoColor: string;
  city: string;
  state: string;
  country: string;
  location: string; // formatted "City, State, Country"
  type: string;
  salary: string;
  tags: string[];
  posted: string;
  urgent: boolean;
  category: string;
  experience: number;
  featured: boolean;
}

// ── API ────────────────────────────────────────────────────────────────────
async function getJobs(
  searchParams: Record<string, string | undefined>
): Promise<{ jobs: Job[]; total: number }> {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://sisglobalapi.neuralinfo.co.in";
    const res = await fetch(`${base}/public/jobs/preview?status=Open`, { cache: "no-store" });
    const data = await res.json();

    let jobs: Job[] = data.map((j: Record<string, unknown>) => {
      const city = (j.city_name as string) ?? "";
      const state = (j.state_name as string) ?? "";
      const country = (j.country_name as string) ?? "";
      return {
        id: j.job_id,
        title: j.job_title,
        company: (j.category_name as string) || "Company",
        logo: ((j.job_title as string)?.charAt(0)) || "J",
        logoColor: "#C8102E",
        city,
        state,
        country,
        location: formatLocation(city, state, country),
        type: (j.employment_type_name as string) || "Full-time",
        salary: `${j.salary_min} – ${j.salary_max}`,
        tags: [],
        posted: new Date(j.created_at as string).toLocaleDateString(),
        urgent: false,
        category: (j.category_name as string) || "",
        experience: j.min_experience ? Number(j.min_experience) : 0,
        featured: false,
      };
    });

    const { q, location, category, types } = searchParams;

    if (q) {
      const lq = q.toLowerCase();
      jobs = jobs.filter((j) => j.title.toLowerCase().includes(lq) || j.company.toLowerCase().includes(lq));
    }
    if (location) {
      const locs = location.split(",").map((l) => l.toLowerCase().trim());
      // match against country (for footer links like "United Arab Emirates")
      jobs = jobs.filter((j) =>
        locs.some((l) =>
          j.country?.toLowerCase().includes(l) ||
          j.city?.toLowerCase().includes(l) ||
          j.state?.toLowerCase().includes(l)
        )
      );
    }
    if (category) {
      const cats = category.split(",").map((c) => c.toLowerCase().trim());
      jobs = jobs.filter((j) => cats.some((c) => j.category?.toLowerCase().includes(c)));
    }
    if (types) {
      const typeList = types.split(",").map((t) => t.toLowerCase().trim());
      jobs = jobs.filter((j) => typeList.includes(j.type?.toLowerCase()));
    }

    return { jobs, total: jobs.length };
  } catch {
    return { jobs: [], total: 0 };
  }
}

// ── Constants ──────────────────────────────────────────────────────────────
const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  "Full-time": { bg: "#E7F9ED", color: "#0BA02C" },
  "Part-time": { bg: "#E8F1FB", color: "#0A65CC" },
  Remote: { bg: "#E8F1FB", color: "#0A65CC" },
  Hybrid: { bg: "#FFF8EC", color: "#FFB836" },
  Contract: { bg: "#F5F0FF", color: "#7B3FE4" },
};

const JOB_TYPES = ["Full-time", "Remote", "Hybrid", "Contract"];
const JOBS_PER_PAGE = 6;

const BENEFITS = [
  { icon: <ShieldCheck size={22} />, title: "Ethical Hiring", desc: "Transparent recruitment with no hidden fees or misleading terms." },
  { icon: <Star size={22} />, title: "Zero Fake Promises", desc: "Every offer we present is verified, genuine, and backed by a signed contract." },
  { icon: <BookOpen size={22} />, title: "Training Support", desc: "Pre-departure skill upgrades and orientation to help you hit the ground running." },
  { icon: <FileText size={22} />, title: "Visa Guidance", desc: "End-to-end documentation and visa processing support so that nothing is missed." },
  { icon: <HeartPulse size={22} />, title: "Insurance Support", desc: "Health and travel insurance assistance to keep you protected abroad." },
  { icon: <Users size={22} />, title: "Family Connect", desc: "Regular updates and support channels to keep your family informed and at ease." },
  { icon: <TrendingUp size={22} />, title: "Career Growth", desc: "Placements with employers who invest in learning, progression, and long-term roles." },
  { icon: <Headphones size={22} />, title: "Post-Deployment Support", desc: "Our team stays in touch after you land — You are never alone after deployment." },
];

// ── Page ───────────────────────────────────────────────────────────────────
export default async function FindJobsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const resolvedParams = await searchParams;
  const { jobs, total } = await getJobs(resolvedParams);
  const { q, type, page } = resolvedParams;

  const currentPage = page ? parseInt(page) : 1;
  const totalPages = Math.ceil(total / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const paginatedJobs = jobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <div className="relative" style={{ borderBottom: "1px solid #E5E5E5" }}>
          <div className="absolute inset-0" style={{ backgroundImage: `url(${images.jobs.hero})`, backgroundSize: "cover", backgroundPosition: "right center", backgroundRepeat: "no-repeat" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #FFFFFF 0%, #FFF6F7 28%, rgba(255,246,247,0.55) 52%, rgba(255,255,255,0.05) 78%)" }} />

          <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">
            <div className="flex items-center gap-2 text-xs text-brand-grey-500 mb-4">
              <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
              <span>/</span>
              <span className="text-brand-grey-800 font-medium">Find Jobs</span>
            </div>

            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-grey-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {q ? `Results for "${q}"` : <>Explore International Career <span className="text-brand-red">Opportunities</span></>}
              </h1>
              <p className="text-brand-grey-600 mb-1 text-base">Discover verified overseas job opportunities across
                the GCC and Europe.</p>
              <p className="text-brand-grey-500 text-sm mb-5 flex items-center gap-1.5">
                <Briefcase size={13} className="text-brand-red" />
                <strong className="text-brand-grey-800">{total.toLocaleString()}+</strong> open positions
              </p>

              <form method="GET" className="flex items-center gap-2 w-full max-w-lg">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-grey-400" />
                  <input name="q" defaultValue={q} placeholder="Job title or keyword…" className="w-full pl-9 pr-4 py-2.5 border border-brand-grey-300 text-sm rounded focus:outline-none focus:border-brand-red bg-white" />
                </div>
                <button type="submit" className="btn-primary !py-2.5 !px-5 text-sm whitespace-nowrap flex items-center gap-2">
                  <Search size={14} /> Search
                </button>
              </form>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              <Link href="/jobs" className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors" style={!type ? { background: "#C8102E", color: "white", borderColor: "#C8102E" } : { background: "white", color: "#525252", borderColor: "#E0E0E0" }}>
                All Types
              </Link>
              {JOB_TYPES.map((t) => (
                <Link key={t} href={`/jobs?${q ? `q=${q}&` : ""}type=${encodeURIComponent(t)}`} className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors" style={type === t ? { background: "#C8102E", color: "white", borderColor: "#C8102E" } : { background: "white", color: "#525252", borderColor: "#E0E0E0" }}>
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

            <aside className="hidden lg:block">
              <Suspense fallback={<div className="bg-white border border-brand-grey-200 rounded-xl p-5 h-96 animate-pulse" />}>
                <JobFilters />
              </Suspense>
            </aside>

            <div>
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <p className="text-sm text-brand-grey-500">
                  <strong className="text-brand-grey-900">{total}</strong> jobs found
                </p>
                <Suspense fallback={null}><MobileFilterToggle /></Suspense>
              </div>

              {paginatedJobs.length === 0 ? (
                <div className="text-center py-24 text-brand-grey-400">
                  <Briefcase size={40} className="mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-semibold text-brand-grey-600">No jobs found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {paginatedJobs.map((job) => {
                    const tc = TYPE_COLORS[job.type] || TYPE_COLORS["Full-time"];
                    // Slug uses country for consistency with detail page share URL
                    const jobSlug = buildJobSlug(job.id, job.title, job.country);
                    const href = `/jobs/${jobSlug}`;

                    return (
                      <div key={job.id} className="group bg-white border border-brand-grey-200 rounded-xl p-5 hover:border-brand-red/40 hover:shadow-md transition-all duration-200">
                        <div className="flex items-start gap-4">
                          {/* Logo */}
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0" style={{ background: job.logoColor + "15", color: job.logoColor, fontFamily: "var(--font-display)" }}>
                            {job.logo}
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              {job.urgent && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#FFF0F2", color: "#C8102E" }}>🔥 URGENT</span>}
                              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ background: tc.bg, color: tc.color }}>{job.type}</span>
                            </div>

                            <Link href={href}>
                              <h3 className="font-bold text-brand-grey-900 text-base group-hover:text-brand-red transition-colors mb-1 cursor-pointer" style={{ fontFamily: "var(--font-display)" }}>
                                {job.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-brand-grey-500 mb-3">{job.company}</p>

                            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-brand-grey-500">
                              {/* City, State, Country */}
                              <span className="flex items-center gap-1">
                                <MapPin size={12} className="text-brand-red flex-shrink-0" />
                                {job.location || job.country || "—"}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign size={12} className="text-brand-red flex-shrink-0" />
                                {job.salary}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={12} className="text-brand-red flex-shrink-0" />
                                {job.posted}
                              </span>
                            </div>
                          </div>

                          {/* Desktop buttons */}
                          <div className="hidden sm:flex flex-shrink-0 flex-col items-end gap-2">
                            {/* <Link href={`${href}#apply`} className="btn-primary !py-2 !px-4 text-xs flex items-center gap-1.5 whitespace-nowrap">
                              Apply Now <ArrowRight size={12} />
                            </Link> */}
                            <Link href={href} className="text-xs text-brand-grey-400 hover:text-brand-red transition-colors">
                              View Details →
                            </Link>
                          </div>
                        </div>

                        {/* Mobile buttons */}
                        <div className="sm:hidden flex items-center gap-3 mt-4 pt-4 border-t border-brand-grey-100">
                          {/* <Link href={`${href}#apply`} className="btn-primary flex-1 !py-2.5 text-xs flex items-center justify-center gap-1.5">
                            Apply Now <ArrowRight size={12} />
                          </Link> */}
                          <Link href={href} className="flex-1 text-center text-xs font-semibold py-2.5 border border-brand-grey-200 rounded-lg text-brand-grey-600 hover:border-brand-red hover:text-brand-red transition-colors">
                            View Details →
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <Link href={`/jobs?${new URLSearchParams({ ...resolvedParams, page: String(currentPage - 1) })}`} className={`px-3 h-9 rounded text-sm font-semibold border transition-colors ${currentPage === 1 ? "border-brand-grey-200 text-brand-grey-300 cursor-not-allowed pointer-events-none" : "border-brand-grey-200 text-brand-grey-700 hover:border-brand-red hover:text-brand-red"}`}>
                    ← Previous
                  </Link>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((n) => totalPages <= 7 || n === 1 || n === totalPages || Math.abs(n - currentPage) <= 1)
                    .map((pageNum, idx, arr) => {
                      if (idx > 0 && pageNum - arr[idx - 1] > 1) return <span key={`e-${pageNum}`} className="w-9 h-9 flex items-center justify-center text-sm text-brand-grey-500">...</span>;
                      return (
                        <Link key={pageNum} href={`/jobs?${new URLSearchParams({ ...resolvedParams, page: String(pageNum) })}`} className={`w-9 h-9 rounded text-sm font-semibold transition-colors flex items-center justify-center ${pageNum === currentPage ? "bg-[#C8102E] text-white" : "border border-brand-grey-200 text-brand-grey-700 hover:border-brand-red hover:text-brand-red bg-white"}`}>
                          {pageNum}
                        </Link>
                      );
                    })}

                  <Link href={`/jobs?${new URLSearchParams({ ...resolvedParams, page: String(currentPage + 1) })}`} className={`px-3 h-9 rounded text-sm font-semibold border transition-colors ${currentPage === totalPages ? "border-brand-grey-200 text-brand-grey-300 cursor-not-allowed pointer-events-none" : "border-brand-grey-200 text-brand-grey-700 hover:border-brand-red hover:text-brand-red"}`}>
                    Next →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Benefits section ── */}
        <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#171717 0%,#262626 100%)" }}>
          <div className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none" style={{ backgroundImage: `url(${images.jobs.benifits})`, backgroundSize: "cover", backgroundPosition: "left center" }} />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-white/5" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border border-brand-red/10" />
            <div className="absolute left-0 top-0 w-1/2 h-full" style={{ background: "radial-gradient(ellipse 50% 70% at 10% 50%, rgba(200,16,46,0.10) 0%, transparent 70%)" }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full mb-5" style={{ background: "rgba(200,16,46,0.18)", color: "#FF6B7A", border: "1px solid rgba(200,16,46,0.28)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                For Candidates
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Why Work With <span className="text-brand-red">SIS Global?</span>
              </h2>
              <p className="text-white/50 text-base mt-4 max-w-xl mx-auto">
                We do not just place you — we support you at
every step, from application to settling into your
new role abroad.

              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="group rounded-2xl p-6 transition-all duration-200 hover:border-brand-red/50" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(2px)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:bg-brand-red" style={{ background: "rgba(200,16,46,0.20)", color: "#FF6B7A" }}>
                    {b.icon}
                  </div>
                  <h3 className="font-bold text-white text-sm mb-2" style={{ fontFamily: "var(--font-display)" }}>{b.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>

            {/* <div className="text-center mt-12">
              <Link href="#" className="btn-primary inline-flex items-center gap-2">
                Apply for a Job Now <ArrowRight size={15} />
              </Link>
            </div> */}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}